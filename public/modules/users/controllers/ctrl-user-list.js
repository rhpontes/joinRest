(function(){
    angular.module('users')
        .controller('ctrl-user-list',usersCtrl);
        
        usersCtrl.$inject = ['$scope','$state','factoryUsers'];
        
        function usersCtrl($scope, $state, factoryUsers){
            // find users
            factoryUsers.getUsers()
                .then(function (response) {
                    $scope.users = response.data;
                }, function (error) {
                    error.message ? 
                            alert('Unable to load user data: ' + error.message) : alert('Unable to load user data.')
                });      
            
            $scope.view = function(id) {
                $state.go("users.detail", {id: id});
            };
        };
})();