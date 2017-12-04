var express = require('express');
var routeMultimedia = express.Router();

var x = require("../controllers/controllerMultimedia");

routeMultimedia.route('/data/mutimedia')
        .get(x.read)
        .post(x.create);

routeMultimedia.route('/data/multimedia/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeMultimedia;
