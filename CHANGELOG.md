# Changelog — Enhanced mapping (unreleased)

All items describe changes in the `enhanced` branch relative to the upstream-derived `main` branch. This is a review candidate, **not a tested public release**.

## Added
- 1.5-second main-deck Play/Pause volume fades with reverse-on-repress behavior, both decks.
- Library Preview Deck controls from browse encoder: toggle on press, seek ~8% per detent while previewing, and navigate when stopped.
- Shift + browse encoder: focus toggle and accelerated library navigation.
- Shift + jog fast track-position scrub (~0.75 seconds per tick).
- LOAD short press versus 1-second hold, allowing safe eject only when stopped.
- Eight independent sampler slots (left deck pads → Samplers 1–4; right deck pads → Samplers 5–8), with short-press retrigger plus one-shot beat synchronization, hold-to-stop, and Shift + SYNC toggle for continuous synchronization across all eight.
- Configurable loop pad-size presets including fractional-bar values.
- Optional Deck 1 Auto Next: detect natural track completion, wait a configurable 0–30 seconds (default 3), then advance the active library selection and load/play the next track; disabled by default.

## Fixed
- Auto Next now accepts boolean, numeric and string forms of enabled mapping settings, and detects end-of-track stops even if Mixxx resets the playhead to the beginning. Adds concise diagnostic console logging.

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
