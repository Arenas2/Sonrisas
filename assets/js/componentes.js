app.directive('imagenproducto', function() {

    var template = '<md-progress-circular ng-disabled="!cargandoimagen" ng-if="cargandoimagen" class="md-hue-2" md-diameter="20px"></md-progress-circular><div class="md-card-image" ng-if="!hover"><img ng-src="{{imagen.imagen}}"><div>';

    return {
        scope: {
            id: '@'
        },
        restrict: 'EA',
        template: template,
        controller: function($scope, Imagen) {

            var id = $scope.id;
            $scope.cargandoimagen = true;

			Imagen.obtenerPortada(id).then(res => {
                console.log(res)
				$scope.imagen = res.data;
				$scope.cargandoimagen = false;
				$scope.$digest();

			})
        }
    };

});

app.directive('fotografia', function() {

    var template = '<md-progress-circular ng-disabled="!cargandoimagen" ng-if="cargandoimagen" class="md-hue-2" md-diameter="20px"></md-progress-circular><div class="md-card-image" ng-if="!hover"><img ng-src="{{imagen.imagen}}"><div>';

    return {
        scope: {
            id: '@'
        },
        restrict: 'EA',
        template: template,
        controller: function($scope, Imagen) {

            var id = $scope.id;
            $scope.cargandoimagen = true;

			Imagen.one(id).then(res => {
                console.log(res)
				$scope.imagen = res.data;
				$scope.cargandoimagen = false;
				$scope.$digest();

			})
        }
    };
});

app.directive('placeAutocomplete', function() {
    return {
        templateUrl: 'partials/autocomplete',
        restrict: 'E',
        replace: true,
        scope: {
            'ngModel': '='
        },
        controller: function($scope, $q) {
            if (!google || !google.maps) {
                throw new Error('Google Maps JS library is not loaded!');
            } else if (!google.maps.places) {
                throw new Error('Google Maps JS library does not have the Places module');
            }
            var autocompleteService = new google.maps.places.AutocompleteService();
            var map = new google.maps.Map(document.createElement('div'));
            var placeService = new google.maps.places.PlacesService(map);
            $scope.ngModel = {};

            /**
            * @ngdoc function
            * @name getResults
            * @description
            *
            * Helper function that accepts an input string
            * and fetches the relevant location suggestions
            *
            * This wraps the Google Places Autocomplete Api
            * in a promise.
            *
            * Refer: https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
            */
            var getResults = function(address) {
                var deferred = $q.defer();
                autocompleteService.getQueryPredictions({
                    input: address
                }, function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            /**
            * @ngdoc function
            * @name getDetails
            * @description
            * Helper function that accepts a place and fetches
            * more information about the place. This is necessary
            * to determine the latitude and longitude of the place.
            *
            * This wraps the Google Places Details Api in a promise.
            *
            * Refer: https://developers.google.com/maps/documentation/javascript/places#place_details_requests
            */
            var getDetails = function(place) {
                var deferred = $q.defer();
                placeService.getDetails({
                    'placeId': place.place_id
                }, function(details) {
                    deferred.resolve(details);
                });
                return deferred.promise;
            };

            $scope.search = function(input) {
                if (!input) {
                    return;
                }
                return getResults(input).then(function(places) {
                    return places;
                });
            };
            /**
            * @ngdoc function
            * @name getLatLng
            * @description
            * Updates the scope ngModel variable with details of the selected place.
            * The latitude, longitude and name of the place are made available.
            *
            * This function is called every time a location is selected from among
            * the suggestions.
            */
            $scope.getLatLng = function(place) {
                if (!place) {
                    $scope.ngModel = {};
                    return;
                }
                getDetails(place).then(function(details) {

                    console.log(details);

                    var numero = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'street_number' })});
                    var calle = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'route' })});
                    var estado = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'locality' })});
                    var colonia = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'sublocality_level_1' })});
                    var codigopostal = _.find(details.address_components, function(o) { return  _.some(o.types, function(word) { return word === 'postal_code' })});

                    console.log(numero)
                    console.log(calle)
                    console.log(estado)
                    console.log(colonia)
                    console.log(codigopostal)

                    $scope.ngModel = {
                        'nombre': place.description,
                        'latitude': details.geometry.location.lat(),
                        'longitude': details.geometry.location.lng()
                    };

                    if(numero !== undefined){   $scope.ngModel.numero =  numero.long_name }
                    if(calle !== undefined){   $scope.ngModel.calle =  calle.long_name }
                    if(colonia !== undefined){   $scope.ngModel.colonia =  colonia.long_name }
                    if(estado !== undefined){   $scope.ngModel.estado =  estado.long_name }
                    if(codigopostal !== undefined){   $scope.ngModel.codigopostal =  codigopostal.long_name }

                });
            }
        }
    };
});
