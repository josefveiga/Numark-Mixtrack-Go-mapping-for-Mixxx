//TEMP SETTINGS

// Value suggestions: 0.1, 0.2, 0.6, 0.8, 1 (any value up to 2 i think is fine)
const pitchBendSharpnessSettingTemp = 0.6;

// any integer above 1. above 10 might be too fast
const stripSearchSpeedSettingTemp = 1;

// Value must be true or false
const isVinylModeInitiallyActivatedTemp = true;

// any integer larger than 1
const initialLEDSettingDelayTemp = 1;


//TEMP SETTINGS END

// eslint-disable-next-line no-var
var NumarkMixtrackGo = {};


/**
 * Holds all the used midi signals sent by the controller.
 */
NumarkMixtrackGo.controls = {

    // [status, ctrl] are the pair of codes that identify the midi signals sent from the controller
    // [[status, ctrl], [status, ctrl]] holds the left control on the first position and the right
    // control on the second position.

    // [Master]
    "main_level": [0xBF, 0x0A],
    "cue_level": [0xBF, 0x0C],
    "crossfader": [0xBF, 0x08],
    "fadefx": [0x9F, 0x46],
    "fadefx_shift": [0x9F, 0x47], // currently free

    // [Library]
    "browse_encoder_rotate": [0xBF, 0x00],
    "browse_encoder_rotate_shift": [0xBF, 0x01], // currently free
    "browse_encoder_push_on": [0x9F, 0x07],
    "browse_encoder_push_shift": [0x9F, 0x06],
    "load": [[0x9F, 0x02], [0x9F, 0x03]],
    "load_shift": [[0x9F, 0x48], [0x9F, 0x49]],

    // Mixer area
    "level": [[0xB0, 0x16], [0xB1, 0x16]],
    "filter_low": [[0xB0, 0x1A], [0xB1, 0x1A]],
    "pfl": [[0x90, 0x1B], [0x91, 0x1B]],
    "pfl_shift": [[0x90, 0x54], [0x91, 0x54]], // currently free

    // Decks
    "rate_lsb": [[0xB0, 0x29], [0xB1, 0x29]],
    "rate_msb": [[0xB0, 0x09], [0xB1, 0x09]],
    "mode": [[0x94, 0x00], [0x91, 0x50]],
    "mode_long_press": [[0x90, 0x20], [0x91, 0x20]], // not used atm

    "jog_touch_press": [[0x90, 0x50], [0x91, 0x50]],
    "jog_touch_release": [[0x80, 0x50], [0x81, 0x50]],
    "jog_turn": [[0xB0, 0x06], [0xB1, 0x06]],
    "jog_turn_shift": [[0xB0, 0x2B], [0xB1, 0x2B]], // not used atm

    "acapel": [[0x90, 0x46], [0x91, 0x46]],
    "acapel_shift": [[0x90, 0x47], [0x91, 0x47]],
    "instru": [[0x90, 0x48], [0x91, 0x48]],
    "instru_shift": [[0x90, 0x49], [0x91, 0x49]],
    "sync": [[0x90, 0x02], [0x91, 0x02]],
    "sync_shift": [[0x90, 0x03], [0x91, 0x03]],
    "cue": [[0x90, 0x01], [0x91, 0x01]],
    "cue_shift": [[0x90, 0x05], [0x91, 0x05]],
    "play": [[0x90, 0x00], [0x091, 0x00]],
    "play_shift": [[0x90, 0x04], [0x91, 0x04]],
    "tempo_fader": [[0xB0, 0x00], [0xB1, 0x00]],

    // Pads
    "pad1": [[0x94, 0x14], [0x95, 0x14]],
    "pad1_shift": [[0x94, 0x1C], [0x95, 0x1C]],

    "pad2": [[0x94, 0x15], [0x95, 0x15]],
    "pad2_shift": [[0x94, 0x1D], [0x95, 0x1D]],

    "pad3": [[0x94, 0x16], [0x95, 0x16]],
    "pad3_shift": [[0x94, 0x1E], [0x95, 0x1E]],

    "pad4": [[0x94, 0x17], [0x95, 0x17]],
    "pad4_shift": [[0x94, 0x1F], [0x95, 0x1F]],
};

/**
 * Holds all the led midi information and functions to operate leds.
 */
