let phrases = [
  // metronome part
  {
    prob: 1,
    vol: 0.5,
    notes: ["c4|0.5", "c4|0.5", "c4|0.5", "c4|0.5", "c4|0.5", "c4|0.5"],
  },
  // ensemble...
  // 1
  {
    prob: 0.6,
    vol: 1,
    notes: ["--|1", "--|1", "--|1"],
  },
  // 2
  {
    prob: 0.8,
    vol: 1,
    notes: ["e3|1", "e3|1", "e3|1"],
  },
  // 3
  {
    prob: 0.8,
    vol: 1,
    notes: ["e3|0.5", "f3|0.5", "e3|1"],
  },
  // 4
  {
    prob: 0.8,
    vol: 1,
    notes: ["--|0.5", "e3|0.5", "f3|0.5", "e3|0.5"],
  },
  // 5
  {
    prob: 0.8,
    vol: 1,
    notes: ["--|0.5", "e3|0.5", "f3|0.5", "g3|0.5"],
  },
  // 6
  {
    prob: 0.8,
    vol: 1,
    notes: ["e3|0.5", "f3|0.5", "g3|0.5", "--|0.5"],
  },
  // 7
  {
    prob: 0.1,
    vol: 0.1,
    notes: ["c4|4", "c4|4"],
  },
  // 8
  {
    prob: 0.5,
    vol: 1.0,
    notes: [
      "--|1",
      "--|1",
      "--|1",
      "--|0.5",
      "c3|0.125",
      "c3|0.125",
      "c3|0.25",
      "--|0.5",
      "--|1",
      "--|1",
      "--|1",
      "--|1",
    ],
  },
  // 9
  {
    prob: 0.4,
    vol: 0.2,
    notes: ["g4|4", "f4|4", "f4|4"],
  },
  // 10
  {
    prob: 0.6,
    vol: 1.0,
    notes: ["b3|0.125", "g3|0.125", "--|0.5", "--|1", "--|1", "--|1"],
  },
  // 11
  {
    prob: 0.4,
    vol: 1.0,
    notes: ["b3|0.125", "g3|0.125"],
  },
  // 12
  {
    prob: 0.3,
    vol: 1.0,
    notes: [
      "f3|0.125",
      "g3|0.125",
      "b3|0.125",
      "g3|0.125",
      "b3|0.125",
      "g3|0.125",
    ],
  },
  // 13
  {
    prob: 0.5,
    vol: 0.3,
    notes: ["f3|0.5", "g3|0.5", "b3|4", "c4|1"],
  },
  // 14
  {
    prob: 0.6,
    vol: 0.7,
    notes: [
      "b3|0.25",
      "g3|0.75",
      "g3|0.25",
      "f3|0.25",
      "g3|0.5",
      "--|0.75",
      "g3|3.25",
    ],
  },
  // 15
  {
    prob: 0.2,
    vol: 0.2,
    notes: ["c4|4", "b3|4", "g3|4", "F3|4"],
  },
  // 16
  {
    prob: 0.8,
    vol: 1.0,
    notes: ["g3|0.25", "--|0.75", "--|1", "--|1", "--|1"],
  },
  // 17
  {
    prob: 0.8,
    vol: 1.0,
    notes: ["g3|0.25", "b3|0.25", "c4|0.25", "b3|0.25"],
  },
  // 18
  {
    prob: 0.8,
    vol: 1.0,
    notes: ["b3|0.25", "c4|0.25", "b3|0.25", "c4|0.25", "b3|0.25", "--|0.25"],
  },
  // 19
  {
    prob: 0.4,
    vol: 0.5,
    notes: ["--|1.5", "g4|1.5"],
  },
  // 19
  {
    prob: 0.8,
    vol: 0.8,
    notes: [
      "e3|0.25",
      "F3|0.25",
      "e3|0.25",
      "F3|0.25",
      "g2|0.75",
      "e3|0.25",
      "F3|0.25",
      "e3|0.25",
      "F3|0.25",
      "e3|0.25",
    ],
  },
];

function asQueue(phrase, baseBeat) {
  let queue = [];
  phrase.forEach((elem) => {
    let [note, duration] = elem.split("|");
    let beats = Array(Math.round(duration / baseBeat)).fill({ note: "  " });
    beats[0] = { note, duration };
    queue.push(...beats);
  });
  return queue;
}

function getPhrasesAsQueues(baseBeat = 1 / 8) {
  return phrases.map(({ prob, vol, notes }) => ({
    prob,
    vol,
    notes: asQueue(notes, baseBeat),
  }));
}

export { phrases, getPhrasesAsQueues };
