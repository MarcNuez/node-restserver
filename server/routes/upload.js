const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario')

const fs = require('fs');
const path = require('path');


app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {


    let tipo = req.params.tipo;
    let id = req.params.id;




    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }

    //valida tipo

    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                msg: 'los tipos permitidos son ' + tiposValidos
            }
        })
    }





    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];//se obtiene la extension



    //Extensiones permitidas

    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                msg: 'Extension no permitida',
                ext: extension
            }
        })
    }

    //cambiar nombre archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;


    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }


        //aqui la imagen esta cargada
        imagenUsuario(id, res, nombreArchivo);


    })


})



function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarArchivo(nombreArchivo,'usuarios')

            return res.status(500).json({
                ok: false,
                err
            })
        }


        if (!usuarioDB) {
            borrarArchivo(nombreArchivo,'usuarios')

            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'usuario no existe'
                }
            })
        }



        borrarArchivo(usuarioDB.img,'usuarios')

      




        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })



    })
}


function imagenProducto() {

}

function borrarArchivo(nombreImagen,tipo){
    let pathUrl = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

    if(fs.existsSync(pathUrl)){
        fs.unlinkSync(pathUrl);
    }
}

module.exports = app;