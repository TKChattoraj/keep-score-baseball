(function(){
    function outScoreBoxDr(Lineup, boxState) {
        
        return {
            templateUrl: '/templates/directives/out_score_box.html',
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
        .directive('outScoreBoxDr', ['Lineup', 'boxState', outScoreBoxDr]);
})();