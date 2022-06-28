import assert from "assert";
import axios from "axios";
import { WebServer } from "../src/WebServer";

describe("WebServer", () => {
  it("should start and stop properly", async () => {
    const webServer = new WebServer({ port: 23456 });
    await webServer.start(); // You don't know how much time it's gonna take
    // Test that is the start is OK by doing an HTTP request
    const response = await axios.get("http://localhost:23456/api/ping"); // You don't know how much time it's gonna take
    assert(response.status === 200);
    webServer.stop();
    // Test that it is well stopped
    let error = undefined;
    try {
      await axios.get("http://localhost:23456/api/ping"); // You don't know how much time it's gonna take
    } catch (err) {
      error = err;
    }
    assert(error !== undefined);
  });
});
