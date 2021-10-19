const express = require("express");
const app = express();
const mysql = require("mysql");
var cors = require("cors");
var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "DB_USER",
  password: "DB_PASSWORD",
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

app.post("/", cors(corsOptions), function (req, res) {
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
