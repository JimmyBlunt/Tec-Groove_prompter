export const TRACK_LENGTHS = [32, 64, 96, 128];

export const TARGET_TOOLS = ["Suno", "Lyria", "MusicFX", "Generic AI Music"];

export const PROMPT_LANGUAGES = [
  { id: "english", label: "English for Suno" },
  { id: "hybrid", label: "Hybrid" },
  { id: "german", label: "Deutsch" },
];

export const TRACK_PRESETS = [
  {
    id: "deep-hypnotic",
    label: "Deep Hypnotic",
    style: "minimal techno / deep tech house",
    bpm: 124,
    key: "A minor",
    energy: "deep",
    mood: "late-night, hypnotic, restrained",
    groove: "rolling micro-groove",
    length: 64,
  },
  {
    id: "dub-tech",
    label: "Dub Tech",
    style: "dub techno / deep house",
    bpm: 122,
    key: "C minor",
    energy: "warm",
    mood: "spacious, smoky, immersive",
    groove: "steady dub pulse",
    length: 64,
  },
  {
    id: "driving-club",
    label: "Driving Club",
    style: "minimal tech house",
    bpm: 126,
    key: "F minor",
    energy: "driving",
    mood: "focused, club-ready, mechanical",
    groove: "tight machine funk",
    length: 96,
  },
  {
    id: "minimal-machine",
    label: "Minimal Machine",
    style: "minimal techno",
    bpm: 125,
    key: "D minor",
    energy: "hypnotic",
    mood: "stripped-back, precise, synthetic",
    groove: "loop evolution",
    length: 64,
  },
];

export const INSTRUMENTS = [
  { id: "kick", label: "Kick", color: "#f05a5a" },
  { id: "bass", label: "Bass", color: "#41a6d9" },
  { id: "sub", label: "Sub Bass", color: "#247c9c" },
  { id: "hats", label: "Hats", color: "#e6c45a" },
  { id: "perc", label: "Percussion", color: "#f09a42" },
  { id: "clap", label: "Claps", color: "#5fd0a4" },
  { id: "synth", label: "Synth", color: "#b17cff" },
  { id: "vocals", label: "Vocals", color: "#ef6f9a" },
  { id: "chords", label: "Chords", color: "#698bff" },
  { id: "pads", label: "Pads", color: "#86bfd4" },
  { id: "fx", label: "FX / Transitions", color: "#b7bec8" },
];

