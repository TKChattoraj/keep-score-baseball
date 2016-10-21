(function() {
    function Lineup(teamRoster) {

        Lineup.team = teamRoster.reds;
        Lineup.bench = teamRoster.reds; 
        Lineup.lineup = [];
        
        var reconcile = function(player) {
            for (var i=0; Lineup.lineup.length; i++) {
              if (player.id === Lineup.lineup[i].id) {
                    alert(player.id + " and " + Lineup.lineup[i].id);
                    return false;
              } else {
                    return true;
              }
            }
        };

        
        Lineup.adjust = function(player, orderNum) {
            
            Lineup.lineup[orderNum] = player;
            Lineup.bench = Lineup.team.filter(reconcile);
            alert("adjust bench.length " + Lineup.bench.length);
        }
        
        return Lineup;

    }
    
    angular 
        .module('scorecardMod')
        .factory('Lineup', ['teamRoster', Lineup]);
    
})();