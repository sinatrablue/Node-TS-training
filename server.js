const colours = require("colours");
const express = require("express");
const serveIndex = require("serve-index");

console.log("Starting the server ...".magenta);
const app = express();
// configure server with a middleware
app.use((req, res, next) => {
  // here is the middleware (callback)
  console.log("req : ".magenta, req.url);
  next(); // this middleware forwards to the following one (transition)
});

app.use("/url1/url2", (req, res, next) => {
  // here is the middleware (callback)
  res.json({ "Philip J.": "Fry" });
  console.log("req : ".magenta, req.url);
});

// middleware tout fait
app.use(express.static("."));

app.use(serveIndex("."));

app.listen(3000, () => {
  console.log("> Server started OK !".green);
});
