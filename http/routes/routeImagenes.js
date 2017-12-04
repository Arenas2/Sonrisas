var express = require('express');
var routeImagenes = express.Router();

var x = require("../controllers/controllerImagenes");

routeImagenes.route('/data/imagenes')
        .get(x.read)
        .post(x.create);


routeImagenes.route('/data/imagenXproyecto/:id')
        .get(x.imagenXproyecto);

routeImagenes.route('/data/imagenesconpendiente/:IdPendiente')
        .post(x.ImagenProyecto);

routeImagenes.route('/data/imagenesconprogreso/:IdProgreso')
        .post(x.ImagenProyecto);

routeImagenes.route('/data/imagenesconterminado/:IdTerminado')
        .post(x.ImagenProyecto);

routeImagenes.route('/data/imagenesProyectosStatus/:IdProyecto/:IdStatus')
        .get(x.imagenesProyectosStatus);

// routeImagenes.route('/data/portada/:IdImagen/:IdProyecto')
//         .post(x.borrarPortada)
//         .put(x.crearPortada);

routeImagenes.route('/data/imagenes/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeImagenes;