export const TAG_GROUPS = {
  kick: {
    sound: ["rounded kick", "deep club kick", "dry analog kick", "heartbeat kick"],
    tone: ["tight low-end", "soft saturation", "warm analog mix", "tight transients"],
    groove: ["four-on-the-floor", "groove pocket", "stripped-back groove"],
  },
  bass: {
    sound: ["rolling bassline", "deep rounded bass", "dubby low-end", "filtered bass pulse"],
    tone: ["sub-heavy bass", "warm analog bass", "sidechained bass", "ghost bass notes"],
    groove: ["hypnotic bass loop", "syncopated bass accents", "rubbery bassline"],
  },
  sub: {
    sound: ["sub bass pulse", "deep low-end", "tight low-end"],
    tone: ["controlled sub pressure", "soft low-end bloom", "mono bass foundation"],
    groove: ["locked with kick", "pulsing low-frequency movement", "bass mute"],
  },
  hats: {
    sound: ["shuffled hats", "offbeat hats", "tight closed hats", "hi-hat rolls"],
    tone: ["dry percussion", "filtered percussion", "tight transients"],
    groove: ["micro-groove", "shaker shuffle", "off-grid human feel"],
  },
  perc: {
    sound: ["rim clicks", "woodblock hits", "muted congas", "metallic ticks"],
    tone: ["organic percussion layers", "ghost percussion", "vinyl crackle rhythm"],
    groove: ["syncopated rhythm", "machine funk", "percussion swap"],
  },
  clap: {
    sound: ["dry clap", "short room clap", "muted clap layer", "delayed clap accent"],
    tone: ["tight transient clap", "filtered clap", "reverb tail clap"],
    groove: ["offbeat support", "backbeat accent", "ghost clap detail"],
  },
  synth: {
    sound: ["muted synth motif", "modular synth pulses", "filtered plucks", "minimal synth hook"],
    tone: ["detuned synth pulse", "liquid synth line", "percussive synth hit"],
    groove: ["loop evolution", "micro variation", "restrained melodic movement"],
  },
  vocals: {
    sound: ["chopped vocals", "vocal stutters", "ghost vocal chops", "breath chops"],
    tone: ["vocoder textures", "formant shifting", "pitch-shifted whispers"],
    groove: ["vocal percussion", "glitch vocal fills", "vowel hits"],
  },
  chords: {
    sound: ["dub chord stabs", "reverb-soaked chords", "filtered chord movement"],
    tone: ["suspended chords", "harmonic haze", "warm chord wash"],
    groove: ["delay tail bridge", "chord swell", "additive arrangement"],
  },
  pads: {
    sound: ["atmospheric pads", "wide pads", "soft drone", "ambient wash"],
    tone: ["wet background textures", "spacious stereo field", "harmonic haze"],
    groove: ["slow filter movement", "tension rebuild", "central breakdown"],
  },
  fx: {
    sound: ["filter sweep", "tape delay feedback", "reverb swell", "noise riser"],
    tone: ["reversed tail", "downlifter", "delay throws", "filtered vocal sweeps"],
    groove: ["glitch fill", "delay tail bridge", "vocoder riser", "micro-breakdown"],
  },
};

export const STRUCTURE_TERMS = [
  "DJ-friendly intro",
  "additive arrangement",
  "subtractive arrangement",
  "loop evolution",
  "micro-breakdown",
  "central breakdown",
  "false drop",
  "restrained drop",
  "groove return",
  "second groove variation",
  "energy staircase",
  "tension rebuild",
  "DJ-friendly outro",
];

export const STRUCTURE_COLORS = {
  intro: "#2a3445",
  build: "#3f7dd8",
  break: "#7d5ae0",
  drop: "#d94a7a",
  variation: "#d8863f",
  outro: "#1d242d",
};

export function createDefaultStructure(length) {
  if (length === 32) {
    return [
      { id: "intro", label: "Intro", role: "intro", start: 1, end: 8, intent: "DJ-friendly opening with sparse kick and subtle texture." },
      { id: "build-1", label: "Build 1", role: "build", start: 9, end: 16, intent: "Add bass movement, percussion detail, and controlled tension." },
      { id: "break-1", label: "Break", role: "break", start: 17, end: 20, intent: "Remove low-end briefly, let FX and atmosphere breathe." },
      { id: "drop-1", label: "Drop", role: "drop", start: 21, end: 24, intent: "Return with locked groove, bass pressure, and clear rhythmic focus." },
      { id: "build-2", label: "Build 2", role: "variation", start: 25, end: 28, intent: "Introduce a second groove variation without leaving the minimal feel." },
      { id: "outro", label: "Outro", role: "outro", start: 29, end: 32, intent: "Subtractive mix-out with drums and delay tails." },
    ];
  }

  const quarter = Math.floor(length / 4);
  return [
    { id: "intro", label: "Intro", role: "intro", start: 1, end: quarter, intent: "DJ-friendly intro, sparse drums, texture, and gradual entry." },
    { id: "build-1", label: "Build", role: "build", start: quarter + 1, end: quarter * 2, intent: "Additive arrangement with bass, hats, and percussion density rising." },
    { id: "break", label: "Break", role: "break", start: quarter * 2 + 1, end: quarter * 2 + Math.max(8, quarter / 2), intent: "Central breakdown with bass mute, FX movement, space, and tension." },
    { id: "drop", label: "Main Groove", role: "drop", start: quarter * 2 + Math.max(8, quarter / 2) + 1, end: quarter * 3 + Math.floor(quarter / 2), intent: "Restrained drop and groove return with locked kick, bass, hats, and percussion." },
    { id: "outro", label: "Outro", role: "outro", start: quarter * 3 + Math.floor(quarter / 2) + 1, end: length, intent: "Subtractive outro with DJ-friendly mix-out and delay tail bridge." },
  ];
}

