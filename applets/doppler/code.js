var interval = 1000;
var radiusInterval = 90;
var cSteps = 50;

var intervalScaler = radiusInterval / interval;
var cStep = 2 * Math.PI / cSteps;

var t0 = 0;
var sources = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  strokeWeight(3);
}

function draw() {
  var t = Date.now();
  var dt = t - t0;

  background(0);

  if (dt >= interval) {
    t0 = t;
    dt = 0;
    sources.unshift([mouseX, mouseY]);
    if (sources.length * radiusInterval > 2 * width) {
      sources.pop();
    }
  }

  for (i = 0; i < sources.length; i ++) {
    var cx = sources[i][0];
    var cy = sources[i][1];
    var radius = i * radiusInterval + intervalScaler * dt;

    var x0 = radius + cx;
    var y0 = cy;
    for (j = cStep; j < TWO_PI + .5 * cStep; j += cStep) {
      var x = radius * cos(j) + cx;
      var y = radius * sin(j) + cy;

      if (i > 0) {
        var z = dist(x, y, pcx, pcy) / radius;
      }
      else {
        var z = 1.;
      }

      red = color(255, 0, 0);
      blue = color(0, 0, 255);
      stroke(lerpColor(blue, red, z));
      line(x0, y0, x, y);
      x0 = x;
      y0 = y;
    }

    var pcx = cx;
    var pcy = cy;
  }
}

function mouseClicked() {
  sources = [];
  t0 = 0;
}
