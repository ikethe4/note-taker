const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { json } = require("express");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//allows easy acces to public folder
app.use(express.static("public"));


//get returns
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//LOW CONFIDENCE IN THIS ONE
// app.get("/api/notes", function (req, res) {
//     //reads db.json and returns all saved notes
//     // res.sendFile(path.join(__dirname, "./db/db.json"))
//     // let readDB = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
//     let readDB = JSON.parse(fs.readFileSync("./db/db.json","utf8"));
//     res.json(readDB);
// });

app.get("/api/notes", (req, res) => {
    const noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    res.json(noteList);
})

//LOW CONFIDENCE IN THIS ONE
app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    //should receive a new note to save on the request body, add it to the db.json, and then return the new note to the client
    newNote.id = Math.floor(Math.random()*1000)
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes), "utf8");
    res.json(notes);


    // console.log(notes);

})


//add id to notes
app.delete("/api/notes/:id", function (req, res) {
    const { id } = req.params;
    // console.log("Target id: " + id)
    let arrBank = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    for (let i = 0; i < arrBank.length; i++) {
        // console.log("index " + i)
        if (arrBank[i].id == id) {
            console.log("Note deleted: " + JSON.stringify(arrBank[i]));
            arrBank.splice(i, 1)        
            break;
        }
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(arrBank), "utf8");
    res.json(arrBank);
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

//DO NOT KNOW WHERE TO START WITH THIS ONE
// app.delete("/api/notes/:id", callback)  

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.listen(PORT, function () {
    console.log("App is listening on PORT " + PORT);
})

// /api/notes/:id