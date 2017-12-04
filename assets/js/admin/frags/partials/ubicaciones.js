var app = angular.module('myapp');

app.controller('ubicacionesCtrl', function($scope, $stateParams, Ubicacion, alertas) {

    var id = $stateParams.id
    var status = $stateParams.status

    Ubicacion.obtenerConProyecto(id)
    .then(res => {
        $scope.ubicaciones = res.data;
        $scope.$digest();
        return res.data
    })
    .then(result => {
        _.map(result, function(n) {
            $scope.markers.push({latitude: n.latitude, longitude: n.longitude});
        })
    })

    $scope.seleccionar = function(ubicacion) {
        $scope.seleccion = ubicacion.id;
        $scope.ubicacion = ubicacion;
        console.log($scope.seleccion);
        $scope.formularioUbicacion = true;
    }

    $scope.submitUbicacion = function(ubicacion, proyecto) {

        $scope.seleccion === 0
            ? crear(ubicacion, proyecto)
            : update(ubicacion);

    }

    function crear(ubicacion, proyecto) {
        console.log('estoy pasando')

        Ubicacion.crear(ubicacion, id).then(res => {
            $scope.ubicaciones.push(res.data);
            $scope.$digest();
            console.log(res.data);
            $scope.formularioUbicacion = false;
            delete $scope.ubicacion
        })

    }

    function update(ubicacion) {
        console.log(ubicacion);
        Ubicacion.editar(ubicacion).then(function(data) {
            console.log(data);
            $scope.formularioUbicacion = false;
        })
    }

    $scope.crearUbicacion = function() {
        $scope.seleccion = 0;
        $scope.ubicacion = {};
        console.log($scope.seleccion);
    }

    $scope.map = {
        center: {
            latitude: 19.1847524,
            longitude: -96.1550328
        },
        zoom: 5
    };

    $scope.markers = [];

});
