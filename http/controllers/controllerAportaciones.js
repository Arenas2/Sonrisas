var db = require('../relations');
var aportaciones = db.aportaciones;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    aportaciones.create(data)
        .then(function(result) {
            res.status(200).jsonp(result);
    });
};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    aportaciones.findById(id)
        .then(function(aportaciones) {
            aportaciones.destroy()
                .then(function(result) {
                    res.status(200).jsonp(result);
                });
        });
};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    aportaciones.update(data, {
            where: {
                id: id
            }
        })
        .then(function(aportaciones) {
            res.status(200).jsonp(aportaciones);
        });
};

ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        aportaciones.findById(id)
                .then(function (aportaciones) {
                    res.status(200).jsonp(aportaciones);
                });
    } else {
        aportaciones.findAll()
                .then(function (aportaciones) {
                    res.status(200).jsonp(aportaciones);
                });
    }
};
