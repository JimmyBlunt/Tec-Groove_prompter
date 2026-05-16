# Groove Prompt Builder - Project Implementation Plan

## 1. Confirmed Product Goal

Build a local, browser-based composition and prompt design system for:

- Minimal Techno
- Deep Tech House
- Dub Techno
- Hypnotic Club Music

The app should not be a plain text prompt editor. It should behave like a compact music workbench: part guided composition assistant, part arrangement visualizer, part structured prompt compiler.

The main output is a high-quality prompt, especially for Suno, generated from explicit musical decisions:

- track identity
- BPM, key, energy, mood
- arrangement structure
- instrument layers
- section-specific activity
- groove and production tags
- user notes

## 2. Confirmed Decisions

### No AI/API in V1

The first implementation will run without external AI, API keys, or network-dependent generation.

Instead, V1 will use:

- local structured data
- presets
- rule-based recommendations
- prompt templates
- user-selected tags and arrangement choices

This keeps the musical logic transparent, editable, and reliable before adding external AI later.

### Data Model Instead of Database

V1 should use local JavaScript/JSON-style data objects rather than a real database.

Recommended data areas:

- `genres`
- `trackPresets`
- `structurePresets`
- `sections`
- `instruments`
- `tagLibrary`
- `recommendationRules`
- `promptTemplates`

This can later be moved to JSON files, import/export, localStorage, IndexedDB, or a backend database if needed.

### UI Interaction Model

Drag and drop is not required for V1.

Recommended V1 interaction pattern:

- clickable chips/tags for sound and production terms
- segmented controls for major choices
- tabs or cards for main work areas
- multi-select tag groups
- quick-add buttons for section-specific suggestions
- highlighted recommendations based on current song settings

Drag and drop can be added later as an optional V2 workflow once the data model and layout are stable.

### Track Length and Grid

Track length should be variable.

Recommended V1 presets:

- 32 bars: short sketch
- 64 bars: default track idea
- 96 bars: extended arrangement
- 128 bars: DJ-friendly club arrangement

The main visual/editing unit should be 4 bars.

Reasoning:

- 4-bar blocks offer enough control for transitions and micro changes.
- 8-bar phrasing is musically important, but can be represented visually by grouping two 4-bar blocks.
- Individual bar-level editing can be added later if needed.

### Prompt Language

Prompt output should default to English for Suno.

Recommended output modes:

- English for Suno: default
- German: optional
- Hybrid: optional

UI language can be German/English mixed, using English for common production terms where that is clearer.

### Visual Direction

The app should feel like a professional studio tool.

Preferred style:

- dark, minimal, technical
- compact but readable
- transparent grey panels
- clear instrument accent colors
- dense controls without clutter
- large enough timeline/structure visualization for real editing
- inspiration: Ableton Live, Suno, modern audio plugin UIs

Avoid:

- marketing landing-page layout
- oversized decorative cards
- playful unrelated visuals
- UI that hides the grid or structure

## 3. Core App Areas

### A. Song Characteristics Card

Purpose: define the track identity before building the arrangement.

Fields:

- style / genre
- BPM
- key
- energy
- mood
- groove character
- track length
- prompt language
- target tool

Suggested presets:

- Deep Hypnotic
- Dub Tech
- Driving Club
- Minimal Machine
- Warm Late Night

### B. Song Structure Card

Purpose: define and edit the track form.

Requirements:

- visible 4-bar grid
- variable length based on selected track length
- section blocks such as Intro, Build, Break, Drop, Variation, Outro
- section focus on click
- section-specific recommendations
- structure presets

Default 64-bar structure proposal:

- Intro: 1-16
- Build 1: 17-32
- Break: 33-40
- Drop / Main Groove: 41-56
- Outro / Mix Out: 57-64

Default 32-bar structure can preserve the earlier prototype:

- Intro: 1-8
- Build 1: 9-16
- Break 1: 17-20
- Drop 1: 21-24
- Build 2: 25-28
- Break 2: 29-30
- Outro: 31-32

### C. Element / Instrument Editor Card

Purpose: choose instrument behavior, sound tags, and activity per section.

Instrument list:

