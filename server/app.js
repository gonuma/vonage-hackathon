const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex.js");

const app = express();

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

app.use(express.json());

app.get("/api/users", async (req, res) => {
  try {
    const users = await db.select().table("users");
    res.json(users);
  } catch (err) {
    console.log("Error loading users", err);
    res.sendStatus(500);
  }
});

app.get("/api/workspaces", async (req, res) => {
  try {
    const workspaces = await db.select().table("workspaces");
    res.json(workspaces);
  } catch (err) {
    console.log("Error loading workspaces", err);
    res.sendStatus(500);
  }
});

app.post("/api/workspaces/:workspace/:sessionId", async (req, res) => {
  console.log(req.params);
  try {
    await db("workspaces")
      .update("sessionId", req.params.sessionId)
      .where("id", "=", req.params.workspace);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error adding session ID", err);
    res.sendStatus(500);
  }
});

app.get("/api/files", async (req, res) => {
  try {
    const files = await db.select().table("files");
    res.json(files);
  } catch (err) {
    console.log("Error loading files", err);
    res.sendStatus(500);
  }
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;
