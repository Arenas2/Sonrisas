var db = require('../relations');
var Q = require('q');


var eventos = db.eventos;
var proyectos = db.proyectos;
var usuario = db.usuario;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    eventos.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.eventosXproyecto = function(req, res, next) {

    var id = req.params.id;

    eventos.findAll({
        where : {
            id_proyecto : id
        }
    }).then(result => {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    eventos.findById(id).then(function(eventos) {
        eventos.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    eventos.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.eventosProyectosStatus = function(req, res, next){

    var idproyecto = req.params.IdProyecto;
    console.log(idproyecto)
    var param = req.params.IdStatus;
    console.log(param)

    var switchCase = function(){

        var deferred = Q.defer();

        switch(param) {
            case '1':
                deferred.resolve({
                    where:{
                        id_pendiente: idproyecto
                    }
                })
                break;

            case '2':
                deferred.resolve({
                    where:{
                        id_progreso: idproyecto
                    }
                })
                break;

            case '3':
                deferred.resolve({
                    where:{
                        id_terminado: idproyecto
                    }
                })
                break;

            default:
        }

        return deferred.promise
    }

    switchCase()
    .then(consulta => {

        console.log(consulta)
        eventos.findAll(consulta)
        .then(result => {
            res.status(200).jsonp(result);
        })
    })
    .done();

}

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        eventos.findById(id).then(function(evento) {
            res.status(200).jsonp(evento);
        });
    } else {
        eventos.findAll().then(function(eventos) {
            res.status(200).jsonp(eventos);
        });
    }
};


ex.unir = function(req, res, next) {

    var idevento = req.params.IdEvento;
    var idusuario = req.params.IdUsuario;

    eventos.findById(idevento).then(evento => {

        return evento.addUsuario(idusuario);

    })
    .then(res.send.bind(res))

};
