const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root", 
  password: "Password",
  database: "chatbox"
});


try {
  connection.connect();
  console.log("connected to chatbox database");
}catch(e) {
  console.log("failed to connect to chatbox  database" + e);
}

router.get("/", (req, res) => {
  res.render("index");
});

// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

router.get("/get_comments", (req, res) => {
  try{
    //selecting all the comments in the database and then sending the data in json format to the homepage ("/")
    const queryString = `SELECT * FROM messages`;
    connection.query(queryString, (err, rows, fields) => {
      if(err) {
        console.log(err);
      }else {
        console.log(`request from homepage "/`);
        res.json(rows);        
      }
    });
  } catch(err) {
    console.log(err);
  }
});

router.post("/", (req, res) => {
  try{
    const values = Object.values(req.body);
    const userName = values[0];
    const comment = values[1];

    const queryString = `INSERT INTO messages (message, user) VALUES ("${comment}", "${userName}")`;
    connection.query(queryString, (err, rows, fields) => {
      if(err) {
        console.log(err);
      }
      else{
        console.log("comment added to messages table");
      }
      res.redirect("/");
    });
  }
  catch {
    console.log(`some error`);
  } 
});



//this router is listening for a request from /contact-form, which is being handled by the eventlistener in javascript.js when contact me is clicked
//response is to res.sendfile(contact me html file)
router.get("/contact-form", (req, res) => {
  res.status(200).sendFile(__dirname+"/views/contact/contact_index.html");
});

module.exports = router;