var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;
var dbJSON = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// ROUTING
console.log(dbJSON)

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//GET `*` - Should return the `index.html` file
// If no matching route is found default to home
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// API ROUTING
//GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  console.log(dbJSON)
  res.json(dbJSON);
});
//POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

app.post("/api/notes", function(req, res) {
  if (dbJSON.length < 50) {
    dbJSON.push(req.body);
    res.json(true);
  }
  else {
    dbJSON.length = 0;
    res.json({ok: true} );
  }
});

// //DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
//This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
//you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, 
//and then rewrite the notes to the `db.json` file.

// app.post("/api/notes/:id", function(req, res) {
//   // Empty out the arrays of data
//   dbJSON.length = 0;
//   res.json({ ok: true });
// });

// =============================================================================


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
