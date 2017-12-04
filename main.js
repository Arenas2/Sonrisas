var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');

//- Rutas

var routes = require('./http/routes');

var anecdotas = require('./http/routes/routeAnecdotas');
var areas = require('./http/routes/routeAreas');
var campanas = require('./http/routes/routeCampanas');
var donativo = require('./http/routes/routeDonativo');
var eventos = require('./http/routes/routeEventos');
var imagenes = require('./http/routes/routeImagenes');
var institucion = require('./http/routes/routeInstitucion');
var pendiente= require('./http/routes/routePendiente');
var progreso = require('./http/routes/routeProgreso');
var proyectos = require('./http/routes/routeProyectos');
var status = require('./http/routes/routeStatus');
var terminado = require('./http/routes/routeTerminado');
var usuario = require('./http/routes/routeUsuario');
var materiales = require('./http/routes/routeMateriales');
var ubicacion = require('./http/routes/routeUbicacion');
var aportaciones = require('./http/routes/routeAportaciones');
var multimedia = require('./http/routes/routeMultimedia');



// - Conexion a la base de datos

var con = require('./http/connection');
//require('./conf/auth')(app);

// - Middlewares

var lessMiddleware = require('less-middleware')
var expressStylus = require("express-stylus-middleware");

app.use("/css", expressStylus(__dirname + "/stylus-css", { compress: true }));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(flash());

app.use(session({secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }});

app.use('/', routes);

app.use('/', anecdotas);
app.use('/', areas);
app.use('/', campanas);
app.use('/', donativo);
app.use('/', eventos);
app.use('/', imagenes);
app.use('/', institucion);
app.use('/', pendiente);
app.use('/', progreso);
app.use('/', proyectos);
app.use('/', status);
app.use('/', terminado);
app.use('/', usuario);
app.use('/', materiales);
app.use('/', ubicacion);
app.use('/', aportaciones);
app.use('/', multimedia);
app.use('/', require('./http/routes/routePortada'));


app.use(lessMiddleware(__dirname + '/assets'));
app.use(lessMiddleware(__dirname + '/assets/frags'));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'http')));

module.exports = app;
