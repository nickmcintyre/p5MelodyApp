// Middle C frequency.
let first = 262;

// Array of frequencies in the key of C Major.
let frequencies = [
  first,
  first * 9/8,
  first * 5/4,
  first * 4/3,
  first * 3/2,
  first * 5/3,
  first * 15/8,
  first * 2
];

// Number of notes in the scale.
let numNotes = frequencies.length;

// Empty array for Oscillator objects.
let oscillators = [];

// Default value for meoldy when none is chosen.
let melody = {
  name: 'C Major Scale',
  notes: [0, 1, 2, 3, 4, 5, 6, 7],
  tempo: 100,
};

// Number of time intervals in the melody.
let numIntervals = melody.notes.length;

// Duration of each note (in seconds).
let noteDuration = 60 / melody.tempo;

// Button for playing melodies.
let playButton;

// Plays a note.
function playNote(n) {
  // Check if the Oscillator is started and start it if it hasn't.
  if (!oscillators[n].started) {
    oscillators[n].start();
  }

  // Start playing the note by increasing the volume.
  oscillators[n].amp(1, 0.01);

  // Stops playing the note after number of seconds stored in noteDuration
  setTimeout(function() { stopNote(n); }, noteDuration * 1000);
}
    
// Stops playing the note.
function stopNote(n) {
  // Stop playing the note by decreasing the volume.
  oscillators[n].amp(0, 0.01);
  oscillators[n].stop();
}

// Plays the notes in a melody.
function play() {
  // Read each note in melody
  for (let i = 0; i < melody.notes.length; i += 1) {
    // Get the note.
    let n = melody.notes[i];
    // Play each note noteDuration * 1000 * i milliseconds after code runs.
    setTimeout(function() { playNote(n); }, noteDuration * 1000 * i);
  }
}

// Visualizes the melody.
function drawMelody() {
  let gridSize = width / numIntervals;
  for (let t = 0; t < numIntervals; t += 1) {
    // Draw from left to right.
    let x = t * gridSize;
    for (let n = 0; n < numNotes; n += 1) {
      // Draw from bottom to top.
      let y = height - (n + 1) * gridSize;
      
      // Set the fill color.
      if (melody.notes[t] === n) {
        let h = map(n, 0, numNotes, 0, 360);
        fill(h, 100, 100);
      } else {
        fill('white');
      }

      // Draw a rounded square.
      square(x, y, gridSize, 10);
    }
  }
}

// Loads a melody file.
function loadMelody() {
  // Get the melody's file name.
  let filename = melodySelect.selected();

  // Loads the file from the server.
  loadJSON(`/melodies/${filename}`, function (results) {
    // Print melody file details to console.
    console.log(results);

    // Store JSON file & melody details in object.
    melody = results;

    // Update the note duration.
    noteDuration = 60 / melody.tempo;
  });
}

// UI for playback mode.
function playback() {
  saveButton.hide();
  melodySelect.show();
  nameInput.hide();
}
