var app = angular.module('myapp');

app.controller('perfilCtrl', function($scope, $rootScope, $http, mdDialog, $localStorage, Usuario) {

    if($scope.usuario === undefined){
        var token = $localStorage.token;
        Usuario.token(token).then(data => {
            $scope.usuario = data.user;
            console.log(data.user);
        })
    }

});
