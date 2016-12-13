(function() {
    
    function FieldBoxCtrl($scope, boxState, inningState, AtBatFactory, basePathState, gameState) {
        
        $scope.atBatFactory = AtBatFactory;

        
        var updateLittleBox = function() {
            
            $scope.first = $scope.littleBoxObject.first;
            $scope.second = $scope.littleBoxObject.second;
            $scope.third = $scope.littleBoxObject.third;
            $scope.home = $scope.littleBoxObject.home;
            
            $scope.oneOut = $scope.littleBoxObject.oneOut;
            $scope.twoOut = $scope.littleBoxObject.twoOut;
            $scope.threeOut = $scope.littleBoxObject.threeOut;
            $scope.fieldBackground = $scope.littleBoxObject.fieldBackground;
            
            if ($scope.littleBoxObject.status == 'at-bat-out' || $scope.littleBoxObject.status == 'on-base-out') {      
                $scope.center = 'true';
            }
            
            if ($scope.littleBoxObject.status == 'at-bat-out' || $scope.littleBoxObject.status == 'on-base-out') {      
                $scope.center = 'true';
            }
            
        };
        
        var getLittleBoxObject = function() {
            
            //need logic here to pull from either home or visitor's little box 
            if (gameState.currentTeam == 'home') {
                $scope.littleBoxObject = boxState.littleHome[$scope.row][$scope.column];
            }
            if (gameState.currentTeam == 'visitors') {
                $scope.littleBoxObject = boxState.littleVisitors[$scope.row][$scope.column];
            }
            //
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
            
            //AtBatFactory.getOuts;
            
            $scope.atBatFactory.oneOut = $scope.littleBoxObject.oneOut;
            $scope.atBatFactory.twoOut = $scope.littleBoxObject.twoOut;
            $scope.atBatFactory.threeOut = $scope.littleBoxObject.threeOut; 
            
            
            
            
            $scope.atBatFactory.background = $scope.littleBoxObject.fieldBackground;
                    
        };
        
            
        var updateLittleBoxObject = function() {
                   
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
            updateLittleBox();
            
            //  need logic here to chose between home/visitor's little box
            
            if (gameState.currentTeam == 'home') {
                boxState.littleHome[$scope.row][$scope.column] = $scope.littleBoxObject;
            }
            if (gameState.currentTeam == 'visitors') {
                boxState.littleVisitors[$scope.row][$scope.column] = $scope.littleBoxObject;
            }
             
        };
        
        var generateStatsObject = function() {
            if ($scope.littleBoxObject.status == 'initial') {
                
                if (gameState.currentTeam == 'visitors') {
                    boxState.visitorsRawStats[$scope.row][$scope.column] = {ab: 0, pa: 0, single: 0, double: 0, triple: 0, hr: 0, bb: 0, e: 0, wp: 0, pb: 0, fc: 0, rbi: 0, sb: 0, r: 0, er: 0, sac: 0, k: 0, playerID: '', teamID: ''}; 
                    console.log("AB: " + boxState.visitorsRawStats[$scope.row][$scope.column].ab);
                }
                if (gameState.currentTeam == 'home') {
                    boxState.homeRawStats[$scope.row][$scope.column] = {ab: 0, pa: 0, single: 0, double: 0, triple: 0, hr: 0, bb: 0, e: 0, wp: 0, pb: 0, fc: 0, rbi: 0, sb: 0, r: 0, er: 0, sac: 0, k: 0, playerID: '', teamID: ''};
                    console.log("AB: " + boxState.homeRawStats[$scope.row][$scope.column].ab);
                    
                }
            }
        };
                
        
        $scope.decideLittleBox = function(row,column) { 
            
            $scope.row = row;
            $scope.column = column;
            getLittleBoxObject();
            $scope.rawStats = {ab: 0, pa: 0, single: 0, double: 0, triple: 0, hr: 0, bb: 0, e: 0, wp: 0, pb: 0, fc: 0, rbi: 0, sb: 0, r: 0, er: 0, sac: 0, k: 0, playerID: '', teamID: ''}; 
            generateStatsObject();
            getAtBatFactoryStatus();
            
            
            if (($scope.littleBoxObject.status == 'first-base')||($scope.littleBoxObject.status == 'second-base') ||  ($scope.littleBoxObject.status == 'third-base')) {
                $scope.onBase = true;
                
            }
            if ($scope.littleBoxObject.status == 'initial') {
                $scope.littleBoxObject.status = 'at-bat';
                
            }

            $scope.littleBoxState = $scope.littleBoxObject.status;
            $scope.bigBoxState = 'initial';


        }
        
        
        $scope.putOut = function(event){
            var target = event.currentTarget.innerHTML;
            $scope.putOutArray.push(target);
            $scope.centerString = $scope.putOutArray.join('-');
            
            // \u is Javascript escape for unicode and A4D8 is the hexidecimal code for the backwards k
            if (target == 'K' || target == '\uA4D8') {
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
        
        var updateRawStatsObject = function(target) {
            alert ('logging a rawStat');
            if (basePathState.PreviousBase == 'at-bat') {
                alert('into rawStat previousState at-bat');
                if ($scope.previousTarget = 'E') {
                    $scope.rawStats.e = 1;
                } else if (target == 'K') {
                    $scope.rawStats.k = 1;
                } else if ( target == 'BB') {
                    $scope.rawStats.bb = 1;
                } else if (target == 'FC') {
                    $scope.rawStats.fc = 1;
                } else if (target == 'HB') {
                    $scope.rawStats.hb = 1;
                } else {
                    alert('starting the switch');
                    switch ($scope.littleBoxState) {
                        case 'first-base':
                            $scope.rawStats.single = 1;
                            alert('logging a rawStat single');
                            break;
                        case 'second-base':
                            $scope.rawStats.double = 1;
                            break;
                        case 'third-base':
                            $scope.rawStats.triple = 1;
                            break;
                        case 'score':
                            $scope.center = 'true';
                            $scope.centerString = 'HR';  
                            $scope.rawStats.hr = 1;
                            $scope.rawStats.r = 1;
                            break;
                    }
                    
                }
                
                    alert('starting the switch');
                    switch ($scope.littleBoxState) {
                        case 'first-base':
                            $scope.rawStats.single = 1;
                            alert('logging a rawStat single');
                            break;
                        case 'second-base':
                            $scope.rawStats.double = 1;
                            break;
                        case 'third-base':
                            $scope.rawStats.triple = 1;
                            break;
                        case 'score':
                            $scope.center = 'true';
                            $scope.centerString = 'HR';  
                            $scope.rawStats.hr = 1;
                            $scope.rawStats.r = 1;
                            break;
                    }
                

                if (target != 'BB') {
                    $scope.rawStats.ab = 1;
                }

                $scope.rawStats.pa = 1;

            }
            console.log($scope.rawStats.pa, $scope.rawStats.ab, $scope.rawStats.single, $scope.rawStats.double, $scope.rawStats.triple, $scope.rawStats.hr, $scope.rawStats.r);
            
        };
        
        
        $scope.onBase = function() {
            var target = event.currentTarget.innerHTML;
            $scope.onBaseArray.push(target);
            $scope.onBaseString = $scope.onBaseArray.join('-');
            
            $scope.topRight = 'true';
            
//            if ((basePathState.Base == 'home-plate') && (basePathState.PreviousBase == 'at-bat')) {
//                $scope.center = 'true';
//                $scope.centerString = 'HR';      
//            }
                          
            if (target != 'E'){
                updateRawStatsObject(target);
                $scope.exitToLittleBox();
            } else {
                $scope.previousTarget = 'E';
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
            updateLittleBoxObject();
            $scope.bigBoxState = null;
            $scope.showLittleBox = 'after';
            if (inningState.outs === 3) {
                inningState.outs=0;
            }
            
        }
        
    }
    
    
    
    angular 
        .module('scorecardMod')
        .controller('fieldBoxCtrl', ['$scope', 'boxState', 'inningState', 'AtBatFactory', 'basePathState', 'gameState', FieldBoxCtrl]);
})();

