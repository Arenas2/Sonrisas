var db = require('../relations');
var portada = db.portada;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;

    portada.findOne({
        where : {
            id_proyecto : data.id_proyecto
        }
    }).then(result => {

        if (!result) {
            // Item not found, create a new one
            portada.create(data).then(function(result) {
                res.status(200).jsonp(result);
            });

        } else {
            portada.update(data, {
                where : {
                    id_proyecto : data.id_proyecto
                }
            }).then(function(result) {
                res.status(200).jsonp(result);
            });
        }

    });

};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    portada.findById(id).then(function(portada) {
        portada.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    portada.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    portada.findOne({
        where : {
            id_proyecto : id
        }
    }).then(result => {
            res.status(200).jsonp(result);
    });


    // if (id) {
    //     portada.findById(id).then(function(portada) {
    //         res.status(200).jsonp(portada);
    //     });
    // } else {
    //     portada.findAll().then(function(portada) {
    //         res.status(200).jsonp(portada);
    //     });
    // }
};
