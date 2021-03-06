(function() {
    function AtBatFactory(basePathState, inningState, boxState, gameState) {
     
        AtBatFactory.background = "aliceblue";

        
        AtBatFactory.updateBasePath = function(e, $scope) {
            //basePathState.PreviousBase = $scope.littleBoxState;
            
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

                            $scope.littleBoxState = 'score';
                            break;
                    }
            }
            if (basePathState.PreviousBase === 'third-base') {
                    switch (basePathState.Base) {
                        case 'home-plate':
                            AtBatFactory.Home = 'advance-from-third';
                            $scope.littleBoxState = 'score';
                            break;
                    }
                }
        }
        
        
        AtBatFactory.getOuts = function() {
        
            if (gameState.currentTeam == 'home') {
                AtBatFactory.oneOut = inningState.homeOutsArray[0];
                AtBatFactory.twoOut = inningState.homeOutsArray[1];
                AtBatFactory.threeOut = inningState.homeOutsArray[2];
            }
            if (gameState.currentTeam == 'visotrs') {
                AtBatFactory.oneOut = inningState.visitorsOutsArray[0];
                AtBatFactory.twoOut = inningState.vistorsOutsArray[1];
                AtBatFactory.threeOut = inningState.visitorsOutsArray[2];
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
            else if (e.target.id === 'three'){
                AtBatFactory.oneOut = 'black';
                AtBatFactory.twoOut = 'black';
                AtBatFactory.threeOut = 'black';          
            }
            inningState.outs++;
            
            if (gameState.currentTeam == 'home') {
                inningState.homeOutsArray = [AtBatFactory.oneOut, AtBatFactory.twoOut, AtBatFactory.threeOut];
            }
            if (gameState.currentTeam == 'visotrs') {
                inningState.vistorsOutsArray = [AtBatFactory.oneOut, AtBatFactory.twoOut, AtBatFactory.threeOut];
            }
               
            $scope.littleBoxState = $scope.bigBoxState;
           
        }
        
        return AtBatFactory;

    }
    
    angular 
        .module('scorecardMod')
        .factory('AtBatFactory', ['basePathState', 'inningState', 'boxState', 'gameState', AtBatFactory]);
    
})();