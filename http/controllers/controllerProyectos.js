var _ = require('lodash');
var Jimp = require("jimp");

var db = require('../relations');
var proyectos = db.proyectos;
var status = db.status;
var pendiente = db.pendiente;
var progreso = db.progreso;
var terminado = db.terminado;
var campanas = db.campanas;
var areas = db.areas;
var materiales = db.materiales;
var usuario = db.usuario;
var eventos = db.eventos;
var imagenes = db.imagenes;
var ubicacion = db.ubicacion;
var portada = db.portada;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;

    console.log(data)

    proyectos.create(data).then(function(result) {

        pendiente.create(data.pendiente).then(res => {
            res.addProyecto(result.id);
        })
        progreso.create(data.progreso).then(res => {
            res.addProyecto(result.id);
        })
        terminado.create(data.terminado).then(res => {
            res.addProyecto(result.id);
        })

    });

    //
    // function first(){
    //
    //     var result = {}
    //
        // pendiente.create(data.pendiente).then(res => { result.id_pendiente = res.id })
        // progreso.create(data.progreso).then(res => { result.id_progreso = res.id })
        // terminado.create(data.terminado).then(res => { result.id_terminado = res.id })
    //
    //     result.id_pendiente = 1
    //
    //     return result
    //
    // }
    //
    // first()
    // .then(x => {
    //
    //     console.log(x)
    //
    //     status.create(x).then(res => {
    //
    //
    //     })
    //
    //     // proyectos.create(data).then(result => {
    //     //     res.status(200).jsonp(result);
    //     //
    //     // })
    //
    // })

};

ex.proyectosLite = function(req, res, next) {

    proyectos.findAll({
        attributes: ['id', 'nombre']
    }).then(function(proyectos) {
        res.status(200).jsonp(proyectos);
    });
};

ex.pendiente = function(req, res, next) {
    var id = req.params.id;

    proyectos.findById(id, {
		attributes: ['id','nombre', 'descripcion'],
        include: [
            {
                model: pendiente,
                as : 'Pendiente',
                attributes: ['tareas', 'objetivos']
            }
        ]
    }).then(function(result) {

        res.status(200).jsonp(result)

        // let imagen = result.Status.Pendiente.Imagenes[0].imagen;
        // var nuevaimagen = _.split(imagen, ',', 2);
        // // console.log(nuevaimagen[1]);
        //
        // Jimp.read(Buffer.from(nuevaimagen[1], 'base64'), function(err, image) {
        //     image.resize(700, 300).getBase64("image/jpeg", (err, Buff) => {
        //         // _.updateWith(result, imagen, _.constant(Buff), result);
        //         result.Status.Pendiente.Imagenes[0].imagen = Buff;
        //
        //     });
        // })
        // .then(
		// 	res.status(200).jsonp(result)
		// );
    })
}

