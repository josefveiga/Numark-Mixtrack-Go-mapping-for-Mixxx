# Changelog — Enhanced mapping (unreleased)

All items describe changes in the `enhanced` branch relative to the upstream-derived `main` branch. This is a review candidate, **not a tested public release**.

## Added
- 1.5-second main-deck Play/Pause volume fades with reverse-on-repress behavior, both decks.
- Library Preview Deck controls from browse encoder: toggle on press, seek ~8% per detent while previewing, and navigate when stopped.
- Shift + browse encoder: focus toggle and accelerated library navigation.
- Shift + jog fast track-position scrub (~0.75 seconds per tick).
- LOAD short press versus 1-second hold, allowing safe eject only when stopped.
- Four shared sampler slots with short-press retrigger plus one-shot beat synchronization, hold-to-stop, and Shift + SYNC group toggle for continuous sampler synchronization.
- Configurable loop pad-size presets including fractional-bar values.

## Changed
- Channel PFL keeps headphone monitoring; accidental eject on Shift + PFL was removed.
- Loops keep normal beatloop toggle semantics with configurable pad lengths.
- Documentation links use files from the fork's `enhanced` branch, rather than accidentally mixing upstream files.

## Retained from the original mapping
- Hotcues, momentary Echo/Flanger/Reverb/Beat Roll FX, stems and acapella/instrumental shortcuts, deck SYNC, pitch controls, vinyl mode, Filter/Low, Fade FX and independent pad modes.

## Compatibility and validation
- Changes involve `Numark-Mixtrack-Go.scripts.js` and `Numark-Mixtrack-Go.midi.xml`; **install them together**.
- Comprehensive device and Mixxx-version regression testing is still pending.
- The original maintainer's `alpha` branch contains other updates; its fixes have not been reconciled into `enhanced`.
- The repository's licensing situation should be confirmed with the original author before treating the fork as an official or independently licensed distribution.
