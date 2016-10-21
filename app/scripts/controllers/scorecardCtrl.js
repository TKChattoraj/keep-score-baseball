(function() {
    function ScorecardCtrl($scope){
        this.rowsArray = [1,2,3,4,5,6,7,8,9];
        this.inningsArray = [1,2,3,4,5,6,7,8,9,10];
        
        
//        $scope.batter = {};
//        
//        this.pick = $scope.batter;
//        
//        console.log($scope.batter);
//            
//        $scope.roster = [{id: 1, label: "Rose"}, {id: 2, label: "Griffey"}];
//        $scope.batterDropDownSettings = {selectionLimit: 1, externalIdProp:''};

    }
    angular 
        .module('scorecardMod')
        .controller('scorecardCtrl', ['$scope', ScorecardCtrl]);
})();