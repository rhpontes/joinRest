(function(){
    angular.module('main', [
        'comunication',
        'dashboard',
        'users',
        'widgets',
        'ui.bootstrap',
        'ui.router',
        'ui.utils.masks']).config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            // For unmatched routes
            $urlRouterProvider.otherwise('/main');

            // Application routes
            $stateProvider
                .state('main', {
                    url: '/',                
                    templateUrl: '../index.html'                
                })
                .state('dashboard', {
                    url: '/dashboard',                
                    templateUrl: 'modules/main/views/dashboard.html'       
                })
                .state('users', {
                    url: '/users',                
                    templateUrl: 'modules/main/views/users.html'
                })
                .state('widgets', {
                    url: '/widgets',                
                    templateUrl: 'modules/main/views/widgets.html'
                });
        }
    ]);
})();