/* global currentHeuristicFunc, heuristicEnum */

function setHeuristic(type){
    
    if(type === 'Manhattan'){
        currentHeuristicFunc = heuristicEnum.MANHATTAN;
         
    }else if(type === 'Euclidean'){
        currentHeuristicFunc = heuristicEnum.EUCLIDEAN;
        
    }else if(type === 'Chebychev'){
        currentHeuristicFunc = heuristicEnum.CHEBYCHEV;
        
    }else if(type === 'None'){
        currentHeuristicFunc = heuristicEnum.NONE;
        
    }
}