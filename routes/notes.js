const notes = require("express").Router();

const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");

// GET api Request to read from the db.json file

notes.get("/", (req, res) => {
  readFromFile('./db/db.json')
  .then((data) => res.json(JSON.parse(data)));
});

// GET request for a specific note

notes.get("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0 ? res.json(result) : res.json("Note not found!");
    });
});


// POST request for adding a new note
notes.post('/',(req,res)=>{
    console.log(req.body);
    const { title, text } = req.body;
    if(req.body){
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully!`);
    }
    else{
        res.error(`Error adding note.`)
    }
})


// Delete API request

notes.delete('/:id', (req,res)=>{
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data)=>JSON.parse(data))
    .then((json)=>{
        const result = json.filter((note) => note.id !== noteId)
        writeToFile('./db/db.json', result);
        res.json(`Note ${noteId} has been deleted`);
    });
});

module.exports = notes;
