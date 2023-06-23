require("dotenv").config({path: ".env"});

const cors = require("cors");
const express = require("express");
const router = require("./router");
//const errors = require('./helpers/error'); // explanation is below
const connectDatabase = require("./db/db")

const app = express();
connectDatabase()

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get('/', (eq, res) => {
  res.send("server runs properly")
})

app.listen(8000, () => {
  console.log("Server started at port 8000");
});

// It seems it is insecure. It is not open about what it does. 
// Commented it out for security reason
// If it has document or unobfuscated it can be used

//app.use(errors)
