//This file probably can be deleted as scorecardBoxState is not used. Delete if after a while no problem arises.

(function() {
    
    angular 
        .module('scorecardMod')
        .value('scorecardBoxState', 
        // state will have value for closed, initial choice, at bat on base, at bat out, basepath advance, basepath out 
          "closed"    
            );
})();