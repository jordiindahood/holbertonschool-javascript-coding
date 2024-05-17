#!/usr/bin/node

const fs = require("fs");
const request = require("request");

const url = process.argv[2];
const Path = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.error("Error fetching the webpage:", error);
    return;
  }
  fs.writeFile(Path, body, "utf8", (writeErr) => {
    if (writeErr) {
      console.error("Error writing to file:", writeErr);
    }
  });
});
