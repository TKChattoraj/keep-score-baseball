(function() {
    function AtBatFactory(basePathState, inningState, boxState) {
        

        
        AtBatFactory.background = "grey";

//        AtBatFactory.First = null;
//        AtBatFactory.Second = null;
//        AtBatFactory.Third = null;
//        AtBatFactory.Home = null;
//        
//        AtBatFactory.toFirst = false;
//        AtBatFactory.toSecond = false;
//        AtBatFactory.toThird = false;
//        AtBatFactory.toHome = false;
//        AtBatFactory.advFrmFirst = false;
//        AtBatFactory.advFrmSecond = false;
//        AtBatFactory.advFrmThird = false;
//           
//        
//        AtBatFactory.oneOut = null;
//        AtBatFactory.twoOut = null;
//        AtBatFactory.threeOut = null;
        
        AtBatFactory.updateBasePath = function(e, row, column) {
            console.log("into updateBasePath")
            basePathState.PreviousBase = boxState.little[row][column].status;
            console.log('previous base: ' + basePathState.PreviousBase);
            basePathState.Base = e.target.className;
            console.log('base: ' + basePathState.Base);
            
            if (basePathState.PreviousBase === 'at-bat') {
                
                switch (basePathState.Base) {
                    case 'first-base':
                        AtBatFactory.First = 'to-first';
                        console.log("AtBatFactory.First: " + AtBatFactory.First);
                        boxState.little[row][column].status = 'first-base';
                        break;
                    case 'second-base':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        boxState.little[row][column].status = 'second-base';
                        break;
                    case 'third-base':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        AtBatFactory.Third = 'to-third';
                        boxState.little[row][column].status = 'third-base';
                        break;
                    case 'home-plate':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        AtBatFactory.Third = 'to-third';
                        AtBatFactory.Home = 'to-home';
                        //AtBatFactory.background = 'blue';
                        boxState.little[row][column].status = 'score';
                } 
            }
                
             if (basePathState.PreviousBase === 'first-base')  {

                    switch (basePathState.Base) {
                        case 'second-base': 
                            AtBatFactory.Second = 'advance-from-first';
                            boxState.little[row][column].status = 'second-base';
                            break;
                        case 'third-base':
                            AtBatFactory.Second = 'advance-from-first';
                            AtBatFactory.Third = 'to-third';
                            boxState.little[row][column].status = 'third-base';
                            break;
                        case 'home-plate':
                            AtBatFactory.Second = 'advance-from-first';
                            AtBatFactory.Third = 'to-third';
                            AtBatFactory.Home = 'to-home';
                            AtBatFactory.background = 'blue';
                            boxState.little[row][column].status = 'score';
                            break;
                    }
             }
            
            if (basePathState.PreviousBase === 'second-base') {

                    switch (basePathState.Base) {
                        case 'third-base':
                            AtBatFactory.Third = 'advance-from-second';
                            boxState.little[row][column].status = 'third-base';
                            break;
                        case 'home-plate':
                            AtBatFactory.Third = 'advance-from-second';
                            AtBatFactory.Home = 'to-home';
                            AtBatFactory.background = 'blue';
                            boxState.little[row][column].status = 'score';
                            break;
                    }
            }
            if (basePathState.PreviousBase === 'third-base') {
                    switch (basePathState.Base) {
                        case 'home-plate':
                            AtBatFactory.Home = 'advance-from-third';
                            AtBatFactory.background = 'blue';
                            boxState.little[row][column].status = 'score';
                            break;
                    }
                }
        }
        
        
        AtBatFactory.getOuts = function() {
            alert('in atBatFactory getOuts')
            alert('inningState.outs ' + inningState.outs);
            if (inningState.outs === 0) {
                AtBatFactory.oneOut = null;
                AtBatFactory.twoOut = null;
                AtBatFactory.threeOut = null;
            }
            if (inningState.outs >= 1) {
                AtBatFactory.oneOut = 'black';
            }
            if (inningState.outs >= 2) {
                AtBatFactory.twoOut = 'black';
            }
            if (inningState.outs == 3) {
                AtBatFactory.threeOut = 'black';
            }
        }
        
        AtBatFactory.updateOut = function(e, row, column) {
            if (e.target.id === 'one') {
                AtBatFactory.oneOut = 'black';
                
                console.log(inningState.outs);
            }
            else if (e.target.id === 'two') {
                AtBatFactory.oneOut = 'black';
                AtBatFactory.twoOut = 'black';
                
                console.log(inningState.outs);
            }
            else {
                AtBatFactory.oneOut = 'black';
                AtBatFactory.twoOut = 'black';
                AtBatFactory.threeOut = 'black';
                
                console.log(inningState.outs);
            }
            inningState.outs++;
            boxState.little[row][column].status = 'out';
            
            
        }
        
        return AtBatFactory;

    }
    
    angular 
        .module('scorecardMod')
        .factory('AtBatFactory', ['basePathState', 'inningState', 'boxState', AtBatFactory]);
    
})();