const fs = require('fs');
const path = require('path');

const stream = new fs.ReadStream(path.resolve(__dirname,'text.txt'), { encoding: 'utf-8' });
console.log(path.resolve(__dirname,'text.txt'));
stream.on('readable', function () {
  const text = stream.read();
  if (text !== null){
    console.log(text);
  }
});
stream.on('end', function () {
  stream.destroy();
});
