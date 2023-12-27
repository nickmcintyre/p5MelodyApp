let express = require('express');
let fs = require('fs');

// Create the Express app.
let app = express();

// Set the port used for server traffic.
let port = 3000;

// Serve static files from the 'public' and 'melodies' directories
app.use(express.static('public'));
app.use(express.static('melodies'));

// Send and receive JSON.
app.use(express.json());

// API endpoint to get a list of saved melodies.
app.get('/melodies', function (req, res) {
  fs.readdir('melodies', function (err, files) {
    if (err) {
      // Log the error.
      console.error(err);

      // Set the response's error status to 500 (Internal Server Error).
      res.status(500);

      // Send the response with an error message.
      res.send('Error reading melody files');
    } else {
      // Send the list of files.
      res.json({ files: files });
    }
  });
});

// API endpoint to get a specific melody.
app.get('/melodies/:filename', function (req, res) {
  // Get the filename from the request.
  let filename = req.params.filename;

  // Try to read the file.
  fs.readFile(`melodies/${filename}`, 'utf8', function (err, data) {
    if (err) {
      // Log the error.
      console.error(err);

      // Set the response's error code to 404 (Not Found).
      res.status(404);

      // Send the response with an error message.
      res.send('Melody not found');
    } else {
      // Send the melody.
      res.json(JSON.parse(data));
    }
  });
});

// API endpoint to save a melody as a JSON file.
app.post('/melodies', function (req, res) {
  // Get the JSON data from the body of the POST request.
  let data = req.body;

  // Create the filename based on the melody's name.
  let filename = `./melodies/${data.name}.json`;

  // Convert the JSON data into a string for storage.
  let stringData = JSON.stringify(data);

  // Try to write the file.
  fs.writeFile(filename, stringData, function (err) {
    if (err) {
      // Log the error.
      console.error(err);

      // Set the response's error code to 500 (Internal Server Error).
      res.status(500);
      
      // Send the response with an error message.
      res.send('Error saving the file.');
    } else {
      // Send a success message.
      res.send({ message: 'File saved successfully.' });
    }
  });
});

// Serve the app.
app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
