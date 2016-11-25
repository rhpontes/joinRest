(function(){
    angular.module('users', [
        'comunication',
        'ui.bootstrap',
        'ui.router',
        'ui.utils.masks']).config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.
                    state('users.list', {
                        url: '/list',
                        templateUrl: 'modules/users/views/user-list.html',
                        controller: 'ctrl-user-list'
                    }).
                    state('users.detail', {
                        url: '/detail/:id',
                        templateUrl: 'modules/users/views/user-detail.html',
                        controller: 'ctrl-user-detail'
                    });
                    
                    $urlRouterProvider.otherwise('/users.list');
            }
        ]);
})();