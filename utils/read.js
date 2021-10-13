const fs = require('fs');
const translateActive = require("./translateActive");
const readline = require('readline');
const { resolve } = require('path');

async function processLineByLine() {
  const list = [];

  const fileStream = fs.createReadStream(resolve(__dirname, '..', 'uploads', 'input.txt'));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const a = translateActive(line.trim());
    list.push(a);
  }

  return list;
}

module.exports = processLineByLine;