- Kick
- Bass
- Sub Bass
- Hats
- Percussion
- Claps
- Synth
- Vocals
- Chords
- Pads
- FX / Transitions

Each instrument should support:

- active/inactive by section or 4-bar block
- sound type tags
- tone/texture tags
- groove/movement tags
- optional notes
- recommended tags

Example for Kick:

- sound type: rounded kick, punchy kick, dry analog kick, deep club kick
- tone: warm, tight, soft saturated, low punch
- groove: four-on-the-floor, heartbeat pulse, minimal rolling support

Example for Bass:

- sound type: rolling bassline, syncopated bass, dubby low-end
- movement: hypnotic loop, filtered pulse, ghost notes
- relation: sidechained, locked with kick, sub-heavy

## 4. Arrangement and Energy View

The arrangement view is a central requirement.

It should show:

- horizontal time axis
- 4-bar grid blocks
- instrument rows
- activity per instrument
- section topbar
- energy/density visualization

Energy engine V1:

- calculate active instrument count per block
- normalize density per block
- show opacity/heat intensity based on density
- optionally weight instruments differently later

Example:

- Intro: sparse, transparent
- Build: gradually stronger
- Break: fewer drums, more FX/pads/vocals
- Drop/Main Groove: dense and clear
- Outro: subtractive reduction

## 5. Recommendation Engine V1

Recommendation logic should be local and explainable.

Inputs:

- style
- energy
- selected structure
- active section
- selected instrument
- previous tag choices

Outputs:

- highlighted tags
- quick-add suggestions
- section-specific arrangement ideas

Example rules:

- Dub Techno + Chords => recommend dub chord stabs, tape delay feedback, reverb-soaked chords.
- Deep/Hypnotic + Bass => recommend rolling bassline, hypnotic bass loop, filtered bass pulse.
- Break section => recommend reverb swell, reversed tail, vocal fragments, bass mute.
- Drop/Main Groove => recommend tight low-end, groove pocket, shuffled hats, percussion lock.

## 6. Prompt Compiler

The generated prompt should be structured, readable, and Suno-oriented.

Default output language: English.

Suggested prompt sections:

```text
[TRACK IDENTITY]
Style, BPM, key, energy, mood, target feel.

[ARRANGEMENT]
Section-by-section timeline with bar ranges and musical intent.

[INSTRUMENT LAYERS]
Kick, bass, hats, percussion, synths, vocals, pads, FX.

[ENERGY MAP]
Sparse intro, gradual build, breakdown, main groove, outro.

[PRODUCTION / MIX]
Low-end, stereo field, saturation, reverb/delay, club mix notes.

[USER NOTES]
Additional free-text instructions.
```

The prompt should be concise enough for Suno while still being musically explicit.

## 7. Initial Implementation Tasks

1. Create or confirm React/Vite project structure.
2. Select the new clean V1 implementation path instead of directly extending inconsistent prototype files.
3. Create local data modules for instruments, tags, sections, presets, rules, and prompt templates.
4. Build top-level app state for meta, track length, structure, instrument selections, arrangement activity, and notes.
5. Implement the main studio layout.
6. Implement Song Characteristics card.
7. Implement Song Structure card with variable track length.
8. Implement Element / Instrument Editor card.
9. Implement arrangement grid with 4-bar blocks.
10. Implement energy density calculation.
11. Implement section focus behavior.
12. Implement local recommendation highlighting.
13. Implement live prompt compiler.
14. Implement copy prompt action.
15. Test in browser for layout, readability, and interaction.
16. Review with user before adding advanced features.

## 8. Deferred / V2 Features

- drag and drop tags/cards
- external AI/API integration
- local save/load projects
- export/import JSON
- multiple prompt templates by target tool
- playhead animation
- audio preview
- generative variations
- per-bar editing below 4-bar grid
- weighted energy engine
- advanced adaptive wizard branching

## 9. Open Questions for Later

- Should the app persist projects in localStorage in V1.1?
- Should prompt output include negative instructions such as "avoid pop chorus"?
- Should Suno prompt length be capped or have short/medium/detailed modes?
- Should structure presets include DJ-friendly extended templates by default?
- Should instrument rows support intensity levels, not only active/inactive?
