import express, { Express } from "express";
import serveIndex from "serve-index";
import { api } from "./api";
import { WebServerOptions } from "./interfaces/WebServerOptions";

export class WebServer {
  options: WebServerOptions = {
    port: 3000,
  };
  app: Express = express();
  constructor(options?: WebServerOptions) {
    this.options = { ...this.options, ...options }; // takes all properties in options AND in this.options and spread them into the new object
    // if some properties in options have the same key than some in this.options, those coming from options (second in the list) will take advantage

    // All the config instructions come here
    const app = express();
    // configure server with a middleware
    app.use((req, res, next) => {
      // here is the middleware (callback)
      console.log("\x1b[36m%s\x1b[0m", "req : ", req.url);
      next(); // this middleware forwards to the following one (transition)
    });

    app.use("/api", api);

    app.use("/url1/url2", (req, res, next) => {
      // here is the middleware (callback)
      res.json({ "Philip J.": "Fry" });
      console.log("req => ", req.url);
      next();
    });

    app.use((req, res, next) => {
      console.log(
        "\x1b[34m%s\x1b[0m",
        "================================================"
      );
    });

    // middleware tout fait
    app.use(express.static("."));

    app.use(serveIndex(".", { icons: true }));
  }

  start(): Promise<void> {
    this.app.listen(this.options.port, () => {
      console.log(
        "\x1b[34m%s\x1b[0m",
        "> Server started OK ! (Port :::>  " + this.options.port
      );
    });
  }

  stop(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