NumarkMixtrackGo.led = {

    // [status, ctrl] are the pair of codes that identify the midi signals that need to be sent
    // to the controller to set a led
    // [[status, ctrl], [status, ctrl]] holds the left side's pair of codes on the first position and
    // the right side's pair of codes on the second position.

    // unused - there are others but didn't take notes
    // [0xB0, 0x1F, 0x00] - value from 0 to 5 lights the mode lights and play cumulatively

    // values
    "off": 0x00,
    "dim": 0x01,
    "bright": 0x7F,

    "all": [0x9E, 0x7F],

    "mode_hotcue": [[0x94, 0x01], [0x95, 0x01]],
    "mode_loops": [[0x94, 0x02], [0x95, 0x02]],
    "mode_sampler": [[0x94, 0x03], [0x95, 0x03]],
    "mode_stems": [[0x94, 0x04], [0x95, 0x04]],

    "play": [[0x90, 0x00], [0x91, 0x00]],
    "play_shift": [[0x90, 0x04], [0x91, 0x04]],
    "cue": [[0x90, 0x01], [0x91, 0x01]],
    "cue_shift": [[0x90, 0x05], [0x91, 0x05]],
    "sync": [[0x90, 0x02], [0x91, 0x02]],
    "sync_shift": [[0x90, 0x03], [0x91, 0x03]],
    "acapel": [[0x90, 0x46], [0x91, 0x46]],
    "instru": [[0x90, 0x48], [0x91, 0x48]],
    "fadefx": [0x9F, 0x46],
    "fadefx_shift": [0x9F, 0x47],
    "load": [[0x9F, 0x02], [0x9F, 0x03]],
    "load_shift": [[0x9F, 0x48], [0x9F, 0x49]],
    "pfl": [[0x80, 0x1B], [0x81, 0x1B]],
    "pfl_shift": [[0x90, 0x54], [0x91, 0x54]],

    "pad1": [[0x94, 0x14], [0x95, 0x14]],
    "pad1_shift": [[0x94, 0x1C], [0x95, 0x1C]],
    "pad2": [[0x94, 0x15], [0x95, 0x15]],
    "pad2_shift": [[0x94, 0x1D], [0x95, 0x1D]],
    "pad3": [[0x94, 0x16], [0x95, 0x16]],
    "pad3_shift": [[0x94, 0x1E], [0x95, 0x1E]],
    "pad4": [[0x94, 0x17], [0x95, 0x17]],
    "pad4_shift": [[0x94, 0x1F], [0x95, 0x1F]],

    // maintaining some led states so the controller doesn't get spammed with useless messages
    fadefxState: this.off,
    fadefxShiftState: this.off,
    pad1State: [this.off, this.off],
    pad2State: [this.off, this.off],
    pad3State: [this.off, this.off],
    pad4State: [this.off, this.off],

    // below are the functions that switch the leds.
    setAllOff: function() {
        midi.sendShortMsg(this.all[0], this.all[1], this.off);
    },
    setAllBright: function() {
        midi.sendShortMsg(this.all[0], this.all[1], this.bright);
    },

    // There is probably some code for this but i didn' find it.
    // Would need to be pressing the mode button while scanning for codes.
    // This will do.
    setAllShiftOff: function() {
        for (let i = 0; i <= 1; i++) {
            this.setPlayShiftOff(i);
            this.setCueShiftOff(i);
            this.setSyncShiftOff(i);
            this.setLoadShiftOff(i);
            this.setAllPadsShiftOff(i);
            this.setPflShiftOff(i);
        }
        this.setFadefxShiftOff();
    },

    setModeHotcueOff: function(deckIndex) {
        midi.sendShortMsg(this.mode_hotcue[deckIndex][0], this.mode_hotcue[deckIndex][1], this.off);
    },
    setModeHotcueDim: function(deckIndex) {
        midi.sendShortMsg(this.mode_hotcue[deckIndex][0], this.mode_hotcue[deckIndex][1], this.dim);
    },
    setModeHotcueBright: function(deckIndex) {
        midi.sendShortMsg(this.mode_hotcue[deckIndex][0], this.mode_hotcue[deckIndex][1], this.bright);
    },

    setModeLoopsOff: function(deckIndex) {
        midi.sendShortMsg(this.mode_loops[deckIndex][0], this.mode_loops[deckIndex][1], this.off);
    },
    setModeLoopsDim: function(deckIndex) {
        midi.sendShortMsg(this.mode_loops[deckIndex][0], this.mode_loops[deckIndex][1], this.dim);
    },
    setModeLoopsBright: function(deckIndex) {
        midi.sendShortMsg(this.mode_loops[deckIndex][0], this.mode_loops[deckIndex][1], this.bright);
    },

    setModeSamplerOff: function(deckIndex) {
        midi.sendShortMsg(this.mode_sampler[deckIndex][0], this.mode_sampler[deckIndex][1], this.off);
    },
    setModeSamplerDim: function(deckIndex) {
        midi.sendShortMsg(this.mode_sampler[deckIndex][0], this.mode_sampler[deckIndex][1], this.dim);
    },
    setModeSamplerBright: function(deckIndex) {
        midi.sendShortMsg(this.mode_sampler[deckIndex][0], this.mode_sampler[deckIndex][1], this.bright);
    },

    setModeStemsOff: function(deckIndex) {
        midi.sendShortMsg(this.mode_stems[deckIndex][0], this.mode_stems[deckIndex][1], this.off);
    },
    setModeStemsDim: function(deckIndex) {
        midi.sendShortMsg(this.mode_stems[deckIndex][0], this.mode_stems[deckIndex][1], this.dim);
    },
    setModeStemsBright: function(deckIndex) {
        midi.sendShortMsg(this.mode_stems[deckIndex][0], this.mode_stems[deckIndex][1], this.bright);
    },


    setPlayOff: function(deckIndex) {
        midi.sendShortMsg(this.play[deckIndex][0], this.play[deckIndex][1], this.off);
    },
    setPlayDim: function(deckIndex) {
        midi.sendShortMsg(this.play[deckIndex][0], this.play[deckIndex][1], this.dim);
    },
    setPlayBright: function(deckIndex) {
        midi.sendShortMsg(this.play[deckIndex][0], this.play[deckIndex][1], this.bright);
    },

    setPlayShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.play_shift[deckIndex][0], this.play_shift[deckIndex][1], this.off);
    },
    setPlayShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.play_shift[deckIndex][0], this.play_shift[deckIndex][1], this.dim);
    },
    setPlayShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.play_shift[deckIndex][0], this.play_shift[deckIndex][1], this.bright);
    },


    setCueOff: function(deckIndex) {
        midi.sendShortMsg(this.cue[deckIndex][0], this.cue[deckIndex][1], this.off);
    },
    setCueDim: function(deckIndex) {
        midi.sendShortMsg(this.cue[deckIndex][0], this.cue[deckIndex][1], this.dim);
    },
    setCueBright: function(deckIndex) {
        midi.sendShortMsg(this.cue[deckIndex][0], this.cue[deckIndex][1], this.bright);
    },

    setCueShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.cue_shift[deckIndex][0], this.cue_shift[deckIndex][1], this.off);
    },
    setCueShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.cue_shift[deckIndex][0], this.cue_shift[deckIndex][1], this.dim);
    },
    setCueShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.cue_shift[deckIndex][0], this.cue_shift[deckIndex][1], this.bright);
    },


    setSyncOff: function(deckIndex) {
        midi.sendShortMsg(this.sync[deckIndex][0], this.sync[deckIndex][1], this.off);
    },
    setSyncDim: function(deckIndex) {
        midi.sendShortMsg(this.sync[deckIndex][0], this.sync[deckIndex][1], this.dim);
    },
    setSyncBright: function(deckIndex) {
        midi.sendShortMsg(this.sync[deckIndex][0], this.sync[deckIndex][1], this.bright);
    },

    setSyncShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.sync_shift[deckIndex][0], this.sync_shift[deckIndex][1], this.off);
    },
    setSyncShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.sync_shift[deckIndex][0], this.sync_shift[deckIndex][1], this.dim);
    },
    setSyncShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.sync_shift[deckIndex][0], this.sync_shift[deckIndex][1], this.bright);
    },


    setAcapelOff: function(deckIndex) {
        midi.sendShortMsg(this.acapel[deckIndex][0], this.acapel[deckIndex][1], this.off);
    },
    setAcapelDim: function(deckIndex) {
        midi.sendShortMsg(this.acapel[deckIndex][0], this.acapel[deckIndex][1], this.dim);
    },
    setAcapelBright: function(deckIndex) {
        midi.sendShortMsg(this.acapel[deckIndex][0], this.acapel[deckIndex][1], this.bright);
    },

    setInstruOff: function(deckIndex) {
        midi.sendShortMsg(this.instru[deckIndex][0], this.instru[deckIndex][1], this.off);
    },
    setInstruDim: function(deckIndex) {
        midi.sendShortMsg(this.instru[deckIndex][0], this.instru[deckIndex][1], this.dim);
    },
    setInstruBright: function(deckIndex) {
        midi.sendShortMsg(this.instru[deckIndex][0], this.instru[deckIndex][1], this.bright);
    },


    setFadefxOff: function() {
        if (this.fadefxState !== this.off) {
            midi.sendShortMsg(this.fadefx[0], this.fadefx[1], this.off);
            this.fadefxState = this.off;
        }

    },
    setFadefxDim: function() {
        if (this.fadefxState !== this.dim) {
            midi.sendShortMsg(this.fadefx[0], this.fadefx[1], this.dim);
            this.fadefxState = this.dim;
        }
    },
    setFadefxBright: function() {
        if (this.fadefxState !== this.bright) {
            midi.sendShortMsg(this.fadefx[0], this.fadefx[1], this.bright);
            this.fadefxState = this.bright;
        }
    },

    setFadefxShiftOff: function() {
        if (this.fadefxShiftState !== this.off) {
            midi.sendShortMsg(this.fadefx_shift[0], this.fadefx_shift[1], this.off);
            this.fadefxShiftState = this.off;
        }

    },
    setFadefxShiftDim: function() {
        if (this.fadefxShiftState !== this.dim) {
            midi.sendShortMsg(this.fadefx_shift[0], this.fadefx_shift[1], this.dim);
            this.fadefxShiftState = this.dim;
        }

    },
    setFadefxShiftBright: function() {
        if (this.fadefxShiftState !== this.bright) {
            midi.sendShortMsg(this.fadefx_shift[0], this.fadefx_shift[1], this.bright);
            this.fadefxShiftState = this.bright;
        }
    },


    setLoadOff: function(deckIndex) {
        midi.sendShortMsg(this.load[deckIndex][0], this.load[deckIndex][1], this.off);
    },
    setLoadDim: function(deckIndex) {
        midi.sendShortMsg(this.load[deckIndex][0], this.load[deckIndex][1], this.dim);
    },
    setLoadBright: function(deckIndex) {
        midi.sendShortMsg(this.load[deckIndex][0], this.load[deckIndex][1], this.bright);
    },

    setLoadShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.load_shift[deckIndex][0], this.load_shift[deckIndex][1], this.off);
    },
    setLoadShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.load_shift[deckIndex][0], this.load_shift[deckIndex][1], this.dim);
    },
    setLoadShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.load_shift[deckIndex][0], this.load_shift[deckIndex][1], this.bright);
    },


    setPflOff: function(deckIndex) {
        midi.sendShortMsg(this.pfl[deckIndex][0], this.pfl[deckIndex][1], this.off);
    },
    setPflDim: function(deckIndex) {
        midi.sendShortMsg(this.pfl[deckIndex][0], this.pfl[deckIndex][1], this.dim);
    },
    setPflBright: function(deckIndex) {
        midi.sendShortMsg(this.pfl[deckIndex][0], this.pfl[deckIndex][1], this.bright);
    },

    setPflShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.pfl_shift[deckIndex][0], this.pfl_shift[deckIndex][1], this.off);
    },
    setPflShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.pfl_shift[deckIndex][0], this.pfl_shift[deckIndex][1], this.dim);
    },
    setPflShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.pfl_shift[deckIndex][0], this.pfl_shift[deckIndex][1], this.bright);
    },


    setAllPadsOff: function(deckIndex) {
        for (let i = 1; i <= 4; i++) {
            this.setPadOff(i, deckIndex);
        }
    },
    setAllPadsDim: function(deckIndex) {
        for (let i = 1; i <= 4; i++) {
            this.setPadDim(i, deckIndex);
        }
    },
    setAllPadsShiftOff: function(deckIndex) {
        for (let i = 1; i <= 4; i++) {
            this.setPadShiftOff(i, deckIndex);
        }
    },

    setPadOff: function(padNumber, deckIndex) {
        switch (padNumber) {
        case 1:
            this.setPad1Off(deckIndex);
            break;
        case 2:
            this.setPad2Off(deckIndex);
            break;
        case 3:
            this.setPad3Off(deckIndex);
            break;
        case 4:
            this.setPad4Off(deckIndex);
            break;
        }
    },

    setPadDim: function(padNumber, deckIndex) {
        switch (padNumber) {
        case 1:
            this.setPad1Dim(deckIndex);
            break;
        case 2:
            this.setPad2Dim(deckIndex);
            break;
        case 3:
            this.setPad3Dim(deckIndex);
            break;
        case 4:
            this.setPad4Dim(deckIndex);
            break;
        }
    },
    setPadBright: function(padNumber, deckIndex) {
        switch (padNumber) {
        case 1:
            this.setPad1Bright(deckIndex);
            break;
        case 2:
            this.setPad2Bright(deckIndex);
            break;
        case 3:
            this.setPad3Bright(deckIndex);
            break;
        case 4:
            this.setPad4Bright(deckIndex);
            break;
        }
    },

    setPadShiftOff: function(padNumber, deckIndex) {
        switch (padNumber) {
        case 1:
            this.setPad1ShiftOff(deckIndex);
            break;
        case 2:
            this.setPad2ShiftOff(deckIndex);
            break;
        case 3:
            this.setPad3ShiftOff(deckIndex);
            break;
        case 4:
            this.setPad4ShiftOff(deckIndex);
            break;
        }
    },


    setPadShiftDim: function(padNumber, deckIndex) {
        switch (padNumber) {
        case 1:
            this.setPad1ShiftDim(deckIndex);
            break;
        case 2:
            this.setPad2ShiftDim(deckIndex);
            break;
        case 3:
            this.setPad3ShiftDim(deckIndex);
            break;
        case 4:
            this.setPad4ShiftDim(deckIndex);
            break;
        }
    },
    setPadShiftBright: function(padNumber, deckIndex) {
        switch (padNumber) {
        case 1:
            this.setPad1ShiftBright(deckIndex);
            break;
        case 2:
            this.setPad2ShiftBright(deckIndex);
            break;
        case 3:
            this.setPad3ShiftBright(deckIndex);
            break;
        case 4:
            this.setPad4ShiftBright(deckIndex);
            break;
        }
    },


    setPad1Off: function(deckIndex) {
        if (this.pad1State[deckIndex] !== this.off) {
            midi.sendShortMsg(this.pad1[deckIndex][0], this.pad1[deckIndex][1], this.off);
            this.pad1State[deckIndex] = this.off;
        }
    },
    setPad1Dim: function(deckIndex) {
        if (this.pad1State[deckIndex] !== this.dim) {
            midi.sendShortMsg(this.pad1[deckIndex][0], this.pad1[deckIndex][1], this.dim);
            this.pad1State[deckIndex] = this.dim;
        }
    },

    setPad1Bright: function(deckIndex) {
        if (this.pad1State[deckIndex] !== this.bright) {
            midi.sendShortMsg(this.pad1[deckIndex][0], this.pad1[deckIndex][1], this.bright);
            this.pad1State[deckIndex] = this.bright;
        }
    },

    setPad1ShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.pad1_shift[deckIndex][0], this.pad1_shift[deckIndex][1], this.off);
    },
    setPad1ShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.pad1_shift[deckIndex][0], this.pad1_shift[deckIndex][1], this.dim);
    },
    setPad1ShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.pad1_shift[deckIndex][0], this.pad1_shift[deckIndex][1], this.bright);
    },


    setPad2Off: function(deckIndex) {
        if (this.pad2State[deckIndex] !== this.off) {
            midi.sendShortMsg(this.pad2[deckIndex][0], this.pad2[deckIndex][1], this.off);
            this.pad2State[deckIndex] = this.off;
        }
    },
    setPad2Dim: function(deckIndex) {
        if (this.pad2State[deckIndex] !== this.dim) {
            midi.sendShortMsg(this.pad2[deckIndex][0], this.pad2[deckIndex][1], this.dim);
            this.pad2State[deckIndex] = this.dim;
        }
    },
    setPad2Bright: function(deckIndex) {
        if (this.pad2State[deckIndex] !== this.bright) {
            midi.sendShortMsg(this.pad2[deckIndex][0], this.pad2[deckIndex][1], this.bright);
            this.pad2State[deckIndex] = this.bright;
        }

    },

    setPad2ShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.pad2_shift[deckIndex][0], this.pad2_shift[deckIndex][1], this.off);
    },
    setPad2ShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.pad2_shift[deckIndex][0], this.pad2_shift[deckIndex][1], this.dim);
    },
    setPad2ShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.pad2_shift[deckIndex][0], this.pad2_shift[deckIndex][1], this.bright);
    },

    setPad3Off: function(deckIndex) {
        if (this.pad3State[deckIndex] !== this.off) {
            midi.sendShortMsg(this.pad3[deckIndex][0], this.pad3[deckIndex][1], this.off);
            this.pad3State[deckIndex] = this.off;
        }
    },
    setPad3Dim: function(deckIndex) {
        if (this.pad3State[deckIndex] !== this.dim) {
            midi.sendShortMsg(this.pad3[deckIndex][0], this.pad3[deckIndex][1], this.dim);
            this.pad3State[deckIndex] = this.dim;
        }
    },
    setPad3Bright: function(deckIndex) {
        if (this.pad3State[deckIndex] !== this.bright) {
            midi.sendShortMsg(this.pad3[deckIndex][0], this.pad3[deckIndex][1], this.bright);
            this.pad3State[deckIndex] = this.bright;
        }
    },

    setPad3ShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.pad3_shift[deckIndex][0], this.pad3_shift[deckIndex][1], this.off);
    },
    setPad3ShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.pad3_shift[deckIndex][0], this.pad3_shift[deckIndex][1], this.dim);
    },
    setPad3ShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.pad3_shift[deckIndex][0], this.pad3_shift[deckIndex][1], this.bright);
    },


    setPad4Off: function(deckIndex) {
        if (this.pad4State[deckIndex] !== this.off) {
            midi.sendShortMsg(this.pad4[deckIndex][0], this.pad4[deckIndex][1], this.off);
            this.pad4State[deckIndex] = this.off;
        }
    },
    setPad4Dim: function(deckIndex) {
        if (this.pad4State[deckIndex] !== this.dim) {
            midi.sendShortMsg(this.pad4[deckIndex][0], this.pad4[deckIndex][1], this.dim);
            this.pad4State[deckIndex] = this.dim;
        }
    },
    setPad4Bright: function(deckIndex) {
        if (this.pad4State[deckIndex] !== this.bright) {
            midi.sendShortMsg(this.pad4[deckIndex][0], this.pad4[deckIndex][1], this.bright);
            this.pad4State[deckIndex] = this.bright;
        }
    },

    setPad4ShiftOff: function(deckIndex) {
        midi.sendShortMsg(this.pad4_shift[deckIndex][0], this.pad4_shift[deckIndex][1], this.off);
    },
    setPad4ShiftDim: function(deckIndex) {
        midi.sendShortMsg(this.pad4_shift[deckIndex][0], this.pad4_shift[deckIndex][1], this.dim);
    },
    setPad4ShiftBright: function(deckIndex) {
        midi.sendShortMsg(this.pad4_shift[deckIndex][0], this.pad4_shift[deckIndex][1], this.bright);
    },
};

