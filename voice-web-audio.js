let Speaker = require("speaker");
let AudioContext = require("web-audio-engine").StreamAudioContext;
let context = new AudioContext();

export default Voice;

function Voice(baseVolume, attack, attackTime) {
  this.baseVolume = baseVolume;
  this.attack = attack;
  this.attackTime = attackTime;
  this.osc = context.createOscillator();
  this.amp = context.createGain();
  this.osc.connect(this.amp);
  this.osc.type = "square";
  this.amp.connect(context.destination);
  context.pipe(new Speaker());
  context.resume();
  this.osc.onended = function () {
    // process.exit(0);
  };
}

Voice.prototype.play = function (pitch, volumeOverride) {
  thisVolume = volumeOverride || this.baseVolume;
  this.osc.frequency.value = pitch;
  this.amp.gain.value = thisVolume * this.attack;
  this.osc.start(0);
  setTimeout(() => {
    this.amp.gain.value = thisVolume;
    this.osc.start(0);
  }, this.attackTime);
};

Voice.prototype.rest = function () {
  // console.log('rest')
  this.amp.gain.value = 0;
};
