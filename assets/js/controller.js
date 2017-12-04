app.controller('Ctrl', function ($scope, $rootScope, $http, mdDialog, AuthService) {

    $scope.iniciosesion = function (ev) {
        mdDialog.mostrardialog('login', $scope.customFullscreen, ev);
    };

	$scope.logOut = function(){
		AuthService.logout();
	}

});


    
