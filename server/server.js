require('./config/config')

const express = require('express')
const app = express()


const mongoose = require('mongoose');


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//importamos las rutas

app.use(require('./routes/index'));


//habilitar la carpeta public

const path = require('path');


app.use(express.static(path.resolve(__dirname ,'../public')));





mongoose.connect(process.env.URLDB,
    { useNewUrlParser: true, useCreateIndex: true },

    (err, res) => {
        if (err) throw err;

        console.log('base de datos ONLINE')
    })

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto", process.env.PORT)
})