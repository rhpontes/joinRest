(function(){
   angular.module('dashboard', [
       'comunication',
       'users',
       'widgets',
       'ui.bootstrap',
       'ui.router',
       'ui.utils.masks']).config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            // For unmatched routes
            $urlRouterProvider.otherwise('/dashboard.main');

            // Application routes
            $stateProvider
                .state('dashboard.main', {
                    //url: '/dashboard',                
                    templateUrl: 'modules/dashboard/views/dashboard.html',
                    controller: 'ctrl-dashboard'                
                });
        }
    ]); 
})();

