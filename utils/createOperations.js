const fs = require('fs');
const { resetOperations, createOperation } = require("./operation");
const readline = require('readline');
const { resolve } = require('path');

async function processLineByLine(API) {
  resetOperations();
  const fileStream = fs.createReadStream(resolve(__dirname, '..', 'uploads', 'input.txt'));
  const rl = readline.createInterface({
    input: fileStream
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    createOperation(line.trim(), API);
  }
}

module.exports = processLineByLine;