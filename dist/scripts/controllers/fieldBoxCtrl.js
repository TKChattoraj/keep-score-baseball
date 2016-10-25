(function() {
    
    function FieldBoxCtrl($scope, scorecardBoxState) {
        
        scorecardBoxState.state = "closed";
        
        $scope.showScoreBox = function(state) {
            
            switch (state) {
                case "closed":
                    $scope.showScoreBox = false;
                    break;
                case "initial":
                    $scope.showScoreBox = true;
            }
        }
        
        $scope.showBoxInitial = function() {
            scorecardBoxState.state = "initial"
            $scope.showScoreBox(scorecardBoxState.state);
        }
        $scope.showBoxClosed = function() {
            scorecardBoxState.state = "closed";
            $scope.showScoreBox(scorecardBoxState.state);
        }
        
    }
    
    
    
    angular 
        .module('scorecardMod')
        .controller('fieldBoxCtrl', ['$scope', 'scorecardBoxState', FieldBoxCtrl]);
})();

