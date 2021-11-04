const fs = require('fs');
const path = require("path");


const filePath = path.join(__dirname, 'secret-folder');


fs.readdir(filePath, {withFileTypes:true}, function(err, items) {
    for (const item of items) {
        if(item.isFile()) {
            const itemPath = path.join(filePath, item.name);
            fs.stat(itemPath,(error,stats)=> {
                const type = path.extname(item.name);
                const name = path.basename(item.name, type);
                const size = (stats.size / 1024).toFixed(3) + "kb"
                console.log(`${name} - ${type.slice(1)} - ${size}`)
            })
        }
    }
});
