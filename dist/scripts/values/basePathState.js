//This file probably can be deleted as basePathState is in states.js now.  Delete if after a while no problem arises.

(function() {
    
    angular 
        .module('scorecardMod')
        .value('basePathState', {
          "Base": 'at bat',
          "PreviousBase": 'at bat',
            });
})();