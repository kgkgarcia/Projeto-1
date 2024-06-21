const express = require('express');
const app = express();
const port = process.env.PORT || 4242;
const path = require('path');
const dirname = __dirname; // Add this line to get the current directory

// Serve static files from the frontEnd directory
app.use(express.static(path.join(dirname, '/Pages/Front')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(dirname, '/Pages/Front', 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`); // Add a closing backtick
});