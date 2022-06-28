const fs = require("fs").promises;

fs.readdir("../../")
  .then((files) => {
    console.log("files: ", files);
    return fs.readFile("../../" + files[1], { encoding: "utf-8" });
  })
  .then((content) => {
    console.log("content: ", content);
  })
  .catch((err) => {
    console.log("err: ", err);
  });
