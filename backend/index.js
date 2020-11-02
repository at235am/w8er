const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
