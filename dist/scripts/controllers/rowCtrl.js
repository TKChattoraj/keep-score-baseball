(function() {
    function RowCtrl($scope, Lineup, $rootScope, gameState, boxState){
        $scope.lineup = Lineup;     
        $scope.getIndex = function(i) {
            $scope.rowIndex = i;
        }
        
        $scope.batter = {};

        $scope.bench = [{id: 1, label: "Me", number: 14}, 
          {id: 2, label: "Myself", number: 30}, 
          {id: 3, label: "I", number: 8}, ];

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
        
 var getPlayerGameStats = function(p, playerID) {
            console.log('into getPlayerGameStats');
            var playerGameStats = {
                ab: 0, pa: 0, single: 0, double: 0, triple: 0, hr: 0, bb: 0, e: 0, fc: 0, hb: 0, wp: 0, pb: 0, sb: 0, balk: 0, rbi: 0, r: 0, er: 0, sac: 0, k: 0
            };
            var gameStatsObject = {};
            gameStatsObject.playerID = playerID;
            var rawStats;
            var i = 1;
            for (var col = 0; col<10; col++) {
                rawStats = boxState.homeRawStats[p][col];
                if (rawStats && (rawStats.playerID === playerID)) {
                    console.log('adding to the stats: ' + i );
                    console.log('rawStats.k: ' + rawStats.k);
                    console.log('rawStats.single: ' + rawStats.single);
                    playerGameStats.ab += rawStats.ab;
                    playerGameStats.pa += rawStats.pa;
                    playerGameStats.single += rawStats.single;
                    playerGameStats.double += rawStats.double;
                    playerGameStats.triple += rawStats.triple;
                    playerGameStats.hr += rawStats.hr;
                    playerGameStats.bb += rawStats.bb;
                    playerGameStats.e += rawStats.e;
                    playerGameStats.fc += rawStats.fc;
                    playerGameStats.hb += rawStats.hb;
                    playerGameStats.wp += rawStats.wp;
                    playerGameStats.balk += rawStats.balk;
                    playerGameStats.pb += rawStats.pb;
                    playerGameStats.sb += rawStats.sb;
                    playerGameStats.rbi += rawStats.rbi;
                    playerGameStats.r += rawStats.r;
                    playerGameStats.er += rawStats.er;
                    playerGameStats.sac += rawStats.sac;
                    playerGameStats.k += rawStats.k; 
                    i = i +1;
                }
            };
            
            gameStatsObject.gameStats = playerGameStats;
            
            boxState.homePlayerGameStats[p] = gameStatsObject;
            $scope.playerStats = boxState.homePlayerGameStats[0];
       
        };
        
        $scope.calculateGameStats = function() {
            console.log('into calculateGameStats');
            var lineup = gameState.home.lineup;
            for (var p = 0; p<lineup.length; p++) {
                var playerID = lineup[p].id;
                getPlayerGameStats(p, playerID);
            }
            
        }       
        
        
        
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
        .controller('rowCtrl', ['$scope', 'Lineup', '$rootScope', 'gameState', 'boxState', RowCtrl]);
})();