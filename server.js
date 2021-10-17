const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql");
//use express static folder
app.use(express.static("./public"));

// body-parser middleware use
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testdb",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("MySql Connected");
});

//route for Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var jsondata = req.body;
  var values = [];
  for (var i = 0; i < jsondata.length; i++)
    values.push([
      jsondata[i].id,
      jsondata[i].amount,
      jsondata[i].submit_date,
      jsondata[i].sell_price,
    ]);

  db.query(
    "INSERT INTO sell_invoices_tbl (id, amount,submit_date,sell_price) VALUES ?",
    [values],
    function (err, result) {
      if (err) {
        res.send("Error");
      } else {
        res.send("Success");
      }
    }
  );
});

//create connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
