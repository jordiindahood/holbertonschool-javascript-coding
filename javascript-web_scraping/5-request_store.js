#!/usr/bin/node

const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const filePath = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.error('Error fetching the webpage:', error);
    return;
  }
  fs.writeFile(filePath, body, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing to file:', writeErr);
    }
  });
});