ex.progreso = function(req, res, next) {

    var id = req.params.id;

    proyectos.findById(id, {
        include: [
            {
                model: progreso,
                as: 'Progreso'
            }
        ]
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
}

ex.terminado = function(req, res, next) {
    var id = req.params.id;

    proyectos.findById(id, {
        include: [
            {
                model: status,
                include: [
                    {
                        model: terminado,
                        // include: [
                        //     {
                        //         model: imagenes
                        //     }
                        // ]
                    }
                ]
            }
        ]
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
}

ex.CrearConStatus = function(req, res, next) {

    var data = req.body;
    proyectos.create(data, {
        include: [
            {
                model: status,
                include: [
                    {
                        model: pendiente
                    }, {
                        model: progreso
                    }, {
                        model: terminado
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ]
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.Proyecto = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        proyectos.findById(id, {
            include: [
                {
                    model: status,
                    include: [
                        {
                            model: pendiente
                        }, {
                            model: progreso
                        }, {
                            model: terminado
                        }
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
        }).then(function(x) {
            res.status(200).jsonp(x);
        });
    } else {
        proyectos.findAll().then(function(x) {
            res.status(200).jsonp(x);
        });
    }
};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    proyectos.findById(id).then(function(proyectos) {
        proyectos.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next) {

    var id = req.params.id;
    var data = req.body;

    // var infopendiente = req.body.Status.Pendiente;
    // var infoprogreso = req.body.Status.Progreso;
    // var infoterminado = req.body.Status.Terminado;

    proyectos.update(data, {
        where: {
            id: id
        }
    }).then(result => {
        res.status(200).jsonp(result);
    })
    // pendiente.update(infopendiente, {
    //     where: {
    //         id: id
    //     }
    // })
    // progreso.update(infoprogreso, {
    //     where: {
    //         id: id
    //     }
    // })
    // terminado.update(infoterminado, {
    //     where: {
    //         id: id
    //     }
    // }).then(function(result) {
    //     res.status(200).jsonp(result);
    // });
};

ex.filtro = function(req, res, next) {

    var data = req.body;

    // console.log(data)

    switch (data.where.status_actual) {
        case 1:
            var statusactual = pendiente;
            break;

        case 2:
            var statusactual = progreso;
            break;

        case 3:
            var statusactual = terminado;
            break;
        default:
    }

    // _.updateWith(data, 'include[' + data.include.length + ']', _.constant(
    //     {
    //         model: status,
    //         model: portada
    //         include: [
    //             {
    //                 model: statusactual,
    //                 attributes : ['id'],
    //                 include: [
    //                     {
    //                         model: imagenes,
    //                         attributes : ['imagen'],
    //                         where: {
    //                             portada: 1
    //                         }
    //                     }
    //                 ]
    //             },
    //
    //
    //         ]
    //     }
    // ), data);

    var indexAreas = _.findIndex(data.include, ['model', 'areas']);

    if (indexAreas != -1) {
        _.updateWith(data, 'include[' + indexAreas + ']', _.constant({model: areas, as: 'Areas', where: data.include[indexAreas].where}), data);
    }

    data.attributes = ['id','nombre'];

    proyectos.findAll(data).then(result => {


        res.status(200).jsonp(result);

        var index = 0;

        // _.forEach(proyectos, function(proyecto) {
        //
        //     switch (data.where.status_actual) {
        //         case 1:
        //             var path = proyecto.Status.Pendiente.Imagenes[0].imagen;
        //             break;
        //         case 2:
        //             var path = proyecto.Status.Progreso.Imagenes[0].imagen;
        //             break;
        //
        //         case 3:
        //             var path = proyecto.Status.Terminado.Imagenes[0].imagen;
        //             break;
        //         default:
        //     }
        //
        //     let ni = _.split(path, ',', 2);
        //     Jimp.read(Buffer.from(ni[1], 'base64'), function(err, image) {
        //         image.resize(290, 183).getBase64("image/jpeg", (err, Buff) => {
        //
        //             switch (data.where.status_actual) {
        //                 case 1:
        //                     proyectos[index].Status.Pendiente.Imagenes[0].imagen = Buff;
        //                     break;
        //                 case 2:
        //                     proyectos[index].Status.Progreso.Imagenes[0].imagen = Buff;
        //                     break;
        //
        //                 case 3:
        //                     proyectos[index].Status.Terminado.Imagenes[0].imagen = Buff;
        //                     break;
        //                 default:
        //             }
        //
        //             index++;
        //             if (index === proyectos.length) {
        //                 res.status(200).jsonp(proyectos);
        //             }
        //         });
        //     });
        //
        // });

    });

}

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        proyectos.findById(id).then(function(proyecto) {
            res.status(200).jsonp(proyecto);
        });
    } else {
        proyectos.findAll().then(function(proyectos) {
            res.status(200).jsonp(proyectos);
        });
    }
};

ex.proyectosConUbicaciones = function(req, res, next) {


    var id = req.params.id;

    proyectos.findById(id).then(function(proyecto) {

        proyecto.getUbicacion().then(ubicaciones => {
            res.status(200).jsonp(ubicaciones)
        })

    });

};

ex.ProyectoCampana = function(req, res, next) {
    proyectos.findById(req.params.id, {
        include: [
            {
                model: campanas,
                as: 'campanas'
            }
        ]
    }).then(res.send.bind(res)).catch(next);
};
