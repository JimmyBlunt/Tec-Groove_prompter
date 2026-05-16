export const TRACK_LENGTHS = [32, 64, 96, 128];

export const TARGET_TOOLS = ["Suno", "Lyria", "MusicFX", "Generic AI Music"];

export const PROMPT_LANGUAGES = [
  { id: "english", label: "English for Suno" },
  { id: "hybrid", label: "Hybrid" },
  { id: "german", label: "Deutsch" },
];

export const VOCAL_MODES = [
  {
    id: "instrumental-vocal-fx",
    label: "Instrumental + Vocal FX",
    styleCue: "instrumental club track, minimal vocal FX only",
    excludeCue: "full lead vocal, pop hook, sung verse, rap verse, choir, aggressive vocal belting",
  },
  {
    id: "no-vocals",
    label: "No Vocals",
    styleCue: "fully instrumental club track, no vocals",
    excludeCue: "vocals, lead vocal, backing vocals, spoken word, rap verse, choir",
  },
  {
    id: "spoken-fragments",
    label: "Spoken Fragments",
    styleCue: "short processed spoken fragments, no full lead vocal",
    excludeCue: "sung verse, pop chorus, full lead vocal, rap verse",
  },
  {
    id: "vocoder-textures",
    label: "Vocoder Textures",
    styleCue: "robotic vocoder textures, chopped voice as rhythmic sound design",
    excludeCue: "natural lead vocal, pop hook, choir, belted vocal",
  },
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
    vocalMode: "instrumental-vocal-fx",
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
    vocalMode: "instrumental-vocal-fx",
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
    vocalMode: "instrumental-vocal-fx",
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
    vocalMode: "instrumental-vocal-fx",
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
  { id: "fx", label: "FX", color: "#b7bec8" },
  { id: "transitions", label: "Transitions", color: "#d2d8e2" },
];

const e = (label, description) => ({ label, description });

