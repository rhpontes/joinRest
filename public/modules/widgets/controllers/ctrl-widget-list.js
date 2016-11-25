(function(){
    angular.module('widgets')
        .controller('ctrl-widget-list', widgetsCtrl);
        
    widgetsCtrl.$inject = ['$scope','$state','factoryWidgets'];
        
    function widgetsCtrl($scope, $state, factoryWidgets){
        $scope.widget = {};       
    
        // find widgets
        factoryWidgets.getWidgets()
        .then(function (response) {
            $scope.widgets = response.data;
        }, function (error) {
            error.message ? 
                    alert('Unable to list widget data: ' + error.message) : alert('Unable to list widget data.')
        }); 
        
        // habilitates creating mode and sets new widget
        $scope.create = function() {
            $state.go("widgets-insert");        
        };
        
        // habilitates editing mode and use the selected widget to edit
        $scope.edit = function(widget){                     
            $state.go("widgets-edit",{id: widget.id});                                 
        };
    };
    
})();