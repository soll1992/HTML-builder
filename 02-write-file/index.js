const fs = require('fs');
const path = require("path");
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({ input, output });

let writeableStream = fs.createWriteStream(filePath);


function print() {
    rl.question('Enter the message? ', (answer) => {
        if (answer === 'exit') {
            rl.close();
            writeableStream.end();
            output.write(`До свидания! \n`);
        } else {
            writeableStream.write(answer);
            print()
        }
    
      });
    
    process.on("SIGINT", function () {
        console.log("До свидания, заходите ещё");
        process.exit();
    });
}

print()
