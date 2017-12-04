/*
 * Express Stylus middleware
 *
 * Copyright (c) 2017 Taras Rodynenko
 *
 * This middleware is Stylus-version of Andrew A. Usenok's
 * Express-less module (https://github.com/toogle/express-less)
 */

'use strict';

var fs = require('fs'),
  url = require('url'),
  path = require('path'),
  stylus = require('stylus'),
  autoprefixer = require('autoprefixer-stylus');


module.exports = function(root, options) {
    options = options || {};
    root = root || __dirname + '/stylus';

    return function(req, res, next) {
        if (req.method != 'GET' && req.method != 'HEAD') {
            return next();
        }

        var pathname = url.parse(req.url).pathname;

        if (path.extname(pathname) != '.css') {
            return next();
        }

        var src = path.join(
            root,
            path.dirname(pathname),
            path.basename(pathname, '.css') + '.styl'
        );

        // Restore from cache
        if (options.cache && cache[src]) {
            res.set('Content-Type', 'text/css');
            res.send(cache[src]);

            return;
        }

        fs.readFile(src, function(err, data) {
            if (err) return next();

            var opts = {};

            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    opts[key] = options[key];
                }
            }

            opts.paths = [
                path.join(
                    root,
                    path.dirname(pathname)
                )
            ];

            opts.filename = path.basename(src);

            if (options.autoprefixer){
              if (typeof options.autoprefixer === "boolean"){
                opts.use = [autoprefixer('last 2 versions')];
              } else {
                opts.use = [autoprefixer(options.autoprefixer)];
              }
            }

            stylus.render(data.toString('utf8'), opts, function(err, css) {
                if (err) {
                    return res.sendStatus(500);
                }

                // Store in cache
                if (options.cache) {
                    cache[src] = css;
                }

                res.set('Content-Type', 'text/css');
                res.send(css);
            });
        });
    };
};
