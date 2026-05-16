import { INSTRUMENTS, getBlockLabel } from "../data/musicModel.js";

function formatList(items) {
  return items.length ? items.join(", ") : "not specified";
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

export function compilePrompt({ meta, structure, selections, arrangement, notes }) {
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