// Effect indexes
// if mixxx devs change the order of the effects, these indexes needs to be updated.
// if they ever implement methods to set effects by name or some id, a more robust solution should be implemented.
const reverbEffectIndex = 2;
const flangerEffectIndex = 12;
const echoEffectIndex = 14;

const beatloopRollControl = "beatlooproll_1_activate";
// Beat loop sizes of the 4 pads in loops mode, selectable in the controller settings (index 0 = original sizes)
const beatloopPadSizePresets = [
    [1, 2, 4, 8],
    [0.5, 1, 2, 4],
    [0.25, 0.5, 1, 2],
    [4, 8, 16, 32],
    [1, 0.5, 0.25, 0.125], // 1/4, 1/8, 1/16, 1/32 bar in 4/4
    [4, 2, 0.5, 0.25], // 1, 1/2, 1/8, 1/16 bar in 4/4
    [2, 1, 0.5, 0.25], // 1/2, 1/4, 1/8, 1/16 bar in 4/4
];
const beatloopPadSizes = beatloopPadSizePresets[engine.getSetting("loopPadSizesPreset")] || beatloopPadSizePresets[0];

// Shift + platter fast scrub: how many seconds of the track each jog tick moves
const fastScrubSecondsPerTick = 0.75;

// Fade FX state
let isFadeFxOn = false;

// only used for it's length
const padModes = ["hotcue", "loops", "fx", "sampler", "stems"];

// 0 for filter, 1 for low
let filterLowSwitch = 1;

// to disable the lights demo, from npredella@mixxxforums
const IdentityRequestSysex = [0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7];

// to retrieve controller state
// https://github.com/mixxxdj/mixxx/wiki/Serato%20sysex
const ControllerStatusSysex = [0xF0, 0x00, 0x20, 0x7F, 0x03, 0x01, 0xF7];

//settings
var pitchBendSharpnessSetting = engine.getSetting("pitchBendSharpness");
var stripSearchSpeedSetting = engine.getSetting("stripSearchSpeed");
var isVinylModeInitiallyActivated = engine.getSetting("vinylModeDefaultStateOn");
var initialLEDSettingDelay = engine.getSetting("initialLEDSettingDelay");

// Fade fx blinking
const fadeFxIndicatorControl = "indicator_500ms";

/**
 * Required function.
 * Sets the leds, instantiates the 2 deck objects and sets Mixxx with the controls values of the controller.
 */
NumarkMixtrackGo.init = function() {

    // to disable the lights demo, from npredella@mixxxforums
    midi.sendSysexMsg(IdentityRequestSysex, IdentityRequestSysex.length);

    this.deck = new components.ComponentContainer();
    NumarkMixtrackGo.leftDeck = new NumarkMixtrackGo.Deck(0, 1);
    NumarkMixtrackGo.rightDeck = new NumarkMixtrackGo.Deck(1, 2);
    NumarkMixtrackGo.autoNext.init();

    // https://github.com/mixxxdj/mixxx/wiki/Serato%20sysex
    midi.sendSysexMsg(ControllerStatusSysex, ControllerStatusSysex.length);

    // The initial LED setting needs to be started after the end of the lights demo
    // stopping event in the controller or that event will turn off LEDs that were already set.
    // I very rarely see this and i can't currently find a way to consistently
    // reproduce it.
    // As far as i know, there is no way to listen for the end of that event so
    // we go for a lazy start of the led setting routine  with a generous 2000ms delay.
    // A user setting is added for further tuning in the odd chance this
    // is happening with device unit specific variation or an unforeseen use case.
    engine.beginTimer(initialLEDSettingDelay * 1000, () => {
        NumarkMixtrackGo.leftDeck.setDeckStartLeds();
        NumarkMixtrackGo.rightDeck.setDeckStartLeds();
        // The FadeFX LED is a special case as it is the only LED that isn't deck specific.
        engine.makeConnection("[App]", fadeFxIndicatorControl, function() {
            if (isFadeFxOn) {
                if (engine.getValue("[App]", fadeFxIndicatorControl) === 0) {
                    NumarkMixtrackGo.led.setFadefxDim();
                    NumarkMixtrackGo.led.setFadefxShiftDim();
                } else {
                    NumarkMixtrackGo.led.setFadefxBright();
                    NumarkMixtrackGo.led.setFadefxShiftBright();
                }
            } else {
                NumarkMixtrackGo.led.setFadefxDim();
                NumarkMixtrackGo.led.setFadefxShiftDim();
            }
        });
    }, true);

    // softTakeovers for the Filter/Low knob switching
    engine.softTakeover("[QuickEffectRack1_[Channel1]]", "super1", true);
    engine.softTakeover("[QuickEffectRack1_[Channel2]]", "super1", true);
    engine.softTakeover("[EqualizerRack1_[Channel1]_Effect1]", "parameter1", true);
    engine.softTakeover("[EqualizerRack1_[Channel2]_Effect1]", "parameter1", true);

    //TEMP
    if (typeof pitchBendSharpnessSetting === 'undefined') {
        console.log("pitchBendSharpnessSetting is undefined");
        pitchBendSharpnessSetting = pitchBendSharpnessSettingTemp;
    }
    if (typeof stripSearchSpeedSetting === 'undefined') {
        console.log("stripSearchSpeedSetting is undefined");
        stripSearchSpeedSetting = stripSearchSpeedSettingTemp;
    }
    if (typeof isVinylModeInitiallyActivated === 'undefined') {
        console.log("isVinylModeInitiallyActivated is undefined");
        isVinylModeInitiallyActivated = isVinylModeInitiallyActivatedTemp;
    }
    if (typeof initialLEDSettingDelay === 'undefined') {
        console.log("initialLEDSettingDelay is undefined");
        initialLEDSettingDelay = initialLEDSettingDelayTemp;
    }
    // TEMP
};

