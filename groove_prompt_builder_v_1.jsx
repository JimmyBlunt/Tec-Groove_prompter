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

export default function GroovePromptBuilderV2() {
  const [mode, setMode] = useState("editor");
  const [bars] = useState(DEFAULT_BARS);
  const [activeSection, setActiveSection] = useState("bass");

  const [textState, setTextState] = useState(() => {
    const obj = {};
    SECTIONS.forEach((s) => (obj[s.id] = DEFAULT(s.label)));
    return obj;
  });

  const [timeline, setTimeline] = useState(makeInitialTimeline);

  const [wizardStep, setWizardStep] = useState(0);

  const questions = [
    { key: "kick", q: "What kick style? (round / punchy / dry / analog / deep club)" },
    { key: "bass", q: "Bass style? (rolling / syncopated / sub-heavy / dubby)" },
    { key: "groove", q: "Groove feel? (hypnotic / swung / tight / machine / human)" },
    { key: "structure", q: "Structure? (loop evolution / additive / subtractive / false drop)" },
  ];

  const toggleCell = (section, barIndex) => {
    setTimeline((prev) => {
      const next = { ...prev };
      next[section] = [...next[section]];
      next[section][barIndex] = next[section][barIndex] ? 0 : 1;
      return next;
    });
  };

  const getStructureColor = (i) => {
    const seg = STRUCTURE.find(s => i >= s.start && i <= s.end);
    return seg ? seg.color : "#111";
  };

  const getStructureLabel = (i) => {
    const seg = STRUCTURE.find(s => i >= s.start && i <= s.end);
    return seg ? seg.name : "";
  };

  const generatedPrompt = useMemo(() => {
    let output = "MINIMAL TECH HOUSE / DEEP TECHNO PROMPT\n123-124 BPM\n\n";

    output += "[STRUCTURE]\n";
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
  }, [timeline, textState]);

  const copy = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    alert("Copied 🚀");
  };

  const currentQ = questions[wizardStep];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0b0b10", color: "white", flexDirection: "column" }}>
      {/* STRUCTURE TOPBAR */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${bars}, 1fr)`, height: 60, borderBottom: "1px solid #222" }}>
        {Array.from({ length: bars }).map((_, i) => {
          const seg = STRUCTURE.find(s => i >= s.start && i <= s.end);
          return (
            <div key={i} style={{
              background: seg ? seg.color : "#111",
              borderRight: "1px solid #222",
              fontSize: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {seg ? seg.name.split(" ")[0] : ""}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* LEFT */}
        <div style={{ width: 260, borderRight: "1px solid #222", padding: 10 }}>
          <h3>Groove Studio V2</h3>

          <button onClick={() => setMode(mode === "editor" ? "wizard" : "editor")}
            style={{ width: "100%", marginBottom: 10 }}
          >
            Switch to {mode === "editor" ? "Wizard" : "Editor"}
          </button>

          {mode === "wizard" && (
            <div style={{ marginTop: 10 }}>
              <div style={{ marginBottom: 10 }}>{currentQ.q}</div>
              <button onClick={() => setWizardStep((s) => Math.max(0, s - 1))}>Back</button>
              <button onClick={() => setWizardStep((s) => Math.min(questions.length - 1, s + 1))}>Next</button>
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            {SECTIONS.map((s) => (
              <div key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{ padding: 8, border: "1px solid #333", marginBottom: 6, cursor: "pointer" }}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER TIMELINE */}
        <div style={{ flex: 1, padding: 10 }}>
          <h3>Timeline (4-bar grid)</h3>

          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${bars}, 20px)` }}>
              {Array.from({ length: bars }).map((_, i) => (
                <div key={i} style={{ fontSize: 8, color: "#666" }}>{i + 1}</div>
              ))}

              {SECTIONS.map((s) => (
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
                        border: "1px solid #222",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          <h3 style={{ marginTop: 20 }}>Active Layer Editor</h3>
          <textarea
            value={textState[activeSection]}
            onChange={(e) => setTextState((p) => ({ ...p, [activeSection]: e.target.value }))}
            style={{ width: "100%", height: 120, background: "#111", color: "white" }}
          />
        </div>

        {/* RIGHT */}
        <div style={{ width: 420, borderLeft: "1px solid #222", padding: 10 }}>
          <button onClick={copy} style={{ width: "100%" }}>Copy Prompt</button>
          <pre style={{ fontSize: 11, whiteSpace: "pre-wrap", marginTop: 10 }}>
            {generatedPrompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
