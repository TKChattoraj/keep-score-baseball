(function() {
    function config($stateProvider, $locationProvider) {
        
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });
        $stateProvider
        
            .state('homeTeam', {
                url: '/hometeam',
                templateUrl: '/templates/hometeam.html'
            
        })
        
            .state('visitorTeam', {
                url: '/visitorteam',
                templateUrl: '/templates/visitorteam.html'
        });
        
    }
    
   
    angular
        .module('keepScore', ['ui.router','scorecardMod', 'ngMaterial'])
        .config(config);
})();


