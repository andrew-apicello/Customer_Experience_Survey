var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});




// Database =============================================================

function connectToDatabase(){
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "attilios_db"
});

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    createRecord();
  });

  function createRecord() {
    console.log("Inserting a new record...\n");
    var query = connection.query(
      "INSERT INTO records SET ?",
      {
        LTR:newRecord.LTR,
        OSAT:newRecord.OSAT,
        comment:newRecord.comment,
        phone:newRecord.phone,
        email:newRecord.email
      },
      function(err, res) {
        console.log(res.affectedRows + " record inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      // updateSong();
    }
    );
  // logs the actual query being run
  console.log(query.sql);
}
}





// Routes=============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "front_end.html"));
});

// Reply with the add file webpage
app.get("/DineIn_PizzaParlor", function(req, res) {
  res.sendFile(path.join(__dirname, "DineIn_PizzaParlor.html"));
});


// get images when requested
app.get("/images/background-1932466_960_720.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "images/background-1932466_960_720.jpg"));
});
app.get("/images/spaghetti-2210680_960_720.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "images/spaghetti-2210680_960_720.jpg"));
});



app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

// Reply with all records in json format
app.get("/tables", function(req, res) {
  res.json(records);
});

// dynamically searches our data for the query and responds 
app.get("/api/:records?", function(req, res) {
  var chosen = req.params.records;
  if (chosen) {
    console.log(chosen);

//search through our data for the route name that came back
for (var i = 0; i < records.length; i++) {
  if (chosen === records[i].uniqueID) {
    return res.json(records[i]);
  }
}
return res.json(false);
}
return res.json(records);
});


var newRecord;
// Create New records - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is the JSON post sent from the user
  // This works because of our body-parser middleware
  newRecord = req.body;
  newRecord.uniqueID = newRecord.email.replace(/\s+/g, "").toLowerCase();
  console.log(newRecord);
  records.push(newRecord);
  connectToDatabase()
});







// Data =============================================================
var records = [
{
  LTR: 10,
  OSAT: 9,
  comment: "I like Pizza",
  phone: "732-898-7684",
  email: "It's me! Mario!"
},
{
  LTR: 8,
  OSAT: 6,
  comment: "Your pizza was okay",
  phone: "",
  email: "No thankyou"
},
];