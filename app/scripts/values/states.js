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
          "Base": 'at bat',
          "PreviousBase": 'at bat',
            });
})();


//(function() {
//    
//    angular 
//        .module('scorecardMod')
//        .value('teamRoster', [
//          {
//              id: 0,
//              label: "Reds",
//              roster: [
//              {id: 1, label: "Rose", number: 14}, 
//              {id: 2, label: "Griffey", number: 30}, 
//              {id: 3, label: "Morgan", number: 8}, 
//              {id: 4, label: "Perez", number: 24}, 
//              {id: 5, label: "Bench", number: 5}, 
//              {id: 6, label: "Foster", number: 15}, 
//              {id: 7, label: "Geronimo", number: 20}, 
//              {id: 8, label: "Concepcion", number: 13}, 
//              {id: 9, label: "Gullett", number: 35},
//              {id: 10, label: "Armbrister", number: 33}],
//              lineup: [],
//              bench: []
//          },
//        {
//              id: 1,
//              label: "Red Sox",
//              roster: [
//              {id: 1, label: "Carbo", number: 1},
//              {id: 2, label: "Doyle", number: 5},
//              {id: 3, label: "Yastrzemski", number: 8 },
//              {id: 4, label: "Fisk", number: 27},
//              {id: 5, label: "Lynn", number: 19},
//              {id: 6, label: "Petrocelli", number: 6},
//              {id: 7, label: "Evans", number: 24},
//              {id: 8, label: "Burleson", number: 7},
//              {id: 9, label: "Lee", number: 37},
//              {id: 10, label: "Cooper", number: 17}],
//              lineup: [],
//              bench: []
//        }
//        
//            ]);
//})();
//
//
//
//
//
//
