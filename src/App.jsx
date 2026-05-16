import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AudioLines,
  CircleDot,
  Clipboard,
  Gauge,
  Languages,
  Layers3,
  Music2,
  Sparkles,
  Timer,
} from "lucide-react";
import {
  INSTRUMENTS,
  JOURNEY_BLUEPRINTS,
  CHARACTERISTIC_OPTIONS,
  DEFAULT_EXCLUDES,
  EXCLUDE_GROUPS,
  GUIDED_BUILDER_QUESTIONS,
  PROMPT_LANGUAGES,
  PROMPT_DENSITIES,
  STRUCTURE_COLORS,
  TAG_GROUPS,
  TARGET_TOOLS,
  TRACK_LENGTHS,
  TRACK_PRESETS,
  VOCAL_MODES,
  createDefaultArrangement,
  createDefaultStructure,
  createDefaultTrackRows,
  createArrangementFromRanges,
  createInitialSelections,
  createSelectionsFromMap,
  findInstrument,
  getBlockLabel,
  getRecommendations,
  getSectionForBlock,
  tagDescription,
  tagLabel,
} from "./data/musicModel.js";
import { compilePromptBundle } from "./utils/promptCompiler.js";

const defaultPreset = TRACK_PRESETS[0];
const STORAGE_KEY = "groovePromptBuilder.savedPrompts";
const ANALYSIS_STORAGE_KEY = "groovePromptBuilder.audioAnalysisPrompts";
const defaultGuidedAnswers = Object.fromEntries(
  GUIDED_BUILDER_QUESTIONS.map((question) => [question.id, question.options[0]?.id])
);
const AUDIO_ANALYSIS_MODES = [
  { id: "beat", label: "Beat" },
  { id: "percussion", label: "Percussion" },
  { id: "melody", label: "Melody" },
  { id: "groove", label: "Groove" },
  { id: "structure", label: "Song Aufbau" },
];
const EXCLUDE_GROUP_LABELS = {
  commercialMainstream: "Commercial / Mainstream",
  vocals: "Vocals",
  edmFestival: "EDM / Festival",
  synthsPads: "Synths / Pads",
  drumsGroove: "Drums / Groove",
  bassLowend: "Bass / Low-End",
  fxTransitions: "FX / Transitions",
  mixAesthetic: "Mix Aesthetic",
  structureArrangement: "Structure / Arrangement",
};

