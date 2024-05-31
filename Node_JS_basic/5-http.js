/* eslint-disable jest/require-hook */
// Importing necessary modules
const http = require('http'); // Module for creating HTTP servers
const fs = require('fs').promises; // Promise-based filesystem module
const url = require('url'); // URL parsing module

// Asynchronous function to count students from a CSV-like file
const countStudents = async (path) => {
  try {
    // Reading the file content asynchronously
    const data = await fs.readFile(path, 'utf8');

    // Splitting the content into lines
    const lines = data.trim().split('\n');

    // Filtering out empty lines and skipping the header
    const students = lines.slice(1).filter((line) => line.trim() !== '');

    // Calculating the total number of students
    const totalStudents = students.length;

    // Initializing an object to hold the count of students per field
    const fields = {};

    // Parsing each student line to extract the field and adding to the count
    students.forEach((student) => {
      const [firstname, , , field] = student.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

    // Constructing the result string with counts and lists
    let result = `Number of students: ${totalStudents}\n`;
    for (const [field, names] of Object.entries(fields)) {
      result += `Number of students in ${field}: ${
        names.length
      }. List: ${names.join(', ')}\n`;
    }
    return result.trim(); // Returning the final result
  } catch (error) {
    // Throwing an error if the file cannot be read
    throw new Error('Cannot load the database');
  }
};

// Creating an HTTP server
const app = http.createServer((req, res) => {
  // Setting the response status and content type
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Parsing the request URL to determine the requested path
  const cur = url.parse(req.url, true).path;

  // Handling the root path ("/")
  if (cur === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }

  // Handling the "/students" path
  if (cur === '/students') {
    res.write('This is the list of our students\n');
    // Calling the countStudents function with the file path and response object
    countStudents(process.argv[2], res)
      .then((data) => {
        // Writing the data to the response and ending the response
        res.write(data);
        res.end();
      })
      .catch((error) => {
        // Writing the error message to the response and ending the response
        res.write(error.message);
        res.end();
      });
  }
});

// Starting the server on port 1245
app.listen(1245);

// Exporting the app module for possible use elsewhere
module.exports = app;
