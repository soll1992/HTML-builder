const fs = require('fs');
const path = require("path");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
const filePath = path.join(__dirname, 'text.txt');

let writeableStream = fs.createWriteStream(filePath);

rl.setPrompt("Введите сообщение: ")
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



