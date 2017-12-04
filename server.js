var main = require('./main');



main.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
main.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(main.get('port'), function() {
    console.log('App is running, server is listening on port ', main.get('port'));
});

//
//
// main.listen(5000, function() {
//     console.log('Servidor Node corriendo dentro de http://localhost:5000')
// });
