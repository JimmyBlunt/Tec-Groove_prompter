# Suno Exclude / Negative Prompt Research

Research date: 2026-05-17

## Goal

The Exclude field should protect the intended minimal / deep / dub techno character from:

- commercial radio-pop structure
- EDM festival drops and mainstage trance clichés
- foreground vocals, rap, choir, and pop vocal hooks
- cheap preset synth leads, bright supersaws, and sugary pads
- generic sample-pack drums and overbusy fills
- stock transition FX, risers, impacts, and gimmicks
- muddy, harsh, overbright, or demo-quality mixes

## Field Strategy

Use Exclude for unwanted material, not the Style prompt. The Style prompt should stay positive and focused on the desired sonic world. The Exclude prompt should be a comma-separated list of concrete things to avoid.

Recommended structure:

```text
pop chorus, verse-chorus radio structure, EDM festival drop, bright supersaw, lead vocal, rap verse, cheap commercial dance sound, stock sample pack drums, overused riser, muddy mix
```

## Implementation Decision

The app now has an Exclude / Negative Prompt Builder inside the Exclude accordion. It includes selectable categories:

- commercial mainstream
- vocals
- EDM / festival
- synths / pads
- drums / groove
- bass / low-end
- FX / transitions
- mix aesthetic
- structure / arrangement

The final Exclude output combines selected negative tags with the current Vocal Mode exclusions. This keeps vocal policy consistent even when the selected negative library changes.

## Source Notes

- Suno Help says Advanced Options > Exclude is specifically for information, instruments, and other elements you do not want in a track.
  https://help.suno.com/en/articles/3161921
- HookGenius negative prompting guide recommends direct formulations such as "no", "without", "exclude", or "avoid" and places vocal/instrument/style exclusions in the negative prompt workflow.
  https://hookgenius.app/learn/suno-negative-prompting/
- Suno API notes describe style/tags and negative tags as separate controls; style/tags should stay concise while negative tags prevent unwanted elements.
  https://docs.sunoapi.com/suno-api-instructions
- SunoStyles glossary notes that the Exclude field is meant for sounds, instruments, or qualities to avoid, and warns that negative instructions inside Style can confuse the model.
  https://sunostyles.com/glossary
- r/SunoAI community posts consistently recommend keeping long negative lists out of the Style field and using Exclude Styles / Negative Prompt for unwanted vocals, EDM elements, and wrong genre spillover.
  https://www.reddit.com/r/SunoAI/

## Assessment

Current implementation:

- Coverage: high. The library targets vocals, pop form, EDM clichés, cheap synths, drum clichés, bass problems, FX gimmicks, and mix-quality problems.
- Suno field separation: high. The Exclude content is generated separately and pasted into Advanced Options > Exclude.
- Style fit: high for minimal/deep/dub techno, because the exclusions suppress the common model drift toward radio-pop, festival EDM, bright trance, and generic commercial dance.
- Risk: medium. Too many negative tags can over-constrain or produce dull output, so the UI keeps selection editable and provides Reset/Clear controls.
