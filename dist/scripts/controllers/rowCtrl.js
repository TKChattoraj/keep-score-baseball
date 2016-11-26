(function() {
    function RowCtrl($scope, Lineup, $rootScope){
        $scope.lineup = Lineup;     
        $scope.getIndex = function(i) {
            $scope.rowIndex = i;
        }
        
        $scope.batter = {};
        $scope.roster = Lineup.bench;

        
        $scope.batterDropDownSettings = {selectionLimit: 1, externalIdProp: '', closeOnSelect: true, scrollable: true, scrollableHeight: 150, showCheckAll: false, showUncheckAll: false, dynamicTitle: false};
        
        $scope.eventListener = function(){
            
            Lineup.adjust($scope.batter, $scope.rowIndex);
            $rootScope.$broadcast('playerChosen');
        };
        $rootScope.$on('playerChosen', function(){$scope.roster=Lineup.bench});
        
      }
        
    angular 
        .module('scorecardMod')
        .controller('rowCtrl', ['$scope', 'Lineup', '$rootScope', RowCtrl]);
})();