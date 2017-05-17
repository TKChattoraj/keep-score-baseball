(function() {
    function ScorecardCtrl($rootScope, $scope, teamRoster, gameState, Lineup, $http){
        
        var getTeamsReq = {
            method: 'GET',
            url: 'http://localhost:3000/api/keepscore/teams',       
        }
        
        
        
        var getTeamSuccess = function(response) {
            $scope.teamz = response.data;
            
            
            
        }
        
        
        $http(getTeamsReq).then(function(response){getTeamSuccess(response)},
                       function(response){
            $scope.teamz = "Error!  Error!"
        });
        
        
        
        
        
        this.rowsArray = [1,2,3,4,5,6,7,8,9];
        this.inningsArray = [1,2,3,4,5,6,7,8,9,10];
        $scope.teamRow = [0, 1];
    
        $scope.showHome = false;
        $scope.showVisitors = true;
        
        $scope.showHomeTeam = function() {
            
            $scope.showHome = true;
            $scope.showVisitors = false;
            gameState.currentTeam = "home";
            $rootScope.$broadcast('showHome');
            
            $rootScope.$broadcast('getLineupAndBench');
            console.log("showing Home: " + $scope.showHome);
        }
        
        $scope.showVisitorTeam = function(){
            $scope.showHome = false;
            $scope.showVisitors = true;
            gameState.currentTeam = "visitors";
            $rootScope.$broadcast('showVisitors');
            
            $rootScope.$broadcast('getLineupAndBench');
            
            
        }
        $rootScope.$on('showHome', function(){
            $scope.showVisitors = false;
            $scope.showHome = true;
            $scope.homeName = gameState.home.label;
            
        });
        
        $rootScope.$on('showVisitors', function(){
            $scope.showVisitors = true;
            $scope.showHome = false;
            $scope.visitorsName = gameState.visitors.label;
        });
        
  
        $scope.team = {};
        $scope.teams = teamRoster;
        
        $scope.getIndex = function(i) {
            $scope.teamIndex = i;
        }
        
        
        
        
        $scope.teamDropDownSettings = {selectionLimit: 1, externalIdProp: '', closeOnSelect: true, scrollable: true, scrollableHeight: 150, showCheckAll: false, showUncheckAll: false, dynamicTitle: false};
        
        $scope.designateVisitors = function(){

                gameState.visitors = $scope.team;
                $scope.visitorsName = gameState.visitors.label;
                $scope.vRuns = gameState.visitorsRuns;
                $scope.vHits = gameState.visitorsHits;
                $scope.vErrors = gameState.visitorsErrors;
                gameState.visitors.bench = gameState.visitors.roster;
                $rootScope.$broadcast('getLineupAndBench');
        }
                
        $scope.designateHome = function(){ 
           
                gameState.home = $scope.team; 
                $scope.homeName = gameState.home.label;
                $scope.hRuns = gameState.homeRuns;
                $scope.hHits = gameState.homeHits;
                $scope.hErrors = gameState.homeErrors;
            
            //need to get the roster array of objects {id, lable, number} from backend api--sending the backend the id of the team in question--home team here
                
                var getRosterReq = {
                method: 'GET',
                url: 'http://localhost:3000/api/keepscore/roster',
                params: {"id": gameState.home.id },
                }
        
                $http(getRosterReq).then
                    (function(response){$scope.roster = response.data[0].label;}, function(response){$scope.roster = "Error!";});
            
            
            
                gameState.home.bench = gameState.home.roster;
                $rootScope.$broadcast('getLineupAndBench');
     
            }
      
        
        $rootScope.$on('updateLineScore', function() {
                
                $scope.hRuns = gameState.homeRuns;
                $scope.hHits = gameState.homeHits;
                $scope.hErrors = gameState.homeErrors;
                $scope.vRuns = gameState.visitorsRuns;
                $scope.vHits = gameState.visitorsHits;
                $scope.vErrors = gameState.visitorsErrors;
            });
        
        
    
      }
    
        
    
    
    angular 
        .module('scorecardMod')
        .controller('scorecardCtrl', ['$rootScope', '$scope', 'teamRoster', 'gameState', 'Lineup',  '$http', ScorecardCtrl]);
})();