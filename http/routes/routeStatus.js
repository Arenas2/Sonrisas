var express = require('express');
var routeStatus = express.Router();

var x = require("../controllers/controllerStatus");

routeStatus.route('/data/status')
        .get(x.read)
        .post(x.create);

routeStatus.route('/data/status/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeStatus;