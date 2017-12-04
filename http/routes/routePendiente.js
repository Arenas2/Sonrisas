var express = require('express');
var routePendiente = express.Router();

var x = require("../controllers/controllerPendiente");

routePendiente.route('/data/pendiente')
        .get(x.read)
        .post(x.create);

routePendiente.route('/data/pendiente/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routePendiente;