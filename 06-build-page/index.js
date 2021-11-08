const fs = require('fs');
const promis = require('fs/promises');
const path = require("path");

const stylesPath = path.join(__dirname, "styles")
const assetsPath = path.join(__dirname, "assets")
const componentsPath = path.join(__dirname, "components")
const templatePath = path.join(__dirname, 'template.html');


const dist = path.join(__dirname, "project-dist")
const bundleHtmlPath = path.join(dist, "index.html")
const bundleStylePath = path.join(dist, "style.css")
const copyAssetsPath = path.join(dist,"assets")


function assetsCopy(assets,copyAssets) {
    fs.mkdir(copyAssets, {recursive: true}, (err) => {
        if (err) throw err;
    });
    fs.readdir(assets, {withFileTypes: true}, (err, files) => {
        files.forEach((file) => {
          const srcPath = path.join(assets, file.name);
          const distPath = path.join(copyAssets, file.name);
          if(file.isDirectory()) {
            assetsCopy(srcPath, distPath);
          } else {
            fs.copyFile(srcPath, distPath,(err) => {
                if (err) throw err;
            });
          }
        });
      });
}

function bundleCss() {
  function addCssFile(file) {
    fs.appendFile(bundleStylePath, file, (err) => {
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

async function bundleHtml() {
  const componentFiles = await promis.readdir(componentsPath)
  const htmlOnly = componentFiles.filter(item => path.extname(item) === '.html');
  const readTemplate = fs.createReadStream(templatePath, 'utf8');
  readTemplate.on('data', async (template) => {
    let bundle = template.toString();
    for (const file of htmlOnly) {
      const filePath = path.join(componentsPath, file);
      const name1 = path.basename(file, '.html');
      const name2 = await promis.readFile(filePath);
      bundle = bundle.replace(`{{${name1}}}`, name2);
    }
    await promis.writeFile(bundleHtmlPath,bundle, 'utf8')
  });
}

async function start() {
  await promis.rm(dist, { recursive: true, force: true });
  await promis.mkdir(dist, { recursive: true });
  bundleHtml()
  assetsCopy(assetsPath,copyAssetsPath)
  bundleCss()
}

start()