function loadSavedSnapshots() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function loadSavedAnalysisPrompts() {
  try {
    return JSON.parse(localStorage.getItem(ANALYSIS_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function persistAnalysisPrompts(items) {
  localStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(items));
}

function formatTime(seconds = 0) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const rest = Math.floor(safe % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function generateWaveformPeaks(audioBuffer, pointCount = 900) {
  if (!audioBuffer) return [];
  const channel = audioBuffer.getChannelData(0);
  const step = Math.max(1, Math.floor(channel.length / pointCount));
  const peaks = [];
  for (let index = 0; index < channel.length; index += step) {
    let max = 0;
    for (let offset = 0; offset < step && index + offset < channel.length; offset += 1) {
      max = Math.max(max, Math.abs(channel[index + offset]));
    }
    peaks.push(max);
  }
  const peak = Math.max(...peaks, 0.0001);
  return peaks.map((value) => value / peak);
}

function estimateAudioFeatures(audioBuffer, selection) {
  const start = Math.max(0, Math.min(selection.start, selection.end));
  const end = Math.min(audioBuffer.duration, Math.max(selection.start, selection.end));
  const startSample = Math.floor(start * audioBuffer.sampleRate);
  const endSample = Math.max(startSample + 1, Math.floor(end * audioBuffer.sampleRate));
  const channel = audioBuffer.getChannelData(0);
  const maxReads = 180000;
  const step = Math.max(1, Math.floor((endSample - startSample) / maxReads));
  let sumSquares = 0;
  let peak = 0;
  let zc = 0;
  let previous = channel[startSample] || 0;
  let count = 0;

  for (let index = startSample; index < endSample; index += step) {
    const sample = channel[index] || 0;
    sumSquares += sample * sample;
    peak = Math.max(peak, Math.abs(sample));
    if ((sample >= 0 && previous < 0) || (sample < 0 && previous >= 0)) zc += 1;
    previous = sample;
    count += 1;
  }

  const frameSize = 1024;
  const hop = 512;
  const energies = [];
  const times = [];
  for (let index = startSample; index < endSample - frameSize; index += hop) {
    let frame = 0;
    for (let offset = 0; offset < frameSize; offset += 1) {
      const sample = channel[index + offset] || 0;
      frame += sample * sample;
    }
    energies.push(Math.sqrt(frame / frameSize));
    times.push(index / audioBuffer.sampleRate);
  }
  const averageEnergy = energies.reduce((sum, value) => sum + value, 0) / Math.max(1, energies.length);
  const variance = energies.reduce((sum, value) => sum + (value - averageEnergy) ** 2, 0) / Math.max(1, energies.length);
  const threshold = averageEnergy + Math.sqrt(variance) * 0.75;
  const onsetTimes = [];
  for (let index = 1; index < energies.length - 1; index += 1) {
    if (energies[index] > threshold && energies[index] > energies[index - 1] && energies[index] >= energies[index + 1]) {
      if (!onsetTimes.length || times[index] - onsetTimes[onsetTimes.length - 1] > 0.16) {
        onsetTimes.push(times[index]);
      }
    }
  }
  const intervals = onsetTimes
    .slice(1)
    .map((time, index) => time - onsetTimes[index])
    .filter((interval) => interval >= 0.25 && interval <= 1.2)
    .sort((a, b) => a - b);
  const medianInterval = intervals[Math.floor(intervals.length / 2)];
  const bpm = medianInterval ? Math.round(60 / medianInterval) : null;
  const transientRate = onsetTimes.length / Math.max(1, end - start);
  const zcr = zc / Math.max(1, count);
  const quarters = [0, 1, 2, 3].map((quarter) => {
    const from = Math.floor((energies.length * quarter) / 4);
    const to = Math.floor((energies.length * (quarter + 1)) / 4);
    const slice = energies.slice(from, to);
    return slice.reduce((sum, value) => sum + value, 0) / Math.max(1, slice.length);
  });

  return {
    start,
    end,
    duration: end - start,
    rms: Math.sqrt(sumSquares / Math.max(1, count)),
    peak,
    zcr,
    bpm,
    transientRate,
    onsetCount: onsetTimes.length,
    energyTrend: quarters,
  };
}

function describeEnergy(rms) {
  if (rms > 0.22) return "high-energy, dense and upfront";
  if (rms > 0.12) return "steady club energy with controlled density";
  return "restrained, spacious and textural";
}

function describeBrightness(zcr) {
  if (zcr > 0.18) return "bright, clicky upper texture";
  if (zcr > 0.1) return "balanced mid/high detail";
  return "dark, warm, low-passed tone";
}

function describeMotion(values) {
  const first = values[0] || 0;
  const last = values[values.length - 1] || 0;
  if (last > first * 1.25) return "additive lift across the selected section";
  if (first > last * 1.25) return "subtractive reduction across the selected section";
  return "stable loop evolution with subtle internal movement";
}

function buildAudioPrompts({ sourceName, youtubeLink, features, modes }) {
  const source = youtubeLink ? `${sourceName} / ${youtubeLink}` : sourceName;
  const bpmText = features.bpm ? `${features.bpm} BPM estimate` : "BPM not confidently detected";
  const energy = describeEnergy(features.rms);
  const brightness = describeBrightness(features.zcr);
  const motion = describeMotion(features.energyTrend);
  const range = `${formatTime(features.start)}-${formatTime(features.end)}`;
  const prompts = {};

  if (modes.beat) {
    prompts.beat = `Beat reference from ${source}, ${range}: ${bpmText}, ${energy}, tight minimal/deep techno pulse, controlled kick weight, no EDM festival drop, keep the beat functional, DJ-friendly and polished.`;
  }
  if (modes.percussion) {
    prompts.percussion = `Percussion reference from ${source}, ${range}: transient density ${features.onsetCount} hits, ${brightness}, use subtle hats, clicks, ghost percussion and restrained fills, avoid stock sample-pack drums or obvious snare-roll clichés.`;
  }
  if (modes.melody) {
    prompts.melody = `Melody and harmony reference from ${source}, ${range}: ${brightness}, restrained melodic movement, use dub chords, filtered pads or small synth motifs rather than a big lead, keep emotion intelligent, dark and understated.`;
  }
  if (modes.groove) {
    prompts.groove = `Groove reference from ${source}, ${range}: ${bpmText}, ${motion}, bass and percussion should interlock with micro-variation, swing/shuffle detail and controlled low-end, avoid commercial dance pumping or cheesy hook focus.`;
  }
  if (modes.structure) {
    prompts.structure = `Arrangement reference from ${source}, ${range}: ${motion}, selected region lasts ${features.duration.toFixed(1)} seconds, translate into phrase-based 8/16-bar evolution with additive/subtractive entries, restrained breakdown behavior and smooth DJ-friendly transition logic.`;
  }

  return prompts;
}

function ToggleGroup({ label, value, options, onChange }) {
  return (
    <div className="field-stack">
      <span className="field-label">{label}</span>
      <div className="segmented">
        {options.map((option) => {
          const optionValue = typeof option === "object" ? option.id : option;
          const optionLabel = typeof option === "object" ? option.label : option;
          return (
            <button
              className={value === optionValue ? "is-selected" : ""}
              key={optionValue}
              type="button"
              onClick={() => onChange(optionValue)}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GuidedQuestion({ question, value, onChange }) {
  return (
    <section className="guided-question">
      <div className="guided-question-head">
        <div>
          <h4>{question.label}</h4>
          <p>{question.prompt}</p>
        </div>
        <span>{question.options.length} choices</span>
      </div>
      <div className="guided-options">
        {question.options.map((option) => (
          <button
            className={value === option.id ? "is-selected" : ""}
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
          >
            <strong>{option.label}</strong>
            <span>{option.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function appendUnique(current = [], values = []) {
  return [...new Set([...current, ...values])];
}

function mergeTagAnswers(baseSelections, options) {
  const next = JSON.parse(JSON.stringify(baseSelections));
  options.forEach((option) => {
    Object.entries(option.tags || {}).forEach(([instrumentId, groups]) => {
      next[instrumentId] = next[instrumentId] || { sound: [], tone: [], groove: [], notes: "" };
      Object.entries(groups).forEach(([group, values]) => {
        next[instrumentId][group] = appendUnique(next[instrumentId][group], values);
      });
    });
  });
  return next;
}

function appendMetaText(current, value) {
  if (!value) return current || "";
  if (!current) return value;
  return current.toLowerCase().includes(value.toLowerCase()) ? current : `${current}, ${value}`;
}

function scaleStructureToLength(structure, sourceLength, targetLength) {
  if (sourceLength === targetLength) return structure;
  return structure.map((section, index) => {
    const start = index === 0 ? 1 : Math.max(1, Math.round(((section.start - 1) / sourceLength) * targetLength) + 1);
    const nextSourceStart = structure[index + 1]?.start;
    const end = nextSourceStart
      ? Math.max(start, Math.round(((nextSourceStart - 1) / sourceLength) * targetLength))
      : targetLength;
    return { ...section, start, end };
  });
}

function scaleRangesToLength(ranges, sourceLength, targetLength) {
  if (sourceLength === targetLength) return ranges;
  const sourceBlocks = sourceLength / 4;
  const targetBlocks = targetLength / 4;
  const factor = targetBlocks / sourceBlocks;
  return Object.fromEntries(
    Object.entries(ranges).map(([instrumentId, instrumentRanges]) => [
      instrumentId,
      instrumentRanges.map(([start, end]) => {
        const scaledStart = Math.min(targetBlocks - 1, Math.max(0, Math.round(start * factor)));
        const scaledEnd = Math.min(targetBlocks - 1, Math.max(scaledStart, Math.round((end + 1) * factor) - 1));
        return [scaledStart, scaledEnd];
      }),
    ])
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="stat">
      <Icon size={16} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function TagChip({ active, recommended, children, onClick, onDoubleClick }) {
  return (
    <button
      className={`tag-chip ${active ? "is-active" : ""} ${recommended ? "is-recommended" : ""}`}
      type="button"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </button>
  );
}

function EffectTable({ tags, selectedTags, recommendations, onAdd }) {
  return (
    <div className="effect-table">
      <div className="effect-table-head">
        <span>Effect Word</span>
        <span>Description</span>
      </div>
      {tags.map((tag) => {
        const label = tagLabel(tag);
        return (
          <button
            className={`effect-row ${selectedTags.includes(label) ? "is-active" : ""} ${recommendations.has(label) ? "is-recommended" : ""}`}
            key={label}
            type="button"
            onDoubleClick={() => onAdd(label)}
            title="Double click to assign"
          >
            <strong>{label}</strong>
            <span>{tagDescription(tag)}</span>
          </button>
        );
      })}
    </div>
  );
}

function ExcludeBuilder({ selectedExcludes, onToggle, onReset, onClear }) {
  return (
    <div className="exclude-builder">
      <div className="exclude-builder-head">
        <div>
          <strong>Negative Prompt Builder</strong>
          <span>Click to toggle unwanted commercial, cheesy, generic or wrong-style elements.</span>
        </div>
        <div>
          <button type="button" onClick={onReset}>Defaults</button>
          <button type="button" onClick={onClear}>Clear</button>
        </div>
      </div>
      {Object.entries(EXCLUDE_GROUPS).map(([groupId, tags]) => (
        <section className="exclude-group" key={groupId}>
          <h4>{EXCLUDE_GROUP_LABELS[groupId] || groupId.replace(/([A-Z])/g, " $1")}</h4>
          <div className="exclude-chip-grid">
            {tags.map((tag) => {
              const label = tagLabel(tag);
              const active = selectedExcludes.includes(label);
              return (
                <button
                  className={active ? "is-active" : ""}
                  key={label}
                  type="button"
                  onClick={() => onToggle(label)}
                  title={tagDescription(tag)}
                >
                  <strong>{label}</strong>
                  <span>{tagDescription(tag)}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function AssignmentSection({ group, tags, onFocus, onRemove }) {
  return (
    <section className="assignment-section" onClick={onFocus}>
      <div className="assignment-heading">
        <h3>{group}</h3>
        <span>{tags.length ? "double click to remove" : "click to choose"}</span>
      </div>
      <div className="assigned-tags">
        {tags.length ? (
          tags.map((tag) => (
            <TagChip key={tag} active onDoubleClick={(event) => {
              event.stopPropagation();
              onRemove(tag);
            }}>
              {tag}
            </TagChip>
          ))
        ) : (
          <em>No {group} words assigned yet</em>
        )}
      </div>
    </section>
  );
}

function AudioAnalyzerPanel({
  audioRef,
  canvasRef,
  audioUrl,
  audioName,
  audioDuration,
  audioSelection,
  audioStatus,
  youtubeLink,
  analysisModes,
  audioAnalysis,
  savedAnalysisPrompts,
  onFileChange,
  onYoutubeChange,
  onYoutubeLoad,
  onCanvasDown,
  onCanvasMove,
  onCanvasUp,
  onModeToggle,
  onAnalyze,
  onSavePrompt,
  onSaveAll,
  onApplyPrompt,
  onApplyAll,
  onDeleteSaved,
}) {
  const grouped = savedAnalysisPrompts.reduce((groups, prompt) => {
    groups[prompt.group] = [...(groups[prompt.group] || []), prompt];
    return groups;
  }, {});

  return (
    <div className="card-content analyzer-content">
      <div className="panel-heading">
        <AudioLines size={18} />
        <div>
          <h2>Audio Analysis</h2>
          <p>MP3/WAV laden, Bereich in der Waveform markieren und daraus Beat-, Percussion-, Melody-, Groove- oder Struktur-Prompts erzeugen.</p>
        </div>
      </div>

      <div className="analysis-source-grid">
        <section className="analysis-card">
          <h3>Local Audio</h3>
          <label className="file-drop">
            <input accept="audio/mpeg,audio/mp3,audio/wav,audio/wave" type="file" onChange={onFileChange} />
            <strong>{audioName || "MP3/WAV auswählen"}</strong>
            <span>{audioName ? `${formatTime(audioDuration)} loaded` : "Waveform + Player werden lokal im Browser erzeugt."}</span>
          </label>
        </section>

        <section className="analysis-card">
          <h3>YouTube Reference</h3>
          <div className="youtube-row">
            <input
              value={youtubeLink}
              placeholder="https://youtube.com/watch?v=..."
              onChange={(event) => onYoutubeChange(event.target.value)}
            />
            <button type="button" onClick={onYoutubeLoad}>Use Link</button>
          </div>
          <p>Direkte YouTube-Waveform-Analyse braucht einen Backend-Extractor. In dieser Browser-Version wird der Link als Referenz gespeichert; Analyse läuft über hochgeladene Audio-Datei.</p>
        </section>
      </div>

      {audioStatus && <div className="analysis-status">{audioStatus}</div>}

      <section className="waveform-panel">
        <div className="waveform-toolbar">
          <div>
            <strong>{audioName || "No audio loaded"}</strong>
            <span>
              Selection {formatTime(audioSelection.start)} - {formatTime(audioSelection.end || audioDuration)}
            </span>
          </div>
          <audio ref={audioRef} controls src={audioUrl || undefined} />
        </div>
        <canvas
          className="waveform-canvas"
          ref={canvasRef}
          onMouseDown={onCanvasDown}
          onMouseMove={onCanvasMove}
          onMouseUp={onCanvasUp}
          onMouseLeave={onCanvasUp}
        />
      </section>

      <section className="analysis-controls">
        <div>
          <h3>Analyze Focus</h3>
          <div className="analysis-mode-grid">
            {AUDIO_ANALYSIS_MODES.map((mode) => (
              <button
                className={analysisModes[mode.id] ? "is-active" : ""}
                key={mode.id}
                type="button"
                onClick={() => onModeToggle(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
        <button className="primary-action" type="button" onClick={onAnalyze}>
          Analyze Selected Range
        </button>
      </section>

      {audioAnalysis && (
        <section className="analysis-results">
          <div className="assignment-heading">
            <h3>Generated Analysis Prompts</h3>
            <span>{audioAnalysis.sourceName} / {formatTime(audioAnalysis.features.start)}-{formatTime(audioAnalysis.features.end)}</span>
          </div>
          <div className="analysis-feature-grid">
            <span>BPM: <strong>{audioAnalysis.features.bpm || "unclear"}</strong></span>
            <span>Energy: <strong>{describeEnergy(audioAnalysis.features.rms)}</strong></span>
            <span>Tone: <strong>{describeBrightness(audioAnalysis.features.zcr)}</strong></span>
            <span>Motion: <strong>{describeMotion(audioAnalysis.features.energyTrend)}</strong></span>
          </div>
          <div className="analysis-prompt-list">
            {Object.entries(audioAnalysis.prompts).map(([mode, prompt]) => (
              <section className="analysis-prompt-card" key={mode}>
                <h4>{AUDIO_ANALYSIS_MODES.find((item) => item.id === mode)?.label || mode}</h4>
                <p>{prompt}</p>
                <div>
                  <button type="button" onClick={() => onApplyPrompt(prompt)}>Apply to Extra input</button>
                  <button type="button" onClick={() => onSavePrompt(mode, prompt)}>Save Template</button>
                </div>
              </section>
            ))}
          </div>
          <div className="analysis-actions">
            <button type="button" onClick={onApplyAll}>Apply All to Extra input</button>
            <button type="button" onClick={onSaveAll}>Save All as Templates</button>
          </div>
        </section>
      )}

      <section className="saved-analysis">
        <div className="assignment-heading">
          <h3>Saved Analysis Templates</h3>
          <span>grouped by prompt type</span>
        </div>
        {Object.keys(grouped).length ? (
          Object.entries(grouped).map(([group, prompts]) => (
            <section className="saved-analysis-group" key={group}>
              <h4>{AUDIO_ANALYSIS_MODES.find((item) => item.id === group)?.label || group}</h4>
              {prompts.map((prompt) => (
                <div className="saved-analysis-item" key={prompt.id}>
                  <strong>{prompt.name}</strong>
                  <p>{prompt.prompt}</p>
                  <div>
                    <button type="button" onClick={() => onApplyPrompt(prompt.prompt)}>Apply</button>
                    <button type="button" onClick={() => onDeleteSaved(prompt.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </section>
          ))
        ) : (
          <p className="empty-state">No saved audio analysis templates yet.</p>
        )}
      </section>
    </div>
  );
}

function App() {
  const [activeCard, setActiveCard] = useState("setup");
  const audioRef = useRef(null);
  const waveformCanvasRef = useRef(null);
  const waveformDragRef = useRef(null);
  const [trackRows, setTrackRows] = useState(createDefaultTrackRows);
  const [activeTrackId, setActiveTrackId] = useState("bass");
  const [activeTagGroup, setActiveTagGroup] = useState("sound");
  const [activeSetupField, setActiveSetupField] = useState("style");
  const [rightPanelTab, setRightPanelTab] = useState("prompt");
  const [selectedCells, setSelectedCells] = useState([]);
  const selectionAnchorRef = useRef(null);
  const [selectedExcludes, setSelectedExcludes] = useState(() => DEFAULT_EXCLUDES);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioName, setAudioName] = useState("");
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [waveformPeaks, setWaveformPeaks] = useState([]);
  const [audioSelection, setAudioSelection] = useState({ start: 0, end: 0 });
  const [audioStatus, setAudioStatus] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [analysisModes, setAnalysisModes] = useState(() => Object.fromEntries(AUDIO_ANALYSIS_MODES.map((mode) => [mode.id, true])));
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [savedAnalysisPrompts, setSavedAnalysisPrompts] = useState(loadSavedAnalysisPrompts);
  const [blockOverrides, setBlockOverrides] = useState({});
  const [revisionCounter, setRevisionCounter] = useState(1);
  const [savedSnapshots, setSavedSnapshots] = useState(loadSavedSnapshots);
  const [saveName, setSaveName] = useState("");
  const [guided, setGuided] = useState({
    answers: defaultGuidedAnswers,
    length: 64,
  });
  const [promptDensity, setPromptDensity] = useState("balanced");
  const [activeSectionId, setActiveSectionId] = useState("intro");
  const [copied, setCopied] = useState("");
  const [openPromptPanels, setOpenPromptPanels] = useState({
    style: true,
    lyrics: true,
    exclude: false,
    blueprint: false,
  });
  const [notes, setNotes] = useState("");
  const [meta, setMeta] = useState({
    ...defaultPreset,
    targetTool: "Suno",
    promptLanguage: "english",
    vocalMode: defaultPreset.vocalMode,
  });
  const [structure, setStructure] = useState(() => createDefaultStructure(defaultPreset.length));
  const [arrangement, setArrangement] = useState(() => createDefaultArrangement(defaultPreset.length));
  const [selections, setSelections] = useState(createInitialSelections);

  const blockCount = meta.length / 4;
  const activeTrack = trackRows.find((row) => row.id === activeTrackId) || trackRows[0];
  const activeInstrument = activeTrack.instrumentId;
  const activeInstrumentModel = findInstrument(activeInstrument);
  const activeSection = structure.find((section) => section.id === activeSectionId) || structure[0];
  const recommendations = useMemo(
    () => getRecommendations({ meta, activeInstrument, activeSection }),
    [meta, activeInstrument, activeSection]
  );

  const energy = useMemo(() => {
    return Array.from({ length: blockCount }, (_, blockIndex) => {
      const activeCount = trackRows.reduce((sum, row) => {
        return sum + (arrangement[row.id]?.[blockIndex] ? 1 : 0);
      }, 0);
      return activeCount / trackRows.length;
    });
  }, [arrangement, blockCount, trackRows]);

  const prompts = useMemo(
    () => compilePromptBundle({ meta, structure, selections, arrangement, notes, trackRows, blockOverrides, promptDensity, selectedExcludes }),
    [meta, structure, selections, arrangement, notes, trackRows, blockOverrides, promptDensity, selectedExcludes]
  );
  const styleCharCount = prompts.style.length;

  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const width = canvas.clientWidth || 900;
    const height = canvas.clientHeight || 190;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    const context = canvas.getContext("2d");
    context.scale(ratio, ratio);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(8, 12, 16, 0.88)";
    context.fillRect(0, 0, width, height);

    if (!waveformPeaks.length) {
      context.fillStyle = "rgba(142, 157, 177, 0.38)";
      context.font = "12px sans-serif";
      context.fillText("Load an MP3 or WAV file to generate waveform analysis.", 18, height / 2);
      return;
    }

    const barWidth = Math.max(1, width / waveformPeaks.length);
    waveformPeaks.forEach((peak, index) => {
      const barHeight = Math.max(2, peak * (height - 34));
      const x = index * barWidth;
      const y = (height - barHeight) / 2;
      context.fillStyle = "rgba(110, 198, 255, 0.72)";
      context.fillRect(x, y, Math.max(1, barWidth - 1), barHeight);
    });

    if (audioBuffer) {
      const startX = (Math.min(audioSelection.start, audioSelection.end) / audioBuffer.duration) * width;
      const endX = (Math.max(audioSelection.start, audioSelection.end) / audioBuffer.duration) * width;
      context.fillStyle = "rgba(198, 245, 110, 0.2)";
      context.fillRect(startX, 0, Math.max(2, endX - startX), height);
      context.strokeStyle = "rgba(198, 245, 110, 0.9)";
      context.lineWidth = 2;
      context.strokeRect(startX, 1, Math.max(2, endX - startX), height - 2);
    }
  }, [audioBuffer, audioSelection, waveformPeaks]);

  const applyPreset = (preset) => {
    setMeta((previous) => ({ ...previous, ...preset }));
    setTrackRows(createDefaultTrackRows());
    setStructure(createDefaultStructure(preset.length));
    setArrangement(createDefaultArrangement(preset.length));
    setSelections(createInitialSelections());
    setBlockOverrides({});
    setSelectedCells([]);
    setActiveTrackId("bass");
    setActiveSectionId("intro");
  };

  const applyBlueprint = (blueprint) => {
    setMeta((previous) => ({
      ...previous,
      ...blueprint.meta,
      targetTool: previous.targetTool,
      promptLanguage: previous.promptLanguage,
    }));
    setTrackRows(createDefaultTrackRows());
    setStructure(blueprint.structure);
    setArrangement(createArrangementFromRanges(blueprint.meta.length, blueprint.ranges));
    setSelections(createSelectionsFromMap(blueprint.selections));
    setBlockOverrides({});
    setSelectedCells([]);
    setNotes(blueprint.notes);
    setActiveTrackId("bass");
    setActiveSectionId(blueprint.structure[0]?.id || "intro");
    setActiveCard("elements");
  };

  const applyGuidedBlueprint = () => {
    const selectedOptions = GUIDED_BUILDER_QUESTIONS.map((question) => {
      return question.options.find((option) => option.id === guided.answers[question.id]) || question.options[0];
    }).filter(Boolean);
    const styleOption = selectedOptions.find((option) => option.blueprint);
    const candidates = styleOption?.blueprint
      ? JOURNEY_BLUEPRINTS.filter((preset) => preset.id === styleOption.blueprint)
      : JOURNEY_BLUEPRINTS;
    const blueprint = [...(candidates.length ? candidates : JOURNEY_BLUEPRINTS)].sort(
      (a, b) => Math.abs(a.meta.length - guided.length) - Math.abs(b.meta.length - guided.length)
    )[0];
    const guidedSelections = mergeTagAnswers(createSelectionsFromMap(blueprint.selections), selectedOptions);
    const guidedNotes = selectedOptions
      .map((option) => {
        const note = option.note ? ` ${option.note}` : "";
        return `- ${option.label}: ${option.description}${note}`;
      })
      .join("\n");
    const guidedMeta = selectedOptions.reduce(
      (next, option) => {
        const optionMeta = option.meta || {};
        return {
          ...next,
          energy: appendMetaText(next.energy, optionMeta.energy),
          mood: appendMetaText(next.mood, optionMeta.mood || option.description),
          groove: appendMetaText(next.groove, optionMeta.groove),
          soundCharacter: appendMetaText(next.soundCharacter, optionMeta.soundCharacter),
          vocalMode: option.vocalMode || next.vocalMode,
        };
      },
      {
        ...blueprint.meta,
        length: guided.length,
        targetTool: meta.targetTool,
        promptLanguage: meta.promptLanguage,
      }
    );
    const guidedStructure = scaleStructureToLength(blueprint.structure, blueprint.meta.length, guided.length);
    const guidedRanges = scaleRangesToLength(blueprint.ranges, blueprint.meta.length, guided.length);

    setMeta(guidedMeta);
    setTrackRows(createDefaultTrackRows());
    setStructure(guidedStructure);
    setArrangement(createArrangementFromRanges(guided.length, guidedRanges));
    setSelections(guidedSelections);
    setBlockOverrides({});
    setSelectedCells([]);
    setNotes(`${blueprint.notes}\n\nGuided decisions:\n${guidedNotes}`);
    setActiveTrackId("bass");
    setActiveSectionId(guidedStructure[0]?.id || "intro");
    setActiveCard("elements");
  };

  const changeLength = (length) => {
    setMeta((previous) => ({ ...previous, length }));
    setTrackRows(createDefaultTrackRows());
    setStructure(createDefaultStructure(length));
    setArrangement(createDefaultArrangement(length));
    setSelections(createInitialSelections());
    setBlockOverrides({});
    setSelectedCells([]);
    setActiveTrackId("bass");
    setActiveSectionId("intro");
  };

  const persistSnapshots = (next) => {
    setSavedSnapshots(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const currentSnapshot = () => ({
    id: crypto.randomUUID ? crypto.randomUUID() : `snapshot-${Date.now()}`,
    name: saveName.trim() || `${meta.style} ${new Date().toLocaleString()}`,
    createdAt: new Date().toISOString(),
    meta,
    structure,
    arrangement,
    selections,
    trackRows,
    notes,
    blockOverrides,
    selectedExcludes,
  });

  const saveCurrentSnapshot = () => {
    const snapshot = currentSnapshot();
    persistSnapshots([snapshot, ...savedSnapshots]);
    setSaveName("");
    setActiveCard("saved");
  };

  const deleteSnapshot = (id) => {
    persistSnapshots(savedSnapshots.filter((snapshot) => snapshot.id !== id));
  };

  const loadSnapshot = (snapshot, mode) => {
    if (mode === "all") {
      setMeta(snapshot.meta);
      setTrackRows(snapshot.trackRows || createDefaultTrackRows());
      setStructure(snapshot.structure);
      setArrangement(snapshot.arrangement);
      setSelections(snapshot.selections);
      setNotes(snapshot.notes || "");
      setBlockOverrides(snapshot.blockOverrides || {});
      setSelectedExcludes(snapshot.selectedExcludes || DEFAULT_EXCLUDES);
    }
    if (mode === "elements") {
      setTrackRows(snapshot.trackRows || createDefaultTrackRows());
      setSelections(snapshot.selections);
      setBlockOverrides(snapshot.blockOverrides || {});
    }
    if (mode === "structure") {
      setStructure(snapshot.structure);
      setActiveSectionId(snapshot.structure[0]?.id || "intro");
    }
    if (mode === "structure-arrangement") {
      setTrackRows(snapshot.trackRows || createDefaultTrackRows());
      setStructure(snapshot.structure);
      setArrangement(snapshot.arrangement);
      setActiveSectionId(snapshot.structure[0]?.id || "intro");
    }
    setSelectedCells([]);
  };

  const selectedCellsForActiveTrack = selectedCells.filter((cell) => cell.rowId === activeTrackId);
  const isCellEditMode = selectedCellsForActiveTrack.length > 0;

  const effectiveSelectionForCell = (rowId, blockIndex) => {
    const rowSelection = selections[rowId] || { sound: [], tone: [], groove: [], notes: "" };
    const override = blockOverrides[rowId]?.[blockIndex];
    return override || rowSelection;
  };

  const selectedTagsForGroup = (group) => {
    if (!isCellEditMode) return selections[activeTrackId][group];
    return [
      ...new Set(
        selectedCellsForActiveTrack.flatMap((cell) => effectiveSelectionForCell(cell.rowId, cell.blockIndex)[group] || [])
      ),
    ];
  };

  const applyToSelectedCells = (updater) => {
    setBlockOverrides((previous) => {
      const next = { ...previous };
      selectedCellsForActiveTrack.forEach((cell) => {
        const current = effectiveSelectionForCell(cell.rowId, cell.blockIndex);
        next[cell.rowId] = { ...(next[cell.rowId] || {}) };
        next[cell.rowId][cell.blockIndex] = updater({
          sound: [...(current.sound || [])],
          tone: [...(current.tone || [])],
          groove: [...(current.groove || [])],
          notes: current.notes || "",
          rev: current.rev,
        });
      });
      return next;
    });
  };

  const updateSelection = (group, tagValue) => {
    const label = tagLabel(tagValue);
    if (isCellEditMode) {
      const rev = revisionCounter;
      applyToSelectedCells((current) => {
        const exists = current[group].includes(label);
        return {
          ...current,
          [group]: exists ? current[group].filter((item) => item !== label) : [...current[group], label],
          rev,
        };
      });
      setRevisionCounter((value) => value + 1);
      return;
    }

    setSelections((previous) => {
      const current = previous[activeTrackId][group];
      const nextGroup = current.includes(label) ? current.filter((item) => item !== label) : [...current, label];
      return {
        ...previous,
        [activeTrackId]: {
          ...previous[activeTrackId],
          [group]: nextGroup,
        },
      };
    });
  };

  const removeSelection = (group, tag) => {
    if (isCellEditMode) {
      const rev = revisionCounter;
      applyToSelectedCells((current) => ({
        ...current,
        [group]: current[group].filter((item) => item !== tag),
        rev,
      }));
      setRevisionCounter((value) => value + 1);
      return;
    }

    setSelections((previous) => ({
      ...previous,
      [activeTrackId]: {
        ...previous[activeTrackId],
        [group]: previous[activeTrackId][group].filter((item) => item !== tag),
      },
    }));
  };

  const selectArrangementCell = (rowId, blockIndex, event) => {
    setActiveTrackId(rowId);
    setActiveCard("elements");
    const nextCell = { rowId, blockIndex };
    setSelectedCells((previous) => {
      if (event.shiftKey) {
        const anchor = selectionAnchorRef.current || previous[previous.length - 1] || nextCell;
        const rowIds = trackRows.map((row) => row.id);
        const startRow = rowIds.indexOf(anchor.rowId);
        const endRow = rowIds.indexOf(rowId);
        if (startRow === -1 || endRow === -1) {
          selectionAnchorRef.current = nextCell;
          return [nextCell];
        }
        const rowStart = Math.min(startRow, endRow);
        const rowEnd = Math.max(startRow, endRow);
        const blockStart = Math.min(anchor.blockIndex, blockIndex);
        const blockEnd = Math.max(anchor.blockIndex, blockIndex);
        const range = [];
        for (let rowIndex = rowStart; rowIndex <= rowEnd; rowIndex += 1) {
          for (let index = blockStart; index <= blockEnd; index += 1) {
            range.push({ rowId: rowIds[rowIndex], blockIndex: index });
          }
        }
        return range;
      }
      if (event.ctrlKey || event.metaKey) {
        selectionAnchorRef.current = nextCell;
        const exists = previous.some((cell) => cell.rowId === rowId && cell.blockIndex === blockIndex);
        return exists
          ? previous.filter((cell) => !(cell.rowId === rowId && cell.blockIndex === blockIndex))
          : [...previous, nextCell];
      }
      selectionAnchorRef.current = nextCell;
      return [nextCell];
    });
  };

  const copyPreviousCellSettings = (rowId, blockIndex) => {
    const previousIndex = Math.max(0, blockIndex - 1);
    const previous = blockOverrides[rowId]?.[previousIndex] || selections[rowId];
    return {
      sound: [...(previous.sound || [])],
      tone: [...(previous.tone || [])],
      groove: [...(previous.groove || [])],
      notes: previous.notes || "",
      rev: revisionCounter,
    };
  };

  const toggleArrangementByDoubleClick = (rowId, blockIndex) => {
    setArrangement((previous) => ({
      ...previous,
      [rowId]: previous[rowId].map((active, index) => (index === blockIndex ? false : active)),
    }));
    if (!arrangement[rowId][blockIndex]) {
      setArrangement((previous) => ({
        ...previous,
        [rowId]: previous[rowId].map((active, index) => (index === blockIndex ? true : active)),
      }));
      setBlockOverrides((previous) => ({
        ...previous,
        [rowId]: {
          ...(previous[rowId] || {}),
          [blockIndex]: copyPreviousCellSettings(rowId, blockIndex),
        },
      }));
      setRevisionCounter((value) => value + 1);
    } else {
      setBlockOverrides((previous) => {
        const next = { ...previous };
        if (next[rowId]) {
          next[rowId] = { ...next[rowId] };
          delete next[rowId][blockIndex];
        }
        return next;
      });
    }
    setSelectedCells([{ rowId, blockIndex }]);
  };

  const quickApplySection = () => {
    const startBlock = Math.floor((activeSection.start - 1) / 4);
    const endBlock = Math.floor((activeSection.end - 1) / 4);
    setArrangement((previous) => ({
      ...previous,
      [activeTrackId]: previous[activeTrackId].map((active, index) => {
        if (index >= startBlock && index <= endBlock) return true;
        return active;
      }),
    }));
  };

  const isRowEmpty = (rowId) => {
    const selected = selections[rowId] || { sound: [], tone: [], groove: [], notes: "" };
    return !arrangement[rowId]?.some(Boolean) && !selected.sound.length && !selected.tone.length && !selected.groove.length && !selected.notes;
  };

  const handleRowDoubleClick = (row) => {
    if (!row.base && isRowEmpty(row.id)) {
      setTrackRows((previous) => previous.filter((item) => item.id !== row.id));
      setArrangement((previous) => {
        const next = { ...previous };
        delete next[row.id];
        return next;
      });
      setSelections((previous) => {
        const next = { ...previous };
        delete next[row.id];
        return next;
      });
      if (activeTrackId === row.id) {
        const fallback = trackRows.find((item) => item.instrumentId === row.instrumentId && item.id !== row.id) || trackRows[0];
        setActiveTrackId(fallback.id);
      }
      return;
    }

    const instrument = findInstrument(row.instrumentId);
    const count = trackRows.filter((item) => item.instrumentId === row.instrumentId).length + 1;
    const id = `${row.instrumentId}-${Date.now()}`;
    const insertIndex = trackRows.findIndex((item) => item.id === row.id) + 1;
    const newRow = {
      id,
      instrumentId: row.instrumentId,
      label: `${instrument.label} ${count}`,
      base: false,
    };

    setTrackRows((previous) => [...previous.slice(0, insertIndex), newRow, ...previous.slice(insertIndex)]);
    setArrangement((previous) => ({ ...previous, [id]: Array(blockCount).fill(false) }));
    setSelections((previous) => ({
      ...previous,
      [id]: { sound: [], tone: [], groove: [], notes: "" },
    }));
    setActiveTrackId(id);
  };

  const togglePromptPanel = (panel) => {
    setOpenPromptPanels((previous) => ({ ...previous, [panel]: !previous[panel] }));
  };

  const copyPrompt = async (panel, value) => {
    await navigator.clipboard.writeText(value);
    setCopied(panel);
    window.setTimeout(() => setCopied(""), 1400);
  };

  const toggleExclude = (label) => {
    setSelectedExcludes((previous) =>
      previous.includes(label) ? previous.filter((item) => item !== label) : [...previous, label]
    );
  };

  const canvasTimeFromEvent = (event) => {
    if (!audioBuffer || !waveformCanvasRef.current) return 0;
    const bounds = waveformCanvasRef.current.getBoundingClientRect();
    const x = Math.min(bounds.width, Math.max(0, event.clientX - bounds.left));
    return (x / bounds.width) * audioBuffer.duration;
  };

  const handleAudioFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAudioStatus("Decoding audio...");
    setAudioAnalysis(null);
    try {
      const objectUrl = URL.createObjectURL(file);
      const arrayBuffer = await file.arrayBuffer();
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContextClass();
      const decoded = await context.decodeAudioData(arrayBuffer);
      await context.close();
      setAudioUrl((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return objectUrl;
      });
      setAudioName(file.name);
      setAudioBuffer(decoded);
      setWaveformPeaks(generateWaveformPeaks(decoded));
      setAudioSelection({ start: 0, end: Math.min(decoded.duration, 32) });
      setAudioStatus(`Loaded ${file.name}. Mark a region in the waveform or analyze the first section.`);
    } catch (error) {
      setAudioStatus(`Could not decode audio: ${error.message}`);
    }
  };

  const handleYoutubeLoad = () => {
    if (!youtubeLink.trim()) {
      setAudioStatus("Paste a YouTube link first.");
      return;
    }
    setAudioStatus("YouTube link saved as reference. Direct waveform/audio extraction from YouTube needs a backend extractor; upload an MP3/WAV export for analysis.");
  };

  const handleWaveformMouseDown = (event) => {
    if (!audioBuffer) return;
    const time = canvasTimeFromEvent(event);
    waveformDragRef.current = time;
    setAudioSelection({ start: time, end: time });
  };

  const handleWaveformMouseMove = (event) => {
    if (!audioBuffer || waveformDragRef.current === null) return;
    setAudioSelection({ start: waveformDragRef.current, end: canvasTimeFromEvent(event) });
  };

  const handleWaveformMouseUp = (event) => {
    if (!audioBuffer || waveformDragRef.current === null) return;
    const time = canvasTimeFromEvent(event);
    const start = Math.min(waveformDragRef.current, time);
    const end = Math.max(waveformDragRef.current, time);
    waveformDragRef.current = null;
    if (Math.abs(end - start) < 0.25) {
      setAudioSelection({ start: Math.max(0, start - 4), end: Math.min(audioBuffer.duration, start + 4) });
      return;
    }
    setAudioSelection({ start, end });
  };

  const toggleAnalysisMode = (mode) => {
    setAnalysisModes((previous) => ({ ...previous, [mode]: !previous[mode] }));
  };

  const runAudioAnalysis = () => {
    if (!audioBuffer) {
      setAudioStatus("Load an MP3/WAV file before analyzing.");
      return;
    }
    if (!Object.values(analysisModes).some(Boolean)) {
      setAudioStatus("Select at least one analysis focus.");
      return;
    }
    const features = estimateAudioFeatures(audioBuffer, audioSelection.end ? audioSelection : { start: 0, end: audioBuffer.duration });
    const sourceName = audioName || "audio reference";
    const generatedPrompts = buildAudioPrompts({ sourceName, youtubeLink: youtubeLink.trim(), features, modes: analysisModes });
    setAudioAnalysis({ sourceName, features, prompts: generatedPrompts, createdAt: new Date().toISOString() });
    setAudioStatus("Analysis prompts generated from selected waveform range.");
  };

  const storeAnalysisPrompts = (items) => {
    const next = [...items, ...savedAnalysisPrompts];
    setSavedAnalysisPrompts(next);
    persistAnalysisPrompts(next);
  };

  const saveAnalysisPrompt = (group, prompt) => {
    storeAnalysisPrompts([
      {
        id: crypto.randomUUID ? crypto.randomUUID() : `analysis-${Date.now()}`,
        group,
        name: `${AUDIO_ANALYSIS_MODES.find((mode) => mode.id === group)?.label || group} / ${audioName || "Audio"}`,
        prompt,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const saveAllAnalysisPrompts = () => {
    if (!audioAnalysis) return;
    storeAnalysisPrompts(
      Object.entries(audioAnalysis.prompts).map(([group, prompt]) => ({
        id: crypto.randomUUID ? crypto.randomUUID() : `analysis-${Date.now()}-${group}`,
        group,
        name: `${AUDIO_ANALYSIS_MODES.find((mode) => mode.id === group)?.label || group} / ${audioName || "Audio"}`,
        prompt,
        createdAt: new Date().toISOString(),
      }))
    );
  };

  const applyAnalysisPrompt = (prompt) => {
    setNotes((previous) => `${previous ? `${previous}\n\n` : ""}[Audio Analysis]\n${prompt}`);
    setActiveCard("setup");
  };

  const applyAllAnalysisPrompts = () => {
    if (!audioAnalysis) return;
    applyAnalysisPrompt(Object.values(audioAnalysis.prompts).join("\n"));
  };

  const deleteSavedAnalysisPrompt = (id) => {
    const next = savedAnalysisPrompts.filter((prompt) => prompt.id !== id);
    setSavedAnalysisPrompts(next);
    persistAnalysisPrompts(next);
  };

  const optimizePromptDensity = () => {
    if (styleCharCount >= 900) {
      setPromptDensity("compact");
      return;
    }
    setPromptDensity("balanced");
  };

  const applyCharacteristicOption = (field, value) => {
    const label = tagLabel(value);
    setMeta((previous) => {
      if (field === "key") return { ...previous, key: label };
      const current = previous[field] || "";
      if (!current) return { ...previous, [field]: label };
      if (current.toLowerCase().includes(label.toLowerCase())) return previous;
      return { ...previous, [field]: `${current}, ${label}` };
    });
  };

  return (
    <main className="studio-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <AudioLines size={20} />
          </div>
          <div>
            <span>Groove Prompt</span>
            <strong>Builder V1</strong>
          </div>
        </div>

        <nav className="workspace-nav">
          {[
            { id: "setup", label: "Song Setup", icon: Music2 },
            { id: "structure", label: "Structure", icon: Layers3 },
            { id: "elements", label: "Elements", icon: CircleDot },
            { id: "analyze", label: "Analyze", icon: AudioLines },
            { id: "saved", label: "Saved", icon: Clipboard },
          ].map((item) => (
            <button
              className={activeCard === item.id ? "is-active" : ""}
              key={item.id}
              type="button"
              onClick={() => setActiveCard(item.id)}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="side-section">
          <span className="side-label">Presets</span>
          <div className="preset-list">
            {TRACK_PRESETS.map((preset) => (
              <button key={preset.id} type="button" onClick={() => applyPreset(preset)}>
                <strong>{preset.label}</strong>
                <span>
                  {preset.bpm} BPM / {preset.energy}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="side-section">
          <span className="side-label">Afterhours Blueprints</span>
          <div className="preset-list blueprint-list">
            {JOURNEY_BLUEPRINTS.map((preset) => (
              <button key={preset.id} type="button" onClick={() => applyBlueprint(preset)}>
                <strong>{preset.label}</strong>
                <span>
                  {preset.meta.bpm} BPM / {preset.meta.key}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="main-stage">
        <header className="topbar">
          <div>
            <p>Local rule-based composition system</p>
            <h1>{meta.style}</h1>
          </div>
          <div className="top-stats">
            <Stat icon={Timer} label="Length" value={`${meta.length} bars`} />
            <Stat icon={Gauge} label="Energy" value={meta.energy} />
            <Stat icon={Languages} label="Prompt" value={PROMPT_LANGUAGES.find((item) => item.id === meta.promptLanguage)?.label || "English"} />
          </div>
        </header>

        <section className="timeline-panel">
          <div className="structure-strip">
            {structure.map((section) => {
              const width = ((section.end - section.start + 1) / meta.length) * 100;
              return (
                <button
                  className={activeSectionId === section.id ? "is-focused" : ""}
                  key={section.id}
                  style={{ width: `${width}%`, "--section": STRUCTURE_COLORS[section.role] }}
                  type="button"
                  onClick={() => {
                    setActiveSectionId(section.id);
                    setActiveCard("structure");
                  }}
                >
                  <strong>{section.label}</strong>
                  <span>{section.start}-{section.end}</span>
                </button>
              );
            })}
          </div>

          <div className="arrangement-grid" style={{ "--blocks": blockCount }}>
            <div className="grid-header-spacer" />
            {Array.from({ length: blockCount }, (_, index) => {
              const section = getSectionForBlock(structure, index);
              return (
                <div className="block-label" key={index} title={section?.label}>
                  {getBlockLabel(index)}
                </div>
              );
            })}

            {trackRows.map((row) => {
              const instrument = findInstrument(row.instrumentId);
              return (
              <div className="grid-row" key={row.id}>
                <button
                  className={`instrument-row-label ${activeTrackId === row.id ? "is-active" : ""}`}
                  type="button"
                  onDoubleClick={() => handleRowDoubleClick(row)}
                  onClick={() => {
                    setActiveTrackId(row.id);
                    setActiveCard("elements");
                  }}
                  title="Double click: add duplicate track. Double click an empty duplicate to remove it."
                >
                  <span style={{ background: instrument.color }} />
                  {row.label}
                </button>
                {arrangement[row.id].map((active, blockIndex) => {
                  const section = getSectionForBlock(structure, blockIndex);
                  const focused = !activeSection || section?.id === activeSection.id;
                  const alpha = active ? 0.32 + energy[blockIndex] * 0.64 : 0.05 + energy[blockIndex] * 0.15;
                  return (
                    <button
                      className={`grid-cell ${active ? "is-on" : ""} ${
                        selectedCells.some((cell) => cell.rowId === row.id && cell.blockIndex === blockIndex) ? "is-selected" : ""
                      } ${blockOverrides[row.id]?.[blockIndex] ? "has-override" : ""}`}
                      key={blockIndex}
                      style={{
                        "--instrument": instrument.color,
                        "--cell-alpha": `${Math.round(alpha * 100)}%`,
                        opacity: focused ? 1 : 0.28,
                      }}
                      type="button"
                      onClick={(event) => selectArrangementCell(row.id, blockIndex, event)}
                      onDoubleClick={() => toggleArrangementByDoubleClick(row.id, blockIndex)}
                      aria-label={`${row.label} bars ${getBlockLabel(blockIndex)}`}
                    >
                      {blockOverrides[row.id]?.[blockIndex]?.rev && <em>{blockOverrides[row.id][blockIndex].rev}</em>}
                    </button>
                  );
                })}
              </div>
            )})}
          </div>
        </section>

        <section className="workspace">
          <div className="editor-panel">
            {activeCard === "setup" && (
              <div className="card-content">
                <div className="panel-heading">
                  <Sparkles size={18} />
                  <div>
                    <h2>Song Characteristics</h2>
                    <p>Grund-DNA des Tracks, bevor Structure und Instrumente feinjustiert werden.</p>
                  </div>
                </div>

                <div className="form-grid">
                  <label>
                    Style
                    <input
                      value={meta.style}
                      onFocus={() => {
                        setActiveSetupField("style");
                        setRightPanelTab("characteristics");
                      }}
                      onChange={(event) => setMeta({ ...meta, style: event.target.value })}
                    />
                  </label>
                  <label>
                    BPM
                    <input type="number" value={meta.bpm} onChange={(event) => setMeta({ ...meta, bpm: Number(event.target.value) })} />
                  </label>
                  <label>
                    Key
                    <input
                      value={meta.key}
                      onFocus={() => {
                        setActiveSetupField("key");
                        setRightPanelTab("characteristics");
                      }}
                      onChange={(event) => setMeta({ ...meta, key: event.target.value })}
                    />
                  </label>
                  <label>
                    Energy
                    <input value={meta.energy} onChange={(event) => setMeta({ ...meta, energy: event.target.value })} />
                  </label>
                  <label className="span-2">
                    Mood
                    <input
                      value={meta.mood}
                      onFocus={() => {
                        setActiveSetupField("mood");
                        setRightPanelTab("characteristics");
                      }}
                      onChange={(event) => setMeta({ ...meta, mood: event.target.value })}
                    />
                  </label>
                  <label className="span-2">
                    Groove Character
                    <input
                      value={meta.groove}
                      onFocus={() => {
                        setActiveSetupField("groove");
                        setRightPanelTab("characteristics");
                      }}
                      onChange={(event) => setMeta({ ...meta, groove: event.target.value })}
                    />
                  </label>
                  <label className="span-2">
                    Sound Character
                    <input
                      value={meta.soundCharacter || ""}
                      onFocus={() => {
                        setActiveSetupField("soundCharacter");
                        setRightPanelTab("characteristics");
                      }}
                      onChange={(event) => setMeta({ ...meta, soundCharacter: event.target.value })}
                    />
                  </label>
                </div>

                <ToggleGroup label="Track Length" value={meta.length} options={TRACK_LENGTHS} onChange={changeLength} />
                <ToggleGroup label="Target Tool" value={meta.targetTool} options={TARGET_TOOLS} onChange={(targetTool) => setMeta({ ...meta, targetTool })} />
                <ToggleGroup label="Prompt Language" value={meta.promptLanguage} options={PROMPT_LANGUAGES} onChange={(promptLanguage) => setMeta({ ...meta, promptLanguage })} />
                <ToggleGroup label="Vocal Mode" value={meta.vocalMode} options={VOCAL_MODES} onChange={(vocalMode) => setMeta({ ...meta, vocalMode })} />

                <div className="guided-box">
                  <div className="assignment-heading">
                    <h3>Guided Track Builder</h3>
                    <span>research-based blueprint + modifiers</span>
                  </div>
                  <p className="guided-intro">
                    Build a complete starting track from musical decisions: character, arrangement logic, groove driver,
                    low-end relation, atmosphere, movement and vocal FX role.
                  </p>
                  <div className="guided-question-list">
                    {GUIDED_BUILDER_QUESTIONS.map((question) => (
                      <GuidedQuestion
                        key={question.id}
                        question={question}
                        value={guided.answers[question.id]}
                        onChange={(answerId) =>
                          setGuided((previous) => ({
                            ...previous,
                            answers: { ...previous.answers, [question.id]: answerId },
                          }))
                        }
                      />
                    ))}
                  </div>
                  <ToggleGroup
                    label="Length"
                    value={guided.length}
                    options={TRACK_LENGTHS}
                    onChange={(length) => setGuided((previous) => ({ ...previous, length }))}
                  />
                  <button className="primary-action" type="button" onClick={applyGuidedBlueprint}>
                    Create Track From Guided Answers
                  </button>
                </div>
              </div>
            )}

            {activeCard === "structure" && (
              <div className="card-content">
                <div className="panel-heading">
                  <Layers3 size={18} />
                  <div>
                    <h2>Song Structure</h2>
                    <p>Klick eine Section oben oder hier, um Arrangement und Empfehlungen darauf zu fokussieren.</p>
                  </div>
                </div>

                <div className="section-list">
                  {structure.map((section) => (
                    <button
                      className={activeSectionId === section.id ? "is-active" : ""}
                      key={section.id}
                      style={{ "--section": STRUCTURE_COLORS[section.role] }}
                      type="button"
                      onClick={() => setActiveSectionId(section.id)}
                    >
                      <span>{section.label}</span>
                      <strong>{section.start}-{section.end}</strong>
                      <em>{section.intent}</em>
                    </button>
                  ))}
                </div>

                <div className="term-cloud">
                  {["DJ-friendly intro", "additive arrangement", "loop evolution", "central breakdown", "restrained drop", "groove return", "DJ-friendly outro"].map((term) => (
                    <TagChip key={term} active={activeSection.intent.includes(term)} recommended>
                      {term}
                    </TagChip>
                  ))}
                </div>
              </div>
            )}

            {activeCard === "elements" && (
              <div className="card-content">
                <div className="panel-heading">
                  <Activity size={18} />
                  <div>
                    <h2>{activeTrack.label} Editor</h2>
                    <p>Sound, Tone und Groove zeigen nur zugewiesene Effect Words. Klick einen Bereich, dann wähle rechts per Doppelklick aus.</p>
                  </div>
                </div>

                <div className="instrument-picker">
                  {trackRows.map((row) => {
                    const instrument = findInstrument(row.instrumentId);
                    return (
                    <button
                      className={activeTrackId === row.id ? "is-active" : ""}
                      key={row.id}
                      style={{ "--instrument": instrument.color }}
                      type="button"
                      onClick={() => setActiveTrackId(row.id)}
                      onDoubleClick={() => handleRowDoubleClick(row)}
                    >
                      {row.label}
                    </button>
                  )})}
                </div>

                <div className="quick-actions">
                  <button type="button" onClick={quickApplySection}>
                    Add {activeTrack.label} to {activeSection.label}
                  </button>
                  <span>Focused section: {activeSection.label} / bars {activeSection.start}-{activeSection.end}</span>
                  <span>Selection: click single, Ctrl toggles cells, Shift selects range.</span>
                  {isCellEditMode && (
                    <span className="selected-bars">
                      Selected bars:{" "}
                      {selectedCellsForActiveTrack
                        .map((cell) => {
                          const override = blockOverrides[cell.rowId]?.[cell.blockIndex];
                          return `${getBlockLabel(cell.blockIndex)}${override?.rev ? ` #${override.rev}` : ""}`;
                        })
                        .join(", ")}
                    </span>
                  )}
                </div>

                <div className="assignment-grid">
                  {Object.keys(TAG_GROUPS[activeInstrument]).map((group) => (
                    <AssignmentSection
                      key={group}
                      group={group}
                      tags={selectedTagsForGroup(group)}
                      onFocus={() => {
                        setActiveTagGroup(group);
                        setRightPanelTab("effects");
                      }}
                      onRemove={(tag) => removeSelection(group, tag)}
                    />
                  ))}
                </div>

                <label className="notes-field">
                  Instrument notes
                  <textarea
                    value={
                      isCellEditMode
                        ? effectiveSelectionForCell(selectedCellsForActiveTrack[0].rowId, selectedCellsForActiveTrack[0].blockIndex).notes
                        : selections[activeTrackId].notes
                    }
                    onChange={(event) => {
                      if (isCellEditMode) {
                        const nextValue = event.target.value;
                        const rev = revisionCounter;
                        applyToSelectedCells((current) => ({ ...current, notes: nextValue, rev }));
                        setRevisionCounter((value) => value + 1);
                        return;
                      }
                      setSelections((previous) => ({
                        ...previous,
                        [activeTrackId]: {
                          ...previous[activeTrackId],
                          notes: event.target.value,
                        },
                      }));
                    }}
                    placeholder={isCellEditMode ? "Bar-specific notes for selected 4-bar block(s)." : "Optional: describe timing, melody, texture, or transition behavior."}
                  />
                </label>
              </div>
            )}

            {activeCard === "analyze" && (
              <AudioAnalyzerPanel
                audioRef={audioRef}
                canvasRef={waveformCanvasRef}
                audioUrl={audioUrl}
                audioName={audioName}
                audioDuration={audioBuffer?.duration || 0}
                audioSelection={audioSelection}
                audioStatus={audioStatus}
                youtubeLink={youtubeLink}
                analysisModes={analysisModes}
                audioAnalysis={audioAnalysis}
                savedAnalysisPrompts={savedAnalysisPrompts}
                onFileChange={handleAudioFile}
                onYoutubeChange={setYoutubeLink}
                onYoutubeLoad={handleYoutubeLoad}
                onCanvasDown={handleWaveformMouseDown}
                onCanvasMove={handleWaveformMouseMove}
                onCanvasUp={handleWaveformMouseUp}
                onModeToggle={toggleAnalysisMode}
                onAnalyze={runAudioAnalysis}
                onSavePrompt={saveAnalysisPrompt}
                onSaveAll={saveAllAnalysisPrompts}
                onApplyPrompt={applyAnalysisPrompt}
                onApplyAll={applyAllAnalysisPrompts}
                onDeleteSaved={deleteSavedAnalysisPrompt}
              />
            )}

            {activeCard === "saved" && (
              <div className="card-content">
                <div className="panel-heading">
                  <Clipboard size={18} />
                  <div>
                    <h2>Saved Prompts</h2>
                    <p>Speichere komplette Projekte und lade später komplett oder nur einzelne Rollen zurück.</p>
                  </div>
                </div>

                <div className="save-row">
                  <input value={saveName} onChange={(event) => setSaveName(event.target.value)} placeholder="Name for this prompt snapshot" />
                  <button className="primary-action" type="button" onClick={saveCurrentSnapshot}>
                    Save Current
                  </button>
                </div>

                <div className="saved-list">
                  {savedSnapshots.length ? (
                    savedSnapshots.map((snapshot) => (
                      <section className="saved-item" key={snapshot.id}>
                        <div>
                          <strong>{snapshot.name}</strong>
                          <span>
                            {snapshot.meta?.bpm} BPM / {snapshot.meta?.key} / {new Date(snapshot.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="load-actions">
                          <button type="button" onClick={() => loadSnapshot(snapshot, "all")}>All</button>
                          <button type="button" onClick={() => loadSnapshot(snapshot, "elements")}>Elements</button>
                          <button type="button" onClick={() => loadSnapshot(snapshot, "structure-arrangement")}>Structure + Arrangement</button>
                          <button type="button" onClick={() => loadSnapshot(snapshot, "structure")}>Structure only</button>
                          <button type="button" onClick={() => deleteSnapshot(snapshot.id)}>Delete</button>
                        </div>
                      </section>
                    ))
                  ) : (
                    <p className="empty-state">No saved prompt snapshots yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <aside className="prompt-panel">
            <div className="prompt-header">
              <div>
                <span>{rightPanelTab === "prompt" ? "Live Prompt" : rightPanelTab === "effects" ? "Elements" : "Song Setup"}</span>
                <strong>
                  {rightPanelTab === "prompt"
                    ? "Suno Custom Mode"
                    : rightPanelTab === "effects"
                      ? `${activeTrack.label} / ${activeTagGroup}`
                      : activeSetupField}
                </strong>
              </div>
              <div className="right-tabs">
                <button className={rightPanelTab === "prompt" ? "is-active" : ""} type="button" onClick={() => setRightPanelTab("prompt")}>
                  Prompts
                </button>
                <button className={rightPanelTab === "effects" ? "is-active" : ""} type="button" onClick={() => setRightPanelTab("effects")}>
                  Effect Words
                </button>
                <button className={rightPanelTab === "characteristics" ? "is-active" : ""} type="button" onClick={() => setRightPanelTab("characteristics")}>
                  Setup Words
                </button>
              </div>
            </div>
            {rightPanelTab === "prompt" ? (
              <>
                <div className="prompt-density-bar">
                  <ToggleGroup label="Prompt Density" value={promptDensity} options={PROMPT_DENSITIES} onChange={setPromptDensity} />
                  <button className="primary-action" type="button" onClick={optimizePromptDensity}>
                    Optimize Suno Output
                  </button>
                </div>
                {[
                  {
                    id: "style",
                    label: "Style Prompt",
                    helper: "Paste into Style of Music",
                    value: prompts.style,
                    counter: `${styleCharCount}/1000`,
                    status: styleCharCount >= 1000 ? "danger" : styleCharCount >= 900 ? "warning" : "ok",
                  },
                  {
                    id: "lyrics",
                    label: "Lyrics / Vocal Structure",
                    helper: "Paste into Lyrics as structure metatags",
                    value: prompts.lyrics,
                  },
                  {
                    id: "exclude",
                    label: "Exclude",
                    helper: "Paste into Advanced Options > Exclude",
                    value: prompts.exclude,
                  },
                  {
                    id: "blueprint",
                    label: "Blueprint",
                    helper: "Internal full detail reference",
                    value: prompts.blueprint,
                  },
                ].map((panel) => (
                  <section className={`prompt-accordion ${openPromptPanels[panel.id] ? "is-open" : ""}`} key={panel.id}>
                    <div className="prompt-accordion-header">
                      <button type="button" onClick={() => togglePromptPanel(panel.id)}>
                        <strong>{panel.label}</strong>
                        <span>{panel.helper}</span>
                      </button>
                      <div className="prompt-actions">
                        {panel.counter && <em className={`char-count ${panel.status}`}>{panel.counter}</em>}
                        <button type="button" onClick={() => copyPrompt(panel.id, panel.value)}>
                          <Clipboard size={15} />
                          {copied === panel.id ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                    {openPromptPanels[panel.id] && (
                      <>
                        <pre>{panel.value}</pre>
                        {panel.id === "exclude" && (
                          <ExcludeBuilder
                            selectedExcludes={selectedExcludes}
                            onToggle={toggleExclude}
                            onReset={() => setSelectedExcludes(DEFAULT_EXCLUDES)}
                            onClear={() => setSelectedExcludes([])}
                          />
                        )}
                      </>
                    )}
                  </section>
                ))}
                <label className="global-notes">
                  Extra input
                  <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add extra direction for the final prompt..." />
                </label>
              </>
            ) : rightPanelTab === "effects" ? (
              <div className="effect-browser">
                <div className="effect-browser-toolbar">
                  {Object.keys(TAG_GROUPS[activeInstrument]).map((group) => (
                    <button
                      className={activeTagGroup === group ? "is-active" : ""}
                      key={group}
                      type="button"
                      onClick={() => setActiveTagGroup(group)}
                    >
                      {group}
                    </button>
                  ))}
                </div>
                <EffectTable
                  tags={TAG_GROUPS[activeInstrument][activeTagGroup]}
                  selectedTags={selectedTagsForGroup(activeTagGroup)}
                  recommendations={recommendations}
                  onAdd={(tag) => updateSelection(activeTagGroup, tag)}
                />
              </div>
            ) : (
              <div className="effect-browser">
                <div className="effect-browser-toolbar">
                  {Object.keys(CHARACTERISTIC_OPTIONS).map((field) => (
                    <button
                      className={activeSetupField === field ? "is-active" : ""}
                      key={field}
                      type="button"
                      onClick={() => setActiveSetupField(field)}
                    >
                      {field === "soundCharacter" ? "sound" : field}
                    </button>
                  ))}
                </div>
                <EffectTable
                  tags={CHARACTERISTIC_OPTIONS[activeSetupField]}
                  selectedTags={[(meta[activeSetupField] || "")]}
                  recommendations={new Set()}
                  onAdd={(tag) => applyCharacteristicOption(activeSetupField, tag)}
                />
              </div>
            )}
          </aside>
        </section>
      </section>
    </main>
  );
}

export default App;
