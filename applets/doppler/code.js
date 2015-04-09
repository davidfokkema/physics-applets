var interval = 1000;
var radiusInterval = 50;
var cSteps = 30;

var intervalScaler = radiusInterval / interval;
var cStep = 2 * Math.PI / cSteps;

var t0 = 0;
var sources = [];

var red, blue, white;


function setup() {
  createCanvas(displayWidth, displayHeight);
  strokeWeight(3);
  noFill();

  red = color(255, 0, 0);
  blue = color(0, 0, 255);
  white = color(255);
}

function draw() {
  var t = Date.now();
  var dt = t - t0;

  background(0);
  noFill();

  if (dt >= interval) {
    t0 = t;
    dt = 0;
    sources.unshift([mouseX, mouseY]);
    if (sources.length * radiusInterval > 1.5 * width) {
      sources.pop();
    }
  }

  var prevPoints = null;
  for (i = sources.length - 1; i >= 0; i --) {
    var cx = sources[i][0];
    var cy = sources[i][1];
    var radius = i * radiusInterval + intervalScaler * dt;

    var points = [];
    for (j = 0; j < cSteps; j ++) {
      start = j * cStep;
      centerValue = (j + .5) * cStep;
      stop = (j + 1) * cStep;
      x = radius * cos(centerValue) + cx;
      y = radius * sin(centerValue) + cy;
      points.push([x, y]);

      if (prevPoints) {
        r = dist(x, y, prevPoints[j][0], prevPoints[j][1]) / radiusInterval;
        if (r < 1.) {
          stroke(lerpColor(blue, white, r));
        } else {
          stroke(lerpColor(red, white, 1 / r));
        }
      }
      else {
        stroke(white);
      }
      arc(cx, cy, radius * 2, radius * 2, start, stop);
    }

    prevPoints = points;
  }

  fill();
  stroke(white);
  ellipse(mouseX, mouseY, 5, 5);
}

function mouseClicked() {
  sources = [];
  t0 = 0;
}
