(function() {
    
    function FieldBoxCtrl($scope, scorecardBoxState, boxState, AtBatFactory) {
        
        $scope.atBatFactory = AtBatFactory;
        
        var resetAtBatFactory = function() {
            

            $scope.atBatFactory.First = null;
            $scope.atBatFactory.Second = null;
            $scope.atBatFactory.Third = null;
            $scope.atBatFactory.Home = null;

            $scope.atBatFactory.toFirst = false;
            $scope.atBatFactory.toSecond = false;
            $scope.atBatFactory.toThird = false;
            $scope.atBatFactory.toHome = false;
            $scope.atBatFactory.advFrmFirst = false;
            $scope.atBatFactory.advFrmSecond = false;
            $scope.atBatFactory.advFrmThird = false;


            $scope.atBatFactory.oneOut = null;
            $scope.atBatFactory.twoOut = null;
            $scope.atBatFactory.threeOut = null;
        };
             
        
        var updateLittleBox = function() {
            
            $scope.first = boxState.little[$scope.row][$scope.column].first;
            $scope.second = boxState.little[$scope.row][$scope.column].second;
            $scope.third = boxState.little[$scope.row][$scope.column].third;
            $scope.home = boxState.little[$scope.row][$scope.column].home;
            $scope.oneOut = boxState.little[$scope.row][$scope.column].oneOut;
            $scope.twoOut = boxState.little[$scope.row][$scope.column].twoOut;
            $scope.threeOut = boxState.little[$scope.row][$scope.column].threeOut;
            
        };
        
        var getLittleBoxStatus = function() {
            $scope.littleBoxObject = boxState.little[$scope.row][$scope.column];
        }
        
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
                    
        }
        
        
        
        var updateBoxState = function() {
            
            
            $scope.littleBoxObject.first = $scope.atBatFactory.First;
            $scope.littleBoxObject.second = $scope.atBatFactory.Second;
            $scope.littleBoxObject.third = $scope.atBatFactory.Third;
            $scope.littleBoxObject.home = $scope.atBatFactory.Home;
            $scope.littleBoxObject.oneOut = $scope.atBatFactory.oneOut;
            $scope.littleBoxObject.twoOut = $scope.atBatFactory.twoOut;
            $scope.littleBoxObject.threeOut = $scope.atBatFactory.threeOut;
            
            boxState.little[$scope.row][$scope.column] = $scope.littleBoxObject;
                       
            updateLittleBox();
            resetAtBatFactory();
        };
        
        

        
        
        $scope.decideLittleBox = function(row,column) { 
            
            $scope.row = row;
            $scope.column = column;
            getLittleBoxStatus();
            getAtBatFactoryStatus();
            
            
            if (($scope.littleBoxObject.status == 'first-base')||($scope.littleBoxObject.status == 'second-base') ||  ($scope.littleBoxObject.status == 'third-base')) {
                $scope.littleBoxState = 'runner';
                $scope.test = 'test';

            }
            if ($scope.littleBoxObject.status == 'initial') {
                $scope.littleBoxObject.status = 'at-bat';
                $scope.littleBoxState = $scope.littleBoxObject.status;
            }

            
            $scope.bigBoxState = 'initial';
            console.log("big: " + $scope.bigBoxState + " and little: " + $scope.littleBoxState);
        }
        
        
        $scope.bigBoxOut = function(event){
            if ($scope.littleBoxState=='at-bat') {
                $scope.bigBoxState = 'at-bat-out';
            } else {
                $scope.bigBoxState = 'on-base-out';
            }
            boxState.big[$scope.row][$scope.column] = $scope.bigBoxState;
            
            $scope.atBatFactory.updateOut(event, $scope.row, $scope.column);
            event.stopPropagation();
            event.preventDefault();
            
        }
        
        
        $scope.bigBoxOnBase = function(event){
            if ($scope.littleBoxState=='at-bat') {
                $scope.bigBoxState = 'at-bat-on-base';
            } else {
                $scope.bigBoxState = 'on-base-advance';
            }
            boxState.big[$scope.row][$scope.column] = $scope.bigBoxState;
            $scope.atBatFactory.updateBasePath(event, $scope.row, $scope.column);
            event.stopPropagation();
        }
            
        $scope.exitToLittleBox = function(){
            if (($scope.bigBoxState == 'at-bat-on-base')|| ($scope.bigBoxState == 'on-base-advance')) {
                boxState.big[$scope.row][$scope.column] = null;
                $scope.bigBoxState = null;
                
    
                event.stopPropagation();
            }
            if ($scope.bigBoxState == 'at-bat-out') {
                boxState.big[$scope.row][$scope.column] = null;
                $scope.bigBoxState = null;
                event.stopPropagation();
                
    
            }
            if ($scope.bigBoxState == 'on-base-out') {
                boxState.big[$scope.row][$scope.column] = null;
                $scope.bigBoxState = null;
                boxState.little[$scope.row][$scope.column].status = 'on-but-out';
                event.stopPropagation();
               
            }
            updateBoxState();
            $scope.showLittleBox = 'after';
            $scope.littleBoxState = 'on-base';
            
        }
        
        
        
        
        $scope.showBoxClosed = function() {
            
            scorecardBoxState = "closed";
            $scope.showScoreBox(scorecardBoxState);
            event.stopPropagation();
        }
        
        $scope.showBoxOut = function() {
            scorecardBoxState = "out";
            $scope.showScoreBox(scorecardBoxState);
            event.stopPropagation();
        }
        
        $scope.showBoxOnBase = function() {
            scorecardBoxState = 'on-base';
            $scope.showScoreBox(scorecardBoxState);
            event.stopPropagation();
        }
        
        $scope.exitToAtBatBox = function() {
            scorecardBoxState = 'closed';
            $scope.showScoreBox(scorecardBoxState);
            event.stopPropagation();
        }
        
        $scope.backToInitial = function() {
            scorecardBoxState = 'initial';
            $scope.showScoreBox(scorecardBoxState);
            event.stopPropagation();
        }
        
    }
    
    
    
    angular 
        .module('scorecardMod')
        .controller('fieldBoxCtrl', ['$scope', 'scorecardBoxState', 'boxState', 'AtBatFactory', FieldBoxCtrl]);
})();

