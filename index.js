const fs = require('fs');
const path = require("path");

const sortBoysFolder = () => {
    fs.readdir('./boys', (err, files) => {
        if (err) return console.log(err);

        files.forEach((file) => {
            const redFolderPath = path.join(__dirname, 'boys', file)
            fs.readFile(redFolderPath,(err, data) => {
                if (err) return console.log(err);

                const user = JSON.parse(data.toString());

                if (user.gender === 'female') {
                    fs.rename(redFolderPath, path.join(__dirname, 'girls', file), (err) => {
                        if (err) return console.log(err)
                    })
                }
            })
        })
    })
}

const sortGirlsFolder = () => {
    fs.readdir('./girls', (err, files) => {
        if (err) return console.log(err);

        files.forEach((file) => {
            const redFolderPath = path.join(__dirname, 'girls', file)
            fs.readFile(redFolderPath,(err, data) => {
                if (err) return console.log(err);

                const user = JSON.parse(data.toString());

                if (user.gender === 'male') {
                    fs.rename(redFolderPath, path.join(__dirname, 'boys', file), (err) => {
                        if (err) return console.log(err)
                    })
                }
            })
        })
    })
}

sortBoysFolder();
sortGirlsFolder();