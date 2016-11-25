(function(){
    angular.module('dashboard')
        .controller('ctrl-dashboard', dashboard);
        
    dashboard.$inject = ['$scope', '$http','factoryUsers','factoryWidgets'];
    
    function dashboard($scope, $http, factoryUsers, factoryWidgets){
        // list users
        factoryUsers.getUsers()
            .then(function (response) {
                $scope.users = response.data;
            }, function (error) {
                error.message ? 
                        alert('Unable to load user data: ' + error.message) : alert('Unable to load user data.')
            });      
        
        // list widgets
        factoryWidgets.getWidgets()
            .then(function (response) {
                $scope.widgets = response.data;
            }, function (error) {
                error.message ? 
                        alert('Unable to load widget data: ' + error.message) : alert('Unable to load widget data.')
            });   
    };
})();