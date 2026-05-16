# Suno Prompt Research - Style, Lyrics, Vocal/Structure Control

Research date: 2026-05-17

## 1. Executive Summary

The current Groove Prompt Builder V1 produces one detailed prompt, but Suno works better when we split output into dedicated fields:

1. **Style Prompt / Style of Music**
   - Global sound world.
   - Genre, BPM, key, mood, core instruments, production texture, vocal identity.
   - Must be compact.
   - Treat the 1000-character style limit as a hard design constraint.

2. **Lyrics / Vocal Prompt / Structure Field**
   - Local sequential control.
   - Best place for section tags, arrangement cues, vocal cues, instrumental breaks, FX moments, drops, builds, and outro/fade behavior.
   - This can carry more of the track structure than the style field.

3. **Exclude / Negative Prompt**
   - Suno has an Advanced Options > Exclude field.
   - Best place for unwanted elements such as pop chorus, EDM festival drop, lead vocal, bright trance synths, etc.

Recommended app change:

- Add separate outputs:
  - **Suno Style Prompt** with live character counter and 1000-char budget.
  - **Suno Lyrics / Structure Prompt** with bracketed section tags.
  - **Suno Exclude Prompt**.
  - Optional **Full Internal Blueprint** for our own detailed reference.

## 2. Source Reliability

### High Confidence

Official Suno help confirms:

- Custom mode provides extra fields including lyrics.
- V4.5 accepts more detailed style instructions.
- Suno recommends adding extra context directly in the Lyrics box.
- Exclude exists for elements you do not want.

Sources:

- Suno Help: "Can I use my own lyrics?"  
  https://help.suno.com/en/articles/2415873
- Suno Help: "Create in V4.5: Detailed Style Instructions"  
  https://help.suno.com/en/articles/5782849
- Suno Help: "Create in V4.5: Better Prompts in Lyrics"  
  https://help.suno.com/en/articles/5782977
- Suno Help: "How do I exclude elements of a song?"  
  https://help.suno.com/en/articles/3161921

### Medium Confidence

The exact style-character limit is not clearly shown in the official Suno Help articles found during research, but multiple API/community-oriented sources state a 1000-character limit for the style/tags field in newer Suno models.

Sources:

- SunoAPI docs: `tags` for v4.5+/v5 should generally not exceed 1000 characters; lyrics/prompt should generally not exceed 5000 characters.  
  https://docs.sunoapi.com/suno-api-instructions
- SunoApi.org old docs: style length limit for V4.5/V4.5PLUS listed as 1000 characters.  
  https://old-docs.sunoapi.org/suno-api/generate-music/
- Community/guide sources repeatedly describe 1000 characters as the practical style prompt budget.

Decision:

- Treat 1000 chars as hard limit in the app.
- Target 850-950 chars max for the compiled style prompt.
- Show warning at 900, error at 1000.

### Lower Confidence / Community Guidance

Metatags and vocal-control tips are heavily documented by community guides and Reddit. They are useful but should be treated as probabilistic, not deterministic.

Sources:

- HookGenius metatag reference:  
  https://hookgenius.app/learn/suno-metatags-complete-list/
- HookGenius vocal prompt analysis:  
  https://hookgenius.app/learn/suno-vocal-prompts/
- Reddit r/SunoAI guide on Style field vs Lyrics field:
  https://www.reddit.com/r/SunoAI/comments/1od1cll/how_to_use_tags_properly/

Decision:

- Use metatags as structured guidance.
- Avoid fake parameter tags like `[Reverb: 30%]`, `[Bass: 80%]`, `[Compression: Medium]`.
- Prefer descriptive musical language: `reverb-heavy`, `wide stereo`, `deep sub-bass`, `tight mix`.

## 3. Suno Field Strategy

### A. Style Prompt

Purpose:

- Defines the global musical identity.
- Should not carry the full arrangement map.

Recommended structure:

```text
Minimal deep tech house, 124 BPM, A minor, deep hypnotic late-night groove, rolling bassline, deep club kick, shuffled hats, ghost percussion, dub chord stabs, tape-delay FX, warm analog mix, spacious stereo, restrained drop, DJ-friendly arrangement, no pop chorus, no EDM festival drop
```

Compression principles:

- Use dense sonic nouns and adjectives.
- Avoid full sentences where a tag phrase works.
- Put highest-priority information first.
- Avoid redundant mood stacks.
- Avoid numeric pseudo-parameters.
- Use exclusions in Exclude field where possible instead of spending style characters.

Suggested field order:

