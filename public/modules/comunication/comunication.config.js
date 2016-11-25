(function(){
    angular.module('comunication')
        .service('config', [function() {

           //var urlBaseUsers = 'http://spa.tglrw.com:4000/users';
           //var urlBaseWidgets = 'http://spa.tglrw.com:4000/widgets';
           
            var urlBaseUsers = 'http://localhost:3000/users';
            var urlBaseWidgets = 'http://localhost:3000/widgets';
           
            var config = {};

            config.urlBaseUsers = urlBaseUsers;
            config.urlBaseWidgets = urlBaseWidgets;

            return config;
        }]);
})();