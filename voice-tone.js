async function init() {
  if (Tone.context.state !== "running") Tone.context.resume();
  await Tone.start();
}

const options = {
  PluckSynth: {
    envelope: {
      attack: 0.1,
      susatin: 0.1,
      decay: 1.4,
      release: 0.4,
    },
    volume: 10,
  },
  PolySynth: {
    envelope: {
      attack: 0.1,
      susatin: 0.1,
      decay: 1.4,
      release: 0.4,
    },
    volume: 0,
  },
  FMSynth: {
    envelope: {
      attack: 0.1,
      susatin: 0.1,
      decay: 1.4,
      release: 0.4,
    },
    volume: -10,
  },
  MembraneSynth: {
    envelope: {
      attack: 0.1,
      susatin: 0.1,
      decay: 1.4,
      release: 0.4,
    },
    volume: -10,
  },
  AMSynth: {
    envelope: {
      attack: 0.1,
      susatin: 0.1,
      decay: 1.4,
      release: 0.4,
    },
    volume: -10,
  },
  MonoSynth: {
    envelope: {
      attack: 0.1,
      susatin: 0.1,
      decay: 1.4,
      release: 0.4,
    },
    volume: -10,
  },
};

class Player {
  constructor(instrument, baseVolume, attack, attackTime) {
    this.baseVolume = baseVolume;
    this.attack = attack;
    this.attackTime = attackTime;
    this.voice = new Tone[instrument](options[instrument]).toDestination();
    // this.voice = new Tone[instrument]().connect(ampEnv);
  }

  play(pitch, duration, volumeOverride) {
    let volume = volumeOverride || this.baseVolume;
    let formattedDuration = `${1 / duration}n`;
    let [note, octave] = pitch;
    let formattedPitch = note == note.toUpperCase() ? `${note}#` : note;
    this.voice.triggerAttackRelease(
      `${formattedPitch}${octave}`,
      formattedDuration
    );
  }

  rest() {
    // TBD if necessary
  }
}

export { Player, init };
