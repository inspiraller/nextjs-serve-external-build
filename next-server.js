const express = require("express");
const next = require("next");

const {
  NODE_ENV = "development",
  PORT = 3000,
  nextBuildPath = "./"
} = process.env;

const app = next({
  dev: NODE_ENV !== "production",
  dir: nextBuildPath,
  conf: { distDir: nextBuildPath },
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
    console.log('serving content from', nextBuildPath);
  });
});