export function createDefaultArrangement(length) {
  const blockCount = length / 4;
  const activeByInstrument = Object.fromEntries(INSTRUMENTS.map((instrument) => [instrument.id, Array(blockCount).fill(false)]));

  const ranges = {
    kick: [[0, blockCount - 1]],
    bass: [[2, blockCount - 3]],
    sub: [[3, blockCount - 4]],
    hats: [[1, blockCount - 1]],
    perc: [[2, blockCount - 2]],
    clap: [[3, blockCount - 4]],
    synth: [[4, blockCount - 5]],
    vocals: [[Math.floor(blockCount / 2), Math.floor(blockCount / 2) + 1]],
    chords: [[Math.floor(blockCount / 2) - 1, Math.floor(blockCount / 2) + 2]],
    pads: [[0, 2], [Math.floor(blockCount / 2) - 1, Math.floor(blockCount / 2) + 1]],
    fx: [[1, 1], [Math.floor(blockCount / 2) - 1, Math.floor(blockCount / 2)], [blockCount - 2, blockCount - 1]],
  };

  Object.entries(ranges).forEach(([instrumentId, instrumentRanges]) => {
    instrumentRanges.forEach(([start, end]) => {
      for (let index = Math.max(0, start); index <= Math.min(blockCount - 1, end); index += 1) {
        activeByInstrument[instrumentId][index] = true;
      }
    });
  });

  return activeByInstrument;
}

export function createInitialSelections() {
  return Object.fromEntries(
    INSTRUMENTS.map((instrument) => [
      instrument.id,
      {
        sound: [],
        tone: [],
        groove: [],
        notes: "",
      },
    ])
  );
}

export function getBlockLabel(index) {
  const start = index * 4 + 1;
  return `${start}-${start + 3}`;
}

export function getSectionForBlock(structure, blockIndex) {
  const bar = blockIndex * 4 + 1;
  return structure.find((section) => bar >= section.start && bar <= section.end);
}

export function getRecommendations({ meta, activeInstrument, activeSection }) {
  const base = new Set();
  const style = `${meta.style} ${meta.energy} ${meta.mood}`.toLowerCase();
  const role = activeSection?.role || "";

  if (style.includes("dub")) {
    ["dub chord stabs", "tape delay feedback", "dubby low-end", "reverb-soaked chords", "delay tail bridge"].forEach((tag) => base.add(tag));
  }

  if (style.includes("deep") || style.includes("hypnotic")) {
    ["rolling bassline", "hypnotic bass loop", "filtered bass pulse", "ghost percussion", "micro-groove", "soft saturation"].forEach((tag) => base.add(tag));
  }

  if (style.includes("driving") || style.includes("club")) {
    ["deep club kick", "tight low-end", "groove pocket", "shuffled hats", "machine funk", "tight transients"].forEach((tag) => base.add(tag));
  }

  if (role === "break") {
    ["reverb swell", "reversed tail", "ghost vocal chops", "bass mute", "central breakdown", "tension rebuild"].forEach((tag) => base.add(tag));
  }

  if (role === "drop") {
    ["groove return", "restrained drop", "tight low-end", "sidechained bass", "shuffled hats", "percussion swap"].forEach((tag) => base.add(tag));
  }

  if (activeInstrument === "fx") {
    ["filter sweep", "delay throws", "noise riser", "downlifter"].forEach((tag) => base.add(tag));
  }

  return base;
}
