let canvas = document.querySelector("#viz");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let restColor = "240,240,240";
let sustain = 600;

let hSeparation;
let vSeparation;

let radius;

let colorMap = {
  a3: "30,38,132",
  "a#3": "19,86,169",
  b3: "18,147,169",
  c3: "20,153,83",
  "c#3": "151,200,63",
  d3: "254,243,10",
  "d#3": "250,160,22",
  e3: "241,109,25",
  f3: "235,65,27",
  "f#3": "229,0,29",
  g3: "172,0,93",
  "g#3": "78,26,126",
  a4: "30,38,132",
  "a#4": "19,86,169",
  b4: "18,147,169",
  c4: "20,153,83",
  "c#4": "151,200,63",
  d4: "254,243,10",
  "d#4": "250,160,22",
  e4: "241,109,25",
  f4: "235,65,27",
  "f#4": "229,0,29",
  g4: "172,0,93",
  "g#4": "78,26,126",
};

let rowMap = {
  a3: 3,
  "a#3": 2,
  b3: 1,
  c3: 0,
  "c#3": 11,
  d3: 10,
  "d#3": 9,
  e3: 8,
  f3: 7,
  "f#3": 6,
  g3: 5,
  "g#3": 4,
  a4: 3,
  "a#4": 2,
  b4: 1,
  c4: 0,
  "c#4": 11,
  d4: 10,
  "d#4": 9,
  e4: 8,
  f4: 7,
  "f#4": 6,
  g4: 5,
  "g#4": 4,
};

function initViz(parts) {
  hSeparation = width / (parts + 1);
  vSeparation = height / 12;
  radius = Math.min(vSeparation / 4, hSeparation / 4);
  for (let v = 0; v < 12; v++) {
    for (let p = 0; p < parts; p++) {
      drawCircle((p + 0.5) * hSeparation, (v + 0.5) * vSeparation, restColor);
    }
  }
}

function updateViz(part, note, duration) {
  let x = (part + 0.5) * hSeparation;
  let y = (rowMap[note] + 0.5) * vSeparation;
  clear(part, x, y);
  new Promise((r) => setTimeout(() => r(), 100)).then(() => {
    drawCircle(x, y, colorMap[note]);
    new Promise((r) => setTimeout(() => r(), sustain * duration)).then(() =>
      clear(part, x, y)
    );
  });
}

function clear(part, x, y) {
  ctx.clearRect(
    x - 0.5 * hSeparation,
    y - 0.5 * vSeparation,
    hSeparation,
    vSeparation
  );
  // drawCircle(x, y, restColor);
}

function drawCircle(x, y, color) {
  ctx.fillStyle = `rgb(${color})`;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}

export { initViz, updateViz };
