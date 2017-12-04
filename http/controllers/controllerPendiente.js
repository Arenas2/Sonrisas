var db = require('../relations');
var pendiente = db.pendiente;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    pendiente.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    pendiente.findById(id)
     .then(function(pendiente){
        pendiente.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;

    pendiente.update(data,{
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
        pendiente.findById(id)
                .then(function (pendiente) {
                    res.status(200).jsonp(pendiente);
                });
    } else {
        pendiente.findAll({
            include: [{all:true}]
        })
        .then(res.send.bind(res))
        .catch(next);
        /*campanas.findAll()
                .then(function (campanas) {
                    res.status(200).jsonp(campanas);
                });*/
    }
};
