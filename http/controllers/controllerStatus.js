var db = require('../relations');
var status = db.status;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    status.create(data)
            .then(function () {
                res.status(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    status.findById(id)
     .then(function(status){
        status.destroy()
         .then(function(result){
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;
    
    status.update(data,{
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
        status.findById(id)
                .then(function (status) {
                    res.status(200).jsonp(status);
                });
    } else {
        status.findAll()
                .then(function (status) {
                    res.status(200).jsonp(status);
                });
    }
};