const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion')

let app = express();

let Producto = require('../models/producto');


//muestra todas las categorias
app.get('/producto', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);



    Producto.find({ disponible: true })

        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {


            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                productos

            })





        })
})


//muestra categorias por id
app.get('/producto/:id', (req, res) => {

    let id = req.params.id;


    Producto.findById(id, (err, productoDB) => {


        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            res.status(500).json({
                ok: false,
                err: {
                    message: 'el id no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            producto: productoDB

        })





    })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
})



//buscar productos

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {


    let termino = req.params.termino;
    let regex = new RegExp(termino,'i');

    Producto.find({ nombre:regex })

        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {


            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                productos

            })





        })



})








//crea nueva categoria
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;


    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }




        res.json({
            ok: true,
            producto: productoDB
        })



    });

})
//actualiza categoria
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;



    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    })


})
//borrar nueva categoria
app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;


    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            })
        }

        productoDB.disponible = false;

        productoDB.save(() => {
            res.json({
                ok: true,
                producto: productoDB,
                mensaje: 'Producto borrado'
            })
        });
    })





})




module.exports = app;