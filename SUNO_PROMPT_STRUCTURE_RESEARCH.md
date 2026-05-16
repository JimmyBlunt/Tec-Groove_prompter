# Suno Prompt Structure Research

Research date: 2026-05-17

## Practical Split

For this app, the strongest split is:

- Style Prompt: global sonic world, genre, BPM, key, mood, instruments, mix character, vocal policy, compact negative hints when needed.
- Lyrics / Vocal Structure: section-by-section arrangement map using bracketed metatags, with no plain lyric lines unless a real sung vocal is desired.
- Exclude: explicit unwanted material, especially lead vocals, pop hooks, rap verses, choir, bright EDM drops, or non-techno instrumentation.

This means track structure should not live mainly in Style. Style may include one compact global phrase such as "DJ-friendly extended club arrangement", but detailed bar ranges, section intent, vocal FX events, drops, breaks, and transitions belong in Lyrics / Vocal Structure.

## Implementation Decision

The app now formats Lyrics / Vocal Structure as bracketed direction lines:

```text
[Instrumental]
[Vocal FX: robotic vocoder texture, chopped voice rhythm only]
[No lead vocal]

[Build]
[Vocoder Rhythm]
[Bars: 17-32]
[Arrangement: Add hats, percussion and bass pressure gradually.]
[Active palette: kick, bass, hats, percussion]
[Sound cues: rolling bassline, shuffled hats, tape delay feedback]
```

Reason: normal prose in the Lyrics field can be interpreted as singable content. Bracketed lines are more clearly structural and local.

## Suno-Specific Notes

- Suno Custom Mode separates lyrics, styles, and advanced options. Suno help says Custom Mode lets the user enter lyrics, then styles and advanced options.
- If the Instrumental toggle disables the Lyrics field in a given Suno UI version, keep the toggle off when you need section-by-section structure control, then enforce "instrumental / no lead vocal" via Style, Lyrics metatags, and Exclude.
- Suno's Exclude feature is meant for unwanted instruments, voices, and other negative constraints, so lead vocal avoidance belongs there too.
- Current model duration can be up to 8 minutes for V4.5/V5 according to Suno help, but prompt control still benefits from concise phrase-level sections.
- Style field limit is treated as 1000 characters in this app. The compiler caps output by density and the UI shows the counter.

## Source Notes

- Suno Help, Custom Mode: lyrics, styles, and advanced options are separate inputs.
  https://help.suno.com/en/articles/3726721
- Suno Help, Exclude: use Exclude for information you do not want in a track.
  https://help.suno.com/en/articles/3161921
- Suno Help, song length: V4.5/V5 can generate up to 8 minutes in one shot.
  https://help.suno.com/en/articles/2409473
- Suno API field notes: Custom Mode maps to title, style/tags, and lyrics/prompt; style/tags should generally stay within 1000 characters for v4.5+/v5.
  https://docs.sunoapi.com/suno-api-instructions
- HookGenius metatag reference: structure tags are placed in Lyrics, each on its own line; `[Instrumental]`, `[Breakdown]`, `[Build]`, `[Outro]`, and `[Fade Out]` are relevant controls.
  https://hookgenius.app/learn/suno-metatags-complete-list/
- r/SunoAI tag guide: community consensus describes Style as global and Lyrics tags as local, sequential structure control.
  https://www.reddit.com/r/SunoAI/comments/1od1cll/how_to_use_tags_properly/
- r/SunoAI prompting guide: Custom Mode is preferred for exact sections, and instrumental workflows can use Lyrics as a conductor timeline.
  https://www.reddit.com/r/SunoAI/comments/1qk766q/how_to_write_great_prompts_for_suno/

## Assessment

Current implementation after this pass:

- Syntax clarity: high. The Lyrics prompt is now bracketed and avoids free prose that could become sung lyrics.
- Suno field separation: good. Style is global, Lyrics is temporal structure, Exclude is negative constraints.
- Vocal-FX control: medium-high. Suno may still interpret vocal FX unpredictably, but the prompt now consistently says no lead vocal while allowing texture, vocoder, stutter, or ghost chops.
- Minimal/deep/dub techno fit: high. The structure emphasizes DJ-friendly sections, phrase evolution, low-end, delay, filter, and subtractive/additive arrangement.
- Remaining risk: Suno metatag behavior is empirical rather than fully documented. Some custom tags like `[Vocal FX: ...]` are best-effort instructions, not guaranteed commands.
