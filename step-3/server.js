let express = require('express');

// Create the Express app.
let app = express();

// Set the port used for server traffic.
let port = 3000;

// Serve static files from the 'public' directory.
app.use(express.static('public'));

// Send and receive JSON.
app.use(express.json());

// API endpoint to get a melody.
app.get('/melody', function (req, res) {
  // Create the melody.
  let melody = {
    name: 'Descending C Major Scale',
    notes: [7, 6, 5, 4, 3, 2, 1, 0],
    tempo: 150,
  };

  // Send the melody.
  res.json(melody);
});

// Serve the app.
app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
