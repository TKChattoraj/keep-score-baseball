(function(){
    function atBatScoreBoxDr(Lineup, scorecardBoxState) {
        
        return {
            templateUrl: '/templates/directives/at_bat_score_box.html',
            controller: 'fieldBoxCtrl as fieldBox',
            replace: false,
            restrict: 'E',
            bindToController: true,
            scope: false,
            link: function(scope, element, attributes) {}
                
        };
    }
                
    
    angular
        .module('scorecardMod')
        .directive('atBatScoreBoxDr', ['Lineup', 'boxState', atBatScoreBoxDr]);
})();