1. Genre / subgenre
2. BPM / key
3. energy / mood
4. groove identity
5. key rhythm instruments
6. harmonic / atmospheric elements
7. FX / transition identity
8. mix / production texture
9. compact structure intent

### B. Lyrics / Structure / Vocal Prompt

Purpose:

- Controls timeline and local section behavior.
- Best place for bracketed section tags.
- Can describe instrumental sections even if no full lyrics are used.

Recommended structure for mostly instrumental club music:

```text
[Intro]
[Instrumental]
Sparse kick texture, filtered noise, ghost hats, DJ-friendly opening.

[Build]
Add rolling bassline, shuffled hats, rim clicks, subtle dub chords, rising filter movement.

[Breakdown]
[Vocal Chop] [Breathy]
Bass mute, reverb swell, delay throws, ghost vocal fragments, spacious tension.

[Drop]
[Instrumental]
Groove return, deep kick and bass locked, hats and percussion full, restrained club energy.

[Outro]
[Fade Out]
Subtractive drums, delay tail bridge, DJ-friendly mix-out.
```

Important:

- Place section tags on their own line.
- Use local section cues in concise language.
- Use vocal delivery tags only where vocals are actually desired.
- Reinforce style prompt rather than contradict it.

### C. Exclude Prompt

Purpose:

- Remove unwanted global elements.

Recommended defaults for this project:

```text
pop chorus, verse-chorus radio structure, EDM festival drop, big trance lead, rock guitars, acoustic singer-songwriter, bright supersaw, cheesy vocals
```

For instrumental/dub workflows:

```text
full lead vocal, pop hook, rap verse, choir, aggressive vocal belting
```

## 4. Vocal Prompt Findings

Suno vocal control appears to work best when split between:

- Global vocal identity in Style Prompt.
- Section-specific vocal behavior in Lyrics field.

For this app, vocals are usually not lead-singer vocals. They are:

- chopped vocals
- ghost vocal chops
- breath chops
- vowel hits
- vocoder textures
- filtered vocal sweeps
- delay throws
- reversed vocal tails
- glitch vocal fills

Recommended vocal strategy:

### Global Style Prompt Examples

```text
ghost vocal chops, breathy fragments, vocoder textures, delay throws
```

or:

```text
minimal vocal fragments only, no lead vocal
```

### Lyrics / Structure Prompt Examples

```text
[Breakdown] [Breathy Vocal Chop]
Bass mute, ghost vocal fragments, reverb swell, delay throws.
```

```text
[Build] [Vocal Stutter]
Filtered vocal sweeps and short vowel hits increase tension.
```

```text
[Drop] [Instrumental]
No lead vocal, only tiny breath chops as percussion.
```

Avoid:

```text
[Reverb: 30%]
[Vocal Volume: Low]
[Bass: 80%]
```

Use instead:

```text
reverb-heavy ghost vocal chops
low-mixed breath fragments
deep sub-bass pressure
```

## 5. Minimal Tech House Library Expansion Plan

The existing `minimal_tech_house_prompt_library.md` is a strong starting point, but should be converted into structured app data and expanded with Suno-specific prompt roles.

### Add Metadata Per Tag

Each tag should have:

- `label`
- `category`
- `instrument`
- `sectionRoles`
- `styleAffinities`
- `promptWeight`
- `sunoField`
- `description`

Example:

```js
{
  label: "ghost vocal chops",
  category: "vocal_fx",
  instrument: "vocals",
  sectionRoles: ["break", "build"],
  styleAffinities: ["deep", "hypnotic", "dub"],
  sunoField: ["style", "lyrics"],
  promptWeight: 0.8,
  description: "Very subtle rhythmic vocal fragments for texture, not lead singing."
}
```

### New / Expanded Categories

#### Kick / Low-End

- deep club kick
- rounded kick
- dry analog kick
- tight low-end
- muted low-end transient
- short saturated kick tail
- kick and bass locked

#### Bass / Sub

- rolling bassline
- dubby low-end
- filtered bass pulse
- ghost bass notes
- sidechained bass
- sub-bass pressure
- hypnotic bass loop
- bass mute

#### Percussion / Clicks

- rim clicks
- metallic ticks
- woodblock micro hits
- muted congas
- dry percussion
- ghost percussion
- shuffled percussion bed
- offbeat click groove
- machine-funk percussion

#### Hats

- shuffled hats
- offbeat hats
- tight closed hats
- ghost hats
- filtered hats
- hi-hat rolls
- hat tension lift

#### FX / Filters / Transitions

