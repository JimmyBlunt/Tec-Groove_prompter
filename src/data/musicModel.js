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
