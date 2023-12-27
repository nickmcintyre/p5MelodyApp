let express = require('express');

// Create the Express app.
let app = express();

// Set the port used for server traffic.
let port = 3000;

// Serve static files from the 'public' directory.
app.use(express.static('public'));

// Serve the app.
app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
