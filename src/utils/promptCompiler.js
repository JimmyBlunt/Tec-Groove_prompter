import { DEFAULT_EXCLUDES, INSTRUMENTS, PROMPT_DENSITIES, VOCAL_MODES, findInstrument, getBlockLabel } from "../data/musicModel.js";

function formatList(items) {
  return items.length ? items.join(", ") : "not specified";
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function getActiveBlocks(blocks) {
  return blocks
    .map((active, index) => (active ? getBlockLabel(index) : null))
    .filter(Boolean);
}

function rowLabel(row) {
  const instrument = findInstrument(row.instrumentId) || row;
  return row.label || instrument.label;
}

function rowsOrDefaults(trackRows) {
  return trackRows?.length
    ? trackRows
    : INSTRUMENTS.map((instrument) => ({
        id: instrument.id,
        instrumentId: instrument.id,
        label: instrument.label,
      }));
}

function rowTags(row, selections, blockOverrides = {}) {
  const base = selectedTagsForRow(selections, row.id);
  const overrides = Object.values(blockOverrides[row.id] || {}).flatMap((override) => [
    ...(override.sound || []),
    ...(override.tone || []),
    ...(override.groove || []),
  ]);
  return unique([...base, ...overrides]);
}

function instrumentLine(row, selections, arrangement, blockOverrides = {}) {
  const activeBlocks = getActiveBlocks(arrangement[row.id] || []);
  const selected = selections[row.id] || { sound: [], tone: [], groove: [], notes: "" };
  const tags = rowTags(row, selections, blockOverrides);
  const customBlocks = Object.entries(blockOverrides[row.id] || {})
    .map(([blockIndex, override]) => `${getBlockLabel(Number(blockIndex))} #${override.rev}: ${formatList([...(override.sound || []), ...(override.tone || []), ...(override.groove || [])])}`)
    .join(" | ");

  if (!tags.length && !activeBlocks.length && !selected.notes && !customBlocks) {
    return null;
  }

  const parts = [
    `${rowLabel(row)}: ${formatList(tags)}`,
    activeBlocks.length ? `active in bars ${activeBlocks.join(", ")}` : "activity not mapped",
  ];

  if (selected.notes) {
    parts.push(`notes: ${selected.notes}`);
  }
  if (customBlocks) {
    parts.push(`custom blocks: ${customBlocks}`);
  }

  return parts.join("; ");
}

function selectedTagsForRow(selections, rowId) {
  const selected = selections[rowId] || { sound: [], tone: [], groove: [] };
  return [...selected.sound, ...selected.tone, ...selected.groove];
}

function selectedTagsByPriority(selections, trackRows, blockOverrides = {}) {
  const priority = ["kick", "bass", "sub", "hats", "perc", "clap", "chords", "synth", "pads", "vocals", "fx", "transitions"];
  const rows = rowsOrDefaults(trackRows);
  return unique(
    priority.flatMap((instrumentId) =>
      rows.filter((row) => row.instrumentId === instrumentId).flatMap((row) => rowTags(row, selections, blockOverrides))
    )
  );
}

function activeInstrumentLabels(arrangement, trackRows) {
  return rowsOrDefaults(trackRows)
    .filter((row) => arrangement[row.id]?.some(Boolean))
    .map((row) => rowLabel(row).toLowerCase());
}

function vocalModeFor(meta) {
  return VOCAL_MODES.find((mode) => mode.id === meta.vocalMode) || VOCAL_MODES[0];
}

function compactJoin(phrases, maxLength = 940) {
  const kept = [];
  for (const phrase of unique(phrases)) {
    const next = [...kept, phrase].join(", ");
    if (next.length <= maxLength) {
      kept.push(phrase);
    }
  }
  return kept.join(", ");
}

function bracketLine(label, value) {
  if (!value) return null;
  return `[${label}: ${String(value).replace(/[\[\]]/g, "").trim()}]`;
}

function noteDirectionLines(notes) {
  return notes
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => bracketLine("Direction", line));
}

