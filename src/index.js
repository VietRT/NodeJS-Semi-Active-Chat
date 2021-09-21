const path = require('path');
const express = require('express');
const layout = require('express-layout');

const app = express();
const routes = require('./routes');

app.set("views", path.join(__dirname, "views/main"));
app.set("view engine", "ejs");

const middlewares = [
  layout(),
  express.static(path.join(__dirname, "public")),
  express.urlencoded({extended: true})
];

app.use(middlewares);
app.use("/", routes);
//app.use(express.json());

app.listen(8008, () => {
  console.log("listening on port 8008");
})
