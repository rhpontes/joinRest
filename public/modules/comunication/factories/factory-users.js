(function(){
    angular.module('comunication')
        .factory('factoryUsers', ['$http','config', function($http, config) {

           var urlBase = config.urlBaseUsers;
            var factory = {};

            factory.getUsers = function () {
                return $http.get(urlBase);
            };

            factory.getUser = function (id) {
                return $http.get(urlBase + '/' + id);
            };   

            return factory;
        }]);
})();

