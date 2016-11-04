(function(){
    function onBaseScoreBoxDr(Lineup, boxState) {
        
        return {
            templateUrl: '/templates/directives/on_base_score_box.html',
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
        .directive('onBaseScoreBoxDr', ['Lineup', 'boxState', onBaseScoreBoxDr]);
})();