/**
 * Required function.
 */
// Optional fallback player: starts the next library track on Deck 1 after
// three seconds of silence following the natural end of a track.
// The next item is relative to the currently highlighted library selection.
// The left deck is intentionally the only deck this feature manages.
NumarkMixtrackGo.autoNext = {
    group: "[Channel1]",
    delayMs: 3000,
    pollMs: 250,
    enabled: false,
    monitorTimer: 0,
    pendingTimer: 0,
    inhibitManualStop: false,
    wasPlaying: false,
    lastPosition: 0,
    endStationaryTicks: 0,
    pendingTrackDuration: 0,

    cancelPending: function() {
        if (this.pendingTimer) {
            engine.stopTimer(this.pendingTimer);
            this.pendingTimer = 0;
        }
    },

    init: function() {
        this.enabled = engine.getSetting("autoNextLeftDeck") === true ||
            engine.getSetting("autoNextLeftDeck") === "true";
        if (!this.enabled) {
            return;
        }
        const autoNext = this;
        this.monitorTimer = engine.beginTimer(this.pollMs, function() {
            autoNext.check();
        });
    },

    shutdown: function() {
        this.cancelPending();
        if (this.monitorTimer) {
            engine.stopTimer(this.monitorTimer);
            this.monitorTimer = 0;
        }
    },

    schedule: function(duration) {
        if (this.pendingTimer) {
            return;
        }
        const autoNext = this;
        this.pendingTrackDuration = duration;
        // A paused or manually stopped track must not keep playing.
        engine.setValue(this.group, "play", 0);
        this.pendingTimer = engine.beginTimer(this.delayMs, function() {
            autoNext.pendingTimer = 0;
            if (autoNext.inhibitManualStop ||
                engine.getValue(autoNext.group, "track_loaded") !== 1 ||
                engine.getValue(autoNext.group, "play") !== 0 ||
                engine.getValue(autoNext.group, "duration") !== autoNext.pendingTrackDuration ||
                engine.getValue(autoNext.group, "playposition") < 0.998) {
                return;
            }
            autoNext.wasPlaying = false;
            autoNext.lastPosition = 0;
            autoNext.endStationaryTicks = 0;
            script.triggerControl("[Playlist]", "SelectNextTrack");
            script.triggerControl(autoNext.group, "LoadSelectedTrackAndPlay");
        }, true);
    },

    check: function() {
        const loaded = engine.getValue(this.group, "track_loaded") === 1;
        const playing = engine.getValue(this.group, "play") === 1;
        const position = engine.getValue(this.group, "playposition");
        const duration = engine.getValue(this.group, "duration");

        if (!loaded || duration <= 0 || position < 0.95) {
            this.cancelPending();
            this.endStationaryTicks = 0;
            if (!loaded || position < 0.95) {
                this.inhibitManualStop = false;
                this.wasPlaying = playing;
            }
            this.lastPosition = position;
            return;
        }

        if (this.pendingTimer) {
            if (playing || position < 0.998) {
                this.cancelPending();
            }
            this.lastPosition = position;
            return;
        }

        if (!this.inhibitManualStop && this.wasPlaying && position >= 0.999 &&
            !playing) {
            this.schedule(duration);
        } else if (!this.inhibitManualStop && playing && this.wasPlaying &&
            position >= 0.9999 && Math.abs(position - this.lastPosition) < 0.000001) {
            // Certain playback configurations leave "play" latched at the end.
            // Only trigger if the playhead is stationary at the actual file end.
            this.endStationaryTicks++;
            if (this.endStationaryTicks >= 4) {
                this.schedule(duration);
            }
        } else {
            this.endStationaryTicks = 0;
        }

        this.wasPlaying = playing;
        this.lastPosition = position;
    }
};

NumarkMixtrackGo.shutdown = function() {
    NumarkMixtrackGo.autoNext.shutdown();
    NumarkMixtrackGo.led.setAllOff();
    NumarkMixtrackGo.led.setAllShiftOff();
};


// Browse encoder: context-sensitive library navigation and Preview controls.
// Left MODE/SHIFT + encoder press changes the focused library panel.
const libraryFocusSidebar = 2;
const libraryFocusTracks = 3;
const previewDeckGroup = "[PreviewDeck1]";
const previewSeekStep = 0.08;

NumarkMixtrackGo.browseEncoder = {
    leftShiftHeld: false,
    pressed: false,
    normalPushHeld: false,
    shiftedPushHeld: false,
    shiftPressHandled: false,
    shiftedBrowseFraction: 0,
    pendingPushTimer: 0,

    cancelPendingPush: function() {
        if (this.pendingPushTimer !== 0) {
            engine.stopTimer(this.pendingPushTimer);
            this.pendingPushTimer = 0;
        }
    },

    switchLibraryFocus: function() {
        if (this.shiftPressHandled) {
            return;
        }
        this.shiftPressHandled = true;
        this.cancelPendingPush();
        const focused = engine.getValue("[Library]", "focused_widget");
        engine.setValue("[Library]", "focused_widget",
            focused === libraryFocusSidebar ? libraryFocusTracks : libraryFocusSidebar);
    },

    input: function(_channel, control, value, status) {
        const controls = NumarkMixtrackGo.controls;
        const isRotate = status === controls.browse_encoder_rotate[0] &&
            (control === controls.browse_encoder_rotate[1] ||
             control === controls.browse_encoder_rotate_shift[1]);

        if (isRotate) {
            const direction = value === 127 ? -1 : 1;
            const shifted = this.leftShiftHeld ||
                control === controls.browse_encoder_rotate_shift[1];
            if (this.shiftedPushHeld || this.shiftPressHandled) {
                return;
            }
            if (engine.getValue(previewDeckGroup, "play") === 1) {
                if (shifted) {
                    return;
                }
                const position = engine.getValue(previewDeckGroup, "playposition");
                engine.setValue(previewDeckGroup, "playposition",
                    Math.max(0, Math.min(1, position + direction * previewSeekStep)));
            } else if (shifted &&
                       engine.getValue("[Library]", "focused_widget") === libraryFocusTracks) {
                for (let i = 0; i < 3; i++) {
                    engine.setValue("[Library]", "MoveVertical", direction);
                }
            } else if (!shifted) {
                this.shiftedBrowseFraction = 0;
                engine.setValue("[Library]", "MoveVertical", direction);
            }
            return;
        }

        const isPress = (status & 0xF0) === 0x90 && value > 0;
        if (control === controls.browse_encoder_push_shift[1]) {
            this.shiftedPushHeld = isPress;
            this.pressed = this.normalPushHeld || this.shiftedPushHeld;
            if (isPress) {
                this.switchLibraryFocus();
            } else if (!this.normalPushHeld) {
                this.shiftPressHandled = false;
            }
            return;
        }
        if (control !== controls.browse_encoder_push_on[1]) {
            return;
        }

        this.normalPushHeld = isPress;
        this.pressed = this.normalPushHeld || this.shiftedPushHeld;
        if (!isPress) {
            if (!this.shiftedPushHeld) {
                this.shiftPressHandled = false;
            }
            return;
        }

        if (this.leftShiftHeld || this.shiftedPushHeld) {
            this.switchLibraryFocus();
            return;
        }
        if (this.shiftPressHandled) {
            return;
        }

        this.cancelPendingPush();
        const self = this;
        this.pendingPushTimer = engine.beginTimer(350, function() {
            self.pendingPushTimer = 0;
            if (self.shiftPressHandled || self.leftShiftHeld || self.shiftedPushHeld) {
                return;
            }
            if (engine.getValue("[Library]", "focused_widget") === libraryFocusSidebar) {
                script.triggerControl("[Library]", "GoToItem");
            } else {
                script.triggerControl(previewDeckGroup, "LoadSelectedTrackAndPlay");
            }
        }, true);
    },
};

// Long-held left MODE is emitted by the controller as a separate Shift note.
NumarkMixtrackGo.leftShift = {
    input: function(_channel, _control, value, status) {
        const encoder = NumarkMixtrackGo.browseEncoder;
        encoder.leftShiftHeld = (status & 0xF0) === 0x90 && value > 0;
        if (encoder.leftShiftHeld &&
            (encoder.normalPushHeld || encoder.pendingPushTimer !== 0)) {
            encoder.switchLibraryFocus();
        } else if (!encoder.leftShiftHeld && !encoder.pressed) {
            encoder.shiftPressHandled = false;
        }
    },
};

// Shift + SYNC on either deck controls all eight Mixxx sampler slots.
NumarkMixtrackGo.samplerSyncAll = new components.Button({
    input: function(_channel, _control, value) {
        if (value !== 127) {
            return;
        }
        const enable = engine.getValue("[Sampler1]", "sync_mode") === 0 ? 1 : 0;
        for (let i = 1; i <= 8; i++) {
            engine.setValue(`[Sampler${i}]`, "sync_mode", enable);
        }
    },
});

