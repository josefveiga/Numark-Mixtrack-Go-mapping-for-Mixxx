# Numark Mixtrack Go — Enhanced mapping

Community enhancements to the [original Numark Mixtrack Go mapping](https://github.com/josefveiga/Numark-Mixtrack-Go-mapping-for-Mixxx) by **josefveiga** for Mixxx.

> **Review candidate, not an official Mixxx release.** Features below reflect the current mapping source. Full hardware regression testing and compatibility with the upstream `alpha` branch have not been confirmed. Do not rely on this experimental mapping for a live performance without testing.

## Install

1. Back up your existing Mixxx controller files and settings.
2. Download both files **from the same `enhanced` branch**:
   - [Numark-Mixtrack-Go.midi.xml](https://raw.githubusercontent.com/paurock/Numark-Mixtrack-Go-mapping-for-Mixxx/enhanced/Numark-Mixtrack-Go.midi.xml)
   - [Numark-Mixtrack-Go.scripts.js](https://raw.githubusercontent.com/paurock/Numark-Mixtrack-Go-mapping-for-Mixxx/enhanced/Numark-Mixtrack-Go.scripts.js)
3. In Mixxx, go to **Preferences → Library → Setting Directory → Open Mixxx Settings Folder** and copy both files into `controllers`.
4. Restart Mixxx, select **Numark Mixtrack Go**, and configure **Preferences → Controllers → Mapping Settings**.

Do not mix a JavaScript file from `enhanced` with the XML from `main` or upstream `alpha`.

## Controller changes

### Browser and preview

| Control | Action |
| --- | --- |
| Browse encoder rotate (Preview stopped) | Move through library entries |
| Browse encoder push (track list) | Toggle Preview playback |
| Browse encoder rotate (Preview playing) | Seek Preview by ~8% per tick |
| Browse encoder push (library tree) | Activate the selected tree entry |
| Shift + browse encoder push | Switch library focus between tree and track list |
| Shift + browse encoder rotate | Navigate three library entries per tick |

### Decks and mixer

| Control | Action |
| --- | --- |
| Main Play/Pause, either deck | 1.5 s fade-in before normal playback level; 1.5 s fade-out before pausing |
| Play/Pause pressed again mid-fade | Reverse fade direction |
| Shift + jog | Fast seek approximately 0.75 s per tick |
| LOAD short press | Load selected track when the button is released |
| LOAD hold ≥1 s | Eject loaded track, only when the deck is stopped |
| Channel headphone/PFL | Standard headphone monitoring; no Shift+PFL eject |
| Shift + LOAD 1 | Toggle the two Filter/Low knobs between Quick Effect and Low EQ |
| Shift + LOAD 2 | Toggle jog vinyl mode |

**Fade limitation:** The fade automates the deck's software `volume`. Avoid moving the physical channel volume fader during a fade. After fade-out, software volume is restored for subsequent playback.

### Performance pads

| Mode | Pads |
| --- | --- |
| Hotcue | Set or jump to four independent hotcues; Shift + pad clears a hotcue |
| Loops | Toggle loop lengths selected under **Mapping Settings → Loops** |
| FX | Pad 1 Echo; Pad 2 Flanger; Pad 3 Reverb; Pad 4 one-beat Beat Roll. These effects are **momentary**: hold to use, release to disable |
| Sampler | Eight independent sampler slots: left pads 1–4 trigger Samplers 1–4; right pads 1–4 trigger Samplers 5–8. Short press/release restarts the sample and applies one-shot Beat Sync; hold for ≥1 s stops playback without unloading; Shift + pad does nothing |
| Stems | Toggle mute for Drums, Bass, Synths, Vocals (requires a compatible stems track and Mixxx 2.6+) |

FX Pads 1–3 load their default effects when the corresponding effect slot is empty; an effect already loaded in that slot is reused. The Beat Roll pad is not a fourth configurable effect slot.

**Sampler Sync:** Shift + SYNC on either deck toggles continuous synchronization for **all eight** samplers. Ordinary SYNC keeps the deck's usual behavior. Sampler tracks must be loaded in the Mixxx UI; ensure eight sampler slots are available in your Mixxx layout.

### Loop pad presets

Select one of the following in **Preferences → Controllers → Numark Mixtrack Go → Mapping Settings → Loops**. Values below are shown in **beats**, in Pad 1–4 order:

| Preset | Pad 1 | Pad 2 | Pad 3 | Pad 4 |
| --- | ---: | ---: | ---: | ---: |
| Original / default | 1 | 2 | 4 | 8 |
| Short | 0.5 | 1 | 2 | 4 |
| Shorter | 0.25 | 0.5 | 1 | 2 |
| Long | 4 | 8 | 16 | 32 |
| 1/4 → 1/32 bar (4/4) | 1 | 0.5 | 0.25 | 0.125 |
| 1, 1/2, 1/8, 1/16 bar (4/4) | 4 | 2 | 0.5 | 0.25 |
| 1/2 → 1/16 bar (4/4) | 2 | 1 | 0.5 | 0.25 |

For a 4/4 time signature, one bar equals four beats. These are regular beatloop toggles, **not** slip-style loop rolls.

### Other controls retained

Main Cue and Hotcue semantics, independent pad modes per deck, Acapella/Instrumental stem shortcuts, Filter/Low, crossfader/Fade FX, and standard deck synchronization remain available. Shift + FADE FX advances both Quick Effect chain presets.

## Optional Auto Next (Deck 1 only)

Enable **Preferences → Controllers → Numark Mixtrack Go → Mapping Settings → Auto Next → Auto Next on Deck 1 (3-second pause)**. **Disabled by default.**

When the left deck plays to the **actual end** of the file, the mapping stops playback, allows **3 seconds of silence**, advances the highlighted selection by one row using `[Playlist],SelectNextTrack`, and sends `[Channel1],LoadSelectedTrackAndPlay`. Deck 2 remains untouched. Auto DJ is **not** used.

- A manual Play/Pause command from the controller suppresses this action; the timer is also cancelled when playback resumes, the track is replaced or the playback position moves away from the end.
- The next item is relative to the **currently highlighted row** in the active library track list. Keep that row aligned with the current song; otherwise, an unexpected item may be selected.
- This is a sequential fallback, not a beat-matched crossfade. Actual silence can be longer than 3 seconds because of track loading.
- If there is no next valid row, Mixxx may not start a new track. There is no loop or playlist-wrap guarantee.
- End-of-track handling varies between Mixxx versions and playback settings; **test with short tracks before relying on it during a show**.

## Known limitations and verification

- Hardware testing has **not been independently verified** for every interaction, including press/release timing, MIDI LED feedback, fast repeated play/pause presses, Shift combinations, sampler Sync, and loop sizes.
- Effect defaults use indexed positions in Mixxx's effect list; upstream reorderings could select a different effect.
- Stems require compatible track data; standard MP3 files are not automatically separated by this mapping.
- Confirm behavior on the specific Mixxx version you use. The upstream repository's `alpha` branch contains additional work which has not been merged into `enhanced`.

Suggested regression checklist: each deck's Play/Pause transitions; LOAD click/hold while playing/stopped; PFL; all loop presets; FX press/release; sampler retrigger/hold/Sync; library preview & browse; stems; LED feedback.

## Upstream contribution and attribution

This work is based on [josefveiga's original mapping](https://github.com/josefveiga/Numark-Mixtrack-Go-mapping-for-Mixxx). See [CHANGELOG.md](CHANGELOG.md) for changes made in this fork.

The upstream repository has no top-level LICENSE file at the time of preparation. Retain original attribution and coordinate any relicensing or distribution decisions with the original author. A pull request requests review; it does not imply official endorsement or acceptance.
