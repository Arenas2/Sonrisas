var db = require('../relations');
var passport = require('passport'); //Agregamos el passport
var jwt = require('jsonwebtoken'); //Agregamos jsonwebtoken
var localStrategy = require('passport-local').Strategy; //Agregamos el tipo de estrategia
var facebookStrategy = require('passport-facebook').Strategy; //Agregamos facebook
var config = require('../../conf/oauth.js')

var usuario = db.usuario;
var avatar = db.avatar;
var secret = 'cesar'; //creamos una variable para el token

var ex = module.exports = {};

passport.serializeUser(function(user, done) {

    var serializeData = {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
    };

    done(null, serializeData);

});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

ex.create = function(req, res, next) {

    var data = req.body;

    console.log(data);

    usuario.create(data).then(function() {
        res.status(200).jsonp(req.body);
    });

};

ex.delete = function(req, res, next) {
    var id = req.params.id;
    usuario.findById(id).then(function(usuario) {
        usuario.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });
};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    usuario.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp({msj: 'SUCCESS!'});
    });
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        usuario.findById(id).then(function(usuario) {
            res.status(200).jsonp(usuario);
        });
    } else {
        usuario.findAll().then(function(usuarios) {
            res.status(200).jsonp(usuarios);
        });
    }
};

ex.login = function(req, res, next) {

    var data = req.body;
    // console.log(req.body);

    passport.authenticate('login', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: 'Incorrect username or password.'});
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            var token = jwt.sign({
                user: user
            }, secret, {expiresIn: '24h'});
            return res.send({success: true, message: 'Authentication succeeded', token: token});
        });
    })(req, res, next);

};

ex.token = function(req, res, next) {
    var token = req.params.token;
    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.send({success: false, message: 'token invlid'})
        } else {
            res.json(decoded)
        }
    });
}

ex.registro = function(req, res, next) {

    var data = req.body;

    console.log(req.body);

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
            var token = jwt.sign({
                user: user
            }, secret, {expiresIn: '24h'});
            return res.send({success: true, message: 'Authentication succeeded', token: token});
        });
    })(req, res, next);

};

passport.use('login', new localStrategy({

    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true

}, function(req, username, password, done) {
    usuario.findOne({
        where: {
            'correo': username
        }
    }).then(function(user) {
        if (user == null) {
            return done(null, false)
            console.log('no se encontro un usuario');
        }
        if (password == user.password) {
            return done(null, user)
        }
        return done(null, false)
    })
}))

passport.use('registro', new localStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {

    console.log('esta sucediendo algo')

    usuario.find({
        where: {
            'correo': username
        }
    }).then(function(user) {
        if (user) {
            // console.log('Ya se ha registrado el correo anteriormente');
            return done(null, false);
        } else {

            var data = req.body;
            usuario.create(data).then(function(user) {
                return done(null, user);

            }, function(err) {
                throw err;
            });
        }
    }, function(err) {
        done(err, null);
    });
}));

ex.facebook = function(req, res, next) {
    passport.authenticate('facebook', {scope: ['email', 'user_location']})(req, res, next);
}

ex.facebookcallback = function(req, res, next) {
    passport.authenticate('facebook', {
        successRedirect: '/token',
        failureRedirect: '/'
    })(req, res, next);
}

passport.use('facebook', new facebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
        'id',
        'emails',
        'displayName',
        'picture',
        'cover',
        'first_name',
        'last_name',
        'locale',
        'gender',
        'hometown'
    ]
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        usuario.find({
            where: {
                'fb_id': profile.id
            }
        }).then(function(user) {
            if (user) {
                if(profile.photos){
                    user.update(
                        { fb_avatar: profile.photos[0].value }
                    )
                }
                done(null, user);
            } else {

                var nombre = profile.displayName;
                var correo = profile.displayName;
                var avatar_fb = null;

                if (profile.name.givenName != undefined) {
                    nombre = profile.name.givenName;
                }

                if (profile.emails != undefined) {
                    if (profile.emails.length > 0) {
                        correo = profile.emails[0].value;
                    }
                }

                if (profile.photos != undefined) {
                    avatar_fb = profile.photos[0].value;
                }

                var nuevousuario = {
                    nombre: nombre,
                    correo: correo,
                    fb_id: profile.id,
                    fb_token: accessToken
                }

                usuario.create(nuevousuario).then(data => {

                    console.log(data)

                    avatar.create({ id_usuario : data.id, fb_avatar: avatar_fb })

                    return done(null, data);

                }, function(err) {
                    throw err;
                });
            }
        }, function(err) {
            return done(err);
        });
    });
}));
