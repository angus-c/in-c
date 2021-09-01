import { Player, init } from "./voice.js";
import instruments from "./instruments.js";
import { getPhrasesAsQueues as getPhrases } from "./phrases.js";
import { initViz, updateViz } from "./viz.js";

let numberOfParts = 18;
let bpm = 80;
let baseBeat = 1 / 8;
let advanceIndex = 2;
let maxPhraseRange = 5;
let downbeatEmphasis = 30;

let phrases = getPhrases(baseBeat);
let numberOfPhrases = phrases.length;
let beatInterval = (60 * 1000 * baseBeat) / bpm;

let loop;
let phraseMap = [];
let parts = [];
for (let p = 0; p < numberOfParts; p++) {
  let phraseNumber;
  if (p == 0) {
    // part 1 is a metronomic high c throughout piece
    phraseNumber = 0;
  } else {
    phraseNumber = 1;
    phraseMap.push(phraseNumber);
  }
  let instrumentNames = Object.keys(instruments);
  parts.push({
    phraseNumber,
    beat: -1,
    player: new Player(instrumentNames[p % instrumentNames.length]),
    // player: new Player(instrumentNames[4]),
  });
}

initViz(parts.length);

let minPhrase = Math.min(...phraseMap);

async function play() {
  let notes,
    cycles = 0;
  loop = setInterval(function () {
    let notes = parts.map(playPart);
  }, beatInterval);
}

function playPart(part, i) {
  part.beat = part.beat + 1;
  let { phraseNumber, player } = part;
  let phrase = phrases[phraseNumber];
  if (!phrase) {
    return;
  }
  if (part.beat >= phrase.notes.length) {
    moveToNextPhraseMaybe(part, i, phrase);
    part.beat = 0;
  }
  var { note, duration } = phrase.notes[part.beat];
  if (note == "--") {
  } else if (note != "  ") {
    player.play(note, duration /*, part.beat === 0 ? downbeatEmphasis : 0*/);
    updateViz(i, note, parseFloat(duration, 10));
  }
  return [note, phraseNumber];
}

function moveToNextPhraseMaybe(part, partIndex, phrase) {
  if (canAdvance() && Math.random() + (advanceIndex / 10 - 0.2) > phrase.prob) {
    // move to next phrase
    part.phraseNumber = part.phraseNumber + 1;
    phraseMap[partIndex - 1] = part.phraseNumber;
    minPhrase = Math.min(...phraseMap);
    console.log(phraseMap);
    if (part.phraseNumber > numberOfPhrases - 1) {
      parts.splice(partIndex, 1);
      if (parts.length <= 1) {
        end(loop);
      }
    }
  }

  function canAdvance() {
    return part.phraseNumber + 1 - minPhrase < maxPhraseRange;
  }
}

function end(loop) {
  window.clearInterval(loop);
}

let button = document.querySelector("#play-button");
button.addEventListener("mousedown", ready);
button.addEventListener("touchend", ready);

async function ready() {
  await init();
  try {
    await play();
  } catch (e) {
    console.log("ERROR:", e);
  }
  console.log("done");
}
