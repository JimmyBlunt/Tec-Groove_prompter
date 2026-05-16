import { DEFAULT_EXCLUDES, INSTRUMENTS, VOCAL_MODES, getBlockLabel } from "../data/musicModel.js";

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

function instrumentLine(instrument, selections, arrangement) {
  const activeBlocks = getActiveBlocks(arrangement[instrument.id] || []);
  const selected = selections[instrument.id] || { sound: [], tone: [], groove: [], notes: "" };
  const tags = [...selected.sound, ...selected.tone, ...selected.groove];

  if (!tags.length && !activeBlocks.length && !selected.notes) {
    return null;
  }

  const parts = [
    `${instrument.label}: ${formatList(tags)}`,
    activeBlocks.length ? `active in bars ${activeBlocks.join(", ")}` : "activity not mapped",
  ];

  if (selected.notes) {
    parts.push(`notes: ${selected.notes}`);
  }

  return parts.join("; ");
}

function selectedTagsForInstrument(selections, instrumentId) {
  const selected = selections[instrumentId] || { sound: [], tone: [], groove: [] };
  return [...selected.sound, ...selected.tone, ...selected.groove];
}

function selectedTagsByPriority(selections) {
  const priority = ["kick", "bass", "sub", "hats", "perc", "clap", "chords", "synth", "pads", "vocals", "fx"];
  return unique(priority.flatMap((instrumentId) => selectedTagsForInstrument(selections, instrumentId)));
}

function activeInstrumentLabels(arrangement) {
  return INSTRUMENTS.filter((instrument) => arrangement[instrument.id]?.some(Boolean)).map((instrument) => instrument.label.toLowerCase());
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

function sectionTag(section) {
  if (section.role === "intro") return "[Intro]";
  if (section.role === "build") return "[Build]";
  if (section.role === "break") return "[Breakdown]";
  if (section.role === "drop") return "[Drop]";
  if (section.role === "outro") return "[Outro]\n[Fade Out]";
  return "[Interlude]";
}

function vocalCueForSection(section, meta) {
  if (meta.vocalMode === "no-vocals") return "[Instrumental]";
  if (section.role === "break") return "[Vocal Chop] [Breathy]";
  if (section.role === "build") return meta.vocalMode === "vocoder-textures" ? "[Vocoder] [Build]" : "[Vocal Stutter]";
  if (section.role === "drop") return "[Instrumental]";
  if (section.role === "outro") return "[Instrumental]";
  return "[Instrumental]";
}

function sectionActiveInstruments(section, arrangement) {
  const startBlock = Math.floor((section.start - 1) / 4);
  const endBlock = Math.floor((section.end - 1) / 4);
  return INSTRUMENTS.filter((instrument) => {
    const blocks = arrangement[instrument.id] || [];
    return blocks.slice(startBlock, endBlock + 1).some(Boolean);
  }).map((instrument) => instrument.label.toLowerCase());
}

function sectionTagHints(section, selections, arrangement) {
  const active = sectionActiveInstruments(section, arrangement);
  const tags = unique(active.flatMap((instrumentLabel) => {
    const instrument = INSTRUMENTS.find((item) => item.label.toLowerCase() === instrumentLabel);
    return instrument ? selectedTagsForInstrument(selections, instrument.id) : [];
  }));
  return tags.slice(0, 5);
}

export function compileSunoStylePrompt({ meta, selections, arrangement }) {
  const vocalMode = vocalModeFor(meta);
  const selectedTags = selectedTagsByPriority(selections);
  const activeLabels = activeInstrumentLabels(arrangement);
  const base = [
    meta.style,
    `${meta.bpm} BPM`,
    meta.key,
    `${meta.energy} energy`,
    meta.mood,
    meta.groove,
    vocalMode.styleCue,
    ...selectedTags.slice(0, 18),
    activeLabels.length ? `${activeLabels.join(", ")} arrangement` : "",
    "DJ-friendly structure",
    "additive groove build",
    "central breakdown",
    "restrained drop",
    "subtractive outro",
    "warm analog mix",
    "deep controlled low-end",
    "spacious stereo",
  ];

  return compactJoin(base, 940);
}

export function compileSunoLyricsPrompt({ meta, structure, selections, arrangement, notes }) {
  const lines = [];
  const vocalMode = vocalModeFor(meta);

  lines.push(`[Global: ${vocalMode.label}]`);
  lines.push("Use voice as texture, rhythm, atmosphere, and transition material rather than a traditional lead vocal.");
  lines.push("");

  structure.forEach((section) => {
    const active = sectionActiveInstruments(section, arrangement);
    const hints = sectionTagHints(section, selections, arrangement);
    lines.push(sectionTag(section));
    lines.push(vocalCueForSection(section, meta));
    lines.push(`Bars ${section.start}-${section.end}: ${section.intent}`);
    lines.push(`Active palette: ${active.length ? active.join(", ") : "sparse texture"}.`);
    if (hints.length) {
      lines.push(`Sound cues: ${hints.join(", ")}.`);
    }
    lines.push("");
  });

  if (notes.trim()) {
    lines.push("[Additional Direction]");
    lines.push(notes.trim());
  }

  return lines.join("\n").trim();
}

export function compileSunoExcludePrompt({ meta }) {
  const vocalMode = vocalModeFor(meta);
  return unique([...DEFAULT_EXCLUDES, ...vocalMode.excludeCue.split(",").map((item) => item.trim())]).join(", ");
}

export function compileBlueprintPrompt({ meta, structure, selections, arrangement, notes }) {
  const lines = [];

  lines.push("[TRACK IDENTITY]");
  lines.push(`${meta.style}, ${meta.bpm} BPM, ${meta.key}, ${meta.energy} energy, ${meta.mood}.`);
  lines.push(`Groove character: ${meta.groove}. Target tool: ${meta.targetTool}.`);
  lines.push("");

  lines.push("[ARRANGEMENT]");
  structure.forEach((section) => {
    lines.push(`${section.label} bars ${section.start}-${section.end}: ${section.intent}`);
  });
  lines.push("");

  lines.push("[INSTRUMENT LAYERS]");
  INSTRUMENTS.map((instrument) => instrumentLine(instrument, selections, arrangement))
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
