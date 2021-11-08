const fs = require('fs');
const promis = require('fs/promises');
const path = require("path");

const pathToMain = path.join(__dirname, "files")
const pathToCopy = path.join(__dirname, "files-copy")

async function copyFileDir (mainDir,copyDir) {
  await promis.rm(pathToCopy, { recursive: true, force: true });
  await promis.mkdir(pathToCopy, { recursive: true });

  fs.readdir(mainDir, {withFileTypes: true}, function(err, items) {
  if (err) throw err;

  for (const item of items) {
    const filePath = path.join(mainDir, item.name)
    const copyFilePath = path.join(copyDir, item.name)
    console.log(`${item.name} скопирован`)
    if(item.isDirectory()) {
      copyFileDir(filePath, copyFilePath);
    } else {
      fs.copyFile(filePath,copyFilePath,(err) => {
          if (err) throw err;
      });
    }
  }});
}

copyFileDir (pathToMain,pathToCopy)




