// const { stdin, stdout } = process
const fs = require('fs');
const process = require('process')
process.stdin.resume()
const textFile = fs.createWriteStream('./02-write-file/text02.txt');
textFile.once("open", () => console.log('Hello! You can write here. For finish you can write "exit" or press "Ctrl+c. Warning! "Ctrl +c" can be not working in bash, use powershell'))

process.stdin.on('data', data => {
       let input = data.toString();
    if (input.trim() !== 'exit') {
        textFile.write(data);
    }
    else {
        process.exit()
    }
})

process.on('exit', () => console.log('----------Goodbye! Good luck with studding Node.js!'));
process.on('SIGINT', () => {
     console.log('   Finished with "Ctrl +C"! Last line was not saved!')
     process.exit();

});
