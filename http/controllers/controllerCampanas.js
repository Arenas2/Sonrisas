var db = require('../relations');
var campanas = db.campanas;


var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    campanas.create(data)
            .then(function (result) {
                res.status(200).jsonp(result);
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    campanas.findById(id)
     .then(function(campanas){
        campanas.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;

    campanas.update(data,{
        where: {
            id: id
        }
    })
    .then(function(campanas){
        res.status(200).jsonp(campanas);
    });
};


ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        campanas.findById(id)
                .then(function (campana) {
                    res.status(200).jsonp(campana);
                });
    } else {
        /*campanas.findAll({
            where: req.query,
            include: [{all:true}]
        })
        .then(res.send.bind(res))
        .catch(next);*/
        campanas.findAll()
                .then(function (campanas) {
                    res.status(200).jsonp(campanas);
                });
    }
};

ex.CrearConCampana = function (req, res, next) {

    var idcampanas = req.params.idcampanas;
    var idproyectos = req.params.idproyectos;

   campanas.findById(idcampanas)
    .then(function(campanas){
        return campanas.addProyecto(idproyectos)
    })
    .then(res.send.bind(res))
    .catch(next);
};

ex.campanasAll = function(req, res, next) {

    campanas.findAll().then(function(campanas) {
        res.status(200).jsonp(campanas);
    });

};