// Shift + Fade FX: changes the Fade FX effect (the Quick Effect chain preset of both channels)
NumarkMixtrackGo.fadeFxShift = new components.Button({
    input: function(_channel, _control, value) {
        if (value === 127) {
            script.triggerControl("[QuickEffectRack1_[Channel1]]", "next_chain_preset");
            script.triggerControl("[QuickEffectRack1_[Channel2]]", "next_chain_preset");
        }
    },
});
NumarkMixtrackGo.fadeFx = new components.Button({
    quickEffectRack1Channel1Super1Value: 0,
    quickEffectRack1Channel2Super1Value: 0,
    input: function(_channel, control, value) {
        if (control === NumarkMixtrackGo.controls.fadefx[1]) {
            if (value === 127) {
                if (isFadeFxOn === false) {
                    this.quickEffectRack1Channel1Super1Value = engine.getValue("[QuickEffectRack1_[Channel1]]", "super1");
                    this.quickEffectRack1Channel2Super1Value = engine.getValue("[QuickEffectRack1_[Channel2]]", "super1");
                    isFadeFxOn = true;
                } else {
                    isFadeFxOn = false;
                    engine.setValue("[QuickEffectRack1_[Channel1]]", "super1", this.quickEffectRack1Channel1Super1Value);
                    engine.setValue("[QuickEffectRack1_[Channel2]]", "super1", this.quickEffectRack1Channel2Super1Value);
                }
            }
        }
    },
});

// should eventually be reviewed to get at least a better fader curve and/or
// implement a better solution than using quick effects
NumarkMixtrackGo.crossFader = new components.Pot({//TODO
    input: function(_channel, _control, value) {
        const newValue = script.absoluteLin(value, 0, 1, 0, 100);
        const invertedValue = script.absoluteLin((127 - value), 0, 1, 0, 100);

        if (isFadeFxOn) {
            if (value === 127) {
                engine.setValue("[QuickEffectRack1_[Channel1]]", "super1", 0);
            }
            if (value === 0) {
                engine.setValue("[QuickEffectRack1_[Channel2]]", "super1", 0);
            }

            if (value < 63) {
                engine.setValue("[Master]", "crossfader", script.absoluteLin(value, -1.0, 0, 23, 63));
            } else { // tracks get cut at about 10% past midpoint
                engine.setValue("[Master]", "crossfader", script.absoluteLin(value, 0, 1, 63, 103));
            }

            const channel1Super1StoredValue = engine.getValue("[QuickEffectRack1_[Channel1]]", "super1");
            const channel1ValueChange = channel1Super1StoredValue - newValue;
            //takeover at 5% distance
            if ((channel1ValueChange < 0.05 && channel1ValueChange > -0.05)) {
                engine.setValue("[QuickEffectRack1_[Channel1]]", "super1", newValue);
            }

            const channel2Super1StoredValue = engine.getValue("[QuickEffectRack1_[Channel2]]", "super1");
            const channel2ValueChange = channel2Super1StoredValue - invertedValue;
            //takeover at 5% distance
            if ((channel2ValueChange < 0.05 && channel2ValueChange > -0.05)) {
                engine.setValue("[QuickEffectRack1_[Channel2]]", "super1", invertedValue);
            }
        } else {
            engine.setValue("[Master]", "crossfader", script.absoluteLin(value, -1.0, 1.0, 0, 127));
        }
    }
});

// toggles the filter/low knob function between controlling the channels quick effect
// and the low EQ
// 0 for filter, 1 for low
NumarkMixtrackGo.filterLowSwitcher = new components.Button({
    input: function(_channel, _control, value) {
        if (value === 127) {
            if (filterLowSwitch === 0) {
                filterLowSwitch = 1;
                // without this the softTakeover calls in init() dont work
                engine.softTakeoverIgnoreNextValue("[EqualizerRack1_[Channel1]_Effect1]", "parameter1");
                engine.softTakeoverIgnoreNextValue("[EqualizerRack1_[Channel2]_Effect1]", "parameter1");
            } else {
                filterLowSwitch = 0;
                // without this the softTakeover calls in init() dont work
                engine.softTakeoverIgnoreNextValue("[QuickEffectRack1_[Channel1]]", "super1");
                engine.softTakeoverIgnoreNextValue("[QuickEffectRack1_[Channel2]]", "super1");
            }
        }
    },
});

// toggles the availability of the scratch function on the jog-wheels
NumarkMixtrackGo.vinylModeSwitcher = new components.Button({
    input: function(_channel, _control, _value) {
        NumarkMixtrackGo.leftDeck.jogWheel.vinylMode = !NumarkMixtrackGo.leftDeck.jogWheel.vinylMode;
        NumarkMixtrackGo.rightDeck.jogWheel.vinylMode = !NumarkMixtrackGo.rightDeck.jogWheel.vinylMode;
    },
});

