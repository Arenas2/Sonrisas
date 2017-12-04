var db = require('../relations');
var multimedia = db.multimedia;

var ex = module.exports = {};

ex.create = function (req, res, next) {

    var data = req.body;
    multimedia.create(data)
            .then(function () {
                res.multimedia(200).jsonp({msj: 'SUCCESS!'});
            });
};

ex.delete = function (req, res, next){
    var id = req.params.id;
    multimedia.findById(id)
     .then(function(multimedia){
        multimedia.destroy()
         .then(function(result){
            res.multimedia(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next){
    var id = req.params.id;
    var data = req.body;

    multimedia.update(data,{
        where: {
            id: id
        }
    })
    .then(function(result){
        res.multimedia(200).jsonp({msj: 'SUCCESS!'});
    });
};


ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        multimedia.findById(id)
                .then(function (multimedia) {
                    res.multimedia(200).jsonp(multimedia);
                });
    } else {
        multimedia.findAll()
                .then(function (multimedia) {
                    res.multimedia(200).jsonp(multimedia);
                });
    }
};
