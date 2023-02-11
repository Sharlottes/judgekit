const rl = require("readline").createInterface(process.stdin, process.stdout);
let lineCount, maxLine;
rl.on("line", (line) => {
  if(!maxLine) maxLine = +line;
  else {
    lineCount++;
    // do something...
    if(lineCount == maxLine) rl.close();
  }
});
