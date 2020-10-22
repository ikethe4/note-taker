const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//allows easy acces to public folder
app.use(express.static("public"));

const notes = [];

//get returns
app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
//LOW CONFIDENCE IN THIS ONE
app.get("/api/notes", function(req,res){
//reads db.json and returns all saved notes
res.sendFile(path.join(__dirname, "./db/db.json"))
});
//LOW CONFIDENCE IN THIS ONE
app.post("/api/notes", function(req, res){
    //should receive a new note to save on the request body, add it to the db.json, and then return the new note to the client
    res.sendFile(path.join(__dirname, "./db/db.json"));
    const newNote = req.body;
    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err){
        if(err){
            console.log(err)
        }
    
    })
    notes.push(newNote);
    console.log(notes);

})

//DO NOT KNOW WHERE TO START WITH THIS ONE
// app.delete(path, callback)

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.listen(PORT, function(){
    console.log("App is listening on PORT " + PORT);
})