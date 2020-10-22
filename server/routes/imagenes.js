const express = require('express')

const fs = require('fs');
const path = require('path');

let app = express();


app.get('/imagen/:tipo/:img', (req, res) => {


    let tipo = req.params.tipo;
    let img = req.params.img;



    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {


        let noImagePath = path.resolve(__dirname, '../assets/no-image.png')

        res.sendFile(noImagePath);
    }





})








module.exports = app;