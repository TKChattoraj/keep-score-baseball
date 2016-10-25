(function() {
    function RowCtrl($scope, Lineup){
        $scope.lineup = Lineup;


//        this.rowsArray = [1,2,3,4,5,6,7,8,9];
//        this.inningsArray = [1,2,3,4,5,6,7,8,9,10];

//        $scope.roster = [{id: 1, label: "Rose", number: 14}, {id: 2, label: "Griffey", number: 30}, {id: 3, label: "Morgan", number: 8}, {id: 4, label: "Perez", number: 24}, {id: 5, label: "Bench", number: 5}, {id: 6, label: "Foster", number: 15}, { id: 7, label: "Geronimo", number: 20}, {id: 8, label: "Concepcion", number: 13}, {id: 9, label: "Gullet", number: 35}];
        
        $scope.getIndex = function(i) {
            $scope.rowIndex = i;
            console.log($scope.rowIndex);
        }
        
        $scope.batter = {};
        $scope.roster = Lineup.bench;

        
        $scope.batterDropDownSettings = {selectionLimit: 1, externalIdProp: '', closeOnSelect: true, scrollable: true, scrollableHeight: 150, showCheckAll: false, showUncheckAll: false, dynamicTitle: false};
        
        //$scope.rowTest = $scope.$parent.available;
        
        
        
        $scope.eventListener = function(){
            alert("eventListener: " + Lineup.bench.length);
            Lineup.adjust($scope.batter, $scope.rowIndex);
            $scope.roster = Lineup.bench;
            console.log($scope.roster);
        };
        
      }
        
    angular 
        .module('scorecardMod')
        .controller('rowCtrl', ['$scope', 'Lineup', RowCtrl]);
})();