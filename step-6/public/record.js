// Text input for naming melodies.
let nameInput;

// Button for saving melodies.
let saveButton;

// Radio button for playback and record modes.
let modeRadio;

// Toggles between recording and playback modes.
function toggleMode() {
  if (modeRadio.value() === 'Playback') {
    playback();
  } else {
    record();
  }
}

// Displays the UI for recording mode.
function record() {
  saveButton.show();
  melodySelect.hide();
  nameInput.show();
}

// Saves notes based on squares on the screen.
function updateMelody() {
  let gridSize = width / numIntervals;
  for (let t = 0; t < numIntervals; t += 1) {
    // Move from left to right.
    let x = t * gridSize;
    for (let n = 0; n < numNotes; n += 1) {
      // Move from bottom to top.
      let y = height - (n + 1) * gridSize;
      
      // Check if the mouse is within the square.
      // If it is, set that time interval's note.
      if (mouseX > x && mouseX < x + gridSize && mouseY > y && mouseY < y + gridSize) {
        melody.notes[t] = n;
        playNote(n);
      }
    }
  }
}

// Updates the melody every time the mouse is pressed.
function mousePressed() {
  if (modeRadio.value() === 'Record') {
    updateMelody();
  }
}
