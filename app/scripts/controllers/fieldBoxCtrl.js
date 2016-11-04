(function() {
    
    function FieldBoxCtrl($scope, scorecardBoxState, boxState, AtBatFactory) {
        
        $scope.atBatFactory = AtBatFactory;
        

        
        
        $scope.decideLittleBox = function(row,column) { 
            $scope.row = row;
            $scope.column = column;
            if (boxState.little[$scope.row][$scope.column] == 'on-base') {
                boxState.little[$scope.row][$scope.column] = 'runner'
            }
            
            $scope.littleBoxState = boxState.little[$scope.row][$scope.column];
            $scope.bigBoxState = boxState.big[$scope.row][$scope.column];
        }
        
        
        $scope.bigBoxOut = function(event){
            if ($scope.littleBoxState=='at-bat') {
                $scope.bigBoxState = 'at-bat-out';
            } else {
                $scope.bigBoxState = 'on-base-out';
            }
            boxState.big[$scope.row][$scope.column] = $scope.bigBoxState;
            
            $scope.atBatFactory.updateOut(event);
        }
        
        
        $scope.bigBoxOnBase = function(event){
            if ($scope.littleBoxState=='at-bat') {
                $scope.bigBoxState = 'at-bat-on-base';
            } else {
                $scope.bigBoxState = 'on-base-advance';
            }
            boxState.big[$scope.row][$scope.column] = $scope.bigBoxState;
            $scope.atBatFactory.updateBasePath(event);
        }
            
        $scope.exitToLittleBox = function(){
            if (($scope.bigBoxState == 'at-bat-on-base')|| ($scope.bigBoxState == 'on-base-advance')) {
                $scope.bigBoxState = null;
                boxState.big[$scope.row][$scope.column] = null;
                boxState.little[$scope.row][$scope.column] = 'on-base';
                $scope.littleBoxState = 'on-base';
                $scope.atBatBackground = 'green';
                event.stopPropagation();
            }
            if ($scope.bigBoxState == 'at-bat-out') {
                boxState.big[$scope.row][$scope.column] = 'initial';
                boxState.little[$scope.row][$scope.column] = 'out';
                $scope.atBatBackground = 'red';
            }
            if ($scope.bigBoxState == 'on-base-out') {
                boxState.big[$scope.row][$scope.column] = 'initial';
                boxState.little[$scope.row][$scope.column] = 'on-but-out';
                $scope.atBatBackground = 'yellow';
            }
            
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

