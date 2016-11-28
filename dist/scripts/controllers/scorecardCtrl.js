(function() {
    function ScorecardCtrl($rootScope, $scope, teamRoster, gameState, Lineup){
        this.rowsArray = [1,2,3,4,5,6,7,8,9];
        this.inningsArray = [1,2,3,4,5,6,7,8,9,10];
        $scope.teamRow = [0, 1];
    
        $scope.showHome = true;
        $scope.showVisitors = false;
        
        $scope.showHomeTeam = function() {
            $scope.showHome = true;
            $scope.showVisitors = false;
            gameState.currentTeam = gameState.home;
            console.log("current team: " + gameState.currentTeam.label);
            
        }
        
        $scope.showVisitorTeam = function(){
            $scope.showHome = false;
            $scope.showVisitors = true;
            gameState.currentTeam = gameState.visitors;
            console.log("current team: " + gameState.currentTeam.label);
            
        }
    
        $scope.team = {};
        $scope.teams = teamRoster;
        
        $scope.getIndex = function(i) {
            $scope.teamIndex = i;
        }
        
        
        
        
        $scope.teamDropDownSettings = {selectionLimit: 1, externalIdProp: '', closeOnSelect: true, scrollable: true, scrollableHeight: 150, showCheckAll: false, showUncheckAll: false, dynamicTitle: false};
        
        $scope.designateTeam = function(i){
            
            if ($scope.teamIndex == 1) {
                gameState.home = $scope.team; 
                $scope.runs = gameState.homeRuns;
                $scope.hits = gameState.homeHits;
                $scope.errors = gameState.homeErrors;
                $rootScope.$broadcast('homeChosen');
                
            }
            if ($scope.teamIndex === 0) {
                gameState.visitors = $scope.team;
                $scope.runs = gameState.visitorsRuns;
                $scope.hits = gameState.visitorsHits;
                $scope.errors = gameState.visitorsErrors;
                
            }
            console.log("Home: " + gameState.home);
            console.log("Visitors: " + gameState.visitors);
        }
       
        
        
      $rootScope.$on('homeChosen', function(){gameState.currentTeam = gameState.home;
       Lineup.team = gameState.currentTeam.roster;
       Lineup.bench = gameState.currentTeam.roster;
       console.log("Home Roster: " + Lineup.team);
       console.log("Home Bench: " + Lineup.bench)});
       
      }
    
        
    
    
    angular 
        .module('scorecardMod')
        .controller('scorecardCtrl', ['$rootScope', '$scope', 'teamRoster', 'gameState', 'Lineup',  ScorecardCtrl]);
})();