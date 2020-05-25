/* global currentHeuristicFunc */

function setHeuristic(type){
    
    if(type === 'Manhattan'){
        // Manhattan
        currentHeuristicFunc = function(a,b){
            return Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
        };
         
    }else if(type === 'Euclidean'){
        // Euclidean
        currentHeuristicFunc = function(a,b){
            return dist(a.i, a.j, b.i, b.j);
        };
    }else if(type === 'Chebychev'){
        // Chebychev
        currentHeuristicFunc = function(a,b){
            return 0;
        };
    }else{
        // TODO
        console.log("Not yet implemented the following heuristic");
    }
}