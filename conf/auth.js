var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../http/relations');
var usuario = db.usuario;

var auth = function(app) {

    passport.serializeUser(function(user, done) {
        console.log('serializeUser');
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        usuario.findOne({ // Using sequelize model functoin
            where: {
                'id': id
            }
        }).then(function(user) {
            if (user == null) {
                done(new Error('Wrong user id.'))
            }

            done(null, user) // Standard deserailize callback
        })
        console.log('deserializeUser');
    });

    passport.use('login', new localStrategy(function(correo, password, done) {
        console.log("LOGEANDO LOCALMENTE");
        usuario.findOne({ // Using sequelize model function
            where: { // Take an object with options where self explanatory
                'correo': correo
            }
        }).then(function(user) { // Sequelize return a promise with user in callback
            if (user == null) { // Checking if user exsists
                return done(null, false) // Standerd Passport callback
                console.log('no se encontro un usuario');
            }

            if (password == user.password) { // use your password hash comparing logic here for security
                return done(null, user) // Standerd Passport callback
            }
            return done(null, false) // Standerd Passport callback
        })
    }))

    // Post request handling route for login
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/admin',
        failureRedirect: '/'
    }))

    app.post('/registro', function(req, res, next) {

        console.log(req.body);
        console.log('no hay nada')
        // ,{
        // // successRedirect: '/user',
        // // failureRedirect: '/'
        // }
        passport.authenticate('registro', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send({success: false, message: info});
            }

            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.send({success: true, message: 'Registration succeeded', user: user});
            });
        })(req, res, next);
    });

    passport.use('registro', new localStrategy({
            usernameField: 'correo',
            passwordField: 'password',
            passReqToCallback: true
        }, function(req, username, password, done) {

            console.log('esta sucediendo algo')

            usuario.find({
                where: {
                    'correo': correo
                }
            }).then(function(user) {
                // already exists
                if (user) {
                    console.log('Ya se ha registrado el correo anteriormente');
                    return done(null, false);
                } else {
                    console.log("REGISTRANDO");
                    // if there is no user with that email
                    // create the user
                    var data = req.body;

                    console.log(req);
                    data.rol = 'USER';
                    //data.password = createHash(data.password);

                    // save our user to the database
                    usuario.create(data).then(function(user) {
                        return done(null, user);
                        //res.status(200).jsonp(null, newUser);
                    }, function(err) {
                        throw err;
                    });
                }
            }, function(err) {
                done(err, null);
            });
        })
    );

}

module.exports = auth;