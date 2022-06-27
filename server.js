const colours = require("colours");
const express = require("express");

console.log("Starting the server ...".magenta);
const app = express();
// configure server with a middleware
app.use("/url1/url2", (req, res, next) => {
  console.log("req : ".magenta, req.url);
});

app.listen(3000, () => {
  console.log("> Server started OK !".green);
});
