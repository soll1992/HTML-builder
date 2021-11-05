const fs = require('fs');
const path = require("path");

const dirPath = path.join(__dirname, "files")
const copyDirPath = path.join(__dirname, "files-copy")

fs.mkdir(copyDirPath, { recursive: true }, (err) => {
    if (err) throw err;
});

fs.readdir(dirPath, function(err, items) {
  for (const item of items) {
    const filePath = path.join(dirPath, item)
    const copyFilePath = path.join(copyDirPath, item)
    console.log(`${item} скопирован`)
    fs.copyFile(filePath,copyFilePath, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }});
  }
});



