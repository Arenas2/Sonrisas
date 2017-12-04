var app = angular.module('myapp', [
    'ngMaterial',
    'ui.router',
    'ngAnimate',
    'naif.base64',
    'oc.lazyLoad',
    'ngStorage',
    'uiGmapgoogle-maps',
    'ngCroppie',
    'md.data.table',
    'angulartics',
    'angulartics.google.tagmanager'
]);

app.service('mdDialog', function($mdDialog) {

    this.mostrardialog = function(template, DialogController, tamanioPantalla, ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/partials/' + template,
            parent: angular.element(document.body),
            bindToController: true,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: tamanioPantalla
        }).then(function(answer) {
            console.log(template);
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.personalizable = function(answer) {
            $mdDialog.hide(answer);
            //OCULTA Y HAZ ALGO
        };
    }
});

//TEMAS
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('amber').accentPalette('orange').warnPalette('red').backgroundPalette('grey');
});

app.run(function($rootScope, $transitions, $timeout) {
    $transitions.onStart({}, trans => {
        $rootScope.loading = true;
        $timeout.cancel()

    });

    $transitions.onSuccess({}, trans => {
        $rootScope.loading = false;
    });
})

app.config([
    'uiGmapGoogleMapApiProvider',
    function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({key: 'AIzaSyBMemut_EJ8vHuSf5SdmZ-R4wDBrUQWy6k', v: '3.17', libraries: 'weather,geometry,visualization'});
    }
]);

app.run([
    '$rootScope',
    '$window',
    function($rootScope, $window) {

        $rootScope.user = {};

        FB.init({appId: '135506347062903', status: true, cookie: true, xfbml: true, version: 'v2.8'});

        $window.fbAsyncInit = function() {

            FB.init({appId: '135506347062903', status: true, cookie: true, xfbml: true, version: 'v2.8'});

        };
    }
]);

app.service('alertas', [
    '$mdToast',
    function($mdToast) {
        this.mostrarToastEstandar = function(mensaje) {
            var last = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

            var toastPosition = angular.extend({}, last);

            function getToastPosition() {
                sanitizePosition();

                return Object.keys(toastPosition).filter(function(pos) {
                    return toastPosition[pos];
                }).join(' ');
            };

            function sanitizePosition() {
                var current = toastPosition;

                if (current.bottom && last.top)
                    current.top = false;
                if (current.top && last.bottom)
                    current.bottom = false;
                if (current.right && last.left)
                    current.left = false;
                if (current.left && last.right)
                    current.right = false;

                last = angular.extend({}, current);
            }

            var pinTo = getToastPosition();

            $mdToast.show($mdToast.simple().textContent(mensaje).position(pinTo).hideDelay(3000));
        }
    }
]);
