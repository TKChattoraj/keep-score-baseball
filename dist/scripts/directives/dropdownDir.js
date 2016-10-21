(function(){
    function teamDropdown(Lineup) {
        
        return {
            templateUrl: '/templates/directives/dropdown_dir.html',
            controller: 'rowCtrl as row',
            replace: true,
            restrict: 'A',
            bindToController: true,
            scope: {
                
            },
            link: function(scope, element, attributes) {}
                
        };
    }
                
    
    angular
        .module('scorecardMod')
        .directive('teamDropdown', ['Lineup', teamDropdown]);
})();
