(function() {
    
    angular 
        .module('scorecardMod')
        .value('inningState', {
          "outs": 0,
          "hits": 0,
          "runs": 0,
            });
})();


(function() {
    angular
        .module('scorecardMod')
        .value('gameState', {
            "home": "",
            "visitor": "",
            "homeRuns": 0,
            "homeHits": 0,
            "homeErrors": 0,
            "visitorRuns": 0,
            "visitorHits": 0,
            "visitorErrors": 0,
        
    });
})();





(function() {
    
    angular 
        .module('scorecardMod')
        .value('basePathState', {
          "Base": 'at bat',
          "PreviousBase": 'at bat',
            });
})();

(function() {
    
    angular 
        .module('scorecardMod')
        .value('teamRoster', {
          "reds": [
              {id: 1, label: "Rose", number: 14}, 
              {id: 2, label: "Griffey", number: 30}, 
              {id: 3, label: "Morgan", number: 8}, 
              {id: 4, label: "Perez", number: 24}, 
              {id: 5, label: "Bench", number: 5}, 
              {id: 6, label: "Foster", number: 15}, 
              {id: 7, label: "Geronimo", number: 20}, 
              {id: 8, label: "Concepcion", number: 13}, 
              {id: 9, label: "Gullet", number: 35},
              {id: 10, label: "Chattoraj", number:13}]    
            });
})();
