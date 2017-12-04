var db = require('../relations');
var materiales = db.materiales;
var proyectos = db.proyectos;
var usuario = db.usuario;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    materiales.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    materiales.findById(id).then(function(materiales) {
        materiales.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    materiales.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp({msj: 'SUCCESS!'});
    });
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        materiales.findById(id).then(function(materiales) {
            res.status(200).jsonp(materiales);
        });
    } else {
        materiales.findAll().then(function(materiales) {
            res.status(200).jsonp(materiales);
        });
    }
};

ex.materialProyectos = function(req, res, next) {

    var idproyecto = req.params.IdProyecto;
    var busqueda = {
        where: {
            id_proyecto: idproyecto
        },
        include: [
            {
                model: usuario,
                as: 'Usuario'
            }
        ]
    }
    materiales.findAll(busqueda).then(function(materiales) {
        res.status(200).jsonp(materiales);
    });

}
