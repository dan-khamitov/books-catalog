angular.module('app.pages.catalog', ['ui.router'])

    .config(function ($stateProvider) {

        $stateProvider
            .state('catalog', {
                url: '/catalog',
                templateUrl: 'catalog/catalog.html',
                controller: 'CatalogPageCtrl',
                resolve: {
                    books: function (ApiFactory) {
                        return ApiFactory.getCatalog();
                    }
                }
            });

    })

    .controller('CatalogPageCtrl', function ($scope, books) {

        $scope.books = books;

    });