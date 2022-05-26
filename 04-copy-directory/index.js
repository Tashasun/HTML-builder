const fs = require('fs');
const path = require('path');

new Promise((resolve, reject) =>{fs.rm(path.resolve(__dirname, 'files-copy'), {force:true, recursive:true}, (err) =>{
  if (err) reject (err);
  {resolve ();
    console.log('clean dir');}
});

}).then (
  () => { return new Promise((resolve, reject) => {
    fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, err => {
      if (err) reject(err);
      console.log('create dir ');
      resolve();
    });
  });
  }).then(
  () => {
    return new Promise((resolve, reject) => {
      fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
        if (err) reject(err);
        resolve(files);
      });
    });
  }
).then(
  files => {
    return Promise.all(
      files.map(f=>{
        return new Promise((r)=>{
          fs.createReadStream(path.resolve(__dirname, 'files', f))
            .pipe(fs.createWriteStream(path.resolve(__dirname, 'files-copy', f)));
          r(f);
        });
      })
    );
  }
).then(
  arr => {
    console.log(`coped ${arr.length} files`);
        
  }
).catch(err => console.log(err));



// fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
//     if (err)
//         console.log(err);
//     else {
//       console.log(files)}
// })

// const stream = fs.createReadStream(path.resolve(__dirname, 'files', 'test-css.css'))
// .pipe(fs.createWriteStream(path.resolve(__dirname, 'files-copy', 'test-css.css')));




