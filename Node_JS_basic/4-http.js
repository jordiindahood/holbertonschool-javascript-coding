const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello Holberton School!');
});
// eslint-disable-next-line jest/require-hook
app.listen(1245);
module.exports = app;
