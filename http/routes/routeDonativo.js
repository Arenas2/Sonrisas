var express = require('express');
var routeDonativos = express.Router();

var x = require("../controllers/controllerDonativo");

routeDonativos.route('/data/donativo')
        .get(x.read)
        .post(x.create);

routeDonativos.route('/data/donativo/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeDonativos;