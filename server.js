"use strict";

const express = require("express");
const fetch = require("node-fetch");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;

// API set up goes here
const API_KEY = process.env.DARKSKY_API_KEY;
const BASE_URL = ``;

/**
 * Starts the Express server.
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
  const app = express();

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Handle requests for static files
  app.use(express.static("public"));

  //open main page here
  app.get("/", (req, res) => {
    res.send(__dirname + "/index.html");
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  return app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log("Local DevServer Started on port 3000...");
  });
}

startServer();
