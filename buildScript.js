const fs = require("fs");
const childProcess = require("child_process");

if (fs.existsSync("./server/build")) {
  fs.rmdirSync("./server/build", { recursive: true });
}

childProcess.execSync("ng build --prod", { stdio: "inherit" });

fs.renameSync("./build", "./server/build");
