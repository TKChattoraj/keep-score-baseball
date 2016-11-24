(function() {
    function ScorecardCtrl($scope){
        this.rowsArray = [1,2,3,4,5,6,7,8,9];
        this.inningsArray = [1,2,3,4,5,6,7,8,9,10];
    
        $scope.showHome = true;
        $scope.showVisitors = false;
        
        $scope.showHomeTeam = function() {
            $scope.showHome = true;
            $scope.showVisitors = false;
            
        }
        
        $scope.showVisitorTeam = function(){
            $scope.showHome = false;
            $scope.showVisitors = true;
            
        }
    
    
    
    
    
    
    
    
    }
    
    
    angular 
        .module('scorecardMod')
        .controller('scorecardCtrl', ['$scope', ScorecardCtrl]);
})();