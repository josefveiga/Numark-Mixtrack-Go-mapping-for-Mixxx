# Numark Mixtrack Go — Enhanced Mapping for Mixxx (Release Candidate)

> Experimental community variant of the [original Mixtrack Go mapping by josefveiga](https://github.com/josefveiga/Numark-Mixtrack-Go-mapping-for-Mixxx). Not an official Mixxx release.
>
> **Pre-release:** Hardware regression tests and licensing confirmation are required before public release.

## Enhanced controls

| Input | Behavior |
| --- | --- |
| Browse encoder rotate (Preview stopped) | Navigate library |
| Browse encoder press (track list) | Toggle Preview play/stop |
| Browse encoder rotate (Preview playing) | Seek Preview by 8% per tick |
| Browse encoder press (library tree) | Activate selected tree item |
| Left MODE/SHIFT + encoder press | Switch focus between tree and track list |
| Left MODE/SHIFT + encoder rotate (track list) | Browse 3 rows per tick |
| Shift + jog | Fast scrub (0.75 seconds per MIDI step) |
| Loop-mode Pad | Original Mixxx beatloop toggle behavior (unchanged) |
| SYNC | Standard deck synchronization (unchanged) |
| Sampler Pad (short press) | Start sample from beginning, including while already playing |
| Sampler Pad (hold 1 second) | Toggle Sync on that sampler slot (`sync_mode` 0/1) |
| Sampler Shift + Pad | Toggle that sampler's play/stop (without unloading) |

Both deck headphone/CUE controls retain their PFL behavior. Sampler pad LEDs are kept. Samples must be loaded manually in Mixxx.

## Installation

1. Back up the existing mapping.
2. In Mixxx, open **Preferences → Library → Setting Directory → Open Mixxx Settings Folder**.
3. Copy `Numark-Mixtrack-Go.midi.xml` and `Numark-Mixtrack-Go.scripts.js` into the `controllers` folder.
4. Restart Mixxx and select the mapping.

## Status

This branch is for development and review, **not a tested public release**. The JavaScript and XML syntax passed static checks, but actual-controller tests are pending (Shift timing, PFL, sampler, LEDs, both decks).

## Attribution and licensing

Original mapping by [josefveiga](https://github.com/josefveiga/Numark-Mixtrack-Go-mapping-for-Mixxx). See [Mixxx integration PR #16813](https://github.com/mixxxdj/mixxx/pull/16813).

The original standalone mapping repository does not have a top-level `LICENSE` file. Verify applicable redistribution terms and preserve attribution before releasing a modified archive.
