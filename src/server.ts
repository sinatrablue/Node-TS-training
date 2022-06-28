import { WebServer } from "./WebServer";

(async () => {
  try {
    const server = new WebServer();
    await server.start();
  } catch (err) {
    console.log("err: ", err);
  }
})();
