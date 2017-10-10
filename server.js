var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var exphbs = require("express-handlebars");
var path = require("path");
var d3 = require("d3");

var app = express();
var PORT = process.env.PORT || 3000;

//Starts Server Listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Sets up the Express app to handle body data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sets up Express to use Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Database =============================================================
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "jj820qt5lpu6krut.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "yli0oc4wh95zw36m",
    password: "ixptq9ltn5o63u5r",
    database: "ak52q7iqcgjxtyud"
  });
};


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
    }
    );
  console.log(query.sql);
}




// Routes=============================================================
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "Survey.html"));
});

app.get("/admin", function(req, res) {
  connection.query("SELECT * FROM records;", function(err, data) {
    if (err) throw err;
    res.render("index", { records: data });
  });
});




// get images when requested
app.get("/images/background-1932466_960_720.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "images/background-1932466_960_720.jpg"));
});
app.get("/images/spaghetti-2210680_960_720.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "images/spaghetti-2210680_960_720.jpg"));
});

app.get("/images/pasta-2776701_960_720.jpg", function(req, res) {
  res.sendFile(path.join(__dirname, "images/pasta-2776701_960_720.jpg"));
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
  createRecord()
  return res.json("yes");
});

module.exports = connection;