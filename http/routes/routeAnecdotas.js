var express = require('express');
var routeAnecdotas = express.Router();

var x = require("../controllers/controllerAnecdotas");

routeAnecdotas.route('/data/anecdota')
        .get(x.read)
        .post(x.create);

routeAnecdotas.route('/data/anecdota/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeAnecdotas.route('/data/anecdotaproyecto/:id')
        .get(x.anecdotaproyecto);



module.exports = routeAnecdotas;