- filter sweep
- tape delay feedback
- reverb swell
- reversed tail
- noise riser
- downlifter
- delay tail bridge
- glitch fill
- filtered vocal sweep
- vinyl crackle transition

#### Analog Modulation / Movement

- analog filter movement
- slow LFO modulation
- dub delay feedback
- evolving cutoff automation
- resonant filter pulses
- tape saturation movement
- modular pulse modulation

#### Arpeggiator / Synth Motion

- muted synth motif
- modular synth pulses
- filtered plucks
- detuned synth pulse
- minimal arpeggio
- restrained arpeggiator
- percussive synth sequence

#### Structure / Arrangement

- DJ-friendly intro
- additive arrangement
- subtractive outro
- energy staircase
- micro-breakdown
- central breakdown
- bass mute
- kick mute
- restrained drop
- groove return
- second groove variation
- percussion swap
- delay tail bridge

## 6. Recommended Compiler Changes

### Current Problem

Current V1 prompt is detailed but too long for Suno's Style field and mixes global identity with section/timeline details.

### Proposed Output Modes

1. **Compact Style**
   - Max 1000 chars.
   - Target 850-950 chars.
   - Built for Suno Style field.

2. **Lyrics / Structure**
   - Bracketed Suno tags.
   - Section-by-section arrangement.
   - Can include vocal chop/FX cues.
   - Built for Suno Lyrics field.

3. **Exclude**
   - Short negative prompt.
   - Built for Suno Advanced Exclude.

4. **Blueprint**
   - Full internal detailed arrangement.
   - Not intended to paste directly into Style.

### Proposed UI Changes

- Replace one prompt preview with tabs:
  - `Style`
  - `Lyrics / Structure`
  - `Exclude`
  - `Blueprint`
- Add character counter to Style tab:
  - green < 850
  - amber 850-999
  - red >= 1000
- Add prompt density mode:
  - `Compact`
  - `Balanced`
  - `Detailed Blueprint`
- Add "Suno Custom Mode" helper labels:
  - Style Prompt -> paste into Style of Music
  - Lyrics / Structure -> paste into Lyrics
  - Exclude -> paste into Advanced Options > Exclude

## 7. Implementation Proposal for V1.1

Do not implement until reviewed.

### Task 1 - Convert Library to Structured Data

- Expand `src/data/musicModel.js`.
- Introduce `promptTags` with metadata.
- Preserve existing visible tags but add more categories.

### Task 2 - Add Suno Output Compiler

Create:

- `compileSunoStylePrompt()`
- `compileSunoLyricsStructurePrompt()`
- `compileSunoExcludePrompt()`
- `compileBlueprintPrompt()`

### Task 3 - Add Prompt Tabs and Counters

- UI tabs in prompt panel.
- Live character count.
- Warnings at 900 and 1000 chars.

### Task 4 - Expand Elements and Structure Options

- More tag groups per instrument.
- Section-specific quick-add bundles.
- Structure presets for 32/64/96/128 bars.
- Specific minimal/deep/dub structure templates.

### Task 5 - Add Vocal/FX Structure Control

- Vocal prompt mode:
  - no vocals
  - ghost vocal chops
  - spoken fragments
  - vocoder texture
  - breath percussion
- Add local section tags:
  - `[Instrumental]`
  - `[Breakdown]`
  - `[Build]`
  - `[Drop]`
  - `[Vocal Chop]`
  - `[Fade Out]`

### Task 6 - Test With Example Outputs

Prepare sample exports for:

- Deep Hypnotic 64 bars
- Dub Tech 96 bars
- Driving Club 128 bars
- Minimal Machine 32 bars

Manually verify:

- Style prompt <= 1000 chars.
- Style prompt still contains genre, BPM, key, groove, instruments, mix.
- Lyrics/Structure prompt carries timeline and section behavior.
- Exclude field removes unwanted pop/EDM behavior.

## 8. Open Decisions Before Implementation

1. Should V1.1 support instrumental mode explicitly?
   - Option A: default instrumental with optional vocal FX.
   - Option B: allow lead vocal modes.

2. Should the app show bar numbers in Suno Lyrics prompts?
   - Example: `[Intro: bars 1-16]`
   - This is musically helpful, but Suno may treat it as text rather than exact timing.

3. Should we keep the current full Blueprint prompt visible?
   - Recommended: yes, but label it "internal / reference", not Suno Style.

4. Should Exclude defaults be editable per preset?
   - Recommended: yes.

5. Should German output remain available?
   - Recommended: yes for notes/blueprint, but English remains default for Suno.

