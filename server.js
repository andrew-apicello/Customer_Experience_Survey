var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");
var connection;

var app = express();
var PORT = process.env.PORT || 3000;

if (process.env.JAWSDB_URL){
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'hacktheplanet',
		database: 'todoagain_db'
	});
};

console.log("JAWS DB URL ***********")
console.log(process.env.JAWSDB_URL);

// Database =============================================================

connection = mysql.createConnection({
	host: "jj820qt5lpu6krut.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	port: 3306,

  // Your username
  user: "g10nr5t9oknfld60",

  // Your password
  password: "x2d5bnaw8bm9zpxp",
  database: "xfn08twhr0fg3137"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
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




// Routes=============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "Survey.html"));
});

// app.get("/admin", function(req, res) {
//   res.sendFile(path.join(__dirname, "Admin.html"));
// });

app.get("/admin", function(req, res) {
	connection.query("SELECT * FROM records ORDER BY record_id", function(err, results){
		var html = "<h1>Survey Records</h1>"
		html += "<ul>"
		var cast;
		for(i=0;i<results.length;i++){
			html += "<h3>-------------------------------------------------</h3>";
			html += "<p>ID: " + results[i].record_id + "</p>";
			html += "<p>LTR: " + results[i].LTR + "</p>";
			html += "<p>OSAT: " + results[i].OSAT + "</p>";
      //this needs a timestamp
      html += "<p>Comment: " + results[i].comment + "</p>";
      html += "<p>Phone #: " + results[i].phone + "</p>";
      html += "<p>Email: " + results[i].email + "</p>";
  }

  res.send(html); 
})
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




// Reply with all records in json format
// app.get("/tables", function(req, res) {
//   res.json(records);
// });

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
  createRecord()
  return res.json("yes");
});






// Dummy Data =============================================================
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