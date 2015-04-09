var interval = 1000;
var radiusInterval = 90;
var cSteps = 4;

var intervalScaler = radiusInterval / interval;
var cStep = 2 * Math.PI / cSteps;

var t0 = 0;
var sources = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  strokeWeight(3);
  noFill();
}

function draw() {
  var t = Date.now();
  var dt = t - t0;

  background(0);

  if (dt >= interval) {
    t0 = t;
    dt = 0;
    sources.unshift([mouseX, mouseY]);
    if (sources.length * radiusInterval > 1.5 * width) {
      sources.pop();
    }
  }

  for (i = 0; i < sources.length; i ++) {
    var cx = sources[i][0];
    var cy = sources[i][1];
    var radius = i * radiusInterval + intervalScaler * dt;

    for (j = 0; j < TWO_PI; j += cStep) {
      stroke(lerpColor(color(255, 0, 0), color(0, 0, 255), (j + .5 * cStep) / TWO_PI));
      arc(cx, cy, radius, radius, j, j + cStep);
    }
  }
}

function mouseClicked() {
  sources = [];
  t0 = 0;
}
