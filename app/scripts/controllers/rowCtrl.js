(function() {
    function RowCtrl($scope, Lineup, $rootScope, gameState){
        $scope.lineup = Lineup;     
        $scope.getIndex = function(i) {
            $scope.rowIndex = i;
        }
        
        $scope.batter = {};
              
        
//        if (gameState.currentTeam && gameState.currentTeam == 'home') {
//            console.log(" home roster: " + gameState.home.roster);
////            $scope.roster = gameState.home.roster;
//            $scope.roster = [{id: 1, label: "Me", number: 14}, 
//              {id: 2, label: "Myself", number: 30}, 
//              {id: 3, label: "I", number: 8}, ];
//            
//            console.log("set the home roster");
//        } else if (gameState.currentTeam && gameState.currentTeam == 'visitors'){
//            $scope.roster = gameState.visitors.roster;
//        } else {
            $scope.bench = [{id: 1, label: "Me", number: 14}, 
              {id: 2, label: "Myself", number: 30}, 
              {id: 3, label: "I", number: 8}, ];
//        }
        
        //$scope.roster = ;

        
        $scope.batterDropDownSettings = {selectionLimit: 1, externalIdProp: '', closeOnSelect: true, scrollable: true, scrollableHeight: 150, showCheckAll: false, showUncheckAll: false, dynamicTitle: false};
        
        $scope.eventListener = function(){
            
            Lineup.adjust($scope.batter, $scope.rowIndex);
            $rootScope.$broadcast('playerChosen');
        };
        $rootScope.$on('playerChosen', function(){
            if (gameState.currentTeam == 'home') {
                $scope.bench = gameState.home.bench;  
            }
            if (gameState.currentTeam == 'visitors') {
                $scope.bench = gameState.visitors.bench;
            }
            
        });
        
// put the bench into the $scope.bench
        
        $rootScope.$on('getLineupAndBench', function(){
            
            if (gameState.currentTeam == 'home') {
                $scope.bench = gameState.home.bench;

            }
            if (gameState.currentTeam == 'visitors') {
                $scope.bench = gameState.visitors.bench;

            }
        });
        
        
        
        
      }
        
    angular 
        .module('scorecardMod')
        .controller('rowCtrl', ['$scope', 'Lineup', '$rootScope', 'gameState', RowCtrl]);
})();