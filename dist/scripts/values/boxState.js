(function() {
    
    angular 
        .module('scorecardMod')
        .value('boxState', 
        // state will have value for little box:  at-bat, on-base and big box:  initial, on-base and out.   
          {'little': [
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat'],
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat'],
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat'],
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat'],
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat'],
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat'],
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat'],
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat'],
              ['at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat', 'at-bat']            
          ],

           'big': [
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial'],
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial'],
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial'],
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial'],
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial'],
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial'],
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial'],
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial'],
              ['initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial', 'initial']            
          ]
        
        }
            );
})();