var app = angular.module('myapp');

app.controller('nosotrosCtrl', function($scope, $state, $rootScope, $stateParams, $http, mdDialog, Campana) {

    $scope.obtenerCampanas = function(data) {
        Campana.obtenerCampana().then(function(data) {
            $scope.campanas = data.data;
            console.log(data.data)
        })
    }

    $scope.obtenerCampana = function(){
        Campana.obtenerOne($stateParams.campana).then(function(data){

            $scope.campana = data.data;
            console.log(data.data);

        })
    }

});
