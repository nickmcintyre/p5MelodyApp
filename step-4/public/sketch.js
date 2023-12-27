let hasPlayed = false;

function preload() {
  // Load the JSON data from the server.
  loadJSON(`/melody`, function (results) {
    // Print melody to console.
    console.log(results);

    // Store JSON file & melody details in object.
    melody = results;

    // Update the note duration.
    noteDuration = 60 / melody.tempo;
  });
}

function setup() {
  createCanvas(400,400);

  // Use the HSB color model.
  colorMode(HSB);

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
  background(255);

  // Visualize the melody.
  drawMelody();

  // Display the melody's name.
  fill(0);
  text(melody.name, width / 2, 80);

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
