(function() {
    function ScorecardCtrl($rootScope, $scope, teamRoster, gameState, Lineup){
        this.rowsArray = [1,2,3,4,5,6,7,8,9];
        this.inningsArray = [1,2,3,4,5,6,7,8,9,10];
        $scope.teamRow = [0, 1];
    
        $scope.showHome = false;
        $scope.showVisitors = true;
        
        $scope.showHomeTeam = function() {
            $scope.showHome = true;
            $scope.showVisitors = false;
            gameState.currentTeam = "home";
            
            $rootScope.$broadcast('getLineupAndBench');
            
        }
        
        $scope.showVisitorTeam = function(){
            $scope.showHome = false;
            $scope.showVisitors = true;
            gameState.currentTeam = "visitors";
            
            $rootScope.$broadcast('getLineupAndBench');
            
            
        }
        
        
        
        
        
        
        
    
        $scope.team = {};
        $scope.teams = teamRoster;
        
        $scope.getIndex = function(i) {
            $scope.teamIndex = i;
        }
        
        
        
        
        $scope.teamDropDownSettings = {selectionLimit: 1, externalIdProp: '', closeOnSelect: true, scrollable: true, scrollableHeight: 150, showCheckAll: false, showUncheckAll: false, dynamicTitle: false};
        
        $scope.designateVisitors = function(){

                gameState.visitors = $scope.team;
                $scope.vRuns = gameState.visitorsRuns;
                $scope.vHits = gameState.visitorsHits;
                $scope.vErrors = gameState.visitorsErrors;
                gameState.visitors.bench = gameState.visitors.roster;
                $rootScope.$broadcast('getLineupAndBench');
        }
                
        $scope.designateHome = function(){ 
           
                gameState.home = $scope.team; 
                $scope.hRuns = gameState.homeRuns;
                $scope.hHits = gameState.homeHits;
                $scope.hErrors = gameState.homeErrors;
                gameState.home.bench = gameState.home.roster;
                $rootScope.$broadcast('getLineupAndBench');
     
            }
      
        
//        //$rootScope.$on('updateLineScore', function() {
//                //homeRuns = gameState.homeRuns;
//                //homeHits = gameState.homeHits;
//                //visitorsRuns = gameState.visitorsRuns;
//                //visitorsHits = gameState.visitorsHits;
//            });
        
        
    
      }
    
        
    
    
    angular 
        .module('scorecardMod')
        .controller('scorecardCtrl', ['$rootScope', '$scope', 'teamRoster', 'gameState', 'Lineup',  ScorecardCtrl]);
})();