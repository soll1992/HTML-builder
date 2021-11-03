const fs = require('fs');
const path = require("path");
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({ input, output });

let writeableStream = fs.createWriteStream(filePath);

console.log("Введите сообщение")
rl.prompt();

rl.on('line', (line) => {
    line = line.trim();
    if (line !== 'exit') {
        writeableStream.write(`${line}\n`);
        console.log('Готово!');
        rl.prompt();
    } else {
        console.log('До встречи!');
        process.exit();
    }
  }).on('close', () => {
    console.log('До встречи!');
    process.exit();
  });



