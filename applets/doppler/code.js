var interval = 1000;
var radiusInterval = 90;
var intervalScaler = radiusInterval / interval;

var t0 = 0;
var sources = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  noFill();
}

function draw() {
  var t = Date.now();
  var dt = t - t0;

  clear();

  if (dt >= interval) {
    t0 = t;
    dt = 0;
    sources.unshift([mouseX, mouseY]);
    if (sources.length * radiusInterval > 2 * width) {
      sources.pop();
    }
  }

  for (i = 0; i < sources.length; i ++) {
    var x = sources[i][0];
    var y = sources[i][1];
    var radius = i * radiusInterval + intervalScaler * dt;
    ellipse(x, y, radius, radius);
  }
}

function mouseClicked() {
  sources = [];
  t0 = 0;
}
