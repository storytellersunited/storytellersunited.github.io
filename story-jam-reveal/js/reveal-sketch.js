/* Author: Philo van Kemenade < https://phivk.com/ >
 * Source: https://openprocessing.org/sketch/1979871
 *
 * Sketch inspired by Dae In Chung https://genart.social/@daeinc/110325008534351052
 * Easing animation inspired by Oliver Steele https://openprocessing.org/sketch/1040677
 */

let startTime = 0,
  endTime = 0; // when the current animation started and ends
let animationDuration = 500; // animations take this many milliseconds

let radius = 200;
let c1, c2, c3, c4;
let p1, p2, p3, p4;

function setup() {
  console.log("setup()");
  let revealCanvas = document.getElementById("reveal-canvas");
  let canvasWidth = calcCanvasWidth();
  createCanvas(canvasWidth, 500, revealCanvas);

  cBG = color("#1646C1");
  c1 = color("#FF5A17");
  c2 = color("#C3ECF7");
  c3 = color("#2F80ED");
  c4 = color("#F5A623");

  background(cBG);
  noStroke();

  p1 = new Point(c1);
  p2 = new Point(c2);
  p3 = new Point(c3);
  p4 = new Point(c4);

  setInterval(movePoints, 1000);
}

function draw() {
  background(cBG);

  let s = map(millis(), startTime, endTime, 0, 1, true);
  let t = easeOutCubic(s);

  p1.update(t);
  p2.update(t);
  p3.update(t);
  p4.update(t);

  drawLine(p1, p2);
  drawLine(p2, p3);
  drawLine(p3, p4);
  drawLine(p4, p1);
}

function windowResized() {
  let canvasWidth = calcCanvasWidth();
  resizeCanvas(canvasWidth, 500);
}

class Point {
  constructor(
    color,
    x = 0.1 * width + random(0.8 * width),
    y = 0.2 * height + random(0.6 * height)
  ) {
    this.color = color;
    this.startState = {
      x: x,
      y: y,
    };
    this.endState = this.startState;
  }

  update(t) {
    this.currentState = {
      x: lerp(this.startState.x, this.endState.x, t),
      y: lerp(this.startState.y, this.endState.y, t),
    };
  }

  move() {
    this.startState = this.currentState;
    this.endState = {
      x: 0.1 * width + random(0.8 * width),
      y: 0.2 * height + random(0.6 * height),
    };
  }
}

function drawLine(p1, p2) {
  let max = 100;
  for (let i = 0; i < max; i++) {
    let portion = i / max;
    curColor = lerpColor(p1.color, p2.color, portion);
    fill(curColor);
    curXPos = lerp(p1.currentState.x, p2.currentState.x, portion);
    curYPos = lerp(p1.currentState.y, p2.currentState.y, portion);
    circle(curXPos, curYPos, radius);
  }
}

function mousePressed() {
  movePoints();
}

function movePoints() {
  startTime = millis();
  endTime = startTime + animationDuration;
  p1.move();
  p2.move();
  p3.move();
  p4.move();
}

function calcCanvasWidth() {
  let canvasWidth = windowWidth;
  if (windowWidth > 1400) {
    canvasWidth = 0.6 * windowWidth;
  } else if (windowWidth > 960) {
    canvasWidth = 0.8 * windowWidth;
  }
  return canvasWidth;
}

function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}
