angular.module('app.pages.book', [])

    .config(function ($stateProvider) {

        $stateProvider
            .state('book', {
                url: '/book/:bookId',
                templateUrl: 'book/book.html',
                controller: 'BookPageCtrl',
                resolve: {
                    book: function ($stateParams, ApiFactory) {
                        return ApiFactory.getBook($stateParams.bookId);
                    }
                }
            });

    })

    .controller('BookPageCtrl', function ($scope, book) {

        $scope.book = book;

    });