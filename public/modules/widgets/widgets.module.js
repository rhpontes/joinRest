(function(){

    angular.module('widgets', [
        'comunication',
        'ui.bootstrap',
        'ui.router',
        'ui.utils.masks']).config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.
                    state('widgets.main', {
                        url:'/main',
                        templateUrl: 'modules/widgets/views/widgets.html',
                        controller: 'ctrl-widget-list'
                    })
                    .state('widgets-edit', {
                        url:'/detail/:id',
                        templateUrl: 'modules/widgets/views/widget-detail.html',
                        controller: 'ctrl-widget-detail'
                    })
                    .state('widgets-insert', {
                        url:'/detail',
                        templateUrl: 'modules/widgets/views/widget-detail.html',
                        controller: 'ctrl-widget-detail'
                    });
                    
                    $urlRouterProvider.otherwise('/widgets.main');
            }
        ]);
})();