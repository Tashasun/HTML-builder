const fs = require('fs');
const path = require('path');


fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            let result = ""
            if (file.isFile()) {
                const result = file.name.split('.')[0] + ' - '+path.extname(file.name).split('.')[1];

                const fileName = path.resolve(__dirname, 'secret-folder', file.name)

                fs.stat(fileName, (error, stats) => {
                    if (error) { console.log(error) }
                    else {
                        console.log(result+' - '+stats.size)
                    }
                })
            }
        })
    }

})

