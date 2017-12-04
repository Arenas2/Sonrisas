var db = require('../relations');
var ubicacion = db.ubicacion;
var proyectos = db.proyectos;

var ex = module.exports = {};

// ex.create = function(req, res, next) {
//
//     var data = req.body;
//
//     console.log(data);
//
//     ubicacion.create(data)
//         .then(function(result) {
//             res.status(200).jsonp(result);
//         });
// };
//
//
// ex.CrearConUbicacion = function (req, res, next) {
//
//     var idubicacion = req.params.idubicacion;
//     var idproyectos = req.params.idproyectos;
//
//    ubicacion.findById(idubicacion)
//     .then(function(ubicacion){
//         return ubicacion.addProyectos(idproyectos)
//     })
//     .then(res.send.bind(res))
//     .catch(next);
// };

ex.create = function(req, res, next) {

    var data = req.body;

    var idproyectos = req.params.id;

    console.log(data);

    ubicacion.create(data)
        .then(function(result) {
            result.addProyectos(idproyectos)
            res.status(200).jsonp(result);
        });
};


ex.CrearConUbicacion = function (req, res, next) {

    var idubicacion = req.params.idubicacion;
    var idproyectos = req.params.idproyectos;

   ubicacion.findById(idubicacion)
    .then(function(ubicacion){
        return ubicacion.addProyectos(idproyectos)
    })
    .then(res.send.bind(res))
    .catch(next);
};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    ubicacion.findById(id)
        .then(function(ubicacion) {
            ubicacion.destroy()
                .then(function(result) {
                    res.status(200).jsonp(result);
                });
        });
};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    ubicacion.update(data, {
            where: {
                id: id
            }
        })
        .then(function(ubicacion) {
            res.status(200).jsonp(ubicacion);
        });
};


ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        ubicacion.findById(id)
            .then(function(ubicacion) {
                res.status(200).jsonp(ubicacion);
            });
    } else {
        ubicacion.findAll({
                where: req.query,
                include: [{
                    all: true
                }]
            })
            .then(res.send.bind(res))
            .catch(next);
        // ubicacion.findAll()
        //         .then(function (ubicacion) {
        //             res.status(200).jsonp(ubicacion);
        //         });
    }
};