NumarkMixtrackGo.Deck = function(deckIndex, deckNumber) {
    components.Deck.call(this, deckNumber);
    const group = `[Channel${deckNumber}]`;

    const padModesNumber = padModes.length;
    let currentPadMode = 0;
    let isStemsTrackLoaded = false;

    // 1.5-second fade on the main deck Play/Pause buttons.
    // The volume fader is temporarily automated; after Pause its prior value
    // is restored for the next Play (the physical fader is not motorized).
    this.playFadeButton = new components.Button({
        fadeDurationMs: 1500,
        fadeIntervalMs: 25,
        fadeTimer: 0,
        fadeStep: 0,
        fadeFrom: 0,
        fadeTo: 0,
        fadeDirection: null,
        normalVolume: null,

        input: function(_channel, _control, value) {
            if (value !== 127) {
                return;
            }

            const wasFading = this.fadeDirection !== null;
            const wasFadingOut = this.fadeDirection === "out";
            const playing = engine.getValue(group, "play") === 1;

            if (this.fadeTimer) {
                engine.stopTimer(this.fadeTimer);
                this.fadeTimer = 0;
            }

            // A second press reverses a fade rather than causing an abrupt cut.
            const fadeIn = wasFading ? wasFadingOut : !playing;
            if (deckNumber === 1) {
                NumarkMixtrackGo.autoNext.cancelPending();
                if (!fadeIn) {
                    NumarkMixtrackGo.autoNext.inhibitManualStop = true;
                } else {
                    NumarkMixtrackGo.autoNext.inhibitManualStop = false;
                }
            }
            const currentVolume = engine.getValue(group, "volume");
            if (!wasFading || this.normalVolume === null) {
                this.normalVolume = currentVolume;
            }

            this.fadeDirection = fadeIn ? "in" : "out";
            this.fadeStep = 0;
            this.fadeFrom = fadeIn && !playing ? 0 : currentVolume;
            this.fadeTo = fadeIn ? this.normalVolume : 0;

            if (fadeIn && !playing) {
                engine.setValue(group, "volume", 0);
                engine.setValue(group, "play", 1);
            }

            const button = this;
            const steps = Math.ceil(this.fadeDurationMs / this.fadeIntervalMs);
            this.fadeTimer = engine.beginTimer(this.fadeIntervalMs, function() {
                button.fadeStep++;
                const progress = Math.min(1, button.fadeStep / steps);
                const volume = button.fadeFrom +
                    (button.fadeTo - button.fadeFrom) * progress;
                engine.setValue(group, "volume", volume);

                if (progress < 1) {
                    return;
                }

                engine.stopTimer(button.fadeTimer);
                button.fadeTimer = 0;
                if (button.fadeDirection === "out") {
                    engine.setValue(group, "play", 0);
                    engine.setValue(group, "volume", button.normalVolume);
                } else {
                    engine.setValue(group, "volume", button.normalVolume);
                }
                button.fadeDirection = null;
                button.normalVolume = null;
            });
        }
    });

    // pfl status led control
    const pflConnection = engine.makeConnection(group, "pfl", function() {
        if (engine.getValue(group, "pfl") === 1) {
            NumarkMixtrackGo.led.setPflBright(deckIndex);
        } else {
            NumarkMixtrackGo.led.setPflDim(deckIndex);
        }
    });

    // load status led control
    const loadConnection = engine.makeConnection(group, "track_loaded", function() {
        isStemsTrackLoaded = false;
        if (engine.getValue(group, "track_loaded") === 1) {
            try { // stemsStateConnection is undefined in mixxx < 2.6
                stemsStateConnection.trigger(); // to evaluate if its a stems track
            } catch (error) {
                console.log(error);
            }

            NumarkMixtrackGo.led.setLoadBright(deckIndex);
        } else {
            NumarkMixtrackGo.led.setLoadDim(deckIndex);
        }
    });

    // hotcue status led controls
    this.hotcueConnections = [];
    for (let i = 1; i <= 4; i++) {
        const hotcueStatusControl = `hotcue_${i}_status`;
        this.hotcueConnections[i] = engine.makeConnection(group, hotcueStatusControl, function() {
            if (currentPadMode === 0) {
                const hotCueStatus = engine.getValue(group, hotcueStatusControl);
                if (hotCueStatus === 0) {
                    NumarkMixtrackGo.led.setPadOff(i, deckIndex);
                    NumarkMixtrackGo.led.setPadShiftOff(i, deckIndex);
                } else { //status = 1 or 2
                    NumarkMixtrackGo.led.setPadBright(i, deckIndex);
                    NumarkMixtrackGo.led.setPadShiftBright(i, deckIndex);
                }
            }
        });
    }

    // pads beat loop led control
    for (let i = 1; i <= 4; i++) {
        engine.makeConnection("[App]", "indicator_500ms", function() {
            if (currentPadMode === 1) {
                if (engine.getValue(group, `beatloop_${beatloopPadSizes[i-1]}_enabled`) === 1) {
                    if (engine.getValue("[App]", "indicator_500ms") === 1) {
                        NumarkMixtrackGo.led.setPadBright(i, deckIndex);
                    } else {
                        NumarkMixtrackGo.led.setPadOff(i, deckIndex);
                    }
                } else {
                    NumarkMixtrackGo.led.setPadOff(i, deckIndex);
                }
            }
        });
    }

    // pads [1-3] fx mode led control
    for (let i = 1; i <= 3; i++) {
        const effectRackEffectUnitGroup = `[EffectRack1_EffectUnit${i}]`;
        const effectEnableControl = `group_${group}_enable`;
        engine.makeConnection(effectRackEffectUnitGroup, effectEnableControl, function() {
            if (engine.getValue(effectRackEffectUnitGroup, effectEnableControl) === 1) {
                NumarkMixtrackGo.led.setPadBright(i, deckIndex);
            } else {
                NumarkMixtrackGo.led.setPadDim(i, deckIndex);
            }
        });
    }
    // pad 4 fx mode led control
    engine.makeConnection(group, beatloopRollControl, function() {
        if (engine.getValue(group, beatloopRollControl) === 1) {
            NumarkMixtrackGo.led.setPadBright(4, deckIndex);
        } else {
            NumarkMixtrackGo.led.setPadDim(4, deckIndex);
        }
    });

    // Sampler LEDs follow slots 1–4 on the left and 5–8 on the right.
    for (let i = 1; i <= 4; i++) {
        const samplerGroup = `[Sampler${deckIndex * 4 + i}]`;
        engine.makeConnection(samplerGroup, "track_loaded", function() {
            if (currentPadMode === 3) {
                if (engine.getValue(samplerGroup, "track_loaded") === 1) {
                    NumarkMixtrackGo.led.setPadBright(i, deckIndex);
                    NumarkMixtrackGo.led.setPadShiftBright(i, deckIndex);
                } else {
                    NumarkMixtrackGo.led.setPadOff(i, deckIndex);
                    NumarkMixtrackGo.led.setPadShiftOff(i, deckIndex);
                }
            }
        });
        engine.makeConnection("[App]", "indicator_500ms", function() {
            if (currentPadMode === 3) {
                if (engine.getValue(samplerGroup, "track_loaded") === 1) {
                    if (engine.getValue(samplerGroup, "play_indicator") === 1) {
                        if (engine.getValue("[App]", "indicator_500ms") === 1) {
                            NumarkMixtrackGo.led.setPadBright(i, deckIndex);
                        } else {
                            NumarkMixtrackGo.led.setPadDim(i, deckIndex);
                        }
                    } else {
                        NumarkMixtrackGo.led.setPadBright(i, deckIndex);
                    }
                }
            }
        });
    }

    // sync led control
    const syncConnection = engine.makeConnection(group, "sync_enabled", function() {
        const syncIndicatorState = engine.getValue(group, "sync_enabled");
        if (syncIndicatorState === 0) {
            NumarkMixtrackGo.led.setSyncDim(deckIndex);
        } else if (syncIndicatorState === 1) {
            NumarkMixtrackGo.led.setSyncBright(deckIndex);
        }
    });

    // cue led control
    const cueConnection = engine.makeConnection(group, "cue_indicator", function() {
        const cueIndicatorState = engine.getValue(group, "cue_indicator");
        if (cueIndicatorState === 0) {
            NumarkMixtrackGo.led.setCueDim(deckIndex);
            NumarkMixtrackGo.led.setCueShiftDim(deckIndex);
        } else if (cueIndicatorState === 1 || cueIndicatorState === 2) {
            NumarkMixtrackGo.led.setCueBright(deckIndex);
            NumarkMixtrackGo.led.setCueShiftBright(deckIndex);
        }
    });

    // play led control
    const playIndicatorConnection = engine.makeConnection(group, "play_indicator", function() {
        if (engine.getValue(group, "play_indicator") === 1) {
            NumarkMixtrackGo.led.setPlayBright(deckIndex);
        } else {
            NumarkMixtrackGo.led.setPlayDim(deckIndex);
        }
    });

    // set play led default state
    const playConnection = engine.makeConnection(group, "play", function() {
        if (engine.getValue(group, "play")=== 0) {
            NumarkMixtrackGo.led.setPlayDim(deckIndex);
            //if play stops and fade fx is on, the effects need to be reset (same on serato)
            if (isFadeFxOn) {
                engine.setValue("[QuickEffectRack1_[Channel1]]", "super1", 0);
                engine.setValue("[QuickEffectRack1_[Channel2]]", "super1", 0);
            }
        }
    });

    const playAndCueShiftTrackLoadedConnection = engine.makeConnection(group, "track_loaded", function() {
        const loadedState = engine.getValue(group, "track_loaded");
        if (loadedState === 0) {
            NumarkMixtrackGo.led.setCueShiftDim(deckIndex);
            NumarkMixtrackGo.led.setPlayShiftDim(deckIndex);
        } else if (loadedState === 1) {
            NumarkMixtrackGo.led.setCueShiftBright(deckIndex);
            NumarkMixtrackGo.led.setPlayShiftBright(deckIndex);
        }
    });

    const drumsStemGroup = `[Channel${deckNumber}_Stem1]`;
    const bassStemGroup = `[Channel${deckNumber}_Stem2]`;
    const synthsStemGroup = `[Channel${deckNumber}_Stem3]`;
    const voiceStemGroup = `[Channel${deckNumber}_Stem4]`;

    // sets all stem pad leds according to their associated stem part mute state
    // should only be called when a stem track is loaded
    const setAllStemPadLeds = function() {
        if (currentPadMode === 4) {
            if (engine.getValue(drumsStemGroup, "mute") === 1) {
                NumarkMixtrackGo.led.setPad1Off(deckIndex);
            } else {
                NumarkMixtrackGo.led.setPad1Bright(deckIndex);
            }
            if (engine.getValue(bassStemGroup, "mute") === 1) {
                NumarkMixtrackGo.led.setPad2Off(deckIndex);
            } else {
                NumarkMixtrackGo.led.setPad2Bright(deckIndex);
            }
            if (engine.getValue(synthsStemGroup, "mute") === 1) {
                NumarkMixtrackGo.led.setPad3Off(deckIndex);
            } else {
                NumarkMixtrackGo.led.setPad3Bright(deckIndex);
            }
            if (engine.getValue(voiceStemGroup, "mute") === 1) {
                NumarkMixtrackGo.led.setPad4Off(deckIndex);
            } else {
                NumarkMixtrackGo.led.setPad4Bright(deckIndex);
            }
        }
    };

    const stemsStateConnection = engine.makeConnection(group, "stem_count", function() {
        if (engine.getValue(group, "stem_count") > 0) {
            isStemsTrackLoaded = true;
            setAllStemPadLeds();
        } else {
            isStemsTrackLoaded = false;
            if (currentPadMode === 4) {
                NumarkMixtrackGo.led.setAllPadsOff(deckIndex);
            }
        }
        setAcapelAndInstruLed();
    });

    // stem led coordination
    const setAcapelAndInstruLed = function() {
        const isDrumStemMuted = engine.getValue(drumsStemGroup, "mute") === 1;
        const isBassStemMuted = engine.getValue(bassStemGroup, "mute") === 1;
        const isSynthsStemMuted = engine.getValue(synthsStemGroup, "mute") === 1;
        const isVoiceStemMuted = engine.getValue(voiceStemGroup, "mute") === 1;

        if (isStemsTrackLoaded) {
            if (isDrumStemMuted && isBassStemMuted && isSynthsStemMuted && !isVoiceStemMuted) {
                NumarkMixtrackGo.led.setAcapelBright(deckIndex);
                NumarkMixtrackGo.led.setInstruDim(deckIndex);
            } else if (!isDrumStemMuted && !isBassStemMuted && !isSynthsStemMuted && isVoiceStemMuted) {
                NumarkMixtrackGo.led.setAcapelDim(deckIndex);
                NumarkMixtrackGo.led.setInstruBright(deckIndex);
            } else {
                NumarkMixtrackGo.led.setAcapelDim(deckIndex);
                NumarkMixtrackGo.led.setInstruDim(deckIndex);
            }
        } else {
            NumarkMixtrackGo.led.setAcapelOff(deckIndex);
            NumarkMixtrackGo.led.setInstruOff(deckIndex);
        }
    };

    // these next 4 makeConnections set each their corresponding pad led
    // and refresh the state of the acapel and instru leds
    engine.makeConnection(drumsStemGroup, "mute", function() {
        if (isStemsTrackLoaded) {
            if (engine.getValue(drumsStemGroup, "mute") === 1) {
                NumarkMixtrackGo.led.setPad1Off(deckIndex);
            } else {
                NumarkMixtrackGo.led.setPad1Bright(deckIndex);
            }
            setAcapelAndInstruLed();
        }
    });
    engine.makeConnection(bassStemGroup, "mute", function() {
        if (isStemsTrackLoaded) {
            if (engine.getValue(bassStemGroup, "mute") === 1) {
                NumarkMixtrackGo.led.setPad2Off(deckIndex);
            } else {
                NumarkMixtrackGo.led.setPad2Bright(deckIndex);
            }
            setAcapelAndInstruLed();
        }
    });
    engine.makeConnection(synthsStemGroup, "mute", function() {
        if (isStemsTrackLoaded) {
            if (engine.getValue(synthsStemGroup, "mute") === 1) {
                NumarkMixtrackGo.led.setPad3Off(deckIndex);
            } else {
                NumarkMixtrackGo.led.setPad3Bright(deckIndex);
            }
            setAcapelAndInstruLed();
        }
    });
    engine.makeConnection(voiceStemGroup, "mute", function() {
        if (isStemsTrackLoaded) {
            if (engine.getValue(voiceStemGroup, "mute") === 1) {
                NumarkMixtrackGo.led.setPad4Off(deckIndex);
            } else {
                NumarkMixtrackGo.led.setPad4Bright(deckIndex);
            }
            setAcapelAndInstruLed();
        }
    });

    this.setDeckStartLeds = function() {
        pflConnection.trigger();
        NumarkMixtrackGo.led.setPflShiftDim(deckIndex); // shift pfl is always dim

        loadConnection.trigger();
        NumarkMixtrackGo.led.setLoadShiftBright(deckIndex); // shift load is always bright

        // hotcues - controller is always started at hotcue mode so only hotcue leds need to be set
        for (let i = 1; i <= 4; i++) {
            this.hotcueConnections[i].trigger();
        }
        syncConnection.trigger();
        NumarkMixtrackGo.led.setSyncShiftDim(deckIndex); //shift sync is always dim (different than serato on purpose)

        cueConnection.trigger();
        playConnection.trigger();
        playIndicatorConnection.trigger();
        playAndCueShiftTrackLoadedConnection.trigger();

        try { // stemsStateConnection is undefined in mixxx < 2.6
            stemsStateConnection.trigger();
        } catch (error) {
            console.log(error);
        }

        // mode leds - controller always loads in hotcue
        NumarkMixtrackGo.led.setModeHotcueBright(deckIndex);
        NumarkMixtrackGo.led.setModeLoopsDim(deckIndex);
        NumarkMixtrackGo.led.setModeSamplerDim(deckIndex);
        NumarkMixtrackGo.led.setModeStemsDim(deckIndex);
    };

    // had to implement this because the midi learning tool's reverse wasn't working
    this.tempoFader = new components.Pot({
        msb: 0,
        lsb: 0,
        input: function(_channel, control, value) {
            if (control === 0x09) { // midi control received for the msb value
                this.msb = value;
            }
            if (control === 0x29) { // midi control received for the lsb value
                this.lsb = value;
            }

            const forteenBitValue = (this.msb << 7) | this.lsb;// Construct the 14-bit number

            // Range is 0x0000..0x3FFF center @ 0x2000, i.e. 0..16383 center @ 8192
            const rate = (forteenBitValue - 8192) / 8191;

            // on this specific controller the resulting value needs to be inverted
            // (the midi learning tool invert was failing and this is why i needed to implement the control in js)
            const invertedRate = rate * -1;

            engine.setValue(group, "rate", invertedRate);
        }
    });
    // changes the mode and sets the pad leds accordingly
    this.mode = new components.Button({
        input: function(_channel, _control, value) {
            if (value === 127) {
                if (currentPadMode < padModesNumber - 1) {
                    currentPadMode = currentPadMode + 1;
                } else {
                    currentPadMode = 0;
                }

                switch (currentPadMode) {
                case 0: { // hotcue
                    NumarkMixtrackGo.led.setModeStemsDim(deckIndex);
                    NumarkMixtrackGo.led.setModeHotcueBright(deckIndex);

                    for (let i = 1; i <= 4; i++) {
                        const hotCueStatus = engine.getValue(group, `hotcue_${i}_status`);
                        if (hotCueStatus === 0) {
                            NumarkMixtrackGo.led.setPadOff(i, deckIndex);
                            NumarkMixtrackGo.led.setPadShiftOff(i, deckIndex);
                        } else { //status = 1 or 2
                            NumarkMixtrackGo.led.setPadBright(i, deckIndex);
                            NumarkMixtrackGo.led.setPadShiftBright(i, deckIndex);
                        }
                    }
                }
                    break;
                case 1: // loops
                    NumarkMixtrackGo.led.setModeHotcueDim(deckIndex);
                    NumarkMixtrackGo.led.setModeLoopsBright(deckIndex);

                    NumarkMixtrackGo.led.setAllPadsOff(deckIndex);
                    NumarkMixtrackGo.led.setAllPadsShiftOff(deckIndex);
                    break;
                case 2: // fx
                    NumarkMixtrackGo.led.setModeSamplerBright(deckIndex);

                    NumarkMixtrackGo.led.setAllPadsDim(deckIndex);
                    NumarkMixtrackGo.led.setAllPadsShiftOff(deckIndex);
                    break;
                case 3: // sampler
                    NumarkMixtrackGo.led.setModeLoopsDim(deckIndex);
                    NumarkMixtrackGo.led.setAllPadsOff(deckIndex);

                    for (let i = 1; i <= 4; i++) {
                        if (engine.getValue(`[Sampler${deckIndex * 4 + i}]`, "track_loaded") === 1) {
                            NumarkMixtrackGo.led.setPadBright(i, deckIndex);
                            NumarkMixtrackGo.led.setPadShiftBright(i, deckIndex);
                        } else {
                            NumarkMixtrackGo.led.setPadOff(i, deckIndex);
                            NumarkMixtrackGo.led.setPadShiftOff(i, deckIndex);
                        }
                    }
                    break;
                case 4: // stems
                    NumarkMixtrackGo.led.setModeSamplerDim(deckIndex);
                    NumarkMixtrackGo.led.setModeStemsBright(deckIndex);

                    NumarkMixtrackGo.led.setAllPadsOff(deckIndex);
                    NumarkMixtrackGo.led.setAllPadsShiftOff(deckIndex);

                    if (engine.getValue(group, "stem_count") > 0) {
                        isStemsTrackLoaded = true;
                        for (let i = 1; i <= 4; i++) {
                            if (engine.getValue(`[Channel${deckNumber}_Stem${i}]`, "mute") === 0) {
                                NumarkMixtrackGo.led.setPadBright(i, deckIndex);
                            } else {
                                NumarkMixtrackGo.led.setPadOff(i, deckIndex);
                            }
                        }
                    }
                    break;
                }
            }
        }
    });//mode end

    this.jogWheel = new components.JogWheelBasic({
        wheelResolution: 242, // ticks per full revolution (Mixtrack Go has 242 approximately)
        alpha: 1/8, // default
        beta: this.alpha/32, // optional, default as is, here for further tuning if necessary
        rpm: 33 + 1/3, //optional, default as is, here for further tuning if necessary
        group: group,
        deck: deckNumber, // required by JogWheelBasic (scratchEnable/scratchTick use the deck number)
        vinylMode: isVinylModeInitiallyActivated,
        //Overriding inputWheel to tune values according to user settings
        inputWheel: function(_channel, _control, value, _status, _group) {
            if (!this.deck) {
                return;
            }

            let pitchBendValue;
            let scratchValue;
            if (value === 127) {
                if (engine.getValue(group, "play") === 0) {
                    scratchValue = -1 * stripSearchSpeedSetting;
                } else {
                    scratchValue = -1;
                }
                pitchBendValue = -1;
            } else { // value === 0x01
                if (engine.getValue(group, "play") === 0) {
                    scratchValue = 1 * stripSearchSpeedSetting;
                } else {
                    scratchValue = 1;
                }
                pitchBendValue = 1;
            }

            if (engine.isScratching(this.deck)) {
                engine.scratchTick(this.deck, scratchValue);
            } else {
                this.inSetValue(pitchBendValue);

            }
        },
        // Overriding inputTouch because we don't want to have scratching disabled
        // in the engine when a track is not playing, regardless of the state of this.vinylMode.
        // The reason is a clear input latency while moving the playhead throughout the waveform
        // with the jogwheel when the track is not playing, caused by this.inSetValue which is
        // adequate for pitch bending but not as responsive as with scratchEnable
        inputTouch: function(channel, control, value, status, _group) {
            if (!this.deck) {
                return;
            }

            if (this.isPress(channel, control, value, status)) {
                if (engine.getValue(group, "play") === 0 || this.vinylMode) {
                    engine.scratchEnable(this.deck,
                        this.wheelResolution,
                        this.rpm,
                        this.alpha,
                        this.beta);
                }
            } else {
                engine.scratchDisable(this.deck);
            }
        },
    });

    // Shift + platter: fast scrub through the track
    this.jogShiftScrub = new components.Button({
        input: function(_channel, _control, value) {
            const duration = engine.getValue(group, "duration");
            if (duration <= 0) {
                return;
            }
            // signed tick count: 0x01.. = clockwise, 0x7F.. = counterclockwise
            const ticks = value < 0x40 ? value : value - 0x80;
            const position = engine.getValue(group, "playposition");
            const newPosition = Math.min(1, Math.max(0, position + ticks * fastScrubSecondsPerTick / duration));
            engine.setValue(group, "playposition", newPosition);
        }
    });
    this.filterLowPot = new components.Pot({
        input: function(_channel, _control, value) {
            const newValue = Math.round(script.absoluteLin(value, 0, 1, 0, 127) * 100) / 100;

            if (filterLowSwitch === 0) {
                // Filter - since this will use QuickEffectRack1, the effect is whatever the user has set
                // Setting the filter programmatically is a bad idea because whatever is set, if it's parameters where modified,
                // they'd be reset if filter was set programmatically and the sound could change drastically.
                engine.setValue(`[QuickEffectRack1_[Channel${deckNumber}]]`, "super1", newValue);
            } else {
                // Low
                // warning [Main] "EffectParameter(Low)" WARNING: Value was outside of limits, clamped.
                // getting this warning when script.absoluteLin returns 1
                engine.setParameter(`[EqualizerRack1_[Channel${deckNumber}]_Effect1]`, "parameter1", newValue);
            }
        },
    });

    // LOAD: short press loads on release; hold one second to eject.
    this.loadButton = new components.Button({
        loadHeld: false,
        longPressHandled: false,
        holdTimer: 0,
        input: function(_channel, _control, value, status) {
            const pressed = (status & 0xF0) === 0x90 && value > 0;
            if (pressed) {
                if (deckNumber === 1) {
                    NumarkMixtrackGo.autoNext.cancelPending();
                }
                if (this.loadHeld) return;
                this.loadHeld = true;
                this.longPressHandled = false;
                const button = this;
                this.holdTimer = engine.beginTimer(1000, function() {
                    button.holdTimer = 0;
                    if (!button.loadHeld) return;
                    button.longPressHandled = true;
                    if (engine.getValue(group, "play") === 0 &&
                        engine.getValue(group, "track_loaded") === 1) {
                        script.triggerControl(group, "eject");
                    }
                }, true);
                return;
            }
            if (!this.loadHeld) return;
            this.loadHeld = false;
            if (this.holdTimer) {
                engine.stopTimer(this.holdTimer);
                this.holdTimer = 0;
            }
            if (!this.longPressHandled) {
                script.triggerControl(group, "LoadSelectedTrack");
            }
            this.longPressHandled = false;
        }
    });

    this.pflButton = new components.Button({
        input: function(_channel, _control, value, _status, group) {
            if (value === 127) {
                script.toggleControl(group, "pfl");
                if (engine.getValue(group, "pfl") === 1) {
                    NumarkMixtrackGo.led.setPflBright(deckIndex);
                } else {
                    NumarkMixtrackGo.led.setPflDim(deckIndex);
                }
            }
        }
    });

    this.acapelButton = new components.Button({
        input: function(_channel, _control, value) {
            if (value === 127) {
                if (isStemsTrackLoaded) {
                    if (engine.getValue(drumsStemGroup, "mute") === 1 &&
                    engine.getValue(bassStemGroup, "mute") === 1 &&
                    engine.getValue(synthsStemGroup, "mute") === 1 &&
                    engine.getValue(voiceStemGroup, "mute") === 0) {

                        engine.setValue(drumsStemGroup, "mute", 0);
                        engine.setValue(bassStemGroup, "mute", 0);
                        engine.setValue(synthsStemGroup, "mute", 0);
                    } else {
                        engine.setValue(drumsStemGroup, "mute", 1);
                        engine.setValue(bassStemGroup, "mute", 1);
                        engine.setValue(synthsStemGroup, "mute", 1);
                        engine.setValue(voiceStemGroup, "mute", 0);
                    }
                }
            }
        }
    });

    this.instruButton = new components.Button({
        input: function(_channel, _control, value) {
            if (value === 127) {
                if (isStemsTrackLoaded) {
                    if (engine.getValue(drumsStemGroup, "mute") === 0 &&
                    engine.getValue(bassStemGroup, "mute") === 0 &&
                    engine.getValue(synthsStemGroup, "mute") === 0 &&
                    engine.getValue(voiceStemGroup, "mute") === 1) {
                        engine.setValue(voiceStemGroup, "mute", 0);
                    } else {
                        engine.setValue(drumsStemGroup, "mute", 0);
                        engine.setValue(bassStemGroup, "mute", 0);
                        engine.setValue(synthsStemGroup, "mute", 0);
                        engine.setValue(voiceStemGroup, "mute", 1);
                    }
                }
            }
        }
    });

    // Shift + Cue (per Numark/Serato docs): returns the track to its beginning (and moves the cue point there).
    // If the play head is already at the start of the track, loads the previous track from the list.
    this.cueGoToAndPlayDoubleTapButton = new components.Button({
        input: function(_channel, _control, value) {
            if (value === 127) {
                if (engine.getValue(group, "playposition") <= 0.001) {
                    engine.setValue("[Playlist]", "SelectTrackKnob", -1);
                    script.triggerControl(group, "LoadSelectedTrack");
                } else {
                    engine.setValue(group, "start", 1);
                    engine.setValue(group, "start", 0);
                    // the seek needs a moment to be applied before the cue can be set at the new position
                    engine.beginTimer(50, () => {
                        engine.setValue(group, "cue_set", 1);
                        engine.setValue(group, "cue_set", 0);
                    }, true);
                }
            }
        }
    });
    this.playCueGoToAndPlayButton = new components.Button({
        input: function(_channel, _control, value) {
            if (value === 127) {
                script.triggerControl(group, "cue_gotoandplay");
            }
        }
    });

    this.pads = [];
    for (let i = 0; i < 4; i++) {
        this.pads[i] = new components.Button({
            padNumber: i+1,
            hotcueStatusControl: `hotcue_${(i+1)}_status`,
            hotcueSetControl: `hotcue_${(i+1)}_set`,
            hotcueGoToAndPlayControl: `hotcue_${(i+1)}_gotoandplay`,
            hotcueClearControl: `hotcue_${(i+1)}_clear`,
            effectUnitGroup: `[EffectRack1_EffectUnit${(i+1)}]`,
            effectUnitEffect1Group: `[EffectRack1_EffectUnit${(i+1)}_Effect1]`,
            effectEnableControl: `group_${group}_enable`,
            samplerGroup: `[Sampler${deckIndex * 4 + i + 1}]`,
            samplerPadHeld: false,
            samplerHoldHandled: false,
            samplerHoldTimer: 0,
            stemGroup: `[Channel${deckNumber}_Stem${(i+1)}]`,

            input: function(_channel, control, value) {
                switch (currentPadMode) {
                case 0: // hotcue
                    if (value === 127) {
                        if (control === 0x14 || control === 0x15 || control === 0x16 || control === 0x17) {
                            if (engine.getValue(group, this.hotcueStatusControl) === 0) {
                                engine.setValue(group, this.hotcueSetControl, 1);
                            } else if (engine.getValue(group, this.hotcueStatusControl) === 1) {
                                engine.setValue(group, this.hotcueGoToAndPlayControl, 1);
                            } else { //status = 2
                                //Hotcue X is active (saved loop is enabled or hotcue is previewing)
                                console.log("ignoring hotcue status 2");
                            }
                        } else { //control = 0x1C or 0x1D or 0x1E or 0x1F
                            engine.setValue(group, this.hotcueClearControl, 1);
                        }
                    }
                    break;
                case 1: // loops
                    if (value === 127) {
                        engine.setValue(group, `beatloop_${beatloopPadSizes[this.padNumber - 1]}_toggle`, 1);
                        // to speed up the feedback from cliking the button since engine.connection may take up to 500ms
                        NumarkMixtrackGo.led.setAllPadsOff(deckIndex);
                        if (engine.getValue(group, `beatloop_${beatloopPadSizes[this.padNumber - 1]}_enabled`) === 1) {
                            NumarkMixtrackGo.led.setPadBright(this.padNumber, deckIndex);
                        } else {
                            NumarkMixtrackGo.led.setPadOff(this.padNumber, deckIndex);
                        }
                    }
                    break;
                case 2: // fx - if effect unit not loaded sets some fx and waits 200ms to set params on some
                    if (value === 127) {
                        if (this.padNumber < 4) {
                            if (engine.getValue(this.effectUnitEffect1Group, "loaded") === 0) {
                                if (this.padNumber === 1) {
                                    for (let i = 0; i <= echoEffectIndex; i++) {
                                        engine.setValue(this.effectUnitEffect1Group, "next_effect", 1);
                                    }
                                    engine.beginTimer(200, () => {
                                        engine.setValue(this.effectUnitEffect1Group, "meta", 0.5);
                                        engine.setValue(this.effectUnitGroup, "mix", 0.5);
                                        engine.setValue(this.effectUnitEffect1Group, "enabled", 1);
                                        engine.setValue(this.effectUnitGroup, this.effectEnableControl, 1);
                                    }, true);
                                } else if (this.padNumber === 2) {
                                    for (let i = 0; i <= flangerEffectIndex; i++) {
                                        engine.setValue(this.effectUnitEffect1Group, "next_effect", 1);
                                    }
                                    engine.beginTimer(200, () => {
                                        engine.setValue(this.effectUnitEffect1Group, "meta", 1.0);
                                        engine.setValue(this.effectUnitGroup, "mix", 0.75);
                                        engine.setValue(this.effectUnitEffect1Group, "enabled", 1);
                                        engine.setValue(this.effectUnitGroup, this.effectEnableControl, 1);
                                    }, true);
                                } else { // padnumber = 3
                                    for (let i = 0; i <= reverbEffectIndex; i++) {
                                        engine.setValue(this.effectUnitEffect1Group, "next_effect", 1);
                                    }
                                    engine.beginTimer(200, () => {
                                        engine.setValue(this.effectUnitEffect1Group, "meta", 0.7);
                                        engine.setValue(this.effectUnitGroup, "mix", 0.5);
                                        engine.setValue(this.effectUnitEffect1Group, "enabled", 1);
                                        engine.setValue(this.effectUnitGroup, this.effectEnableControl, 1);
                                    }, true);
                                }
                            } else { // the effect unit was loaded
                                engine.setValue(this.effectUnitEffect1Group, "enabled", 1);
                                engine.setValue(this.effectUnitGroup, this.effectEnableControl, 1);
                            }
                        } else { // pad 4 action
                            engine.setValue(group, beatloopRollControl, 1);
                        }
                    } else { // pad released
                        if (this.padNumber < 4) {
                            engine.setValue(this.effectUnitGroup, this.effectEnableControl, 0);
                        } else {
                            engine.setValue(group, beatloopRollControl, 0);
                        }
                    }
                    break;
                case 3: // sampler: short Pad retriggers + Beat Sync; long Pad stops
                    {
                        const normalPad = control === (0x14 + this.padNumber - 1);
                        if (!normalPad) {
                            break; // Shift + Pad has no sampler action
                        }

                        if (value === 127) {
                            if (this.samplerPadHeld) {
                                break;
                            }
                            this.samplerPadHeld = true;
                            this.samplerHoldHandled = false;
                            const button = this;
                            this.samplerHoldTimer = engine.beginTimer(1000, function() {
                                button.samplerHoldTimer = 0;
                                if (!button.samplerPadHeld || currentPadMode !== 3) {
                                    return;
                                }
                                button.samplerHoldHandled = true;
                                if (engine.getValue(button.samplerGroup, "play") === 1) {
                                    script.triggerControl(button.samplerGroup, "stop");
                                }
                            }, true);
                            break;
                        }

                        if (!this.samplerPadHeld) {
                            break;
                        }
                        const heldLongEnough = this.samplerHoldHandled;
                        this.samplerPadHeld = false;
                        this.samplerHoldHandled = false;
                        if (this.samplerHoldTimer) {
                            engine.stopTimer(this.samplerHoldTimer);
                            this.samplerHoldTimer = 0;
                        }
                        if (!heldLongEnough &&
                            engine.getValue(this.samplerGroup, "track_loaded") === 1) {
                            engine.setValue(this.samplerGroup, "start_play", 1);
                            script.triggerControl(this.samplerGroup, "beatsync");
                        }
                    }
                    break;
                case 4: // stems
                    if (value === 127) {
                        if (isStemsTrackLoaded) {
                            script.toggleControl(this.stemGroup, "mute");
                        }
                    }
                    break;
                }
            }
        });
    }// pads end
};