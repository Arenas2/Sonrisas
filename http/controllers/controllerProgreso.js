var db = require('../relations');
var progreso = db.progreso;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    progreso.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    progreso.findById(id)
     .then(function(progreso){
        progreso.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    progreso.update(data,{
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
        progreso.findById(id)
                .then(function (progreso) {
                    res.status(200).jsonp(progreso);
                });
    } else {
        progreso.findAll()
                .then(function (progresos) {
                    res.status(200).jsonp(progresos);
                });
    }
};