function sectionTag(section) {
  if (section.role === "intro") return "[Intro]";
  if (section.role === "build") return "[Build]";
  if (section.role === "break") return "[Breakdown]";
  if (section.role === "drop") return "[Drop]";
  if (section.role === "outro") return "[Outro]\n[Fade Out]";
  return "[Interlude]";
}

function globalVocalDirective(meta, vocalMode) {
  if (meta.vocalMode === "no-vocals") {
    return ["[Instrumental]", "[No vocals]", "[Arrangement map]"];
  }
  if (meta.vocalMode === "vocoder-textures") {
    return [
      "[Instrumental]",
      "[Vocal FX: robotic vocoder texture, chopped voice rhythm only]",
      "[No lead vocal]",
    ];
  }
  if (meta.vocalMode === "spoken-fragments") {
    return [
      "[Instrumental]",
      "[Vocal FX: short processed spoken fragments, low in the mix]",
      "[No sung verse]",
    ];
  }
  return [
    "[Instrumental]",
    "[Vocal FX: short chopped voice texture, rhythm and transition material only]",
    "[No lead vocal]",
  ];
}

function vocalCueForSection(section, meta) {
  if (meta.vocalMode === "no-vocals") return "[Instrumental]";
  if (section.role === "break") return meta.vocalMode === "vocoder-textures" ? "[Vocoder Atmosphere]" : "[Ghost Vocal Chop]";
  if (section.role === "build") return meta.vocalMode === "vocoder-textures" ? "[Vocoder Rhythm]" : "[Vocal Stutter]";
  if (section.role === "drop") return meta.vocalMode === "vocoder-textures" ? "[Robotic Vocal Texture]" : "[Instrumental]";
  if (section.role === "outro") return "[Instrumental]";
  return "[Instrumental]";
}

function sectionActiveInstruments(section, arrangement, trackRows) {
  const startBlock = Math.floor((section.start - 1) / 4);
  const endBlock = Math.floor((section.end - 1) / 4);
  return rowsOrDefaults(trackRows).filter((row) => {
    const blocks = arrangement[row.id] || [];
    return blocks.slice(startBlock, endBlock + 1).some(Boolean);
  }).map((row) => rowLabel(row).toLowerCase());
}

function sectionTagHints(section, selections, arrangement, trackRows, blockOverrides = {}) {
  const startBlock = Math.floor((section.start - 1) / 4);
  const endBlock = Math.floor((section.end - 1) / 4);
  const tags = unique(rowsOrDefaults(trackRows).flatMap((row) => {
    const blocks = arrangement[row.id] || [];
    const active = blocks.slice(startBlock, endBlock + 1).some(Boolean);
    const overrideTags = Object.entries(blockOverrides[row.id] || {})
      .filter(([blockIndex]) => Number(blockIndex) >= startBlock && Number(blockIndex) <= endBlock)
      .flatMap(([, override]) => [...(override.sound || []), ...(override.tone || []), ...(override.groove || [])]);
    return active ? unique([...selectedTagsForRow(selections, row.id), ...overrideTags]) : overrideTags;
  }));
  return tags.slice(0, 5);
}

function densityConfig(promptDensity) {
  return PROMPT_DENSITIES.find((density) => density.id === promptDensity) || PROMPT_DENSITIES[1];
}

export function compileSunoStylePrompt({ meta, selections, arrangement, trackRows, blockOverrides, promptDensity }) {
  const vocalMode = vocalModeFor(meta);
  const density = densityConfig(promptDensity);
  const selectedTags = selectedTagsByPriority(selections, trackRows, blockOverrides);
  const activeLabels = activeInstrumentLabels(arrangement, trackRows);
  const selectedLimit = density.id === "compact" ? 8 : density.id === "balanced" ? 14 : 22;
  const base = [
    meta.style,
    `${meta.bpm} BPM`,
    meta.key,
    `${meta.energy} energy`,
    meta.mood,
    meta.groove,
    meta.soundCharacter,
    vocalMode.styleCue,
    ...selectedTags.slice(0, selectedLimit),
    activeLabels.length ? `${activeLabels.join(", ")} arrangement` : "",
    "DJ-friendly extended club arrangement",
    "phrase-based 8-bar and 16-bar evolution",
    "warm analog mix",
    "deep controlled low-end",
    "spacious stereo",
  ];

  return compactJoin(base, density.maxStyleChars);
}

