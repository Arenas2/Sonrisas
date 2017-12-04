var _ = require('lodash');
var Jimp = require("jimp");

var db = require('../relations');
var imagenes = db.imagenes;
var proyectos = db.proyectos;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    imagenes.create(data)
        .then(result => {
            res.status(200).jsonp(result);
    });
};

ex.ImagenProyecto = function(req, res, next){

    var data = req.body.imagen;
    var IdPendiente = req.params.IdPendiente;
    var IdProgreso = req.params.IdProgreso;
    var IdTerminado = req.params.IdTerminado;

    imagenes.create({
        imagen: data,
        id_pendiente: IdPendiente,
        id_progreso: IdProgreso,
        id_terminado: IdTerminado,
    }).then(function (result) {
        res.status(200).jsonp(result);
    });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    imagenes.findById(id)
     .then(function(imagenes){
        imagenes.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;

    imagenes.update(data,{
        where: {
            id: id
        }
    })
    .then(function(result){
        res.status(200).jsonp({msj: 'SUCCESS!'});
    });
};

ex.imagenesProyectosStatus = function(req, res, next){

    var idstatus = req.params.IdStatus;
    var idproyecto = req.params.IdProyecto;

    // console.log(idstatus);

    if(idstatus == 1){
        var busqueda = {
            where:{
                id_pendiente: idproyecto
            }
        }
    }
    else
        if(idstatus == 2){
            var busqueda = {
                where:{
                    id_progreso: idproyecto
                }
            }
        }
        else
            if(idstatus == 3){
                var busqueda = {
                    where:{
                        id_terminado: idproyecto
                    }
                }
            }

    imagenes.findAll(busqueda).then(function (imagenes) {

        var index = 0;

        imagenes.forEach(imagen => {
            // console.log(imagen.id)
            var nuevaimagen = _.split(imagen.imagen, ',', 2);
            Jimp.read(Buffer.from(nuevaimagen[1], 'base64'), function(err, image) {
                image.resize(502, 300).getBase64("image/jpeg", (err, Buff) => {
                    imagen.imagen = Buff;
                    index++;
                    if(index === imagenes.length){
                        res.status(200).jsonp(imagenes);
                    }
                });
            });
        })
    });
}


ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        imagenes.findById(id)
                .then(function (imagen) {
                    res.status(200).jsonp(imagen);
                });
    } else {
        imagenes.findAll()
                .then(function (imagenes) {
                    res.status(200).jsonp(imagenes);
                });
    }
};

ex.imagenXproyecto = function (req, res, next) {

    var id = req.params.id;

    imagenes.findAll({
        where :{
            id_proyecto : id
        }
    }).then(imagenes => {
        res.status(200).jsonp(imagenes);
    });

};

ex.crearPortada = function(req, res, next){
    var id = req.params.IdImagen;

    imagenes.findById(id).then(function(imagenes){
        imagenes.update({portada:'1'}).then(function(imagenes){
            res.status(200).jsonp(imagenes);
        });
    });
};

ex.borrarPortada = function(req, res, next){
    var IdProyecto = req.params.IdProyecto;

    var busca = {
        where: {
            $or:[{id_pendiente: IdProyecto}, {id_progreso: IdProyecto}, {id_terminado: IdProyecto}]
        }
    }
    imagenes.findAll(busca).then(function(imagenes){
        imagenes.forEach(imagen => imagen.update({portada:'0'}))
        }).then(function(imagenes){
            res.status(200).jsonp(imagenes);
});
};
