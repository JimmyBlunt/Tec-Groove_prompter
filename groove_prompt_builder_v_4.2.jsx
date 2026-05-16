import React, { useMemo, useState } from "react";

const SECTIONS = [
  { id: "kick", label: "Kick", color: "#ff4d4d" },
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

const STRUCTURE = [
  { name: "INTRO", start: 0, end: 7, color: "#1f1f2e" },
  { name: "BUILD 1", start: 8, end: 15, color: "#3a86ff" },
  { name: "BREAK 1", start: 16, end: 19, color: "#8338ec" },
  { name: "DROP 1", start: 20, end: 23, color: "#ff006e" },
  { name: "BUILD 2", start: 24, end: 27, color: "#fb5607" },
  { name: "BREAK 2", start: 28, end: 29, color: "#ffbe0b" },
  { name: "OUTRO", start: 30, end: 31, color: "#111111" },
];

const WIZARD = [
  {
    key: "kick",
    q: "Kick character?",
    options: ["round", "punchy", "dry", "analog", "deep club"],
  },
  {
    key: "bass",
    q: "Bass movement?",
    options: ["rolling", "syncopated", "sub-heavy", "dubby"],
  },
  {
    key: "groove",
    q: "Groove feel?",
    options: ["hypnotic", "swung", "tight", "machine", "human"],
  },
  {
    key: "structure",
    q: "Structure type?",
    options: ["loop evolution", "additive", "subtractive", "false drop"],
  },
];

const DEFAULT_BARS = 32;

function initTimeline() {
  const t = {};
  SECTIONS.forEach((s) => {
    t[s.id] = Array(DEFAULT_BARS).fill(0);
  });
  return t;
}

function getSegment(i) {
  return STRUCTURE.find((s) => i >= s.start && i <= s.end);
}

export default function GroovePromptBuilderV4() {
  const [mode, setMode] = useState("wizard");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeline, setTimeline] = useState(initTimeline);
  const [activeSection, setActiveSection] = useState("bass");
  const [focusSegment, setFocusSegment] = useState(null);

  const current = WIZARD[step];

  // ENERGY ENGINE
  const energy = useMemo(() => {
    return Array(DEFAULT_BARS)
      .fill(0)
      .map((_, i) => {
        let sum = 0;
        SECTIONS.forEach((s) => (sum += timeline[s.id][i]));
        return sum / SECTIONS.length;
      });
  }, [timeline]);

  const select = (v) => {
    const key = current.key;
    const next = { ...answers, [key]: v };
    setAnswers(next);

    if (step < WIZARD.length - 1) setStep(step + 1);
    else setMode("editor");
  };

  const toggle = (s, i) => {
    setTimeline((p) => {
      const n = { ...p };
      n[s] = [...n[s]];
      n[s][i] = n[s][i] ? 0 : 1;
      return n;
    });
  };

  const intensityOpacity = (i, active) => {
    const base = energy[i] || 0;
    return active ? 0.25 + base * 0.85 : 0.05;
  };

  const prompt = useMemo(() => {
    let out = "MINIMAL TECH HOUSE / DEEP TECHNO V4\n123-124 BPM\n\n";

    out += "[AI INPUT]\n";
    Object.entries(answers).forEach(([k, v]) => {
      out += `${k}: ${v}\n`;
    });

    out += "\n[STRUCTURE]\n";
    STRUCTURE.forEach((s) => {
      out += `${s.name}: ${s.start}-${s.end}\n`;
    });

    out += "\n";

    SECTIONS.forEach((s) => {
      const active = timeline[s.id]
        .map((v, i) => (v ? i : null))
        .filter(Boolean);

      out += `[${s.label}]\n`;
      out += `bars: ${active.join(", ")}\n\n`;
    });

    return out;
  }, [answers, timeline]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0b0b10", color: "white" }}>

      {/* STRUCTURE OVERVIEW */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${DEFAULT_BARS}, 1fr)`, height: 60 }}>
        {Array.from({ length: DEFAULT_BARS }).map((_, i) => {
          const seg = getSegment(i);
          const focus = !focusSegment || focusSegment === seg?.name;

          return (
            <div
              key={i}
              onClick={() => setFocusSegment(seg?.name)}
              style={{
                background: seg?.color || "#111",
                opacity: focus ? 1 : 0.2,
                transition: "all 0.2s",
                fontSize: 10,
                textAlign: "center",
                cursor: "pointer",
                borderBottom: "1px solid #222",
              }}
            >
              {seg?.name?.slice(0, 4)}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flex: 1 }}>

        {/* WIZARD */}
        <div style={{ width: 280, borderRight: "1px solid #222", padding: 10 }}>
          <h3>AI Song Builder</h3>

          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 10 }}>{current.q}</div>
            {current.options.map((o) => (
              <button
                key={o}
                onClick={() => select(o)}
                style={{ display: "block", width: "100%", marginBottom: 6 }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div style={{ flex: 1, padding: 10 }}>
          <h3>Energy Timeline Engine</h3>

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${DEFAULT_BARS}, 18px)` }}>
            {SECTIONS.map((s) => (
              <React.Fragment key={s.id}>
                {timeline[s.id].map((v, i) => (
                  <div
                    key={i}
                    onClick={() => toggle(s.id, i)}
                    style={{
                      width: 16,
                      height: 16,
                      margin: 1,
                      background: v ? s.color : "#1a1a1a",
                      opacity: intensityOpacity(i, v),
                      border: "1px solid #222",
                      cursor: "pointer",
                      transition: "all 0.15s",
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
            {prompt}
          </pre>
        </div>

      </div>
    </div>
  );
}
