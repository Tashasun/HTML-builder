const fs = require('fs');
const path = require('path');

new Promise((resolve) => {
  fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));
  resolve();
}).then(
  () => {
    return new Promise((resolve, reject) => {
      fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
        if (err) reject(err);
        else {                    
          resolve(
            files
              .filter(file=>(file.isFile() && path.extname(file.name) == '.css'))
              .map(file=>file.name)
          );
        }});
    });
  }).then(
  files => {
    return Promise.all(
      files.map(f=>{
        return new Promise((r)=>{
          const stream = fs.createReadStream(path.resolve(__dirname, 'styles', f));
          stream.on('readable', () => r(stream.read()));
          stream.on('end', () => stream.destroy());
        });
      })
    );
  }
).then(
  data => {
    const stream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));
    stream.once('open', function () {
      stream.write(data.join('\n'));
      stream.end();
      stream.destroy();
    });
  }
)
  .catch(err => console.log(err));