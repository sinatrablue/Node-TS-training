const express = require("express");
const serveIndex = require("serve-index");

console.log("\x1b[36m%s\x1b[0m", "Starting the server ...");
const app = express();
// configure server with a middleware
app.use((req, res, next) => {
  // here is the middleware (callback)
  console.log("\x1b[36m%s\x1b[0m", "req : ", req.url);
  next(); // this middleware forwards to the following one (transition)
});

app.use("/url1/url2", (req, res, next) => {
  // here is the middleware (callback)
  res.json({ "Philip J.": "Fry" });
  console.log("req => ", req.url);
  next();
});

app.use((req, res, next) => {
  console.log("\x1b[34m%s\x1b[0m", "=====================================");
});

// middleware tout fait
app.use(express.static("."));

app.use(serveIndex(".", { icons: true }));

app.listen(3000, () => {
  console.log("\x1b[34m%s\x1b[0m", "> Server started OK !");
});