export function compileSunoLyricsPrompt({ meta, structure, selections, arrangement, notes, trackRows, blockOverrides, promptDensity }) {
  const lines = [];
  const vocalMode = vocalModeFor(meta);
  const density = densityConfig(promptDensity);
  const hintLimit = density.id === "compact" ? 3 : density.id === "balanced" ? 5 : 8;

  globalVocalDirective(meta, vocalMode).forEach((line) => lines.push(line));
  lines.push(bracketLine("Style context", `${meta.style}, ${meta.bpm} BPM, ${meta.key}, ${meta.groove}`));
  lines.push("");

  structure.forEach((section) => {
    const active = sectionActiveInstruments(section, arrangement, trackRows);
    const hints = sectionTagHints(section, selections, arrangement, trackRows, blockOverrides).slice(0, hintLimit);
    lines.push(sectionTag(section));
    lines.push(vocalCueForSection(section, meta));
    lines.push(bracketLine("Bars", `${section.start}-${section.end}`));
    lines.push(bracketLine("Arrangement", section.intent));
    lines.push(bracketLine("Active palette", active.length ? active.join(", ") : "sparse texture"));
    if (hints.length) {
      lines.push(bracketLine("Sound cues", hints.join(", ")));
    }
    lines.push("");
  });

  if (notes.trim()) {
    lines.push("[Additional Direction]");
    noteDirectionLines(notes).forEach((line) => lines.push(line));
  }

  return lines.join("\n").trim();
}

export function compileSunoExcludePrompt({ meta, selectedExcludes }) {
  const vocalMode = vocalModeFor(meta);
  const baseExcludes = Array.isArray(selectedExcludes) ? selectedExcludes : DEFAULT_EXCLUDES;
  return unique([...baseExcludes, ...vocalMode.excludeCue.split(",").map((item) => item.trim())]).join(", ");
}

export function compileBlueprintPrompt({ meta, structure, selections, arrangement, notes, trackRows, blockOverrides }) {
  const lines = [];

  lines.push("[TRACK IDENTITY]");
  lines.push(`${meta.style}, ${meta.bpm} BPM, ${meta.key}, ${meta.energy} energy, ${meta.mood}.`);
  if (meta.soundCharacter) lines.push(`Sound character: ${meta.soundCharacter}.`);
  lines.push(`Groove character: ${meta.groove}. Target tool: ${meta.targetTool}.`);
  lines.push("");

  lines.push("[ARRANGEMENT]");
  structure.forEach((section) => {
    lines.push(`${section.label} bars ${section.start}-${section.end}: ${section.intent}`);
  });
  lines.push("");

  lines.push("[INSTRUMENT LAYERS]");
  rowsOrDefaults(trackRows).map((row) => instrumentLine(row, selections, arrangement, blockOverrides))
    .filter(Boolean)
    .forEach((line) => lines.push(line));
  lines.push("");

  lines.push("[ENERGY MAP]");
  lines.push("Sparse intro, additive groove build, spacious breakdown, restrained main groove return, subtractive DJ-friendly outro.");
  lines.push("Keep repetition, micro-variation, groove pocket, low-end control, and subtle emotional movement.");
  lines.push("");

  lines.push("[PRODUCTION / MIX]");
  lines.push("Warm analog mix, deep controlled low-end, spacious stereo field, soft saturation, tight transients, delay and reverb used as musical transitions.");
  lines.push("");

  lines.push("[AVOID]");
  lines.push("Avoid pop verse/chorus structure, big EDM drops, overly bright festival synths, and lead-vocal songwriting.");

  if (notes.trim()) {
    lines.push("");
    lines.push("[USER NOTES]");
    lines.push(notes.trim());
  }

  return lines.join("\n");
}

export function compilePromptBundle(input) {
  return {
    style: compileSunoStylePrompt(input),
    lyrics: compileSunoLyricsPrompt(input),
    exclude: compileSunoExcludePrompt(input),
    blueprint: compileBlueprintPrompt(input),
  };
}
