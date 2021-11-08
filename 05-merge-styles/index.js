const fs = require('fs');
const promis = require('fs/promises');
const path = require("path");

const stylesPath = path.join(__dirname, "styles")
const bundlePath = path.join(__dirname, "project-dist", "bundle.css")


async function bundleCss() {
    await promis.rm(bundlePath, { recursive: true, force: true });

    function addCssFile(file) {
      fs.appendFile(bundlePath, file, (err) => {
          if (err) throw err;                    
      });
    }
  
    function readCssFile(path) {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) throw err;
  
            addCssFile(data)
        });
    } 
  
    function bundle() {
        fs.readdir(stylesPath, {withFileTypes:true}, function(err, items) {
            if (err) throw err;
            for(const item of items) {
                const itemPath = path.join(stylesPath, item.name)
                const type = path.extname(item.name);
                if (type === ".css") {
                    readCssFile(itemPath)
                }
            }
        })
    }
  
    bundle()
}

bundleCss()




