const express = require("express");
const next = require("next");
const path = require("path");
const getObjArgs = require("./get-argv");

const objArg = getObjArgs();
const port = objArg.port || 80;
const remoteContentPath = objArg.nextBuildPath || "nextBuildPath";
const NODE_ENV = objArg.NODE_ENV || "development";
const dev = NODE_ENV !== "production";

const app = next({ dev, dir: remoteContentPath });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use("/static", express.static(path.join(remoteContentPath, ".next")));
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
