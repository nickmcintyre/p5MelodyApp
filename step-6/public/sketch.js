// Load and save the melodies folder as JSON.
function preload() {
  melodies = loadJSON('/melodies'); 
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

  // Play button.
  playButton = createButton('&#9658;');
  playButton.position(10, 410);
  playButton.size(80);
  playButton.mousePressed(play);

  // Create a dropdown to select melodies.
  melodySelect = createSelect();
  melodySelect.position(100, 410);
  melodySelect.size(200);

  // Add file names to dropdown options.
  for (let file of melodies.files) {
    melodySelect.option(file);
  }

  // Add a callback function when melody is selected.
  melodySelect.changed(loadMelody);

  // Text input for the melody name.
  nameInput = createInput('Untitled');
  nameInput.position(100, 410);
  nameInput.size(200);

  // Save button.
  saveButton = createButton('Save');
  saveButton.position(100, 440);
  saveButton.size(80);

  // Radio select for app mode.
  modeRadio = createRadio();
  modeRadio.position(310, 410);
  modeRadio.size(90);

  // Add mode options.
  modeRadio.option('Playback');
  modeRadio.option('Record');

  // Select 'Playback' as the default.
  modeRadio.selected('Playback');
  playback();

  // Add a callback to toggle modes.
  modeRadio.changed(toggleMode);
}

function draw() {
  background(0);

  // Visualize the melody.
  drawMelody();
}
