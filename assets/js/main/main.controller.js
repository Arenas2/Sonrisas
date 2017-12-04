app.controller('mainCtrl', function($scope, $rootScope, $state, $http, $mdDialog, AuthService, $localStorage, Usuario) {

    $scope.auth = false;

    if($localStorage.token != null){
        $scope.auth = true;
    }

    $scope.registro = function(usuario) {
        AuthService.registro(usuario);
    }

    $scope.login = function(x) {
        AuthService.login(x).then(data => {
            console.log(data);
            Usuario.token(data.token).then(usuario => {
                console.log(usuario);
                if(usuario.user != null){
                    $scope.usuario = data.user;
                    $scope.auth = true;
                    $state.go('home')
                }
            })
        });
    }

    $scope.logout = function(){

        ventana = $mdDialog.confirm()
        .title('¿Quieres hacer Logout?')
        .textContent('Si quieres hacerlo dale Aceptar')
        .ok('Aceptar')
        .cancel('Cerrar')
        .clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            AuthService.logout();
            $scope.auth = false;

        }, function() {

        });
    }

    if($scope.usuario === undefined && $scope.auth){
        var token = $localStorage.token;
        Usuario.token(token).then(data => {
            Usuario.obtener(data.user.id).then(data => {
                $scope.usuario = data;
            })
        })
    }

});
