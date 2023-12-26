let songs; //JSON of song names
let songSelect; //variable to keep track of song selected from the dropdown
let tempoSelect; //variable for tempo dropdown
let nameInput; //input for name of song

// Middle C frequency
let first = 262;

// Array of frequencies in the key
// of C Major.
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

// Empty array for Oscillator objects.
let oscillators = [];

//default value for meoldy when none is chosen 
let melody = { name: "Untitled", notes: [], tempo:0 };

//tempo selection list (bpm)
let tempoList = ["100", "110", "120", "130", "140", "150"]

//add preload function
function preload() {
  //load and save the songs folder as JSON
  songs = loadJSON("/songs"); 
}
function setup(){
  createCanvas(400,400);
  colorMode(HSB);

   // Create a dropdown to select songs
   songSelect = createSelect();
   songSelect.position(100, 450);

    //default option
    songSelect.option("Select a saved song to play");

    //add file names to dropdown options
    for (let file of songs.files) {
        if (file.endsWith('.json')) { 
            songSelect.option(file);
        }
    }

    // Create Oscillator objects
 for (let freq of frequencies) {
    //create oscillator object using key frequency
    let osc = new Oscillator(freq);
    //set oscillator volume to 0 as default
    osc.amp(0);
   //add the oscillator to the oscillators array
    oscillators.push(osc);
  }
  print(oscillators);

  // Add a callback function when song is selected
  songSelect.changed(loadSong);

  // Play button
  let button = createButton('Play Song');
  button.position(10, 450);
  button.mousePressed(play);
 
    // select tempo dropdown
    let p = createP('Select a tempo:');
    p.position(10, 385);
    tempoSelect = createSelect();
    tempoSelect.position(10, 420);
    tempoSelect.option(0);
       //add tempos to dropdown options
       for (let i = 0; i < tempoList.length; i++) {
        tempoSelect.option(tempoList[i]);
        }

    // Add a callback function when tempo is selected
    tempoSelect.changed(setTempo);

    //Name of song input
    nameInput = createInput("Untitled");
    nameInput.position(100, 420);
    nameInput.size(200);
    //save button
    let savebutton = createButton('Save Song');
    savebutton.position(320, 420);
    savebutton.mousePressed(saveSong);
    }

function draw(){
    background(0);
    drawEditor();
}

//User Interface
function drawEditor() {
    let numIntervals = 8;
    let gridSize = width / numIntervals;
    let numNotes = 8;
    for (let t = 0; t < numIntervals; t += 1) {
      // Draw from left to right.
      let x = t * gridSize;
      for (let n = 0; n < numNotes; n += 1) {
        // Draw from bottom to top.
        let y = height - (n + 1) * gridSize;
        
        // Set the fill color.
        if(melody.tempo!==0){
        if (melody.notes[t] === n) {
          let h = map(n, 0, numNotes, 0, 360);
          fill(h, 100, 100);
        } else {
          fill("white");
        }
    }
        // Draw a rounded square.
        square(x, y, gridSize, 10);
      }
    }
  }

//save notes based on squares on the screen
function updateMelody() {
    let numIntervals = 8;
    let gridSize = width / numIntervals;
    let numNotes = 8;
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
//everytime the mouse is pressed the melody is updated
function mousePressed() {
    updateMelody();
}

//set tempo details
function setTempo(){
    if(tempoSelect.selected() !== 0){
    melody.tempo = tempoSelect.selected();
    noteDuration = 60 / melody.tempo;
    }
}

//save song
function saveSong(){
    if(melody.tempo !== 0){
    //set name of melody object
    melody.name = nameInput.value()

    httpPost("/songs", "json", melody, function(result) {
        console.log(result); // Response from the server
    });
    }
    nameInput.value("");
}
// Load the song file
function loadSong() {
    // Get the song's file name.
    let fileName = songSelect.selected();
   
    // callback to load the file from the server.
    loadJSON(`/songs/${fileName}`, function (results) {
      //print song file details to console
      console.log(results)

      //store json file & song details in object
      melody = results;
      tempo = melody.tempo;
      noteDuration = 60 / tempo;
    });
   }

//plays a note
function playNote(n) {
    if(melody.tempo!==0){
    //check if occilator is started, start it if it hasnt
    if (!oscillators[n].started){
        oscillators[n].start();
        oscillators[n].started = true;
    }
    // Start playing the note by increasing volume and adding fade in time
    oscillators[n].amp(1, 0.01); 
    // Stops playing the note after number of seconds stored in noteDuration
    setTimeout(function() { stopNote(n); }, noteDuration * 1000);
    }
}
   
// Stops playing the note
function stopNote(n) {
    oscillators[n].amp(0); 
   }

// Plays notes in a song
function play() {
    //start oscillators
    for (let osc of oscillators) {
        if(!osc.started){
        osc.start();
        osc.started = true;
        }
    }
        //read each note in melody
        for (let i = 0; i < melody.notes.length; i++) {
        //note
        let n = melody.notes[i];
        //play each note noteDuration * 1000 * i secs after code runs
        setTimeout(function() { playNote(n); }, noteDuration * 1000 * i);
        }

}


   
   
   