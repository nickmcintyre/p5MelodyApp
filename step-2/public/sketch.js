let hasPlayed = false;

function setup() {
  createCanvas(400,400);

  // Create Oscillator objects.
  for (let freq of frequencies) {
    // Create Oscillator object using note frequency.
    let osc = new Oscillator(freq);

    // Add the Oscillator to the oscillators array.
    oscillators.push(osc);
  }

  // Set the text style.
  textAlign(CENTER, CENTER);
  textSize(30);
}

function draw() {
  background(220);

  // Display the melody's name.
  text(melody.name, width / 2, 50);

  // Display play instructions.
  if (hasPlayed === false) {
    text('Click to play', width / 2, height / 2);
  }
  
  // Display the Oscillator's frequency if playing.
  for (let osc of oscillators) {
    if (osc.started === true) {
      let freq = floor(osc.getFreq());
      text(`${freq} Hz`, width / 2, height / 2);
    }
  }
}

// Plays the melody when the mouse is pressed.
function mousePressed() {
  if (hasPlayed === false) {
    play();
    hasPlayed = true;
  }
}
