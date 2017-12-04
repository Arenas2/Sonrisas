var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = 'cesar';

router.get("/", function(req, res) {
    res.render("main/layout");
})

router.get("/admin", function(req, res) {
    res.render("admin/layout");
})

router.get("/token", function(req, res) {
    console.log(req.user);
    token = jwt.sign({ user: req.user}, secret, { expiresIn: '24h' });
    res.redirect('/' + token);
})

router.get("/:token", function(req, res) {
    res.render("main/layout");
})

router.get("/admin/:url", function(req, res) {
    var page = req.params.url
    res.render("admin/frags/" + page);
})

router.get("/admin/partials/:url", function(req, res) {
    var page = req.params.url
    res.render("admin/frags/partials/" + page);
})

router.get("/admin/status/:url", function(req, res) {
    var page = req.params.url
    res.render("admin/frags/status/" + page);
})


router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});


router.all('/:action', function(req, res){
})

router.get("/main/:url", function(req, res) {
    var page = req.params.url
    res.render("main/frags/" + page);
})

router.get("/main/home/:url", function(req, res) {
    var page = req.params.url
    res.render("main/frags/home/" + page);
})

router.get("/main/vistas/:url", function(req, res) {
    var page = req.params.url
    res.render("main/frags/proyectos/vistas/" + page);
})

router.all('/:action', function(req,res){

})


router.get("/partials/:part", function(req, res) {
	var partial = req.params.part
    res.render("partials/" + partial );
})

router.get("/proyectos/:url", function(req, res) {
    var page = req.params.url
    res.render("main/frags/proyectos/" + page);
})

module.exports = router;
