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
            var playerGameStats = {
                ab: 0, pa: 0, single: 0, double: 0, triple: 0, hr: 0, bb: 0, e: 0, fc: 0, hb: 0, wp: 0, pb: 0, sb: 0, cs: 0, balk: 0, rbi: 0, r: 0, er: 0, sac: 0, k: 0
            };
    /* gameStatsObject = {playerID: --id#--, gamesStats: {--games totals--}}
    
    */
            var gameStatsObject = {};
            gameStatsObject.playerID = playerID;
            var rawStats;
            var i = 1;
    //****Coding Note*******************
        // column at 10 will need to actually be the number of innings in the game
    //****Coding Note*******************
            for (var col = 0; col<10; col++) {
                
                if (gameState.currentTeam == 'home'){
                    // Remember rawStats are the stats for individual little boxes
                    rawStats = boxState.homeRawStats[p][col];
                    } else if (gameState.currentTeam == 'visitors'){    
                    rawStats = boxState.vistorsRawStats[p][col];
                }
                
                if (rawStats && (rawStats.playerID === playerID)) {

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
                    playerGameStats.cs += rawStats.cs;
                    playerGameStats.rbi += rawStats.rbi;
                    playerGameStats.r += rawStats.r;
                    playerGameStats.er += rawStats.er;
                    playerGameStats.sac += rawStats.sac;
                    playerGameStats.k += rawStats.k; 
                    i = i +1;
                }
            };
            
            gameStatsObject.gameStats = playerGameStats;
            
            if (gameState.currentTeam == 'home'){
                    boxState.homePlayerGameStats[p] = gameStatsObject;
                    $scope.playerStats = boxState.homePlayerGameStats;
                } else if (gameState.currentTeam == 'visitors'){    
                    boxState.visitorsPlayerGameStats[p] = gameStatsObject;
                    $scope.playerStats = boxState.visitorsPlayerGameStats;
                }
        };
        
    $scope.calculateGameStats = function() {
        
   //****Coding Note*******************
        /* 
        Using a team's lineup to gather the game stats.  When doing this for real, 
        will need to cycle through all players that played the game.  This will require keeping track of those who have been taken out of the game.  Those who didn't get into the game will need to be padded with zeros.  
        */
   //****Coding Note*******************
        
        var lineup;
        if (gameState.currentTeam == 'home'){
            lineup = gameState.home.lineup;
        } else if (gameState.currentTeam == 'visitors'){    
            lineup = gameState.visitors.lineup;
        } else {
            console.log("Error!  Find a Team");
        }
        
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