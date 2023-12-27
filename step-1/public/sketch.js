// An Oscillator object.
let osc;

function setup() {
  createCanvas(400,400);

  // Middle C frequency.
  let freq = 262;

  // Create the Oscillator object.
  osc = new Oscillator(freq);

  // Set the text style.
  textAlign(CENTER, CENTER);
  textSize(30);
}

function draw() {
  background(220);
  
  // Display the Oscillator's frequency.
  if (osc.started === true) {
    let freq = osc.getFreq();
    text(`${freq} Hz`, width / 2, height / 2);
  } else {
    text('0 Hz', width / 2, height / 2);
  }
}

// Starts the oscillator when the mouse is pressed.
function mousePressed() {
  osc.start();
}

// Stops the oscillator when the mouse is released.
function mouseReleased() {
  osc.stop();
}
