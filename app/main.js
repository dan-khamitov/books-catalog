'use strict';

angular.module('app', [
        //modules
        'app.templates',

        //pages
        'app.pages.catalog',
        'app.pages.book',

        //factories
        'app.api.factory',

        'ngMaterial',
        'ngResource',
        'ui.router'
    ])

.config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
          .primaryPalette('cyan')
          .accentPalette('blue-grey');
    })

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('404', {
                templateUrl: '404/404.html'
            });

        $urlRouterProvider.otherwise(function($injector, $location){
           var state = $injector.get('$state');
           state.go('404');
           return $location.path();
        });

    })

.run();