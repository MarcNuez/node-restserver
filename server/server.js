require('./config/config')

const express = require('express')
const app = express()


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());



app.get('/', function (req, res) {
    res.json('get usuarios')
})
app.post('/', function (req, res) {

    let body = req.body;


    if(body.nombre === undefined){
        res.status(400).json({
            ok:false,
            mensaje:'el nombre es necesario'
        })
    }else{
        res.json({
            body
        })
    }

   
})
app.put('/:id', function (req, res) {

    let id = req.params.id;

    res.json({
        id
    })
})
app.delete('/', function (req, res) {
    res.json('delete usuario')
})

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto",process.env.PORT)
})