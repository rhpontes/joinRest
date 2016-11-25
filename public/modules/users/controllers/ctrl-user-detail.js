(function(){
    angular.module('users')
        .controller('ctrl-user-detail',usersCtrl);
        
        usersCtrl.$inject = ['$scope','$state', '$stateParams', 'factoryUsers'];
        
        function usersCtrl($scope, $state, $stateParams, factoryUsers){
           
            // call detail 
            factoryUsers.getUser($stateParams.id)
                .then(function (response) {
                    $scope.detail = true;
                    $scope.user = response.data;                
                }, function (error) {
                    error.message ? 
                        alert('Unable to get user data: ' + error.message) : alert('Unable to get user data.')
                });   
                
             $scope.close = function(){
                $state.go("users.list");
            };
            
        };
})();