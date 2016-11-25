(function(){
    angular.module('widgets')
        .controller('ctrl-widget-detail', widgetsCtrl);
        
    widgetsCtrl.$inject = ['$scope','$state','$stateParams', 'factoryWidgets'];
        
    function widgetsCtrl($scope, $state, $stateParams, factoryWidgets){
        $scope.widget = {};
        $scope.widget.melts = false;     
        
        if ($stateParams.id)
        {
            // call detail 
            factoryWidgets.getWidget($stateParams.id)
                .then(function (response) {
                    $scope.editing = true;
                    $scope.creating = false;
                    $scope.widget = response.data;                
                }, function (error) {
                    error.message ? 
                        alert('Unable to getting widget data: ' + error.message) : alert('Unable to getting widget data.')
                });  
        };
        
        $scope.submit = function(){
            
            if (!$scope.widgetForm.$valid) {
                alert('Please, insert at least Name.');
                return;
            }
            
            if (!$stateParams.id)
                factoryWidgets.insertWidget($scope.widget)
                    .then(function (response) {
                        $scope.editing = false;
                        $scope.creating = false;
            
                        alert("New widget saved!");
                        $state.go("widgets.main");
                        
                    }, function (error) {
                        error.message ? 
                            alert('Unable to creating widget data: ' + error.message) : alert('Unable to creating widget data.')
                    });   
            else
                factoryWidgets.updateWidget($scope.widget)
                    .then(function (response) {
                        $scope.editing = false;
                        $scope.creating = false;
                        
                        alert("Selected widget was saved!");
                        $state.go("widgets.main");
                        
                    }, function (error) {
                        error.message ? 
                            alert('Unable to update widget data: ' + error.message) : alert('Unable to update widget data.')
                    });   
            
        };
    };
    
})();