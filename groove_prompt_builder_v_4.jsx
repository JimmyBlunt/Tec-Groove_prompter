import React, { useMemo, useState } from "react";

const SECTIONS = [
  { id: "kick", label: "Kick" , color: "#ff4d4d" },
  { id: "perc", label: "Percussion", color: "#ff9f1c" },
  { id: "hats", label: "Hats", color: "#ffd166" },
  { id: "clap", label: "Claps", color: "#06d6a0" },
  { id: "bass", label: "Bass", color: "#118ab2" },
  { id: "sub", label: "Sub Bass", color: "#073b4c" },
  { id: "synth", label: "Synth", color: "#8338ec" },
  { id: "vocals", label: "Vocals", color: "#ef476f" },
  { id: "chords", label: "Chords", color: "#3a86ff" },
  { id: "pads", label: "Pads", color: "#8ecae6" },
  { id: "fx", label: "FX / Transitions", color: "#adb5bd" },
];

const DEFAULT = (label) => `${label.toLowerCase()} pattern, evolving groove, minimal techno structure`;

const DEFAULT_BARS = 32;

const STRUCTURE = [
  { name: "INTRO", start: 0, end: 7, color: "#2b2d42" },
  { name: "BUILD 1", start: 8, end: 15, color: "#3a86ff" },
  { name: "BREAK 1", start: 16, end: 19, color: "#8338ec" },
  { name: "DROP 1", start: 20, end: 23, color: "#ff006e" },
  { name: "BUILD 2", start: 24, end: 27, color: "#fb5607" },
  { name: "BREAK 2", start: 28, end: 29, color: "#ffbe0b" },
  { name: "OUTRO", start: 30, end: 31, color: "#1b1b1b" },
];

function makeInitialTimeline() {
  const obj = {};
  SECTIONS.forEach((s) => {
    obj[s.id] = Array.from({ length: DEFAULT_BARS }, () => 0);
  });
  return obj;
}

const WIZARD = [
  {
    key: "kick",
    label: "Kick Style",
    options: ["round", "punchy", "dry", "analog", "deep club"]
  },
  {
    key: "bass",
    label: "Bass Style",
    options: ["rolling", "syncopated", "sub-heavy", "dubby"]
  },
  {
    key: "groove",
    label: "Groove Feel",
    options: ["hypnotic", "swung", "tight", "machine", "human"]
  },
  {
    key: "structure",
    label: "Structure Type",
    options: ["loop evolution", "additive", "subtractive", "false drop"]
  }
];

export default function GroovePromptBuilderV3() {
  const [mode, setMode] = useState("wizard");
  const [activeSection, setActiveSection] = useState("bass");

  const [answers, setAnswers] = useState({});
  const [wizardStep, setWizardStep] = useState(0);

  const [textState, setTextState] = useState(() => {
    const obj = {};
    SECTIONS.forEach((s) => (obj[s.id] = DEFAULT(s.label)));
    return obj;
  });

  const [timeline, setTimeline] = useState(makeInitialTimeline);

  const currentQuestion = WIZARD[wizardStep];

  const selectOption = (value) => {
    const key = currentQuestion.key;
    setAnswers((p) => ({ ...p, [key]: value }));

    if (wizardStep < WIZARD.length - 1) {
      setWizardStep(wizardStep + 1);
    } else {
      setMode("editor");
    }
  };

  const toggleCell = (section, barIndex) => {
    setTimeline((prev) => {
      const next = { ...prev };
      next[section] = [...next[section]];
      next[section][barIndex] = next[section][barIndex] ? 0 : 1;
      return next;
    });
  };

  const columnIntensity = useMemo(() => {
    return Array.from({ length: DEFAULT_BARS }, (_, i) => {
      let sum = 0;
      SECTIONS.forEach(s => sum += timeline[s.id][i]);
      return sum / SECTIONS.length;
    });
  }, [timeline]);

  const generatedPrompt = useMemo(() => {
    let output = "MINIMAL TECH HOUSE / DEEP TECHNO PROMPT\n123-124 BPM\n\n";

    output += "[AI STRUCTURE INPUT]\n";
    Object.entries(answers).forEach(([k, v]) => {
      output += `${k}: ${v}\n`;
    });

    output += "\n[STRUCTURE MAP]\n";
    STRUCTURE.forEach(s => {
      output += `${s.name}: ${s.start}-${s.end}\n`;
    });

    output += "\n";

    SECTIONS.forEach((s) => {
      const activeBars = timeline[s.id]
        .map((v, i) => (v ? i : null))
        .filter((v) => v !== null);

      output += `[${s.label}]\n`;
      output += textState[s.id] + "\n";
      output += `Active bars: ${activeBars.join(", ")}\n\n`;
    });

    return output;
  }, [answers, timeline, textState]);

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column", background: "#0b0b10", color: "white" }}>

      {/* STRUCTURE BAR */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${DEFAULT_BARS}, 1fr)`, height: 60 }}>
        {Array.from({ length: DEFAULT_BARS }).map((_, i) => {
          const seg = STRUCTURE.find(s => i >= s.start && i <= s.end);
          return (
            <div key={i} style={{ background: seg?.color || "#111", fontSize: 10, textAlign: "center" }}>
              {seg?.name?.split(" ")[0]}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flex: 1 }}>

        {/* WIZARD */}
        <div style={{ width: 300, borderRight: "1px solid #222", padding: 10 }}>
          <h3>AI Song Builder</h3>

          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>
              {currentQuestion.label}
            </div>

            {currentQuestion.options.map(opt => (
              <button
                key={opt}
                onClick={() => selectOption(opt)}
                style={{ display: "block", width: "100%", marginBottom: 6 }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* EDITOR */}
        <div style={{ flex: 1, padding: 10 }}>
          <h3>Timeline Editor</h3>

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${DEFAULT_BARS}, 20px)` }}>
            {SECTIONS.map(s => (
              <React.Fragment key={s.id}>
                {timeline[s.id].map((v, i) => (
                  <div
                    key={i}
                    onClick={() => toggleCell(s.id, i)}
                    style={{
                      width: 18,
                      height: 18,
                      margin: 1,
                      background: v ? s.color : "#1a1a1a",
                      opacity: 0.3 + columnIntensity[i] * 0.7,
                      cursor: "pointer"
                    }}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>

        </div>

        {/* OUTPUT */}
        <div style={{ width: 420, borderLeft: "1px solid #222", padding: 10 }}>
          <pre style={{ fontSize: 11, whiteSpace: "pre-wrap" }}>
            {generatedPrompt}
          </pre>
        </div>

      </div>
    </div>
  );
}
