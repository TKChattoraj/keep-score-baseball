(function() {
    
    function FieldBoxCtrl($scope, scorecardBoxState, boxState, inningState, AtBatFactory, basePathState) {
        
        $scope.atBatFactory = AtBatFactory;

        
        var updateLittleBox = function() {
            
            $scope.first = boxState.little[$scope.row][$scope.column].first;
            $scope.second = boxState.little[$scope.row][$scope.column].second;
            $scope.third = boxState.little[$scope.row][$scope.column].third;
            $scope.home = boxState.little[$scope.row][$scope.column].home;
            
            $scope.oneOut = boxState.little[$scope.row][$scope.column].oneOut;
            $scope.twoOut = boxState.little[$scope.row][$scope.column].twoOut;
            $scope.threeOut = boxState.little[$scope.row][$scope.column].threeOut;
            $scope.fieldBackground = boxState.little[$scope.row][$scope.column].fieldBackground;
            
            if (boxState.little[$scope.row][$scope.column].status == 'at-bat-out' || boxState.little[$scope.row][$scope.column].status == 'on-base-out') {      
                $scope.center = 'true';
            }
            
            if (boxState.little[$scope.row][$scope.column].status == 'at-bat-out' || boxState.little[$scope.row][$scope.column].status == 'on-base-out') {      
                $scope.center = 'true';
            }
          
        };
        
        var getLittleBoxStatus = function() {
            $scope.littleBoxObject = boxState.little[$scope.row][$scope.column];
        };
        
        var getAtBatFactoryStatus = function() {
            
            $scope.atBatFactory.First = $scope.littleBoxObject.first;
            $scope.atBatFactory.Second = $scope.littleBoxObject.second;
            $scope.atBatFactory.Third = $scope.littleBoxObject.third; 
            $scope.atBatFactory.Home = $scope.littleBoxObject.home;
            
            $scope.atBatFactory.toFirst = $scope.littleBoxObject.toFirst;
            $scope.atBatFactory.toSecond = $scope.littleBoxObject.toSecond;
            $scope.atBatFactory.toThird = $scope.littleBoxObject.toThird;
            $scope.atBatFactory.toHome = $scope.littleBoxObject.toHome;
            
            $scope.atBatFactory.advFrmFirst = $scope.littleBoxObject.advFrmFirst;
            $scope.atBatFactory.advFrmSecond = $scope.littleBoxObject.advFrmSecond;
            $scope.atBatFactory.advFrmThird = $scope.littleBoxObject.advFrmThird;
            
            $scope.atBatFactory.oneOut = $scope.littleBoxObject.oneOut;
            $scope.atBatFactory.twoOut = $scope.littleBoxObject.twoOut;
            $scope.atBatFactory.threeOut = $scope.littleBoxObject.threeOut; 
            $scope.atBatFactory.background = $scope.littleBoxObject.fieldBackground;
                    
        };
        
            
        var updateBoxState = function() {
            
            
            $scope.littleBoxObject.first = $scope.atBatFactory.First;
            $scope.littleBoxObject.second = $scope.atBatFactory.Second;
            $scope.littleBoxObject.third = $scope.atBatFactory.Third;
            $scope.littleBoxObject.home = $scope.atBatFactory.Home;
            $scope.littleBoxObject.fieldBackground = $scope.atBatFactory.background;
            
            
            if ($scope.bigBoxState == 'at-bat-out' || $scope.bigBoxState == 'on-base-out') {
                
                $scope.littleBoxObject.oneOut = $scope.atBatFactory.oneOut;
                $scope.littleBoxObject.twoOut = $scope.atBatFactory.twoOut;
                $scope.littleBoxObject.threeOut = $scope.atBatFactory.threeOut;  
            } else {

                $scope.littleBoxObject.oneOut = null;
                $scope.littleBoxObject.twoOut = null;
                $scope.littleBoxObject.threeOut = null;
            }
            
            
            $scope.littleBoxObject.status = $scope.littleBoxState;
            boxState.little[$scope.row][$scope.column] = $scope.littleBoxObject;
                       
            updateLittleBox();
        };
                
        
        $scope.decideLittleBox = function(row,column) { 
            
            $scope.row = row;
            $scope.column = column;
            getLittleBoxStatus();
            getAtBatFactoryStatus();
            
            
            if (($scope.littleBoxObject.status == 'first-base')||($scope.littleBoxObject.status == 'second-base') ||  ($scope.littleBoxObject.status == 'third-base')) {
                $scope.onBase = true;
                
            }
            if ($scope.littleBoxObject.status == 'initial') {
                $scope.littleBoxObject.status = 'at-bat';
                
            }

            $scope.littleBoxState = $scope.littleBoxObject.status;
            $scope.bigBoxState = 'initial';
            $scope.atBatFactory.getOuts();

        }
        
        
        $scope.putOut = function(event){
            var target = event.currentTarget.innerHTML;
            $scope.putOutArray.push(target);
            $scope.centerString = $scope.putOutArray.join('-');
            
            
            if (target == 'K' || target =='BK') {
                $scope.exitToLittleBox();
            }
            var fielder = event.currentTarget.innerHTML;                  
            switch(target) {
                case '1':
                    $scope.pitcherBackground = 'red';
                    break;
                case '2':
                    $scope.catcherBackground = 'red';
                    break;
                case '3':
                    $scope.firstBackground = 'red';
                    break;
                case '4':
                    $scope.secondBackground = 'red';
                    break;
                case '5':
                    $scope.thirdBackground = 'red';
                    break;
                case '6':
                    $scope.shortBackground = 'red';
                    break;
                case '7':
                    $scope.leftBackground = 'red';
                    break;
                case '8':
                    $scope.centerBackground = 'red';
                    break;
                case '9':
                    $scope.rightBackground = 'red';
                    break;
                    
            }
            event.stopPropagation();
        }
        
        $scope.set_background_color = function() {
            return {"background-color": $scope.positionBackground};
        };
        
        
        $scope.onBase = function() {
            var target = event.currentTarget.innerHTML;
            $scope.onBaseArray.push(target);
            $scope.onBaseString = $scope.onBaseArray.join('-');
            
            $scope.topRight = 'true';
            
            if ((basePathState.Base == 'home-plate') && (basePathState.PreviousBase == 'at-bat')) {
                $scope.center = 'true';
                $scope.centerString = 'HR';      
            }
                          
            if (target != 'E') {
                $scope.exitToLittleBox();
            }
            
            event.stopPropagation();
            
        }
        
        
        $scope.advBase = function() {
            var target = event.currentTarget.innerHTML;
            $scope.advBaseArray.push(target);
            $scope.advBaseString = $scope.advBaseArray.join('-');
            
            $scope.topLeft= 'true';
            if ((target == 'SB') || (target == 'WP') || (target == 'PB') || (target == 'Balk')) {
                $scope.exitToLittleBox();
            }
            
            event.stopPropagation();
            
        }
        
       
        
        
        
        $scope.bigBoxOut = function(event){
            if ($scope.littleBoxState=='at-bat') {
                $scope.bigBoxState = 'at-bat-out';
            } else {
                $scope.bigBoxState = 'on-base-out';
            }
            boxState.big[$scope.row][$scope.column] = $scope.bigBoxState;
            
            $scope.atBatFactory.updateOut(event, $scope);
            $scope.putOutArray = [];
            
            
            $scope.pitcherBackground = 'white';        
            $scope.catcherBackground = 'white';       
            $scope.firstBackground = 'white';      
            $scope.secondBackground = 'white';        
            $scope.thirdBackground = 'white';      
            $scope.shortBackground = 'white';       
            $scope.leftBackground = 'white';      
            $scope.centerBackground = 'white';       
            $scope.rightBackground = 'white';

            event.stopPropagation();
            event.preventDefault();
            
        }
        
        
        $scope.bigBoxOnBase = function(event){
            if ($scope.littleBoxState=='at-bat') {
                $scope.bigBoxState = 'at-bat-on-base';
                $scope.onBaseArray = [];
            } else {
                $scope.bigBoxState = 'on-base-advance';
                $scope.advBaseArray =[];
            }
            boxState.big[$scope.row][$scope.column] = $scope.bigBoxState;
            $scope.atBatFactory.updateBasePath(event, $scope);
            event.stopPropagation();
        }
            
        $scope.exitToLittleBox = function(){
            if (($scope.bigBoxState == 'at-bat-on-base')|| ($scope.bigBoxState == 'on-base-advance')) {
                boxState.big[$scope.row][$scope.column] = null;  
                event.stopPropagation();
            }
            if ($scope.bigBoxState == 'at-bat-out') {
                boxState.big[$scope.row][$scope.column] = null;
                $scope.littleBoxState = 'at-bat-out';
                event.stopPropagation();
                
    
            }
            if ($scope.bigBoxState == 'on-base-out') {
                boxState.big[$scope.row][$scope.column] = null;
                $scope.littleBoxState = 'on-base-out';
                event.stopPropagation();
               
            }
            updateBoxState();
            $scope.bigBoxState = null;
            $scope.showLittleBox = 'after';
            if (inningState.outs === 3) {
                inningState.outs=0;
            }
            
        }
        
    }
    
    
    
    angular 
        .module('scorecardMod')
        .controller('fieldBoxCtrl', ['$scope', 'scorecardBoxState', 'boxState', 'inningState', 'AtBatFactory', 'basePathState', FieldBoxCtrl]);
})();

