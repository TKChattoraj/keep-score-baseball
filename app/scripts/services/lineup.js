(function() {
    function Lineup(teamRoster, gameState) {
        Lineup.lineup = [];
        
        var reconcile = function(player) {
            for (var i=0; i<Lineup.lineup.length; i++) {
              if (player.id === Lineup.lineup[i].id) {
                    
                    return false;
              }
            }
            return true;
        };

        
        Lineup.adjust = function(player, orderNum) {
            
            if (gameState.currentTeam == 'home') {
               gameState.home.lineup[orderNum] = player;
               Lineup.lineup = gameState.home.lineup;
               gameState.home.bench = gameState.home.roster.filter(reconcile); 
                
            }
            if (gameState.currentTeam == 'visitors') {
               gameState.visitors.lineup[orderNum] = player;
               Lineup.lineup = gameState.visitors.lineup;
               gameState.visitors.bench = gameState.visitors.roster.filter(reconcile); 
                
            }

        }
        
        return Lineup;

    }
    
    angular 
        .module('scorecardMod')
        .factory('Lineup', ['teamRoster', 'gameState', Lineup]);
    
})();