(function(){
    angular.module('comunication')
        .factory('factoryWidgets', ['$http','config', function($http, config) {

            var urlBase = config.urlBaseWidgets;
            var factory = {};

            factory.getWidgets = function () {
                return $http.get(urlBase);
            };

            factory.getWidget = function (id) {
                return $http.get(urlBase + '/' + id);
            };

            factory.insertWidget = function (widget) {
                return $http.post(urlBase, widget);
            };

            factory.updateWidget = function (widget) {
                return $http.put(urlBase + '/' + widget.id, widget)
            };    

            return factory;
        }]);
    
})();