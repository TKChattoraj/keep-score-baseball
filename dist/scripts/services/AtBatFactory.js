(function() {
    function AtBatFactory(basePathState, inningState) {
        

        
        AtBatFactory.background = "grey";

        AtBatFactory.First = null;
        AtBatFactory.Second = null;
        AtBatFactory.Third = null;
        AtBatFactory.Home = null;
        
        AtBatFactory.toFirst = false;
        AtBatFactory.toSecond = false;
        AtBatFactory.toThird = false;
        AtBatFactory.toHome = false;
        AtBatFactory.advFrmFirst = false;
        AtBatFactory.advFrmSecond = false;
        AtBatFactory.advFrmThird = false;
           
        
        AtBatFactory.oneOut = null;
        AtBatFactory.twoOut = null;
        AtBatFactory.threeOut = null;
        
        AtBatFactory.updateBasePath = function(e) {
            console.log("into updateBasePath")
            basePathState.PreviousBase = basePathState.Base;
            basePathState.Base = e.target.className;
            
            if (basePathState.PreviousBase === 'at bat') {
                
                switch (basePathState.Base) {
                    case 'first-base':
                        AtBatFactory.First = 'to-first';
                        break;
                    case 'second-base':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        break;
                    case 'third-base':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        AtBatFactory.Third = 'to-third';
                        break;
                    case 'home-plate':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        AtBatFactory.Third = 'to-third';
                        AtBatFactory.Home = 'to-home';
                        AtBatFactory.background = 'blue';
                } 
            }
                
             if (basePathState.PreviousBase === 'first-base')  {

                    switch (basePathState.Base) {
                        case 'second-base': 
                            AtBatFactory.Second = 'advance-from-first';

                            break;
                        case 'third-base':
                            AtBatFactory.Second = 'advance-from-first';
                            AtBatFactory.Third = 'to-third';
                            break;
                        case 'home-plate':
                            AtBatFactory.Second = 'advance-from-first';
                            AtBatFactory.Third = 'to-third';
                            AtBatFactory.Home = 'to-home';
                            AtBatFactory.background = 'blue';
                            break;
                    }
             }
            
            if (basePathState.PreviousBase === 'second-base') {

                    switch (basePathState.Base) {
                        case 'third-base':
                            AtBatFactory.Third = 'advance-from-second';
                            break;
                        case 'home-plate':
                            AtBatFactory.Third = 'advance-from-second';
                            AtBatFactory.Home = 'to-home';
                            AtBatFactory.background = 'blue';
                            break;
                    }
            }
            if (basePathState.PreviousBase === 'third-base') {
                    switch (basePathState.Base) {
                        case 'home-plate':
                            AtBatFactory.Home = 'advance-from-third';
                            AtBatFactory.background = 'blue';
                            break;
                    }
                }
        }
        
        AtBatFactory.updateOut = function(e) {
            if (e.target.id === 'one') {
                AtBatFactory.oneOut = 'black';
                inningState.outs = 1;
                console.log(inningState.outs);
            }
            else if (e.target.id === 'two') {
                AtBatFactory.oneOut = 'black';
                AtBatFactory.twoOut = 'black';
                inningState.outs = 2;
                console.log(inningState.outs);
            }
            else {
                AtBatFactory.oneOut = 'black';
                AtBatFactory.twoOut = 'black';
                AtBatFactory.threeOut = 'black';
                inningState.outs = 3;
                console.log(inningState.outs);
            }
            
            
        }
        
        return AtBatFactory;

    }
    
    angular 
        .module('scorecardMod')
        .factory('AtBatFactory', ['basePathState', 'inningState', AtBatFactory]);
    
})();