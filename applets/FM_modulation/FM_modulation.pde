int N = 800;
int A = 50;
float k = 1 / 3.;

int signal_y0, carrier_y0, output_y0;

float[] x = new float[N];
float[] ySignal = new float[N];
float[] yCarrier = new float[N];
float[] yOutput = new float[N];
float carrierPhase = 0, outputPhase = 0;
float signalMax = 50, carrierMin = 5;

int i;
boolean isPaused = false;


void setup() {
  size(800, 600);
  strokeWeight(2);
  resetWaves();
  
  frameRate(30);
  
  signal_y0 = height / 4;
  carrier_y0 = 2 * height / 4;
  output_y0 = 3 * height / 4;  
}

void draw() {
  float u;
  
  background(0);
  
  if (mousePressed) {
    u = mouseY - signal_y0;
    if (u > signalMax) u = signalMax;
    if (u < -signalMax) u = -signalMax;
    ySignal[0] = u;
  }
  
  stroke(0, 255, 0);
  line(0, signal_y0, width, signal_y0);
  stroke(255, 0, 0);
  line(0, signal_y0 + signalMax, width, signal_y0 + signalMax);
  line(0, signal_y0 - signalMax, width, signal_y0 - signalMax);

  stroke(255);  
  renderWave(signal_y0, ySignal);
  stroke(160);
  renderWave(carrier_y0, yCarrier);
  stroke(255);
  renderWave(output_y0, yOutput);
  
  if (!isPaused) {
    advanceSignal();
    advanceCarrier();
    advanceOutput();
  }
  
}

void keyPressed() {
  if (keyCode == ' ') {
    isPaused = !isPaused;
  }
}

void resetWaves() {
  for (i = 0; i < N; i ++) {
    x[i] = (i + .5) * width / N;
    ySignal[i] = 0;
    yCarrier[i] = -A * sin(k * x[i]);
    yOutput[i] = yCarrier[i];
  }
}

void renderWave(int y0, float[] y) {
  for (i = 1; i < N; i ++) {
    line(x[i-1], y0 + y[i-1], x[i], y0 + y[i]);
  }
}

void simulateOutput() {
  for (i = 0; i < N; i ++) {
    yOutput[i] = .5 * (-ySignal[i] + signalMax + carrierMin)
      * yCarrier[i] / A;
  }
}

void advanceSignal() {
  for (i = N - 1; i > 0; i --) {
    ySignal[i] = ySignal[i-1];
  }
}

void advanceCarrier() {
  carrierPhase += x[1] - x[0];
  for (i = N - 1; i > 0; i --) {
    yCarrier[i] = yCarrier[i-1];
  }
  yCarrier[0] = A * sin(k * carrierPhase);
}

void advanceOutput() {
  float signal, prevSignal;
  
  signal = -ySignal[0] / 200.;
  prevSignal = -ySignal[1] / 200.;
  
  for (i = N - 1; i > 0; i --) {
    yOutput[i] = yOutput[i-1];
  }
//  outputPhase -= (1 + signal / k) * (x[1] - x[0]);
  outputPhase += (x[1] - x[0]) * (k + signal);
  outputPhase %= 2 * PI;
  yOutput[0] = A * sin(outputPhase);
}