export const TAG_GROUPS = {
  kick: {
    sound: [
      e("rounded kick", "Soft deep kick drum with controlled transient"),
      e("deep club kick", "Club-focused low kick with strong low-end pressure"),
      e("dry analog kick", "Short analog drum-machine kick without long reverb"),
      e("heartbeat kick", "Organic pulsing kick feel for deep hypnotic tracks"),
      e("909-style kick", "Classic techno kick with tight attack and tail"),
      e("muted kick thump", "Soft low thump for sparse intros and breakdowns"),
    ],
    tone: [
      e("tight low-end", "Controlled bass frequency range"),
      e("soft saturation", "Gentle harmonic distortion for analog warmth"),
      e("short saturated tail", "Compact kick decay with warm drive"),
      e("clicky attack", "Audible transient click for definition"),
      e("sub-focused punch", "Low punch without excessive high transient"),
    ],
    groove: [
      e("four-on-the-floor", "Steady kick on every beat"),
      e("groove pocket", "Tight lock between kick, bass, and drums"),
      e("stripped-back groove", "Minimal rhythmic arrangement with space"),
      e("kick mute", "Temporary kick removal for breaks and false drops"),
    ],
  },
  bass: {
    sound: [
      e("rolling bassline", "Continuous moving bass groove"),
      e("deep rounded bass", "Soft deep bass tone"),
      e("dubby low-end", "Dub-influenced bass texture"),
      e("filtered bass pulse", "Bass shaped by filter movement"),
      e("303-style acid pulse", "Minimal resonant acid-inspired bass movement"),
      e("Moog-style bass", "Warm rounded analog monosynth bass character"),
    ],
    tone: [
      e("sub-heavy bass", "Strong sub-frequency bass foundation"),
      e("warm analog bass", "Analog-style bass tone with soft harmonics"),
      e("sidechained bass", "Bass ducks under kick for groove pocket"),
      e("ghost bass notes", "Very quiet extra bass notes for movement"),
      e("modulated filter bass", "Cutoff movement creates evolving tone"),
    ],
    groove: [
      e("hypnotic bass loop", "Repetitive bass pattern with trance-like flow"),
      e("syncopated bass accents", "Off-beat bass hits and accents"),
      e("rubbery bassline", "Elastic bass movement"),
      e("two-note bass motif", "Simple two-tone movement for minimal groove"),
      e("shadow bass movement", "Subtle supporting bass motion below the main rhythm"),
    ],
  },
  sub: {
    sound: [
      e("sub bass pulse", "Pulsing low-frequency bass"),
      e("deep low-end", "Strong bass foundation"),
      e("mono sub layer", "Centered sub support under bass and kick"),
      e("sine sub pressure", "Clean sine-like sub foundation"),
    ],
    tone: [
      e("controlled sub pressure", "Sub energy kept tight and mix-ready"),
      e("soft low-end bloom", "Gentle spreading low-end warmth"),
      e("mono bass foundation", "Low-end held in the center of the mix"),
    ],
    groove: [
      e("locked with kick", "Sub follows kick groove tightly"),
      e("pulsing low-frequency movement", "Sub moves rhythmically without melodic complexity"),
      e("bass mute", "Temporary bass removal to create tension"),
    ],
  },
  hats: {
    sound: [
      e("shuffled hats", "Hi-hats with swing timing"),
      e("offbeat hats", "Classic offbeat open hat energy"),
      e("tight closed hats", "Short crisp closed hats"),
      e("open hats", "Longer hat accents for groove lift"),
      e("crisp digital hats", "Sharp clean top-end hat texture"),
      e("hi-hat rolls", "Fast hat sequences for tension"),
    ],
    tone: [
      e("dry percussion", "Minimal reverb percussion sound"),
      e("filtered hats", "Frequency-shaped hats with muted brightness"),
      e("tight transients", "Clean attack definition"),
      e("shadow hats", "Quiet background hats for subtle motion"),
    ],
    groove: [
      e("micro-groove", "Tiny rhythmic variations inside loop"),
      e("shaker shuffle", "Shaker-like swing layer"),
      e("off-grid human feel", "Slight timing imperfection for realism"),
      e("hat tension lift", "Increasing hat activity into a build"),
    ],
  },
  perc: {
    sound: [
      e("rim clicks", "Short metallic percussion clicks"),
      e("woodblock hits", "Organic wooden percussion"),
      e("muted congas", "Soft damped conga hits"),
      e("low toms", "Rounded low drum accents"),
      e("snare ghost hits", "Quiet snare details for rhythmic texture"),
      e("metallic ticks", "Small metallic rhythmic sounds"),
      e("click percussion", "Tiny click-based techno percussion"),
    ],
    tone: [
      e("organic percussion layers", "Natural-sounding percussion textures"),
      e("ghost percussion", "Very quiet supporting percussion"),
      e("vinyl crackle rhythm", "Vinyl noise used rhythmically"),
      e("modulated delay percussion", "Delay movement turns percussion into texture"),
    ],
    groove: [
      e("syncopated rhythm", "Off-beat rhythmic placement"),
      e("machine funk", "Mechanical but funky groove"),
      e("percussion swap", "Changing percussion elements between sections"),
      e("snips and chops", "Short chopped percussion fragments"),
    ],
  },
  clap: {
    sound: [
      e("dry clap", "Clean short clap layer"),
      e("short room clap", "Clap with compact room ambience"),
      e("muted clap layer", "Soft clap supporting the groove"),
      e("delayed clap accent", "Clap hit supported by short delay"),
    ],
    tone: [
      e("tight transient clap", "Fast attack and controlled decay"),
      e("filtered clap", "Frequency-shaped clap with reduced brightness"),
      e("reverb tail clap", "Clap with audible spatial tail"),
    ],
    groove: [
      e("offbeat support", "Clap supports offbeat rhythm"),
      e("backbeat accent", "Clap emphasizes classic backbeat placement"),
      e("ghost clap detail", "Quiet clap hit for texture"),
    ],
  },
  synth: {
    sound: [
      e("muted synth motif", "Small subdued synth pattern"),
      e("modular synth pulses", "Electronic modular-style pulses"),
      e("filtered plucks", "Short plucked synth notes shaped by filter"),
      e("minimal synth hook", "Simple repeating synth idea"),
      e("Prophet-style chords", "Warm polyphonic analog character"),
      e("Virus-style digital pulse", "Clean digital synth pulse with club edge"),
    ],
    tone: [
      e("detuned synth pulse", "Slightly detuned synth sound"),
      e("liquid synth line", "Smooth flowing synth movement"),
      e("percussive synth hit", "Synth used as rhythm element"),
      e("dreamy filtered tone", "Soft melodic color with filtering"),
      e("tape-fx synth", "Synth colored by tape-style wobble and saturation"),
    ],
    groove: [
      e("loop evolution", "Loop changes subtly over time"),
      e("micro variation", "Small recurring variations in the pattern"),
      e("restrained melodic movement", "Melody stays minimal and non-pop"),
      e("minimal arpeggiator", "Simple arpeggiated motion for hypnotic movement"),
      e("tricky modulation pattern", "Evolving modulation gives a clever rhythmic feel"),
    ],
  },
  vocals: {
    sound: [
      e("chopped vocals", "Vocal fragments used rhythmically instead of singing"),
      e("vocal stutters", "Repeated micro vocal hits creating rhythmic glitch feel"),
      e("ghost vocal chops", "Very subtle background vocal fragments"),
      e("breath chops", "Breath sounds used as percussion"),
      e("robotic vocal chops", "Vocals processed into machine-like rhythm elements"),
    ],
    tone: [
      e("vocoder textures", "Synth-like vocal transformation"),
      e("formant shifting", "Changes vocal character without changing melody"),
      e("pitch-shifted whispers", "Whispered vocals with pitch manipulation"),
      e("filtered vocal sweeps", "Vocals transformed into riser-like movement"),
    ],
    groove: [
      e("vocal percussion", "Voice used as drum-like element"),
      e("glitch vocal fills", "Broken vocal fills for transitions"),
      e("vowel hits", "Single vowels used as rhythmic hits"),
      e("shadow voice fragments", "Quiet voice pieces hidden in the groove"),
    ],
  },
  chords: {
    sound: [
      e("dub chord stabs", "Echo-heavy chord hits"),
      e("reverb-soaked chords", "Deep reverb chord texture"),
      e("filtered chord movement", "Chords shaped by filter automation"),
      e("minor chord stabs", "Dark minor stabs for club atmosphere"),
    ],
    tone: [
      e("suspended chords", "Floating unresolved harmony"),
      e("harmonic haze", "Soft harmonic background layer"),
      e("warm chord wash", "Warm soft chord background"),
      e("melancholic harmony", "Subtle emotional minor-key harmonic tone"),
    ],
    groove: [
      e("delay tail bridge", "Echo connects song sections"),
      e("chord swell", "Gradually rising chord"),
      e("additive arrangement", "Elements added gradually"),
      e("two-chord motion", "Simple two-chord harmonic movement"),
    ],
  },
  pads: {
    sound: [
      e("atmospheric pads", "Wide ambient background sound"),
      e("wide pads", "Large stereo pad texture"),
      e("soft drone", "Sustained low-motion atmosphere"),
      e("ambient wash", "Soft background ambience"),
    ],
    tone: [
      e("wet background textures", "Reverb-heavy ambient layer"),
      e("spacious stereo field", "Wide stereo image"),
      e("harmonic haze", "Soft harmonic background layer"),
      e("dreamy pad color", "Soft emotional pad tone"),
    ],
    groove: [
      e("slow filter movement", "Gradual filter motion across sections"),
      e("tension rebuild", "Rebuilding energy after breakdown"),
      e("central breakdown", "Main breakdown section"),
    ],
  },
  fx: {
    sound: [
      e("filter sweep", "Frequency opening or closing effect"),
      e("tape delay feedback", "Increasing echo regeneration"),
      e("reverb swell", "Expanding space effect"),
      e("noise texture", "Noise layer used for atmosphere"),
      e("analog filter movement", "Cutoff movement with analog feel"),
    ],
    tone: [
      e("reversed tail", "Backwards audio tail used as effect"),
      e("delay throws", "Isolated echoes thrown into space"),
      e("tape saturation movement", "Warm tape-like movement and drive"),
      e("resonant filter pulses", "Rhythmic resonance movement"),
    ],
    groove: [
      e("glitch fill", "Digital broken transition detail"),
      e("micro-breakdown", "Short breakdown section"),
      e("modulation sweep", "LFO-like sweep across the groove"),
    ],
  },
  transitions: {
    sound: [
      e("noise riser", "Rising noise build-up"),
      e("pitch riser", "Rising pitch transition sound"),
      e("downlifter", "Falling transition effect"),
      e("reversed vocal tail", "Backwards vocal ending for transitions"),
      e("delay tail bridge", "Echo connects song sections"),
    ],
    tone: [
      e("filtered transition sweep", "Filtered movement across a section boundary"),
      e("wide reverb bridge", "Reverb bridge between two song sections"),
      e("tape-delay transition", "Dubby tape-delay movement into a new section"),
    ],
    groove: [
      e("false drop", "Fake drop before the real groove return"),
      e("energy staircase", "Gradual energy increase"),
      e("groove return", "Return of the main groove"),
      e("subtractive outro", "Elements removed over time for mix-out"),
    ],
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

export const DEFAULT_EXCLUDES = [
  "pop chorus",
  "verse-chorus radio structure",
  "EDM festival drop",
  "big trance lead",
  "bright supersaw",
  "rock guitars",
  "acoustic singer-songwriter",
  "cheesy vocals",
];

export function tagLabel(tag) {
  return typeof tag === "string" ? tag : tag.label;
}

export function tagDescription(tag) {
  return typeof tag === "string" ? "" : tag.description;
}

export function findInstrument(instrumentId) {
  return INSTRUMENTS.find((instrument) => instrument.id === instrumentId);
}

export function createDefaultTrackRows() {
  return INSTRUMENTS.map((instrument) => ({
    id: instrument.id,
    instrumentId: instrument.id,
    label: instrument.label,
    base: true,
  }));
}

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
    fx: [[1, 1], [Math.floor(blockCount / 2) - 1, Math.floor(blockCount / 2)]],
    transitions: [[Math.floor(blockCount / 2) - 1, Math.floor(blockCount / 2)], [blockCount - 2, blockCount - 1]],
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
