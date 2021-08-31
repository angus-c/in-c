import instruments from "./instruments.js";

async function init() {
  if (Tone.context.state !== "running") Tone.context.resume();
  await Tone.start();
}

class Player {
  constructor(instrumentName, baseVolume, attack, attackTime) {
    this.attack = attack;
    this.attackTime = attackTime;
    this.voice = new Tone[instrumentName](
      instruments[instrumentName]
    ).toDestination();
    this.voice.defaultVolume = this.voice._volume._unmutedVolume;
    // this.voice = new Tone[instrument]().connect(ampEnv);
  }

  play(pitch, duration, volumeOverride = 0) {
    let formattedDuration = `${1 / duration}n`;
    let [note, octave] = pitch;
    let formattedPitch = note == note.toUpperCase() ? `${note}#` : note;
    // console.dir(this.voice._volume._unmutedVolume);
    // this.voice._volume._unmutedVolume =
    //   this.voice.defaultVolume + volumeOverride;
    this.voice.triggerAttackRelease(
      `${formattedPitch}${octave}`,
      formattedDuration
    );
  }

  rest() {
    // TBD if necessary
  }
}

export { Player, instruments, init };
