angular.module('app.api.factory', [])
    .factory('ApiFactory', function ($resource) {

        var apiPath = 'https://ds.aggregion.com/api';
        var _api = {
            catalog: $resource(apiPath + '/public/catalog',
                {},
                {
                    get: {method: 'GET', isArray: true}
                }
            ),
            book: $resource(apiPath + '/public/catalog/:bookId',
                {bookId: '@bookId'},
                {
                    get: {method: 'GET'}
                }
            )
        };

        var exports = {
            getCatalog: function () {
                return _api.catalog.get({}, function () {
                    //
                }, function (response) {
                    //
                }).$promise;
            },
            getBook: function (bookId) {
                return _api.book.get({bookId: bookId}, function () {
                    //
                }, function (response) {
                    //
                }).$promise;
            }
        };

        return exports;
    });