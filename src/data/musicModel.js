export const TRACK_LENGTHS = [32, 64, 96, 128];

export const TARGET_TOOLS = ["Suno", "Lyria", "MusicFX", "Generic AI Music"];

export const PROMPT_LANGUAGES = [
  { id: "english", label: "English for Suno" },
  { id: "hybrid", label: "Hybrid" },
  { id: "german", label: "Deutsch" },
];

export const PROMPT_DENSITIES = [
  { id: "compact", label: "Compact", maxStyleChars: 720 },
  { id: "balanced", label: "Balanced", maxStyleChars: 900 },
  { id: "detailed", label: "Detailed", maxStyleChars: 990 },
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
    soundCharacter: "warm analog, dark, spacious, textural, dub delay",
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
    soundCharacter: "tape delay, dub chords, warm low-end, reverb tails",
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
    soundCharacter: "dry hats, punchy kick, rolling bass, precise percussion",
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
    soundCharacter: "modular pulses, tight drum machine, minimal synth motion",
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

export const CHARACTERISTIC_OPTIONS = {
  style: [
    e("deep dub techno", "Warm spacious techno with dub chords, delay feedback and deep low-end"),
    e("minimal deep house", "Reduced house groove with soft swing, deep bass and subtle musicality"),
    e("minimal afterhours", "Late-night restrained club style with intimate atmosphere"),
    e("dub techno / deep house hybrid", "Combines dub delay space with deep house warmth"),
    e("hypnotic deep techno", "Repetitive meditative techno focused on groove and texture"),
    e("driving deep tech house", "More direct club groove with tight drums and rolling bass"),
    e("atmospheric deep house", "Warm emotional house with pads, chords and gentle movement"),
    e("deep melodic techno", "Melodic but restrained techno with evolving texture"),
    e("ambient dub techno", "Very spacious dub techno with pads, noise, delays and slow evolution"),
    e("warehouse minimal techno", "Darker stripped club sound with dry rhythm and little melody"),
  ],
  mood: [
    e("Amsterdam afterhours cellar club", "Small dark room, smoke, warmth and close low-end pressure"),
    e("warm, dark, hypnotic, spacious", "Core mood for deep dub and minimal afterhours tracks"),
    e("low light warehouse atmosphere", "Focused, dark, late-night industrial room feeling"),
    e("smoky underground radio mix", "Intimate underground broadcast feel with soft grit"),
    e("cinematic afterhours outro", "Expansive closing mood without pop drama"),
    e("meditative underground flow", "Long-form immersive focus without sudden changes"),
    e("refined and intimate", "Polished, close, elegant and not aggressive"),
    e("melancholic but club-ready", "Minor-key emotion while remaining dancefloor functional"),
    e("foggy late-night tunnel", "Forward-moving but hazy soundscape"),
    e("restrained emotional lift", "Slightly brighter feeling without euphoric peak"),
  ],
  groove: [
    e("rolling micro-groove", "Small repeating variations create forward motion"),
    e("steady dub pulse", "Stable pulse with dub chords and delay movement"),
    e("tight machine funk", "Mechanical but funky timing and drum interaction"),
    e("long evolving groove", "Groove changes through automation rather than melody"),
    e("four-on-the-floor deep pulse", "Classic club pulse with deep low-end"),
    e("shuffled deep house pocket", "Swinging house-influenced groove pocket"),
    e("minimal loop evolution", "A loop that shifts subtly over many bars"),
    e("sub-driven hypnotic flow", "Bass and sub create most of the movement"),
    e("dry percussion lock", "Percussion locks the rhythm without dense arrangement"),
    e("delayed chord groove", "Chord echo repeats become part of the rhythm"),
  ],
  key: [
    e("D minor", "Dark but warm; good for intros and deep dub atmospheres"),
    e("F minor", "Focused and club-oriented; strong for main grooves"),
    e("G minor", "Darker tunnel mood with slightly wider harmonic feel"),
    e("Bb minor", "Deep and shadowy; useful for glassy or late-night texture"),
    e("C minor", "Classic deep club emotional center; warm and serious"),
    e("Eb minor", "Darker and more mysterious, useful for hypnotic core sections"),
    e("Ab minor", "Moody and cinematic, suitable for closing or atmospheric tracks"),
    e("A minor", "Neutral dark minor key, easy for minimal and hypnotic material"),
    e("D Dorian", "Minor feel with a slightly lifted, less sad color"),
    e("F Dorian", "Deep house-friendly minor mode with subtle warmth"),
  ],
  soundCharacter: [
    e("warm analog pads", "Soft vintage pad texture with round edges"),
    e("dark dub chord stabs", "Muted chord hits with delay and reverb"),
    e("tape-delay feedback", "Echo repeats become a moving texture"),
    e("low-pass filter movement", "Cutoff opens or closes to shape arrangement energy"),
    e("soft sub bass pressure", "Low-end is deep but controlled and not aggressive"),
    e("dry 909 drum machine", "Classic minimal techno drum character"),
    e("metallic micro percussion", "Small ticks and clicks add upper rhythmic detail"),
    e("glassy synth texture", "Airy bright synth layer with restrained melody"),
    e("vinyl noise and room haze", "Subtle noise bed and atmospheric depth"),
    e("sidechained background pads", "Pads breathe around kick and bass"),
    e("ping-pong dub delay", "Stereo echo motion on chords, vocals or FX"),
    e("high-pass transition wash", "Old layers thin out during transitions"),
    e("reverb-freeze tail", "Long frozen reverb used as transition or outro texture"),
    e("filtered tape haze", "Warm filtered texture with slight tape softness"),
  ],
};

export const GUIDED_BUILDER_QUESTIONS = [
  {
    id: "styleCharacter",
    label: "Style / Character",
    prompt: "What should the track feel like at the highest level?",
    options: [
      {
        id: "minimal-reduced",
        label: "Minimal / Reduced",
        description: "Few elements, lots of space, every sound carries weight.",
        blueprint: "opening-drift",
        meta: { energy: "reduced, minimal, controlled", groove: "minimal loop evolution" },
        tags: { kick: { groove: ["stripped-back groove"] }, perc: { groove: ["minimal fill fragments"] }, fx: { groove: ["shadow FX pulse"] } },
      },
      {
        id: "driving-club",
        label: "Driving / Club",
        description: "More direct kick, tighter hats, rolling low-end and clean momentum.",
        blueprint: "night-architecture",
        meta: { energy: "driving club momentum", groove: "tight machine funk" },
        tags: { kick: { sound: ["909 punch kick"], tone: ["clicky attack"] }, hats: { groove: ["16th hat engine"] }, bass: { sound: ["rolling bassline"] } },
      },
      {
        id: "hypnotic-repetitive",
        label: "Hypnotic / Repetitive",
        description: "Long evolving repetition, small changes and meditative flow.",
        blueprint: "deep-current",
        meta: { energy: "long hypnotic core", groove: "long evolving groove" },
        tags: { bass: { groove: ["hypnotic bass loop"] }, pads: { groove: ["long-form evolution"] }, fx: { tone: ["dub feedback cloud"] } },
      },
      {
        id: "warm-dub",
        label: "Warm Dub / Spacious",
        description: "Dub chords, tape delay, warm bass and a smoky afterhours space.",
        blueprint: "first-pulse",
        meta: { energy: "warm spacious dub pulse", groove: "steady dub pulse" },
        tags: { chords: { sound: ["dub chord stabs"], tone: ["tape-delayed chords"] }, fx: { sound: ["tape delay feedback"] } },
      },
      {
        id: "dark-afterhours",
        label: "Dark Afterhours",
        description: "Low light, deep room, restrained emotion and darker harmonics.",
        blueprint: "low-light-motion",
        meta: { energy: "dark afterhours flow", groove: "sub-driven hypnotic flow" },
        tags: { pads: { sound: ["dark drone bed"] }, chords: { tone: ["filtered melancholic chords"] }, bass: { tone: ["low-pass filtered"] } },
      },
    ],
  },
  {
    id: "arrangementLogic",
    label: "Arrangement Logic",
    prompt: "How should the track build and release tension?",
    options: [
      {
        id: "additive",
        label: "Slow Additive Build",
        description: "Start sparse and add kick, bass, hats, perc, chords and FX step by step.",
        tags: { chords: { groove: ["additive arrangement"] }, transitions: { groove: ["energy staircase"] } },
        note: "Use an additive arrangement: introduce one meaningful element every 8 or 16 bars.",
      },
      {
        id: "subtractive",
        label: "Subtractive / Mix-Out",
        description: "Begin fuller, remove elements for space, then leave delay/pads behind.",
        tags: { transitions: { groove: ["subtractive outro"] }, hats: { groove: ["hat mute break"] }, sub: { groove: ["bass mute"] } },
        note: "Use subtractive tension: remove hats, bass or kick to make space instead of creating a dramatic drop.",
      },
      {
        id: "loop-evolution",
        label: "Loop Evolution",
        description: "One core groove evolves via automation, micro-variation and FX movement.",
        tags: { synth: { groove: ["loop evolution"] }, bass: { groove: ["one-bar loop mutation"] }, pads: { groove: ["long-form evolution"] } },
        note: "Keep the core loop stable and create motion through filter, delay feedback and tiny pattern changes.",
      },
      {
        id: "breakdown-return",
        label: "Breakdown Return",
        description: "Mute bass/kick in the break, let FX breathe, then return with groove.",
        tags: { transitions: { groove: ["groove return"] }, fx: { sound: ["reverb swell"] }, bass: { groove: ["bass mute"] } },
        note: "Use a central breakdown with bass mute, reverb swell and restrained groove return.",
      },
    ],
  },
  {
    id: "grooveFocus",
    label: "Groove Focus",
    prompt: "Which element should carry the groove?",
    options: [
      {
        id: "perc-clicks",
        label: "Percussion / Clicks",
        description: "Rim clicks, metallic ticks, congas and rotating percussion do the work.",
        tags: { perc: { sound: ["rim clicks", "metallic ticks", "conga ghost hits"], groove: ["rotating percussion loop"] } },
      },
      {
        id: "bass-led",
        label: "Bass-Led",
        description: "Bass/sub interaction is the main hook, with drums supporting.",
        tags: { bass: { sound: ["rolling bassline"], groove: ["call-and-response bass"] }, sub: { groove: ["locked with kick"] } },
      },
      {
        id: "chord-delay",
        label: "Chord Delay Groove",
        description: "Dub chord echo repeats become rhythmic material.",
        tags: { chords: { groove: ["chord stab echo rhythm"], tone: ["tape-delayed chords"] }, fx: { tone: ["dub feedback cloud"] } },
      },
      {
        id: "hat-shaker",
        label: "Hat / Shaker Motion",
        description: "Shuffled hats and shaker movement create the forward flow.",
        tags: { hats: { sound: ["shuffled hats", "909 open hat"], groove: ["shaker shuffle", "hat tension lift"] } },
      },
      {
        id: "sparse-pulse",
        label: "Sparse Pulse",
        description: "Very few rhythmic parts, mostly kick, sub and atmosphere.",
        tags: { kick: { groove: ["intro pulse only"] }, sub: { tone: ["invisible sub support"] }, pads: { sound: ["dark drone bed"] } },
      },
    ],
  },
  {
    id: "lowEnd",
    label: "Low-End Relation",
    prompt: "How should kick, bass and sub work together?",
    options: [
      {
        id: "kick-bass-locked",
        label: "Kick/Bass Locked",
        description: "Tight club low-end, sidechain breathing and clear groove pocket.",
        tags: { kick: { groove: ["groove pocket"] }, bass: { tone: ["sidechained bass"] }, sub: { groove: ["locked with kick"] } },
      },
      {
        id: "warm-rounded",
        label: "Warm Rounded Bass",
        description: "Soft analog bass with deep but non-aggressive low-end.",
        tags: { bass: { sound: ["Moog-style bass", "deep rounded bass"], tone: ["warm analog bass"] }, sub: { tone: ["soft low-end bloom"] } },
      },
      {
        id: "sub-pressure",
        label: "Sub Pressure",
        description: "Sub is felt strongly while the rest stays spacious.",
        tags: { sub: { sound: ["pure sine sub", "sub bass pulse"], tone: ["controlled sub pressure"] }, kick: { tone: ["sub-tail controlled"] } },
      },
      {
        id: "filtered-dub-pulse",
        label: "Filtered Dub Pulse",
        description: "Bass and sub move through filter automation and delay ghosts.",
        tags: { bass: { sound: ["filtered bass pulse"], tone: ["modulated filter bass", "delayed bass ghost"] } },
      },
    ],
  },
  {
    id: "harmonicSpace",
    label: "Chords / Atmosphere",
    prompt: "What harmonic or atmospheric layer should define the track?",
    options: [
      {
        id: "dub-stabs",
        label: "Dub Chord Stabs",
        description: "Muted chord stabs, tape delay and filtered echo tails.",
        tags: { chords: { sound: ["dub chord stabs"], tone: ["tape-delayed chords"], groove: ["chord stab echo rhythm"] } },
      },
      {
        id: "wide-pads",
        label: "Wide Pads",
        description: "Warm wide pads carry emotion and depth.",
        tags: { pads: { sound: ["Juno-style pad"], tone: ["dreamy stereo wash"], groove: ["breathing sidechain pad"] } },
      },
      {
        id: "glassy-synth",
        label: "Glassy Synth Texture",
        description: "Light upper texture, metallic detail and restrained melody.",
        tags: { synth: { sound: ["FM bell pluck", "granular synth flecks"], tone: ["dreamy filtered melody"] } },
      },
      {
        id: "dark-drone",
        label: "Dark Drone Bed",
        description: "Low dark atmosphere and slow filter movement.",
        tags: { pads: { sound: ["dark drone bed"], tone: ["filtered tape haze"], groove: ["subtle LFO motion"] } },
      },
    ],
  },
  {
    id: "fxMovement",
    label: "FX / Movement",
    prompt: "How should movement and transitions happen?",
    options: [
      {
        id: "tape-feedback",
        label: "Tape-Delay Feedback",
        description: "Delay feedback and echo tails act as musical structure.",
        tags: { fx: { sound: ["tape delay feedback"], tone: ["dub feedback cloud", "filtered tape echo"] } },
      },
      {
        id: "filter-automation",
        label: "Filter Automation",
        description: "Low-pass/high-pass movement opens and closes energy.",
        tags: { fx: { sound: ["filter sweep"], tone: ["resonant filter pulses"] }, transitions: { tone: ["tension filter close"] } },
      },
      {
        id: "reverb-freeze",
        label: "Reverb Freeze",
        description: "Long reverb tails bridge sections and outro space.",
        tags: { fx: { sound: ["reverb swell"], tone: ["space echo color"] }, transitions: { tone: ["wide reverb bridge"] } },
      },
      {
        id: "phaser-chorus",
        label: "Phaser / Chorus Motion",
        description: "Movement comes from phaser, chorus and stereo modulation.",
        tags: { fx: { tone: ["phaser movement", "flanger sweep"] }, pads: { tone: ["modulated pad shimmer"] } },
      },
    ],
  },
  {
    id: "vocalFxRole",
    label: "Vocal FX Role",
    prompt: "Should voice appear as sound design?",
    options: [
      {
        id: "none",
        label: "No Vocals",
        description: "Fully instrumental; no vocal material.",
        vocalMode: "no-vocals",
        tags: {},
      },
      {
        id: "ghost-chops",
        label: "Ghost Vocal Chops",
        description: "Barely audible vocal fragments for texture and rhythm.",
        vocalMode: "instrumental-vocal-fx",
        tags: { vocals: { sound: ["ghost vocal chops"], tone: ["low-mixed vocal dust"], groove: ["shadow voice fragments"] } },
      },
      {
        id: "vocoder",
        label: "Vocoder / Robot",
        description: "Robotic vocoder textures, no lead singing.",
        vocalMode: "vocoder-textures",
        tags: { vocals: { sound: ["robotic vocal chops"], tone: ["metallic vocoder tone", "robotic formant shift"] } },
      },
      {
        id: "breath-perc",
        label: "Breath Percussion",
        description: "Breath chops and vowel hits behave like percussion.",
        vocalMode: "instrumental-vocal-fx",
        tags: { vocals: { sound: ["breath chops"], groove: ["stuttered breath rhythm", "offbeat vowel groove"] } },
      },
    ],
  },
];

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

const EXTRA_TAG_GROUPS = {
  kick: {
    sound: [
      e("808 low thump", "Longer rounded low drum character for softer deep sections"),
      e("909 punch kick", "Classic punchy techno kick with defined mid transient"),
      e("707 dry kick", "Dry vintage drum-machine kick with short body"),
      e("distorted warehouse kick", "Saturated harder kick for driving club sections"),
      e("rubbery analog kick", "Elastic analog kick tone with soft pitch movement"),
      e("click-forward kick", "Kick with pronounced top click for small speaker translation"),
    ],
    tone: [
      e("warm overdrive", "Analog-style drive adds body without harshness"),
      e("tape-compressed kick", "Kick shaped by tape-like compression and rounded edges"),
      e("low-pass softened kick", "Dark kick with reduced top-end"),
      e("gated room kick", "Short room ambience cut into a rhythmic tail"),
      e("sub-tail controlled", "Kick tail shortened to leave space for bass"),
    ],
    groove: [
      e("skip-kick variation", "Occasional missing kick creates movement"),
      e("false-drop kick cut", "Kick drops out just before the groove returns"),
      e("intro pulse only", "Kick supports the intro without full energy"),
      e("drop anchor kick", "Kick becomes the main structural anchor in the drop"),
    ],
  },
  bass: {
    sound: [
      e("Juno-style bass", "Soft analog bass with smooth chorus-like width"),
      e("SH-101-style sequence", "Classic mono synth sequence with simple hypnotic motion"),
      e("Prophet-style warm bass", "Round poly-analog character used as bass texture"),
      e("FM bass knock", "Digital FM-style bass with clean attack"),
      e("square-wave bass", "Simple hollow bass tone with minimal harmonic movement"),
      e("saw bass pulse", "Saw-based bass with filtered edge"),
      e("resonant acid bass", "Acid-inspired resonance without becoming aggressive"),
    ],
    tone: [
      e("low-pass filtered", "Bass brightness reduced by low-pass filtering"),
      e("tape-warmed bass", "Bass has soft tape color and slight compression"),
      e("delayed bass ghost", "Quiet delay reflections extend the bass rhythm"),
      e("dreamy minor bass color", "Minor-key bass tone with emotional softness"),
      e("intelligent bass variation", "Subtle pattern changes feel deliberate and musical"),
      e("tricky filter accent", "Filter accents create clever rhythmic emphasis"),
    ],
    groove: [
      e("one-bar loop mutation", "Small variation appears at the end of each bar loop"),
      e("call-and-response bass", "Bass phrase answers itself with a second motif"),
      e("sub shadow layer", "Hidden sub movement follows the main bass"),
      e("late bass accent", "Bass note lands late for a laid-back pocket"),
      e("16th-note pulse", "Fast repeated bass pulse with controlled density"),
    ],
  },
  sub: {
    sound: [
      e("808 tuned sub", "Tuned 808-like sub layer matched to the key"),
      e("pure sine sub", "Clean sine-wave low-end with no edge"),
      e("analog sub oscillator", "Warm oscillator sub layer under the bass"),
      e("dub sub swell", "Sub layer grows softly through dub-style space"),
    ],
    tone: [
      e("invisible sub support", "Sub is felt more than heard"),
      e("sidechain breathing", "Sub breathes around kick movement"),
      e("short sub envelope", "Sub notes are clipped short for tight club mix"),
      e("rounded sub decay", "Sub tail decays smoothly without boom"),
    ],
    groove: [
      e("sub call response", "Sub answers the bassline in sparse moments"),
      e("held sub tension", "Sustained sub creates tension in breakdowns"),
      e("sub drop return", "Sub returns as a clear cue for the main groove"),
    ],
  },
  hats: {
    sound: [
      e("909 closed hats", "Classic short closed hat pattern"),
      e("909 open hat", "Classic open hat accent for techno/house offbeats"),
      e("707 hats", "Dry vintage drum-machine hat texture"),
      e("ride shimmer", "Subtle ride cymbal shimmer for late-section lift"),
      e("tick hats", "Very small ticking hat texture"),
      e("noisy hats", "Noise-based hat layer with synthetic edge"),
      e("metallic hat grains", "Tiny metallic hat fragments"),
    ],
    tone: [
      e("crisp top-end", "Bright clean high-frequency definition"),
      e("dusty hat layer", "Slightly dirty or sampled hat texture"),
      e("low-passed hats", "Darker hats for restrained sections"),
      e("tape-softened hats", "Top-end softened by tape-style color"),
      e("air-band shimmer", "Light airy high-end sheen"),
    ],
    groove: [
      e("16th hat engine", "Continuous 16th hat grid drives the groove"),
      e("swinged open hats", "Open hats lean with swing timing"),
      e("hat mute break", "Hats drop out to open space"),
      e("hat roll pickup", "Short roll leads into next section"),
      e("shadow hat shuffle", "Quiet shuffle under the main hat pattern"),
    ],
  },
  perc: {
    sound: [
      e("clave hits", "Wooden clave accents for syncopated groove"),
      e("bongo taps", "Small hand-drum taps for organic detail"),
      e("conga ghost hits", "Quiet conga tones used as background rhythm"),
      e("909 rimshot", "Classic sharp rimshot for techno accents"),
      e("808 cowbell", "Metallic cowbell tone used sparingly"),
      e("noise snare tick", "Tiny snare/noise tick for texture"),
      e("modular blips", "Small modular bleeps acting as percussion"),
    ],
    tone: [
      e("spring reverb percussion", "Percussion colored by spring-like reverb"),
      e("dub-delayed percussion", "Percussion taps bounce through dub delay"),
      e("bit-reduced clicks", "Clicks have subtle digital reduction"),
      e("wooden dry tone", "Natural dry wooden percussion character"),
      e("metallic resonant tone", "Percussion rings with metallic resonance"),
    ],
    groove: [
      e("offbeat click grid", "Clicks sit around the offbeats"),
      e("polyrhythmic taps", "Percussion implies a second rhythm layer"),
      e("rotating percussion loop", "Percussion accents rotate over time"),
      e("minimal fill fragments", "Tiny fills appear without breaking the groove"),
      e("call-response percussion", "Percussion phrase answers itself"),
    ],
  },
  clap: {
    sound: [
      e("909 clap", "Classic techno clap layer"),
      e("808 snare-clap", "Vintage snare/clap hybrid"),
      e("noise clap", "Synthetic noise-based clap"),
      e("rim-clap stack", "Clap layered with rimshot click"),
      e("tiny clap tick", "Very short clap detail for minimal patterns"),
    ],
    tone: [
      e("plate reverb clap", "Clap with plate-style reverb"),
      e("gated reverb clap", "Reverb tail gated into rhythmic shape"),
      e("tape slap clap", "Short slapback delay colors the clap"),
      e("dark filtered clap", "Clap is filtered darker for deep sections"),
    ],
    groove: [
      e("clap skip variation", "Occasional clap omission creates motion"),
      e("pre-drop clap lift", "Clap activity increases before drop"),
      e("shadow clap layer", "Quiet clap layer below main percussion"),
    ],
  },
  synth: {
    sound: [
      e("TB-303 acid line", "Classic resonant acid synth pattern"),
      e("Moog lead pulse", "Warm mono lead pulse with rounded tone"),
      e("Prophet-5 stab", "Warm vintage poly synth stab"),
      e("Access Virus pluck", "Digital club pluck with clean edge"),
      e("FM bell pluck", "Digital bell-like pluck for minimal accents"),
      e("modular bleep sequence", "Small modular bleeps in repeating pattern"),
      e("granular synth flecks", "Tiny granular synth fragments"),
    ],
    tone: [
      e("melancholic two-note melody", "Simple two-note melodic figure with minor emotion"),
      e("dreamy filtered melody", "Soft melodic phrase shaped by filter"),
      e("intelligent micro-melody", "Subtle clever melodic movement without pop lead"),
      e("tricky rhythmic motif", "Synth motif feels rhythmically clever"),
      e("delayed synth pattern", "Delay becomes part of the synth rhythm"),
      e("tape-warped synth", "Slight pitch and timing instability"),
    ],
    groove: [
      e("upward arpeggiator", "Arp rises through notes repeatedly"),
      e("downward arpeggiator", "Arp falls through notes repeatedly"),
      e("random arpeggiator", "Arp pattern feels semi-random and modular"),
      e("gated synth rhythm", "Synth chopped rhythmically like a gate"),
      e("snips and chops", "Short synth snippets cut into rhythm"),
      e("shadow modulation", "Modulation sits quietly behind the main groove"),
    ],
  },
  vocals: {
    sound: [
      e("granular vocal fragments", "Micro-sliced vocals like digital grains"),
      e("vocoder riser voice", "Rising vocoder-based voice transition"),
      e("robot voice stabs", "Robotic voice hits used as rhythm"),
      e("formant percussion", "Formant-shaped voice fragments used as percussion"),
      e("whisper texture bed", "Whisper layer acts as atmosphere"),
    ],
    tone: [
      e("low-mixed vocal dust", "Vocal texture is barely audible and atmospheric"),
      e("tape-delayed voice", "Voice fragment repeats through tape-style delay"),
      e("metallic vocoder tone", "Vocoder has metallic synthetic edge"),
      e("breathy close texture", "Voice feels close but not lyrical"),
      e("robotic formant shift", "Voice is transformed into machine-like timbre"),
    ],
    groove: [
      e("vocal snips and chops", "Tiny vocal cuts act as rhythmic material"),
      e("stuttered breath rhythm", "Breath fragments repeat in rhythm"),
      e("call-response vocal hits", "Short vocal hits answer each other"),
      e("pre-drop vocal tease", "Small vocal fragment cues the drop"),
      e("offbeat vowel groove", "Vowel hits sit around offbeats"),
    ],
  },
  chords: {
    sound: [
      e("Juno chord haze", "Warm chorus-like analog chord haze"),
      e("Prophet chord pad", "Vintage poly synth chord body"),
      e("minor seventh stabs", "Deep house-influenced minor seventh chord hits"),
      e("FM glass chords", "Clear digital chord texture"),
      e("organ-like dub stabs", "Organ-colored chord stabs with delay"),
    ],
    tone: [
      e("tape-delayed chords", "Chords repeat through warm tape delay"),
      e("filtered melancholic chords", "Dark filtered harmonic movement"),
      e("dreamy suspended harmony", "Suspended unresolved harmonic feel"),
      e("intelligent chord inversion", "Chord voicing feels subtle and musical"),
      e("wide chorus chords", "Chords have gentle chorus width"),
    ],
    groove: [
      e("offbeat dub stabs", "Chord hits placed on offbeats"),
      e("chord stab echo rhythm", "Delay repeats create the rhythm"),
      e("slow chord automation", "Chord tone evolves slowly through filters"),
      e("second-groove chord variation", "Chord pattern changes in later groove"),
    ],
  },
  pads: {
    sound: [
      e("Juno-style pad", "Warm chorus pad with vintage color"),
      e("Prophet-style pad", "Lush analog poly pad"),
      e("granular pad mist", "Granular atmospheric pad texture"),
      e("noisy air pad", "Noise-based airy pad layer"),
      e("dark drone bed", "Low dark sustained atmosphere"),
    ],
    tone: [
      e("melancholic atmosphere", "Subtle sad emotional atmosphere"),
      e("dreamy stereo wash", "Wide soft stereo pad texture"),
      e("filtered tape haze", "Pad filtered and colored by tape-like softness"),
      e("modulated pad shimmer", "Slow modulation gives shimmer"),
      e("distant room pad", "Pad feels far back in the mix"),
    ],
    groove: [
      e("pad swell into break", "Pad rises into breakdown"),
      e("subtle LFO motion", "Slow LFO movement keeps pad alive"),
      e("breathing sidechain pad", "Pad ducks gently with the kick"),
      e("long-form evolution", "Pad changes gradually over many bars"),
    ],
  },
  fx: {
    sound: [
      e("spring reverb splash", "Short spring-like splash for dub texture"),
      e("bitcrushed delay", "Delay repeats have digital degradation"),
      e("granular spray", "Granular particles scatter through the mix"),
      e("vinyl crackle bed", "Vinyl crackle used as texture"),
      e("modular noise burst", "Short modular noise accent"),
    ],
    tone: [
      e("dub feedback cloud", "Delay feedback creates a cloud around elements"),
      e("filtered tape echo", "Tape echo filtered dark or bright over time"),
      e("phaser movement", "Phase modulation adds motion"),
      e("flanger sweep", "Flanger sweep creates metallic movement"),
      e("space echo color", "Classic dub echo coloration"),
    ],
    groove: [
      e("two-beat effect throw", "Short burst of delay or reverb over two beats"),
      e("bar-end glitch", "Glitch appears at the end of the bar"),
      e("shadow FX pulse", "Quiet FX pulse supports rhythm"),
      e("automation punctuation", "Effect movement marks phrase boundaries"),
    ],
  },
  transitions: {
    sound: [
      e("impact hit", "Short impact marks a section change"),
      e("sub drop", "Low falling effect at transition point"),
      e("white-noise sweep", "White noise sweeps into the next section"),
      e("reverse cymbal", "Reversed cymbal builds into a transition"),
      e("dub delay spill", "Delay spills over the section boundary"),
    ],
    tone: [
      e("tension filter close", "Filter closes to reduce energy before the next section"),
      e("wide stereo lift", "Stereo width increases before transition"),
      e("dark breakdown wash", "Dark wash opens space in breakdown"),
      e("tape stop moment", "Brief tape-stop style transition"),
    ],
    groove: [
      e("one-bar turnaround", "Final bar changes to lead into next section"),
      e("two-bar transition fill", "Two-bar fill connects sections"),
      e("percussion drop-out", "Percussion cuts out for transition impact"),
      e("bass return cue", "Bass returns as the signal for groove return"),
      e("delayed drop entry", "Drop enters slightly after expected point"),
    ],
  },
};

Object.entries(EXTRA_TAG_GROUPS).forEach(([instrumentId, groups]) => {
  Object.entries(groups).forEach(([group, tags]) => {
    TAG_GROUPS[instrumentId][group].push(...tags);
  });
});

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

export const EXCLUDE_GROUPS = {
  commercialMainstream: [
    e("commercial radio pop", "Avoid generic mass-market radio polish"),
    e("mainstream pop structure", "Avoid predictable verse chorus bridge formatting"),
    e("catchy pop hook", "Avoid obvious singalong hook behavior"),
    e("anthemic festival chorus", "Avoid big crowd-pleasing chorus energy"),
    e("cheap commercial dance sound", "Avoid bargain-bin dance production"),
    e("corporate background music", "Avoid stock-library or advertising feel"),
    e("generic playlist filler", "Avoid anonymous algorithmic mainstream output"),
    e("novelty song energy", "Avoid comedic or gimmicky writing"),
    e("overly catchy topline", "Avoid vocal/melodic hooks overpowering the groove"),
    e("cheesy emotional lift", "Avoid sentimental pop build"),
  ],
  vocals: [
    e("lead vocal", "Avoid a foreground singer"),
    e("full sung verse", "Avoid traditional sung vocal sections"),
    e("pop vocal hook", "Avoid vocal chorus behavior"),
    e("rap verse", "Avoid rap delivery"),
    e("spoken word lead", "Avoid spoken narration as main focus"),
    e("choir", "Avoid choral pads or group vocals"),
    e("gospel vocals", "Avoid gospel-style vocal power"),
    e("belted vocal", "Avoid loud belting"),
    e("autotune vocal", "Avoid obvious tuned vocal character"),
    e("vocaloid pop voice", "Avoid anime/vocaloid lead feel"),
    e("cheesy vocal adlibs", "Avoid pop adlibs and hype phrases"),
    e("shouted chorus", "Avoid shouted hook delivery"),
  ],
  edmFestival: [
    e("EDM festival drop", "Avoid explosive EDM drop structure"),
    e("big room house", "Avoid mainstage big-room feel"),
    e("hands-up trance", "Avoid euphoric commercial trance"),
    e("uplifting trance lead", "Avoid bright euphoric trance melodies"),
    e("supersaw anthem", "Avoid huge stacked saw lead"),
    e("white noise riser climax", "Avoid obvious riser-to-drop formula"),
    e("snare roll build", "Avoid cliché EDM snare roll tension"),
    e("impact boom drop", "Avoid cinematic boom impact at drops"),
    e("festival crowd energy", "Avoid arena/crowd hype"),
    e("brostep wobble drop", "Avoid aggressive dubstep drop vocabulary"),
  ],
  synthsPads: [
    e("bright supersaw", "Avoid overly bright stacked saw synth"),
    e("cheesy trance pluck", "Avoid dated trance pluck melody"),
    e("preset synth lead", "Avoid obvious stock synth lead"),
    e("eurodance synth", "Avoid commercial Eurodance flavor"),
    e("toy keyboard melody", "Avoid thin toy-like melody"),
    e("happy arpeggiator", "Avoid uplifting arpeggio cliché"),
    e("sparkly pop pad", "Avoid glossy pop pad sheen"),
    e("epic cinematic strings", "Avoid cinematic orchestral swell"),
    e("overly melodic lead", "Avoid melody dominating texture and groove"),
    e("saccharine chord progression", "Avoid sugary emotional chords"),
  ],
  drumsGroove: [
    e("generic four-bar loop", "Avoid static stock loop feel"),
    e("stock sample pack drums", "Avoid recognizable generic sample-pack drums"),
    e("overcompressed kick", "Avoid hard clipped commercial kick"),
    e("trap hats", "Avoid rapid trap hi-hat rolls"),
    e("dubstep drums", "Avoid aggressive half-time EDM drums"),
    e("rock drums", "Avoid live rock drum kit feel"),
    e("funky disco claps", "Avoid disco-pop clap pattern"),
    e("latin pop percussion", "Avoid reggaeton/latin pop groove"),
    e("overbusy percussion", "Avoid cluttered percussion fighting the groove"),
    e("obvious fill every bar", "Avoid too many drum fills"),
  ],
  bassLowend: [
    e("808 trap bass", "Avoid trap/hip-hop 808 identity"),
    e("aggressive wobble bass", "Avoid dubstep wobble bass"),
    e("sidechain pump cliché", "Avoid exaggerated commercial pumping"),
    e("distorted rave bass", "Avoid harsh rave bass tone"),
    e("funk slap bass", "Avoid slap bass character"),
    e("bass drop", "Avoid dramatic EDM bass drop gesture"),
    e("muddy low-end", "Avoid uncontrolled low frequency smear"),
    e("boomy sub", "Avoid excessive sub resonance"),
  ],
  fxTransitions: [
    e("laser FX", "Avoid toy-like sci-fi laser effects"),
    e("airhorn", "Avoid party/hype airhorn"),
    e("cartoon FX", "Avoid unserious sound effects"),
    e("dubstep growl FX", "Avoid aggressive growl transitions"),
    e("overused riser", "Avoid stock risers"),
    e("downlifter cliché", "Avoid obvious downlifter formula"),
    e("reverse cymbal every transition", "Avoid repeated transition cliché"),
    e("huge cinematic hit", "Avoid trailer impact sound"),
    e("glitch gimmick", "Avoid distracting glitch-for-glitch sake"),
    e("excessive crash cymbals", "Avoid too many crashes"),
  ],
  mixAesthetic: [
    e("lo-fi amateur mix", "Avoid unpolished amateur sound"),
    e("muddy mix", "Avoid cloudy frequency balance"),
    e("harsh treble", "Avoid piercing high frequencies"),
    e("thin digital sound", "Avoid brittle low-body digital tone"),
    e("overbright master", "Avoid commercial bright loudness"),
    e("brickwall limiting", "Avoid crushed dynamics"),
    e("cheap reverb", "Avoid artificial plasticky reverb"),
    e("dry lifeless mix", "Avoid flat dead production"),
    e("overproduced pop sheen", "Avoid glossy mainstream finish"),
    e("demo quality", "Avoid unfinished sketch sound"),
  ],
  structureArrangement: [
    e("short pop song format", "Avoid short song format instead of club journey"),
    e("verse chorus bridge", "Avoid pop architecture"),
    e("big breakdown chorus", "Avoid dramatic vocal chorus break"),
    e("sudden key change", "Avoid pop modulation trick"),
    e("happy ending cadence", "Avoid resolved commercial ending"),
    e("maximalist arrangement", "Avoid too many layers at once"),
    e("constant new melodies", "Avoid replacing groove with melodic sections"),
    e("obvious drop every 16 bars", "Avoid predictable EDM structure"),
    e("abrupt ending", "Avoid sudden non-DJ ending"),
    e("radio edit length", "Avoid compact radio edit arrangement"),
  ],
};

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

export function createArrangementFromRanges(length, ranges) {
  const blockCount = length / 4;
  const arrangement = Object.fromEntries(INSTRUMENTS.map((instrument) => [instrument.id, Array(blockCount).fill(false)]));

  Object.entries(ranges).forEach(([instrumentId, instrumentRanges]) => {
    instrumentRanges.forEach(([start, end]) => {
      for (let index = Math.max(0, start); index <= Math.min(blockCount - 1, end); index += 1) {
        arrangement[instrumentId][index] = true;
      }
    });
  });

  return arrangement;
}

export function createSelectionsFromMap(map) {
  const selections = createInitialSelections();
  Object.entries(map).forEach(([instrumentId, groups]) => {
    selections[instrumentId] = {
      ...selections[instrumentId],
      ...groups,
    };
  });
  return selections;
}

export const JOURNEY_BLUEPRINTS = [
  {
    id: "opening-drift",
    label: "Track 01 - Opening Drift",
    time: "00:00:00 - 00:04:59",
    summary: "Intro, very calm warm-up with pads, soft sub, muffled kick and slow filter opening.",
    meta: {
      style: "deep dub techno / deep house / minimal afterhours",
      bpm: 122,
      key: "D minor",
      energy: "intro / warm-up",
      mood: "warm, dark, hypnotic, spacious Amsterdam afterhours cellar club",
      groove: "slow opening drift, texture-first dub pulse",
      soundCharacter: "warm analog pads, soft sub bass, muffled kick, dub delay chord stabs, low-pass filter opening",
      length: 64,
      vocalMode: "instrumental-vocal-fx",
    },
    structure: [
      { id: "atmos-open", label: "Atmos Open", role: "intro", start: 1, end: 16, intent: "Begin with deep pads, soft sub undertone, distant dub-delay elements and no full kick." },
      { id: "filtered-pulse", label: "Filtered Pulse", role: "build", start: 17, end: 32, intent: "Muffled kick slowly emerges while low-pass filter opens and sparse hats appear." },
      { id: "bass-define", label: "Bass Define", role: "variation", start: 33, end: 48, intent: "Bass becomes more defined while delay chords stay restrained and warm." },
      { id: "open-out", label: "Open Out", role: "outro", start: 49, end: 64, intent: "Mix opens slightly with more highs, long reverb tails and slow transition readiness." },
    ],
    ranges: {
      pads: [[0, 15]],
      sub: [[0, 15]],
      kick: [[4, 15]],
      hats: [[6, 15]],
      chords: [[2, 15]],
      fx: [[0, 15]],
      transitions: [[12, 15]],
    },
    selections: {
      pads: { sound: ["warm analog pads", "dark drone bed"], tone: ["filtered tape haze", "distant room pad"], groove: ["long-form evolution"] },
      sub: { sound: ["soft low-end bloom", "analog sub oscillator"], tone: ["invisible sub support"], groove: ["held sub tension"] },
      kick: { sound: ["muted kick thump"], tone: ["low-pass softened kick"], groove: ["intro pulse only"] },
      hats: { sound: ["shuffled hats"], tone: ["low-passed hats"], groove: ["shadow hat shuffle"] },
      chords: { sound: ["dub chord stabs"], tone: ["tape-delayed chords"], groove: ["chord stab echo rhythm"] },
      fx: { sound: ["vinyl crackle bed"], tone: ["filtered tape echo"], groove: ["shadow FX pulse"] },
      transitions: { sound: ["white-noise sweep"], tone: ["tension filter close"], groove: ["energy staircase"] },
    },
    notes: "Deep dub techno intro in D minor, warm analog pads, soft sub bass, muffled kick slowly emerging, sparse hi-hats, dub delay chord stabs, long reverb tails, gradual low-pass filter opening.",
  },
  {
    id: "first-pulse",
    label: "Track 02 - First Pulse",
    time: "00:04:59 - 00:08:03",
    summary: "Groove starts properly with firmer kick, rolling sub bass, short dub stabs and subtle clap.",
    meta: {
      style: "minimal deep house / deep dub techno",
      bpm: 122,
      key: "D minor to F minor",
      energy: "groove begins",
      mood: "smoky underground radio mix, warm and restrained",
      groove: "firm warm pulse with rolling sub movement",
      soundCharacter: "firm warm kick, rolling sub bass, short dub chord stabs, subtle clap, sidechained pads",
      length: 64,
      vocalMode: "instrumental-vocal-fx",
    },
    structure: [
      { id: "pad-handoff", label: "Pad Handoff", role: "intro", start: 1, end: 12, intent: "Previous pad carpet remains briefly and fades under the new groove." },
      { id: "pulse-lock", label: "Pulse Lock", role: "build", start: 13, end: 32, intent: "Kick stabilizes, sub bassline begins moving, chord stabs add small accents." },
      { id: "perc-fill", label: "Perc Fill", role: "variation", start: 33, end: 52, intent: "Add open hats, shaker groove and short delay fills without creating a hook." },
      { id: "soft-mixout", label: "Soft Mixout", role: "outro", start: 53, end: 64, intent: "Intro fog is reduced, old layers high-passed and faded." },
    ],
    ranges: {
      pads: [[0, 5]],
      kick: [[2, 15]],
      bass: [[3, 15]],
      sub: [[3, 15]],
      hats: [[3, 15]],
      clap: [[4, 14]],
      chords: [[3, 15]],
      perc: [[8, 15]],
      fx: [[0, 4], [10, 15]],
      transitions: [[13, 15]],
    },
    selections: {
      kick: { sound: ["rounded kick"], tone: ["warm overdrive"], groove: ["groove pocket"] },
      bass: { sound: ["rolling bassline"], tone: ["warm analog bass"], groove: ["hypnotic bass loop"] },
      sub: { sound: ["sub bass pulse"], tone: ["sidechain breathing"], groove: ["locked with kick"] },
      clap: { sound: ["muted clap layer"], tone: ["dark filtered clap"], groove: ["backbeat accent"] },
      hats: { sound: ["shuffled hats"], tone: ["tape-softened hats"], groove: ["shaker shuffle"] },
      chords: { sound: ["dub chord stabs"], tone: ["tape-delayed chords"], groove: ["delay tail bridge"] },
      fx: { sound: ["filter sweep"], tone: ["dub feedback cloud"], groove: ["automation punctuation"] },
    },
    notes: "Minimal deep house track, firm but warm kick, rolling sub bass, short dub chord stabs, subtle clap, soft shaker groove, background pads sidechained to the kick, no big melody.",
  },
  {
    id: "low-light-motion",
    label: "Track 03 - Low Light Motion",
    time: "00:08:03 - 00:12:51",
    summary: "Darker flowing main groove with steady kick, deep rolling bassline, muted dub chords and hat build.",
    meta: {
      style: "dark deep techno / deep dub techno",
      bpm: 123,
      key: "F minor",
      energy: "dark flowing main groove",
      mood: "low light warehouse atmosphere, elegant and hypnotic",
      groove: "steady four-on-the-floor with dark rolling bass",
      soundCharacter: "deep rolling bassline, muted dub chords, ping-pong delay, closed hats into open hats",
      length: 64,
      vocalMode: "instrumental-vocal-fx",
    },
    structure: [
      { id: "dark-lock", label: "Dark Lock", role: "intro", start: 1, end: 16, intent: "Kick and bass lock into a darker stable club groove." },
      { id: "hat-build", label: "Hat Build", role: "build", start: 17, end: 36, intent: "Closed hats and percussion ticks increase forward motion." },
      { id: "open-ride", label: "Open Ride", role: "drop", start: 37, end: 52, intent: "Open hat or ride layer appears while dub chords stay muted." },
      { id: "filter-out", label: "Filter Out", role: "outro", start: 53, end: 64, intent: "Chord layer is band-passed and bass makes space for the next mix." },
    ],
    ranges: {
      kick: [[0, 15]],
      bass: [[0, 14]],
      sub: [[0, 14]],
      hats: [[1, 15]],
      perc: [[3, 14]],
      chords: [[0, 13]],
      fx: [[7, 15]],
      transitions: [[13, 15]],
    },
    selections: {
      kick: { sound: ["909 punch kick"], tone: ["tight low-end"], groove: ["four-on-the-floor"] },
      bass: { sound: ["deep rounded bass"], tone: ["low-pass filtered"], groove: ["hypnotic bass loop"] },
      hats: { sound: ["909 closed hats", "909 open hat"], tone: ["crisp top-end"], groove: ["hat tension lift"] },
      perc: { sound: ["metallic ticks", "click percussion"], tone: ["metallic resonant tone"], groove: ["offbeat click grid"] },
      chords: { sound: ["dub chord stabs"], tone: ["filtered melancholic chords"], groove: ["chord stab echo rhythm"] },
      fx: { sound: ["reverb swell"], tone: ["phaser movement"], groove: ["bar-end glitch"] },
      transitions: { sound: ["dub delay spill"], tone: ["filtered transition sweep"], groove: ["two-bar transition fill"] },
    },
    notes: "Dark deep techno groove in F minor, steady kick, deep rolling bassline, muted dub chords with ping-pong delay, closed hats building into open hats, band-pass filter movement.",
  },
  {
    id: "glass-tunnel",
    label: "Track 04 - Glass Tunnel",
    time: "00:12:51 - 00:17:25",
    summary: "Airier glassy tunnel with metallic percussion, stereo delay, warm sub and restrained melody.",
    meta: {
      style: "deep melodic techno / minimal deep house",
      bpm: 122,
      key: "G minor",
      energy: "textural and open",
      mood: "glassy tunnel-like progression, airy but deep",
      groove: "constant minimal tunnel movement",
      soundCharacter: "glassy synth textures, soft metallic percussion, warm sub bass, evolving stereo delay",
      length: 64,
      vocalMode: "instrumental-vocal-fx",
    },
    structure: [
      { id: "glass-entry", label: "Glass Entry", role: "intro", start: 1, end: 16, intent: "Minimal drums stay steady while upper textures open." },
      { id: "air-open", label: "Air Open", role: "build", start: 17, end: 32, intent: "Glassy synths, metallic percussion and stereo delay fragments enter." },
      { id: "tunnel-motion", label: "Tunnel Motion", role: "drop", start: 33, end: 52, intent: "Bass remains warm and deep while the mix moves through fine detail." },
      { id: "high-cut", label: "High Cut", role: "outro", start: 53, end: 64, intent: "High end reduces slowly while kick glues the transition." },
    ],
    ranges: {
      kick: [[0, 15]],
      sub: [[0, 15]],
      bass: [[2, 15]],
      synth: [[3, 13]],
      perc: [[2, 15]],
      hats: [[4, 15]],
      pads: [[0, 12]],
      fx: [[3, 15]],
      transitions: [[13, 15]],
    },
    selections: {
      synth: { sound: ["FM bell pluck", "granular synth flecks"], tone: ["dreamy filtered melody"], groove: ["minimal arpeggiator"] },
      perc: { sound: ["metallic ticks", "modular blips"], tone: ["metallic resonant tone"], groove: ["polyrhythmic taps"] },
      sub: { sound: ["analog sub oscillator"], tone: ["controlled sub pressure"], groove: ["pulsing low-frequency movement"] },
      fx: { sound: ["filter sweep"], tone: ["phaser movement"], groove: ["modulation sweep"] },
      pads: { sound: ["noisy air pad"], tone: ["dreamy stereo wash"], groove: ["subtle LFO motion"] },
    },
    notes: "Deep melodic techno in G minor, glassy synth textures, soft metallic percussion, warm sub bass, evolving stereo delay, gentle auto-pan movement, restrained melody.",
  },
  {
    id: "midnight-lift",
    label: "Track 05 - Midnight Lift",
    time: "00:17:25 - 00:21:02",
    summary: "Subtle emotional lift with warmer chords, shimmer hats, ride accents and open reverb sends.",
    meta: {
      style: "atmospheric deep house / deep dub techno",
      bpm: 122,
      key: "C minor",
      energy: "subtle emotional lift",
      mood: "refined, intimate, brighter but not euphoric",
      groove: "gentle lifted afterhours pulse",
      soundCharacter: "warm emotional chords, shimmering hi-hats, subtle ride accents, long reverb sends",
      length: 64,
      vocalMode: "instrumental-vocal-fx",
    },
    structure: [
      { id: "warm-entry", label: "Warm Entry", role: "intro", start: 1, end: 16, intent: "Warm chords open the emotional color while bass remains deep." },
      { id: "upper-motion", label: "Upper Motion", role: "build", start: 17, end: 36, intent: "Hats shimmer, ride accents appear and upper range gains movement." },
      { id: "lift", label: "Lift", role: "drop", start: 37, end: 52, intent: "Track lifts without euphoria, keeping a restrained afterhours character." },
      { id: "filter-away", label: "Filter Away", role: "outro", start: 53, end: 64, intent: "Chord or hat layer is filtered away for the next middle section." },
    ],
    ranges: {
      kick: [[0, 15]],
      bass: [[0, 15]],
      sub: [[0, 15]],
      chords: [[0, 13]],
      hats: [[1, 15]],
      perc: [[4, 13]],
      pads: [[0, 12]],
      fx: [[6, 15]],
      transitions: [[13, 15]],
    },
    selections: {
      chords: { sound: ["minor seventh stabs", "Juno chord haze"], tone: ["dreamy suspended harmony"], groove: ["slow chord automation"] },
      hats: { sound: ["ride shimmer", "909 open hat"], tone: ["air-band shimmer"], groove: ["swinged open hats"] },
      pads: { sound: ["Juno-style pad"], tone: ["melancholic atmosphere"], groove: ["breathing sidechain pad"] },
      fx: { sound: ["reverb swell"], tone: ["space echo color"], groove: ["two-beat effect throw"] },
    },
    notes: "Atmospheric deep house in C minor, warm emotional chords, smooth sub bass, gentle kick, shimmering hi-hats, subtle ride accents, long reverb sends, low-pass chord filter opening.",
  },
  {
    id: "deep-current",
    label: "Track 06 - Deep Current",
    time: "00:21:02 - 00:27:12",
    summary: "Long hypnotic core with pulsing sub, firm kick, delayed stabs, feedback automation and continuous flow.",
    meta: {
      style: "hypnotic deep dub techno",
      bpm: 123,
      key: "C minor",
      energy: "long hypnotic core",
      mood: "meditative underground club atmosphere, immersive continuous flow",
      groove: "long evolving groove with no big drop",
      soundCharacter: "pulsing sub bass, firm kick, delayed chord stabs, feedback dub delay automation",
      length: 96,
      vocalMode: "no-vocals",
    },
    structure: [
      { id: "core-foundation", label: "Foundation", role: "intro", start: 1, end: 24, intent: "Kick and pulsing sub bass establish a long hypnotic foundation." },
      { id: "dub-layer", label: "Dub Layer", role: "build", start: 25, end: 48, intent: "Delayed chord stabs and feedback automation create meditative depth." },
      { id: "ride-pad", label: "Ride + Pad", role: "variation", start: 49, end: 72, intent: "Additional percussion, light ride and wider pad layer appear gradually." },
      { id: "current-out", label: "Current Out", role: "outro", start: 73, end: 96, intent: "Old chords disappear in delay while next bass or kick can be mixed underneath." },
    ],
    ranges: {
      kick: [[0, 23]],
      bass: [[0, 23]],
      sub: [[0, 23]],
      chords: [[2, 21]],
      hats: [[4, 23]],
      perc: [[8, 21]],
      pads: [[10, 20]],
      fx: [[0, 23]],
      transitions: [[18, 23]],
    },
    selections: {
      kick: { sound: ["deep club kick"], tone: ["sub-tail controlled"], groove: ["drop anchor kick"] },
      bass: { sound: ["filtered bass pulse"], tone: ["tape-warmed bass"], groove: ["one-bar loop mutation"] },
      sub: { sound: ["sub bass pulse"], tone: ["sidechain breathing"], groove: ["locked with kick"] },
      chords: { sound: ["dub chord stabs"], tone: ["tape-delayed chords"], groove: ["chord stab echo rhythm"] },
      hats: { sound: ["shuffled hats", "ride shimmer"], tone: ["dusty hat layer"], groove: ["16th hat engine"] },
      fx: { sound: ["tape delay feedback"], tone: ["dub feedback cloud"], groove: ["automation punctuation"] },
    },
    notes: "Hypnotic deep dub techno in C minor, long evolving groove, pulsing sub bass, firm kick, delayed chord stabs, feedback dub delay automation, no vocal, no big drop.",
  },
  {
    id: "night-architecture",
    label: "Track 07 - Night Architecture",
    time: "00:27:12 - 00:32:30",
    summary: "More structured club momentum with tighter kick, dry hats, rolling bass and precise rhythmic architecture.",
    meta: {
      style: "driving deep tech house / deep techno",
      bpm: 124,
      key: "F minor",
      energy: "structured driving club momentum",
      mood: "dark elegant and minimal, architectural rhythm section",
      groove: "precise kick bass hat chord delay framework",
      soundCharacter: "tight punchy kick, dry hats, rolling bassline, short synth stabs, dub delay throws",
      length: 64,
      vocalMode: "instrumental-vocal-fx",
    },
    structure: [
      { id: "direct-entry", label: "Direct Entry", role: "intro", start: 1, end: 16, intent: "Kick becomes more direct and hats sit clearly in the pocket." },
      { id: "architecture", label: "Architecture", role: "build", start: 17, end: 36, intent: "Kick, bass, hat, chord and delay form a precise minimalist frame." },
      { id: "club-loop", label: "Club Loop", role: "drop", start: 37, end: 52, intent: "Additional percussion or clap increases the club drive without clutter." },
      { id: "low-cut", label: "Low Cut", role: "outro", start: 53, end: 64, intent: "Bassline is reduced or filtered while delay remains standing." },
    ],
    ranges: {
      kick: [[0, 15]],
      bass: [[0, 14]],
      sub: [[0, 14]],
      hats: [[0, 15]],
      perc: [[3, 15]],
      clap: [[6, 13]],
      synth: [[4, 12]],
      chords: [[0, 13]],
      fx: [[6, 15]],
      transitions: [[13, 15]],
    },
    selections: {
      kick: { sound: ["909 punch kick"], tone: ["clicky attack"], groove: ["groove pocket"] },
      bass: { sound: ["rolling bassline"], tone: ["tricky filter accent"], groove: ["late bass accent"] },
      hats: { sound: ["909 closed hats"], tone: ["crisp top-end"], groove: ["16th hat engine"] },
      perc: { sound: ["909 rimshot", "click percussion"], tone: ["phaser movement"], groove: ["rotating percussion loop"] },
      clap: { sound: ["short room clap"], tone: ["short room clap"], groove: ["backbeat accent"] },
      synth: { sound: ["short synth stabs", "modular bleep sequence"], tone: ["tricky rhythmic motif"], groove: ["gated synth rhythm"] },
      fx: { sound: ["delay throws"], tone: ["phaser movement"], groove: ["automation punctuation"] },
    },
    notes: "Driving deep tech house in F minor, tight punchy kick, architectural rhythm section, rolling bassline, dry hi-hats, short synth stabs, phaser on percussion, dub delay throws.",
  },
  {
    id: "closing-horizon",
    label: "Track 08 - Closing Horizon",
    time: "00:32:30 - 00:44:58",
    summary: "Extended final horizon with club groove slowly dissolving into pads, long tape delays and filtered outro.",
    meta: {
      style: "extended deep techno closing track",
      bpm: 122,
      key: "F minor",
      energy: "long atmospheric closing journey",
      mood: "cinematic afterhours outro, emotional release without vocals",
      groove: "gradually dissolving club groove",
      soundCharacter: "spacious warm pads, deep sub pulse, dub chord echoes, long tape delay tails, low-pass closing",
      length: 128,
      vocalMode: "no-vocals",
    },
    structure: [
      { id: "full-takeover", label: "Full Takeover", role: "intro", start: 1, end: 32, intent: "Club groove still present with kick, bass, chords and hats." },
      { id: "space-expand", label: "Space Expand", role: "build", start: 33, end: 64, intent: "Pads widen, delay gets longer and atmosphere takes more space." },
      { id: "reduce-perc", label: "Reduce Perc", role: "break", start: 65, end: 88, intent: "Percussion and hats reduce while reverb tails become more important." },
      { id: "filtered-horizon", label: "Filtered Horizon", role: "outro", start: 89, end: 128, intent: "Kick and bass become muted, filter closes, pads and reverb remain until the end." },
    ],
    ranges: {
      kick: [[0, 23]],
      bass: [[0, 22]],
      sub: [[0, 24]],
      chords: [[0, 25]],
      hats: [[0, 20]],
      perc: [[4, 18]],
      pads: [[0, 31]],
      fx: [[0, 31]],
      transitions: [[20, 31]],
    },
    selections: {
      pads: { sound: ["spacious warm pads", "Prophet-style pad"], tone: ["dreamy stereo wash"], groove: ["long-form evolution"] },
      kick: { sound: ["soft but steady kick", "rounded kick"], tone: ["low-pass softened kick"], groove: ["intro pulse only"] },
      sub: { sound: ["deep sub pulse", "pure sine sub"], tone: ["rounded sub decay"], groove: ["sub drop return"] },
      chords: { sound: ["dub chord stabs"], tone: ["tape-delayed chords"], groove: ["delay tail bridge"] },
      hats: { sound: ["shuffled hats"], tone: ["low-passed hats"], groove: ["hat mute break"] },
      fx: { sound: ["tape delay feedback", "reverb swell"], tone: ["dub feedback cloud"], groove: ["shadow FX pulse"] },
      transitions: { sound: ["dub delay spill"], tone: ["tension filter close"], groove: ["subtractive outro"] },
    },
    notes: "Extended deep techno closing track in F minor, spacious warm pads, soft steady kick, deep sub pulse, dub chord echoes, gradually reducing percussion, long tape delay tails, low-pass filter slowly closing.",
  },
];

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
