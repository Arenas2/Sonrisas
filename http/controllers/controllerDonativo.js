var db = require('../relations');
var donativo = db.donativo;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    donativo.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    donativo.findById(id)
     .then(function(donativo){
        donativo.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    donativo.update(data,{
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
        donativo.findById(id)
                .then(function (donativo) {
                    res.status(200).jsonp(donativo);
                });
    } else {
        donativo.findAll()
                .then(function (donativos) {
                    res.status(200).jsonp(donativos);
                });
    }
};