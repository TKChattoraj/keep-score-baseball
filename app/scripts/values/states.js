(function() {
    
    angular 
        .module('scorecardMod')
        .value('inningState', {
          "outs": 0,
          "hits": 0,
          "runs": 0,
          'visitorsOutsArray': [null, null, null],
          'homeOutsArray': [null, null, null]
    });
})();


(function() {
    angular
        .module('scorecardMod')
        .value('gameState', {
            "home": "",
            "visitors": "",
            "homeRuns": 0,
            "homeHits": 0,
            "homeErrors": 0,
            "visitorsRuns": 0,
            "visitorsHits": 0,
            "visitorsErrors": 0,
            "currentTeam": null        
    });
})();


(function() {
    
    angular 
        .module('scorecardMod')
        .value('basePathState', {
          "Base": 'at-bat',
          "PreviousBase": 'at-bat',
            });
})();

