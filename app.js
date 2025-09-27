// app.js
// Demo app — includes intentional security issues for Semgrep/Trivy to detect

const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

// === Hard-coded secret (Semgrep will flag hard-coded API keys / credentials) ===
const API_KEY = "pk_live_12345-SECRET-KEY-EXAMPLE"; // << intentional secret leak

// === Unsafe evaluation of user input (RCE pattern) ===
app.post("/calculate", (req, res) => {
  const { expr } = req.body || {};
  // BAD: evaluating user input directly
  try {
    // Using Function / eval-like pattern (Semgrep detects this)
    const result = Function(`"use strict"; return (${expr})`)();
    return res.json({ result });
  } catch (err) {
    return res.status(400).json({ error: "invalid expression" });
  }
});

// === Unsanitized shell execution (command injection risk) ===
app.get("/run", (req, res) => {
  const { cmd } = req.query || {};
  // BAD: Passing user input to shell without validation
  exec(cmd, { timeout: 5000 }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: "execution failed" });
    }
    res.send({ out: stdout });
  });
});

// === Reading a "sensitive" file without access control / validation ===
app.get("/secrets", (req, res) => {
  // BAD: reading potentially sensitive files in repo or host filesystem
  const secretPath = path.join(__dirname, "sensitive_data.txt");
  try {
    const data = fs.readFileSync(secretPath, "utf8"); // Semgrep can flag reading sensitive files
    res.send({ data });
  } catch (err) {
    res.status(500).send({ error: "cannot read secrets" });
  }
});

// === Example endpoint that leaks the hard-coded key (for demo) ===
app.get("/config", (req, res) => {
  // BAD: returning secrets in responses
  res.json({
    service: "secure-demo",
    apiKey: API_KEY, // Semgrep flags return/usage of hard-coded secrets
  });
});

app.listen(3000, () => {
  console.log("Secure-demo app listening on :3000");
});
