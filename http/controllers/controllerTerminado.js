var db = require('../relations');
var terminado = db.terminado;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    terminado.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    terminado.findById(id)
     .then(function(terminado){
        terminado.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    terminado.update(data,{
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
        terminado.findById(id)
                .then(function (terminado) {
                    res.status(200).jsonp(terminado);
                });
    } else {
        terminado.findAll()
                .then(function (terminados) {
                    res.status(200).jsonp(terminados);
                });
    }
};