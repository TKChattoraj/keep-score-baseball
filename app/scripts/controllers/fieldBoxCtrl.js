(function() {
    
    function FieldBoxCtrl($rootScope, $scope, boxState, inningState, AtBatFactory, basePathState, gameState, $mdDialog) {
        
        $scope.atBatFactory = AtBatFactory;
        
        $scope.homeInningHits = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.homeInningRuns = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.visitorsInningHits = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.visitorsInningRuns = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        
    
        
        $scope.showBigBox = function($event, rowIndex, $index) {
            $scope.decideLittleBox(rowIndex, $index);
            $mdDialog.show({ 
                
                template:
                ' <md-dialog class="big-box-d"><md-dialog-content><at-bat-score-box-dr></at-bat-score-box-dr></md-dialog-content></md-dialog>',
                scope: $scope,
                preserveScope: true,
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                fullscreen: true,
    
            }) 
        }
        
        $scope.decideLittleBox = function(row,column) { 
            
            $scope.row = row;
            $scope.column = column;
            getLittleBoxObject();
            generateStatsObject();
            getAtBatFactoryStatus();
            
            
            if (($scope.littleBoxObject.status == 'first-base')||($scope.littleBoxObject.status == 'second-base') ||  ($scope.littleBoxObject.status == 'third-base')) {
                $scope.onBase = true;
                
            }
            if ($scope.littleBoxObject.status == 'initial') {
                $scope.littleBoxObject.status = 'at-bat';
                
            }

            $scope.littleBoxState = $scope.littleBoxObject.status;
            basePathState.PreviousBase = $scope.littleBoxState;
            
            $scope.bigBoxState = 'initial';

        }
        
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

        
        var generateStatsObject = function() {
                
                if (gameState.currentTeam == 'visitors') {
                    
                    if ($scope.littleBoxObject.status == 'initial') {
                        var playerID = gameState.visitors.lineup[$scope.row].id;
                        $scope.rawStats = {ab: 0, pa: 0, single: 0, double: 0, triple: 0, hr: 0, bb: 0, e: 0, fc: 0, hb: 0, wp: 0, pb: 0, sb: 0, cs: 0, balk: 0, rbi: 0, r: 0, er: 0, sac: 0, k: 0, doublePlay: false, singleString: '', doubleString: '', tripleString: '', scoreString: '', centerString: '', playerID: playerID, teamID: '', }; 
                    
                    boxState.visitorsRawStats[$scope.row][$scope.column] = $scope.rawStats;

                    } else {
                       $scope.rawStats = boxState.visitorsRawStats[$scope.row][$scope.column]; 
                    }
                }
                
                if (gameState.currentTeam == 'home') {
                    if ($scope.littleBoxObject.status == 'initial') {
                        var playerID = gameState.home.lineup[$scope.row].id;
                        $scope.rawStats = {ab: 0, pa: 0, single: 0, double: 0, triple: 0, hr: 0, bb: 0, e: 0, fc: 0, hb: 0, wp: 0, pb: 0, sb: 0, cs: 0, balk: 0, rbi: 0, r: 0, er: 0, sac: 0, k: 0, doublePlay: false, singleString: '', doubleString: '', tripleString: '', scoreString: '', centerString: '', playerID: playerID, teamID: '', };
                        boxState.homeRawStats[$scope.row][$scope.column] = $scope.rawStats;
                    } else {
                       $scope.rawStats = boxState.homeRawStats[$scope.row][$scope.column];
                    }
                    
                }   
        };
        
        
        var calculateRBI = function() {
            var dialogTemplateURL;
            $scope.rbi = true;
            // stat is the rawStats associated to the present batter--the one who might get the rbi
            var stat = {};
            if (gameState.currentTeam == 'visitors') {
                    stat = boxState.visitorsRawStats[boxState.batterBox.row] [boxState.batterBox.column];
            } else {
                stat = boxState.homeRawStats[boxState.batterBox.row][ boxState.batterBox.column];
            }
            
            if (stat.k == 1) {
                //no rbi
                $scope.rbi = false;
                incrementRBI();
            } else if (stat.e > 0) {
                $scope.rbi = false;
                
                dialogTemplateURL ='/templates/errorRBIBox.html';
                showRBIDialog(dialogTemplateURL);
                
                /*  The note AtBatFactoy.Home = 'advance-from-third' is how
                to tell if the runner scoring came from third
                */
                
//                if (AtBatFactory.Home === 'advance-from-third'){
//                    dialogTemplateURL = '/templates/errorRBIBox.html';
//                    showRBIDialog(dialogTemplateURL);
//                }
                
            } else if (stat.doublePlay) {
                //no rbi
                //but need to make clarification that double play is a ground force or reverse force double play
                $scope.rbi = false;
                dialogTemplateURL = '/templates/doublePlayRBIBox.html';
                showRBIDialog(dialogTemplateURL);
              
//                switch (stat.centerString) {
//                        case '':
//                            
//                            
//                            break;
//                        case '':
//                            
//                            break;
//                        case '':
//                            
//                            break;
//                        case '':
//                            
//                            break;
//                
//                }
          
            } else {
                incrementRBI();
            }
            

            if (gameState.currentTeam == 'home') {
                  boxState.homeRawStats[boxState.batterBox.row] [boxState.batterBox.column].rbi = stat.rbi;
            } else {
                 boxState.visitorsRawStats[boxState.batterBox.row] [boxState.batterBox.column].rbi = stat.rbi;
            } 
            console.log('E6');
            
            function incrementRBI() {
                if ($scope.rbi) {
                    console.log("E4 and rbi: " + $scope.rbi);
                    stat.rbi +=1;
                    console.log("E5 and rbi: " + $scope.rbi);
                }
            }
            
            
            function showRBIDialog(templateURL){
            
                $mdDialog.show({
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: templateURL,
                    controller:  'fieldBoxCtrl as fieldBox'
                });
                
            }
    
            $scope.closeDialogRBI = function() {
                $scope.rbi = true;
                incrementRBI();
                $mdDialog.hide();
                return $scope.rbi;
            }
            
            $scope.closeDialogNoRBI = function() {
                $scope.rbi = false;
                incrementRBI();
                $mdDialog.hide();
                return $scope.rbi;
            }
   
        };
        
        
        
/*  
    Figures the raw stats to be associated with a little box
*/        
        var updateRawStatsObject = function(target) {
            
            
            if (basePathState.PreviousBase == 'at-bat') {
                if ($scope.previousTarget == 'E') {
                    
                    $scope.rawStats.e = 1;
                    $scope.previousTarget = null;
                    
                // \u is Javascript escape for unicode and A4D8 is the hexidecimal code for the 'backwards k'
                    
                } else if (target == 'K' || target == '\uA4D8'){             
                    $scope.rawStats.k = 1;
                } else if ( target == 'BB') {
                    
                    $scope.rawStats.bb = 1;
                } else if (target == 'FC') {
                    
                    $scope.rawStats.fc = 1;
                } else if (target == 'SAC') {
                    
                    $scope.rawStats.sac = 1;
                } else if (target == 'HB') {
                    
                    $scope.rawStats.hb = 1;
                } else if (target == 'Double Play') {
                    $scope.rawStats.doublePlay = true;
                    console.log($scope.rawStats.doublePlay);
                }
                
                else {
                   
                    switch ($scope.littleBoxState) {
                        case 'first-base':
                            $scope.rawStats.single = 1;
                            
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
                            console.log(boxState.batterBox.row, boxState.batterBox.column);
                            break;
                    }
                    
                }
                

                if (target != 'BB') {
                    $scope.rawStats.ab = 1;
                }

                $scope.rawStats.pa = 1;

            } else {
                if ($scope.previousTarget == 'E') {
                    $scope.rawStats.e++;
                    $scope.previousTarget = null;
                } else if (target == 'SB') {
                    $scope.rawStats.sb++;
                } else if (target == 'WP') {
                    $scope.rawStats.wp++;
                } else if (target == 'Balk') {
                    $scope.rawStats.balk++;
                } else if (target == 'PB') {
                    $scope.rawStats.pb++;
                } else if (target == 'Caught Stealing!'){
                    
                    $scope.rawStats.cs = 1;
                }
                if ($scope.littleBoxState == 'score') { 
                
                    $scope.rawStats.r = 1; 
                    console.log(boxState.batterBox.row, boxState.batterBox.column);
                }
                
            }
            
            $scope.rawStats.singleString = $scope.singleString;
            $scope.rawStats.doubleString = $scope.doubleString;
            $scope.rawStats.tripleString = $scope.tripleString;
            $scope.rawStats.scoreString = $scope.scoreString;
            $scope.rawStats.centerString = $scope.centerString;
          
            if (gameState.currentTeam == 'home') {
                  boxState.homeRawStats[$scope.row][$scope.column] = $scope.rawStats;
            } else {
                boxState.visitorsRawStats[$scope.row][$scope.column] =
                  $scope.rawStats;
            }
            
            if($scope.littleBoxState == 'score') {
                calculateRBI();
            }
            
        };
        
        
        $scope.onBase = function() {
            var target = event.currentTarget.innerHTML;
            $scope.onBaseArray.push(target);
            $scope.onBaseString = $scope.onBaseArray.join('-');
            
            switch($scope.littleBoxState) {
                case 'first-base':
                    $scope.bottomRight = 'true';
                    
                    $scope.singleString = $scope.onBaseString;
                    break; 
                case 'second-base':
                    $scope.topRight = 'true';
                    
                    $scope.doubleString = $scope.onBaseString;
                    break;
                case 'third-base':
                    $scope.topLeft = 'true';
                    
                    $scope.tripleString = $scope.onBaseString;
                    break;
                case 'score':
                    $scope.bottomLeft = 'true';
                    $scope.scoreString = $scope.onBaseString;
                    
            }
                      
            if (target != 'E'){
                updateRawStatsObject(target);
                calculateHitsRuns();
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
            if ($scope.advBaseString == 'Submit') {
                $scope.advBaseString = '';
            }
            
            switch($scope.littleBoxState) {
                case 'first-base':
                    $scope.bottomRight = 'true';
                    
                    $scope.singleString = $scope.advBaseString;
                    break; 
                case 'second-base':
                    $scope.topRight = 'true';
                    
                    $scope.doubleString = $scope.advBaseString;
                    break;
                case 'third-base':
                    $scope.topLeft = 'true';
                    
                    $scope.tripleString = $scope.advBaseString;
                    break;
                case 'score':
                    $scope.bottomLeft = 'true';
                    $scope.scoreString = $scope.advBaseString;
                    
            }
            
            
            if (target != 'E'){
                updateRawStatsObject(target);
                calculateHitsRuns();
                $scope.exitToLittleBox();
            } else {
                $scope.previousTarget = 'E';
            }
            
            event.stopPropagation();
            
        }
        
/*
    Called from at-bat-out or on-base-out in Big Box view.
    Builds the string that will appear in the little box diamond explaining how the out was made.  If the target is 'Submit' then will exitToLittleBox()  
*/
        
        $scope.putOut = function(event){
            var target = event.currentTarget.innerHTML;
//            if (target == 'Double Play') {
//                // rawStats.doublePlay = true means the associated at-bat initiated
//                // caused the double play.  
//                //$scope.rawStats.doublePlay = true;
//                console.log('double play? ' + $scope.rawStats.doublePlay);
//            }
            if ((target == 'Caught Stealing!')|| (target == 'SAC') || (target == 'Double Play')) {
                updateRawStatsObject(target);
            } else if (target === 'Submit') {
                
            } else {
                $scope.putOutArray.push(target);
            }
            
            $scope.bottomRightOuts = 'true';
            $scope.centerString = $scope.putOutArray.join('-');
            
            // \u is Javascript escape for unicode and A4D8 is the hexidecimal code for the 'backwards k'
            if (target == 'K' || target == '\uA4D8' || target === 'Submit') {
                updateRawStatsObject(target);
                $scope.exitToLittleBox();
            }
            //var fielder = event.currentTarget.innerHTML;                  
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
        
/* 
    Called by clicking on an "out" circle in the big box view. 
    Decides if out from at-bat or from on-base.

*/
  
        
        $scope.bigBoxOut = function(event){
            if ($scope.littleBoxState=='at-bat') {
                $scope.bigBoxState = 'at-bat-out';
                boxState.batterBox.row = $scope.row;
                boxState.batterBox.column = $scope.column;
                console.log(boxState.batterBox.row, boxState.batterBox.column);
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

        
/*
 Called by clicking on a base in big box view.
 Decides which view of the big box to show, 
 that of reaching base from an at-bat or advancing.
 Updates the view of the basepath--showing where the batter/runner is.
*/
        
        $scope.bigBoxOnBase = function(event){
            if ($scope.littleBoxState=='at-bat') {
                $scope.bigBoxState = 'at-bat-on-base';
                boxState.batterBox.row = $scope.row;
                boxState.batterBox.column = $scope.column;
                console.log(boxState.batterBox.row, boxState.batterBox.column);
                $scope.onBaseArray = [];
            } else {
                $scope.bigBoxState = 'on-base-advance';
                $scope.advBaseArray =[];
            }
            boxState.big[$scope.row][$scope.column] = $scope.bigBoxState;
            
            $scope.atBatFactory.updateBasePath(event, $scope);
            event.stopPropagation();
        }

        
        
        var calculateHitsRuns = function() {
         
                if (gameState.currentTeam == 'visitors') {
                   
                   var visitorBatterHits =0;
                   boxState.visitorsRawStats[$scope.row][$scope.column] = $scope.rawStats;
                   
                   boxState.visitorsHitsRunsErrors[$scope.column].hits =0;
                   boxState.visitorsHitsRunsErrors[$scope.column].runs =0; 
                   boxState.visitorsHitsRunsErrors[$scope.column].errors =0;
                    
                    
                   for (var i=0; i<9; i++) {
                       if (boxState.visitorsRawStats[i][$scope.column]) {
                           visitorsBatterHits = boxState.visitorsRawStats[i][$scope.column].single + boxState.visitorsRawStats[i][$scope.column].double + boxState.visitorsRawStats[i][$scope.column].triple + boxState.visitorsRawStats[i][$scope.column].hr;
                           
                           boxState.visitorsHitsRunsErrors[$scope.column].hits += visitorsBatterHits;
                           
                           boxState.visitorsHitsRunsErrors[$scope.column].runs += boxState.visitorsRawStats[i][$scope.column].r; 
                           
                           boxState.homeHitsRunsErrors[$scope.column].errors +=
                               boxState.visitorsRawStats[i][$scope.column].e;
                           
                           

                           console.log('hit: ' + boxState.visitorsHitsRunsErrors[$scope.column].hits);
                           console.log('run: ' + boxState.visitorsHitsRunsErrors[$scope.column].runs); 
                           console.log('errors: ' + boxState.homeHitsRunsErrors[$scope.column].errors);
                           
                       }
                    }
                }
                
                if (gameState.currentTeam == 'home') {
                  var homeBatterHits =0;
//                  boxState.homeRawStats[$scope.row][$scope.column] = $scope.rawStats;
                  
                  boxState.homeHitsRunsErrors[$scope.column].hits = 0;
                  boxState.homeHitsRunsErrors[$scope.column].runs = 0;
                  boxState.homeHitsRunsErrors[$scope.column].errors =0;
                    
                    
                    
                  for (var i=0; i<9; i++) {
                    if (boxState.homeRawStats[i][$scope.column]) {
                      
                       homeBatterHits = boxState.homeRawStats[i][$scope.column].single + boxState.homeRawStats[i][$scope.column].double + boxState.homeRawStats[i][$scope.column].triple + boxState.homeRawStats[i][$scope.column].hr;

                       boxState.homeHitsRunsErrors[$scope.column].hits += homeBatterHits;

                       boxState.homeHitsRunsErrors[$scope.column].runs += boxState.homeRawStats[i][$scope.column].r; 
                        
                       boxState.visitorsHitsRunsErrors[$scope.column].errors += boxState.homeRawStats[i][$scope.column].e
  
                    }  
                      
                  }
                  
                }
            
            gameState.visitorsRuns = 0;
            gameState.visitorsHits = 0;
            gameState.visitorsErrors = 0;
            
            gameState.homeRuns = 0;
            gameState.homeHits = 0;
            gameState.homeErrors = 0;
            
            
            
            for (var i=0; i<9; i++) {
                gameState.visitorsRuns += boxState.visitorsHitsRunsErrors[i].runs;
                
                
                gameState.visitorsHits += boxState.visitorsHitsRunsErrors[i].hits;
                
                gameState.visitorsErrors += boxState.visitorsHitsRunsErrors[i].errors;
                
                gameState.homeRuns += boxState.homeHitsRunsErrors[i].runs;
                
                gameState.homeHits += boxState.homeHitsRunsErrors[i].hits;
               
                
                gameState.homeErrors += boxState.homeHitsRunsErrors[i].errors;
               
            
            }
            
            $rootScope.$broadcast('updateHitsRuns', {column: $scope.column});
            $rootScope.$broadcast('updateLineScore');
        };
        
        $rootScope.$on('updateHitsRuns', function(event, args) {
                if (gameState.currentTeam == 'home'){
                    $scope.homeInningHits[args.column] = boxState.homeHitsRunsErrors[args.column].hits;
                    $scope.homeInningRuns[args.column] = boxState.homeHitsRunsErrors[args.column].runs;
                }
                
                if (gameState.currentTeam == 'visitors'){
                   $scope.visitorsInningHits[args.column] = boxState.visitorsHitsRunsErrors[args.column].hits;
                   $scope.visitorsInningRuns[args.column] = boxState.visitorsHitsRunsErrors[args.column].runs;
                }
            });
        
        
             
// Updates the elements required for the little Box view
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
            
        };
        
// Updates the content for the little box      
            
        var updateLittleBoxObject = function() {
                   
            $scope.littleBoxObject.first = $scope.atBatFactory.First;
            console.log('littleBoxObject.first: ' + $scope.littleBoxObject.first);
            $scope.littleBoxObject.second = $scope.atBatFactory.Second;
            console.log('littleBoxObject.second: ' + $scope.littleBoxObject.second);
            $scope.littleBoxObject.third = $scope.atBatFactory.Third;
            console.log('littleBoxObject.third: ' + $scope.littleBoxObject.third);
            $scope.littleBoxObject.home = $scope.atBatFactory.Home;
            console.log('littleBoxObject.home: ' + $scope.littleBoxObject.home);
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
        
   
// Sets the bigBoxState to null--Do we need all the "if" statements?  
// Sets littleBoxState to 'at-bat-out' if appropriate.
// This needs to be looked at for simplification.
// Calls updateLittleBoxObject()
// Hides the bigBox dialog box

        
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
            //calculateHitsRuns();
            $scope.bigBoxState = null;
            $mdDialog.hide();
            $scope.showLittleBox = 'after';
//            if (inningState.outs === 3) {
//                inningState.outs=0;
//           }
            
        }
        
    }
    
    
    
    angular 
        .module('scorecardMod')
        .controller('fieldBoxCtrl', ['$rootScope', '$scope', 'boxState', 'inningState', 'AtBatFactory', 'basePathState', 'gameState', '$mdDialog', FieldBoxCtrl]);
})();

