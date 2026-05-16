# Guided Track Builder Research

Research date: 2026-05-17

## Goal

The Guided Track Builder should not only choose a preset. It should ask musical questions that shape:

- overall style and character
- additive or subtractive arrangement logic
- low-end relation between kick, bass and sub
- percussion/click groove focus
- chord/pad/atmosphere role
- FX/transition behavior
- vocal FX role
- section-by-section interaction between elements

## Research Summary

### Minimal / Dub Techno Principles

Relevant patterns from research:

- Dub techno emphasizes muted chord stabs or pads processed through long delay and reverb, warm sub-bass, sparse percussion, low-pass filtering and resonant modulation.
- Effects are not only decoration; delay, feedback, reverb and filtering often act as musical voices.
- Minimal techno relies on repetition, space, subtle variation, small timing shifts, filter automation and careful element entry/exit.
- Arrangement tension often comes from subtraction/reintroduction rather than dramatic drops.
- DJ-friendly club tracks benefit from extended intro/outro sections, gradual element introduction and phrase-level changes every 8 or 16 bars.
- Deep/tech-house arrangements often use intro -> build -> breakdown -> main groove -> variation -> outro, but with restrained transitions rather than pop-song sections.

Sources:

- Tracklister, "What Is Dub Techno?"  
  https://tracklist.live/discover/guide/dub-techno
- Studio Brootle, "Dub Techno Tips"  
  https://www.studiobrootle.com/dub-techno-tips/
- Polarity, "The Classic Dub Techno Chord Stab"  
  https://polarity.me/bitwig-classic-sounddesign/012-dub-chord/
- Lyric Assistant, "Minimal Techno Songwriting Advice"  
  https://lyricassistant.com/minimal-techno-songwriting-advice/
- Prism News, "Seven production rules to tighten your minimal techno tracks"  
  https://www.prismnews.com/news/seven-production-rules-to-tighten-your-minimal-techno-tracks
- MusicRadar, "House music arrangement"  
  https://www.musicradar.com/news/house-music-2023
- Reddit r/TechnoProduction discussions on dub/minimal techno practice  
  https://www.reddit.com/r/TechnoProduction/

## Builder Questions To Implement

### 1. Style Character

Examples:

- Minimal / reduced
- Driving / club-focused
- Hypnotic / repetitive
- Warm dub / spacious
- Dark afterhours

### 2. Arrangement Logic

Examples:

- Additive: slowly add elements every 8/16 bars.
- Subtractive: start fuller, remove parts for tension and mix-out.
- Loop evolution: one core loop mutates through automation.
- Breakdown return: central bass/kick mute, then groove returns.

### 3. Groove Focus

Examples:

- Percussion/click heavy
- Bass-led groove
- Chord-delay groove
- Hat/shaker motion
- Sparse pulse

### 4. Low-End Relation

Examples:

- Warm rounded bass
- Sub-heavy pressure
- Kick/bass locked
- Filtered dub pulse
- Sidechain breathing

### 5. Chords / Atmosphere

Examples:

- Dub chord stabs
- Wide pads
- Glassy synth texture
- Dark drone bed
- Restrained melody

### 6. FX / Movement

Examples:

- Tape-delay feedback
- Low-pass opening
- Filter closing
- Reverb freeze
- Phaser/chorus motion
- Delay-tail bridge

### 7. Vocal FX Role

Examples:

- No vocals
- Ghost vocal chops
- Vocoder textures
- Breath chops as percussion
- Robotic voice stabs

## Implementation Rule

Each answer should map to:

- meta fields
- selected tags
- arrangement intent notes
- prompt guidance
- optionally a suitable base blueprint

The builder should create a track by combining a closest base blueprint with guided modifiers rather than producing a generic blank preset.
