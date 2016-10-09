(function() {
    function ScorecardCtrl(){
        this.rowsArray = [1,2,3,4,5,6,7,8,9];
        this.inningsArray = [1,2,3,4,5,6,7,8,9,10];
    }
    angular 
        .module('scorecardMod')
        .controller('scorecardCtrl', [ScorecardCtrl]);
})();