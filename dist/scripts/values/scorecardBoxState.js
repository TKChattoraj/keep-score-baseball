(function() {
    
    angular 
        .module('scorecardMod')
        .value('scorecardBoxState', 
        // state will have value for closed, initial choice, at bat on base, at bat out, basepath advance, basepath out 
          "closed"    
            );
})();