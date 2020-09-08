const data = require("../db/db.json");
const path = require('path')
const fs = require("fs");
const cryptoRandomString = require('crypto-random-string');

module.exports = (app) => {

  app.get("/api/notes", (req, res) => {
    res.json(data);
  });

  app.get("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const ID = parseInt(id);
    for(i = 0; i < data.length; i++){  
     if(data[i].id === ID ){
      console.log(data[i].id)

       res.json(data[i])
     } 
  }
  });
  app.post("/api/notes", (req, res) => {
    const note = req.body
    note.id = parseInt(cryptoRandomString({length: 10, type: 'numeric'}));
    data.push(note);
    res.json(note);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  })
    app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const ID = parseInt(id);
    for(i = 0; i < data.length; i++){  
     if(data[i].id === ID ){
       delete data[i]
       const filtered = data.filter(function (element) {
      return element != null;
      });
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filtered), (err) => {
        if (err) throw err;
      });
       res.json(filtered)
     } 
    }
  });
}