require('./config/config')

const express = require('express')
const app = express()


const mongoose = require('mongoose');


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use(require('./routes/usuario'))


mongoose.connect(process.env.URLDB,
    { useNewUrlParser: true, useCreateIndex: true },

    (err, res) => {
        if (err) throw err;

        console.log('base de datos ONLINE')
    })

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto", process.env.PORT)
})