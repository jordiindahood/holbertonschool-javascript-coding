#!/usr/bin/node

const request = require('request');

request(process.argv[2], function (error, response) {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`code: ${response.statusCode}`);
});
