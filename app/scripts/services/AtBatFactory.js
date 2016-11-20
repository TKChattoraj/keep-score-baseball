(function() {
    function AtBatFactory(basePathState, inningState, boxState) {
     
        AtBatFactory.background = "grey";

        
        AtBatFactory.updateBasePath = function(e, $scope) {
            basePathState.PreviousBase = $scope.littleBoxState;
            
            basePathState.Base = e.target.className;
            
            if (basePathState.PreviousBase === 'at-bat') {
                
                switch (basePathState.Base) {
                    case 'first-base':
                        AtBatFactory.First = 'to-first';
                        $scope.littleBoxState = 'first-base';
                        break;
                    case 'second-base':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        $scope.littleBoxState = 'second-base';
                        break;
                    case 'third-base':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        AtBatFactory.Third = 'to-third';
                        $scope.littleBoxState = 'third-base';
                        break;
                    case 'home-plate':
                        AtBatFactory.First = 'to-first'; 
                        AtBatFactory.Second = 'to-second';
                        AtBatFactory.Third = 'to-third';
                        AtBatFactory.Home = 'to-home';
                        AtBatFactory.background = 'blue';
                        $scope.littleBoxState = 'score';
                } 
            }
                
             if (basePathState.PreviousBase === 'first-base')  {

                    switch (basePathState.Base) {
                        case 'second-base': 
                            AtBatFactory.Second = 'advance-from-first';
                            $scope.littleBoxState = 'second-base';
                            break;
                        case 'third-base':
                            AtBatFactory.Second = 'advance-from-first';
                            AtBatFactory.Third = 'to-third';
                            $scope.littleBoxState = 'third-base';
                            break;
                        case 'home-plate':
                            AtBatFactory.Second = 'advance-from-first';
                            AtBatFactory.Third = 'to-third';
                            AtBatFactory.Home = 'to-home';
                            AtBatFactory.background = 'blue';
                            $scope.littleBoxState = 'score';
                            break;
                    }
             }
            
            if (basePathState.PreviousBase === 'second-base') {

                    switch (basePathState.Base) {
                        case 'third-base':
                            AtBatFactory.Third = 'advance-from-second';
                            $scope.littleBoxState = 'third-base';
                            break;
                        case 'home-plate':
                            AtBatFactory.Third = 'advance-from-second';
                            AtBatFactory.Home = 'to-home';
                            AtBatFactory.background = 'blue';
                            $scope.littleBoxState = 'score';
                            break;
                    }
            }
            if (basePathState.PreviousBase === 'third-base') {
                    switch (basePathState.Base) {
                        case 'home-plate':
                            AtBatFactory.Home = 'advance-from-third';
                            AtBatFactory.background = 'blue';
                            $scope.littleBoxState = 'score';
                            break;
                    }
                }
        }
        
        
        AtBatFactory.getOuts = function() {
        
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
        
        AtBatFactory.updateOut = function(e, $scope) {
            if (e.target.id === 'one') {
                AtBatFactory.oneOut = 'black';
                
            }
            else if (e.target.id === 'two') {
                AtBatFactory.oneOut = 'black';
                AtBatFactory.twoOut = 'black';
            }
            else {
                AtBatFactory.oneOut = 'black';
                AtBatFactory.twoOut = 'black';
                AtBatFactory.threeOut = 'black';
                
            }
            inningState.outs++;
            $scope.littleBoxState = $scope.bigBoxState;
           
        }
        
        return AtBatFactory;

    }
    
    angular 
        .module('scorecardMod')
        .factory('AtBatFactory', ['basePathState', 'inningState', 'boxState', AtBatFactory]);
    
})();