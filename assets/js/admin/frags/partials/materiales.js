var app = angular.module('myapp');

app.controller('materialesCtrl', function($scope ,$stateParams, Material) {

    $scope.seccion = 'materiales';

    $scope.seleccion = 0;

    var id = $stateParams.id
    var status = $stateParams.status

    Material.obtenerConProyecto(id).then(function(data) {
        $scope.materiales = data.data;
        $scope.$digest();

    })

	$scope.seleccionar = function(material){
       $scope.seleccion = material.id;
       $scope.material = material;
       console.log($scope.seleccion);
       $scope.formularioMaterial = true;
   }

    $scope.submitMaterial = function(material, proyecto){

       $scope.seleccion === 0 ? crear(material, proyecto) : update(material);

   }

   function crear(material, proyecto){
	console.log(proyecto);
	material.id_proyecto = proyecto;
   	Material.crear(material).then(res => {
   		$scope.materiales.push(res.data);
   		$scope.$digest();
   		$scope.formularioMaterial = false;
   	})
   }

   function update(material){
       console.log('estoy editando')
       Material.editar(material).then(function(data) {
			console.log(data);
			$scope.formularioMaterial = false;
		})
   }

   $scope.crearMaterial = function(){
       $scope.seleccion = 0;
       $scope.material = {};
       console.log($scope.seleccion);
   }

});
