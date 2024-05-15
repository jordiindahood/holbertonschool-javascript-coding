#!/usr/bin/node

const request = require('request');

const Url = `https://swapi-api.hbtn.io/api/films/${process.argv[2]}`;

request(Url, function (error, response, body) {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  const Data = JSON.parse(body);
  console.log(Data.title);
});
