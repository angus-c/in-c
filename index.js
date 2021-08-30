import { Player, instruments, init } from "./voice-tone.js";
// import pitches from "./pitches";
import { getPhrasesAsQueues as getPhrases } from "./phrases.js";
import { initViz, updateViz } from "./viz.js";

let numberOfParts = 3;
let bpm = 60;
let baseBeat = 1 / 8;
let advanceIndex = 2;
let maxPhraseRange = 5;
let downbeatEmphasis = 30;

let phrases = getPhrases(baseBeat);
let numberOfPhrases = phrases.length;
let beatInterval = (60 * 1000 * baseBeat) / bpm;
let baseVolume = 0.1;

let phraseMap = [];

let parts = [];
for (let p = 0; p < numberOfParts; p++) {
  let phraseNumber;
  if (p == 0) {
    // part 1 is metronomic high c throughout piece
    phraseNumber = 0;
  } else {
    phraseNumber = 1;
    phraseMap.push(phraseNumber);
  }
  parts.push({
    phraseNumber,
    beat: -1,
    player: new Player(instruments[p % instruments.length]),
  });
}

initViz(parts.length);

let minPhrase = Math.min(...phraseMap);

async function play() {
  let notes,
    cycles = 0;
  let int = setInterval(function () {
    let notes = parts.map(playPart);
  }, beatInterval);

  function playPart(part, i) {
    part.beat = part.beat + 1;
    let { phraseNumber, player } = part;
    let phrase = phrases[phraseNumber];
    if (!phrase) {
      return;
    }
    if (part.beat >= phrase.notes.length) {
      if (
        canAdvance(part) &&
        Math.random() + (advanceIndex / 10 - 0.2) > phrase.prob
      ) {
        // move to next phrase
        part.phraseNumber = part.phraseNumber + 1;
        phraseMap[i - 1] = part.phraseNumber;
        minPhrase = Math.min(...phraseMap);
        console.log(phraseMap);
        if (part.phraseNumber > numberOfPhrases - 1) {
          parts.splice(i, 1);
          if (parts.length <= 1) {
            end(int);
          }
        }
      }
      part.beat = 0;
    }
    var { note, duration } = phrase.notes[part.beat];
    if (note == "--") {
      // voice.rest();
    } else if (note != "  ") {
      player.play(note, duration /*, part.beat === 0 ? downbeatEmphasis : 0*/);
      updateViz(i, note, parseFloat(duration, 10));
    }
    return [note, phraseNumber];
  }
}

function canAdvance(part) {
  return part.phraseNumber + 1 - minPhrase < maxPhraseRange;
}

function end(int) {
  window.clearInterval(int);
  // process.exit(0);
}

document.addEventListener("mousedown", async () => {
  let ac = new AudioContext();
  await ac.resume();
  await init();
  try {
    await play();
  } catch (e) {
    console.log("ERROR:", e);
  }
  console.log("done");
});
