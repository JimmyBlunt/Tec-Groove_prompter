import React, { useMemo, useRef, useState } from "react";
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
const defaultGuidedAnswers = Object.fromEntries(
  GUIDED_BUILDER_QUESTIONS.map((question) => [question.id, question.options[0]?.id])
);

function loadSavedSnapshots() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
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

function App() {
  const [activeCard, setActiveCard] = useState("setup");
  const [trackRows, setTrackRows] = useState(createDefaultTrackRows);
  const [activeTrackId, setActiveTrackId] = useState("bass");
  const [activeTagGroup, setActiveTagGroup] = useState("sound");
  const [activeSetupField, setActiveSetupField] = useState("style");
  const [rightPanelTab, setRightPanelTab] = useState("prompt");
  const [selectedCells, setSelectedCells] = useState([]);
  const selectionAnchorRef = useRef(null);
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
    () => compilePromptBundle({ meta, structure, selections, arrangement, notes, trackRows, blockOverrides, promptDensity }),
    [meta, structure, selections, arrangement, notes, trackRows, blockOverrides, promptDensity]
  );
  const styleCharCount = prompts.style.length;

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
                    {openPromptPanels[panel.id] && <pre>{panel.value}</pre>}
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
