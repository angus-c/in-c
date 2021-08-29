let canvas = document.querySelector("#viz");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let restColor = "200,200,200";

let partY = height / 2;
let partSeparation;
let radius;

// https://music.stackexchange.com/questions/6320/is-there-a-color-code-for-notes
let colorMap = {
  a2: "255,99,0",
  "a#2": "255,36,0",
  b2: "153,255,0",
  c3: "40,255,0",
  "c#3": "0,255,232",
  d3: "0,124,255",
  "d#3": "5,0,255",
  e3: "69,0,234",
  f3: "87,0,158",
  "f#3": "85,0,79",
  g3: "179,0,0",
  "g#3": "238,0,0",
  a3: "255,99,0",
  "a#3": "255,36,0",
  b3: "153,255,0",
  c4: "40,255,0",
  "c#4": "0,255,232",
};

function initViz(parts) {
  partSeparation = width / (parts + 1);
  radius = Math.min(height / 2, partSeparation / 2);
  for (let p = 0; p < parts; p++) {
    drawCircle((p + 0.5) * partSeparation, partY, restColor);
  }
}

function updateViz(part, note) {
  drawCircle((part + 0.5) * partSeparation, partY, colorMap[note]);
  setTimeout(() => clear(part), 200);
}

function clear(part) {
  ctx.clearRect(partSeparation * part, 0, partSeparation, height);
  drawCircle((part + 0.5) * partSeparation, partY, restColor);
}

function drawCircle(x, y, color) {
  ctx.fillStyle = `rgb(${color})`;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}

export { initViz, updateViz };
