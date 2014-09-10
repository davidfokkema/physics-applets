int N = 200;
float target_y;
float[] x = new float[N];
float[] y = new float[N];
float[] v = new float[N];
int i;
float force, force_left, force_right;
float easing = .1;
float k = .3;
float damping = .0015;
float a;

void setup() {
  size(800, 600);
  stroke(255);
  strokeWeight(5);
  
  resetString();
}

void draw() {
  background(0);
  if (mousePressed) {
    target_y = mouseY;
  }
  if (keyPressed) {
    resetString();
  }
  simulateString();
  renderString();
}

void resetString() {
  for (i = 0; i < N; i ++) {
    x[i] = (i + .5) * width / N;
    y[i] = height / 2;
    v[i] = 0;
  }
  target_y = y[0];
}

void renderString() {
  for (i = 1; i < N; i ++) {
    line(x[i-1], y[i-1], x[i],  y[i]);
  }
}

void simulateString() {
  y[0] += easing * (target_y - y[0]);
  
  for (i = 1; i < N - 1; i ++) {
    force_left = -k * (y[i] - y[i-1]);
    if (i < N - 1) {
      force_right = -k * (y[i] - y[i+1]);
      force = force_left + force_right;
    } else {
      force = force_left;
    }
    v[i] += force;
    v[i] *= (1 - damping);
  }
  for (i = 1; i < N - 1; i ++) {
    y[i] += v[i];
  }
}
