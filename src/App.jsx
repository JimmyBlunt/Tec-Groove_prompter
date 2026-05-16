import React, { useMemo, useState } from "react";
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
  PROMPT_LANGUAGES,
  STRUCTURE_COLORS,
  TAG_GROUPS,
  TARGET_TOOLS,
  TRACK_LENGTHS,
  TRACK_PRESETS,
  VOCAL_MODES,
  createDefaultArrangement,
  createDefaultStructure,
  createInitialSelections,
  getBlockLabel,
  getRecommendations,
  getSectionForBlock,
} from "./data/musicModel.js";
import { compilePromptBundle } from "./utils/promptCompiler.js";

const defaultPreset = TRACK_PRESETS[0];

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

function TagChip({ active, recommended, children, onClick }) {
  return (
    <button
      className={`tag-chip ${active ? "is-active" : ""} ${recommended ? "is-recommended" : ""}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function App() {
  const [activeCard, setActiveCard] = useState("setup");
  const [activeInstrument, setActiveInstrument] = useState("bass");
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
  const activeInstrumentModel = INSTRUMENTS.find((instrument) => instrument.id === activeInstrument);
  const activeSection = structure.find((section) => section.id === activeSectionId) || structure[0];
  const recommendations = useMemo(
    () => getRecommendations({ meta, activeInstrument, activeSection }),
    [meta, activeInstrument, activeSection]
  );

  const energy = useMemo(() => {
    return Array.from({ length: blockCount }, (_, blockIndex) => {
      const activeCount = INSTRUMENTS.reduce((sum, instrument) => {
        return sum + (arrangement[instrument.id]?.[blockIndex] ? 1 : 0);
      }, 0);
      return activeCount / INSTRUMENTS.length;
    });
  }, [arrangement, blockCount]);

  const prompts = useMemo(
    () => compilePromptBundle({ meta, structure, selections, arrangement, notes }),
    [meta, structure, selections, arrangement, notes]
  );
  const styleCharCount = prompts.style.length;

  const applyPreset = (preset) => {
    setMeta((previous) => ({ ...previous, ...preset }));
    setStructure(createDefaultStructure(preset.length));
    setArrangement(createDefaultArrangement(preset.length));
    setActiveSectionId("intro");
  };

  const changeLength = (length) => {
    setMeta((previous) => ({ ...previous, length }));
    setStructure(createDefaultStructure(length));
    setArrangement(createDefaultArrangement(length));
    setActiveSectionId("intro");
  };

  const updateSelection = (group, tag) => {
    setSelections((previous) => {
      const current = previous[activeInstrument][group];
      const nextGroup = current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag];
      return {
        ...previous,
        [activeInstrument]: {
          ...previous[activeInstrument],
          [group]: nextGroup,
        },
      };
    });
  };

  const toggleArrangement = (instrumentId, blockIndex) => {
    setArrangement((previous) => ({
      ...previous,
      [instrumentId]: previous[instrumentId].map((active, index) => (index === blockIndex ? !active : active)),
    }));
  };

  const quickApplySection = () => {
    const startBlock = Math.floor((activeSection.start - 1) / 4);
    const endBlock = Math.floor((activeSection.end - 1) / 4);
    setArrangement((previous) => ({
      ...previous,
      [activeInstrument]: previous[activeInstrument].map((active, index) => {
        if (index >= startBlock && index <= endBlock) return true;
        return active;
      }),
    }));
  };

  const togglePromptPanel = (panel) => {
    setOpenPromptPanels((previous) => ({ ...previous, [panel]: !previous[panel] }));
  };

  const copyPrompt = async (panel, value) => {
    await navigator.clipboard.writeText(value);
    setCopied(panel);
    window.setTimeout(() => setCopied(""), 1400);
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

            {INSTRUMENTS.map((instrument) => (
              <div className="grid-row" key={instrument.id}>
                <button
                  className={`instrument-row-label ${activeInstrument === instrument.id ? "is-active" : ""}`}
                  type="button"
                  onClick={() => {
                    setActiveInstrument(instrument.id);
                    setActiveCard("elements");
                  }}
                >
                  <span style={{ background: instrument.color }} />
                  {instrument.label}
                </button>
                {arrangement[instrument.id].map((active, blockIndex) => {
                  const section = getSectionForBlock(structure, blockIndex);
                  const focused = !activeSection || section?.id === activeSection.id;
                  const alpha = active ? 0.32 + energy[blockIndex] * 0.64 : 0.05 + energy[blockIndex] * 0.15;
                  return (
                    <button
                      className={`grid-cell ${active ? "is-on" : ""}`}
                      key={blockIndex}
                      style={{
                        "--instrument": instrument.color,
                        "--cell-alpha": `${Math.round(alpha * 100)}%`,
                        opacity: focused ? 1 : 0.28,
                      }}
                      type="button"
                      onClick={() => toggleArrangement(instrument.id, blockIndex)}
                      aria-label={`${instrument.label} bars ${getBlockLabel(blockIndex)}`}
                    />
                  );
                })}
              </div>
            ))}
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
                    <input value={meta.style} onChange={(event) => setMeta({ ...meta, style: event.target.value })} />
                  </label>
                  <label>
                    BPM
                    <input type="number" value={meta.bpm} onChange={(event) => setMeta({ ...meta, bpm: Number(event.target.value) })} />
                  </label>
                  <label>
                    Key
                    <input value={meta.key} onChange={(event) => setMeta({ ...meta, key: event.target.value })} />
                  </label>
                  <label>
                    Energy
                    <input value={meta.energy} onChange={(event) => setMeta({ ...meta, energy: event.target.value })} />
                  </label>
                  <label className="span-2">
                    Mood
                    <input value={meta.mood} onChange={(event) => setMeta({ ...meta, mood: event.target.value })} />
                  </label>
                  <label className="span-2">
                    Groove Character
                    <input value={meta.groove} onChange={(event) => setMeta({ ...meta, groove: event.target.value })} />
                  </label>
                </div>

                <ToggleGroup label="Track Length" value={meta.length} options={TRACK_LENGTHS} onChange={changeLength} />
                <ToggleGroup label="Target Tool" value={meta.targetTool} options={TARGET_TOOLS} onChange={(targetTool) => setMeta({ ...meta, targetTool })} />
                <ToggleGroup label="Prompt Language" value={meta.promptLanguage} options={PROMPT_LANGUAGES} onChange={(promptLanguage) => setMeta({ ...meta, promptLanguage })} />
                <ToggleGroup label="Vocal Mode" value={meta.vocalMode} options={VOCAL_MODES} onChange={(vocalMode) => setMeta({ ...meta, vocalMode })} />
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
                    <h2>{activeInstrumentModel.label} Editor</h2>
                    <p>Sound, Tone und Groove als klickbare Bausteine. Empfehlungen reagieren auf Preset und Section.</p>
                  </div>
                </div>

                <div className="instrument-picker">
                  {INSTRUMENTS.map((instrument) => (
                    <button
                      className={activeInstrument === instrument.id ? "is-active" : ""}
                      key={instrument.id}
                      style={{ "--instrument": instrument.color }}
                      type="button"
                      onClick={() => setActiveInstrument(instrument.id)}
                    >
                      {instrument.label}
                    </button>
                  ))}
                </div>

                <div className="quick-actions">
                  <button type="button" onClick={quickApplySection}>
                    Add {activeInstrumentModel.label} to {activeSection.label}
                  </button>
                  <span>Focused section: {activeSection.label} / bars {activeSection.start}-{activeSection.end}</span>
                </div>

                {Object.entries(TAG_GROUPS[activeInstrument]).map(([group, tags]) => (
                  <div className="tag-group" key={group}>
                    <h3>{group}</h3>
                    <div className="tag-cloud">
                      {tags.map((tag) => (
                        <TagChip
                          key={tag}
                          active={selections[activeInstrument][group].includes(tag)}
                          recommended={recommendations.has(tag)}
                          onClick={() => updateSelection(group, tag)}
                        >
                          {tag}
                        </TagChip>
                      ))}
                    </div>
                  </div>
                ))}

                <label className="notes-field">
                  Instrument notes
                  <textarea
                    value={selections[activeInstrument].notes}
                    onChange={(event) =>
                      setSelections((previous) => ({
                        ...previous,
                        [activeInstrument]: {
                          ...previous[activeInstrument],
                          notes: event.target.value,
                        },
                      }))
                    }
                    placeholder="Optional: describe timing, melody, texture, or transition behavior."
                  />
                </label>
              </div>
            )}
          </div>

          <aside className="prompt-panel">
            <div className="prompt-header">
              <div>
                <span>Live Prompt</span>
                <strong>Suno Custom Mode</strong>
              </div>
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
                helper: "Paste into Lyrics",
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
                {openPromptPanels[panel.id] && <pre>{panel.value}</pre>}
              </section>
            ))}
            <label className="global-notes">
              Extra input
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add extra direction for the final prompt..." />
            </label>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default App;
