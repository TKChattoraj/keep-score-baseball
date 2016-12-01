(function() {
    function Lineup(teamRoster, gameState) {

        
//// This hack is here just to get a team to show up in the ng-multiselect
////  Need to figure out how to set the Lineup.team and Lineup.bench to the home
////  and away teams as appropriate
//        
//        
//        var result = teamRoster.filter(function(team) {
//                return team.label == "Reds";
//            
//        });
//        console.log("var result: " + result[0].label);
//        
//        Lineup.team = result[0].roster;
//        Lineup.bench = result[0].roster;


        
        
//  End of the lineup hack 
    
        
        
      console.log("Lineup.team: " + Lineup.team);
        
        
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
            
//            Lineup.lineup[orderNum] = player;
//            Lineup.bench = Lineup.team.filter(reconcile);
            
        }
        
        return Lineup;

    }
    
    angular 
        .module('scorecardMod')
        .factory('Lineup', ['teamRoster', 'gameState', Lineup]);
    
})();