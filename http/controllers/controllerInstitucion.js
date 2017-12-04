var db = require('../relations');
var institucion = db.institucion;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    institucion.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    institucion.findById(id)
     .then(function(institucion){
        institucion.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    institucion.update(data,{
        where: {
            id: id
        }
    })
    .then(function(result){
        res.status(200).jsonp({msj: 'SUCCESS!'});
    });
};


ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        institucion.findById(id)
                .then(function (institucion) {
                    res.status(200).jsonp(institucion);
                });
    } else {
        institucion.findAll()
                .then(function (instituciones) {
                    res.status(200).jsonp(instituciones);
                });
    }
};