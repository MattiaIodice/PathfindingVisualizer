/* Set true the flag of algorithmInProcess and
 * set the function pointer to an algorithm
*/

/* global currentPathfinding, currentHeuristicFunc, heuristicEnum */

function setAlgorithm(type){
    
    pathfindingStatus = status.ACTIVE;
    
    document.getElementById('PauseButton').classList.remove("disabled");
    document.getElementById('StopButton').classList.remove("disabled");
    
    if(type === 'A*_1'){
        currentHeuristicFunc = heuristicEnum.MANHATTAN;
        
        // A* (Manhattan)
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        }; 
    }
    
    else if(type === 'A*_2'){
        currentHeuristicFunc = heuristicEnum.EUCLIDEAN;
        
        // A* (Euclidean)
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
        
         
    }
    
    else if(type === 'A*_3'){
        currentHeuristicFunc = heuristicEnum.CHEBYCHEV;
        
        // A* (Manhattan)
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        }; 
    }
    
    else if(type === 'Dijkstra'){
        // No heuristic
        currentHeuristicFunc = heuristicEnum.NONE;
        
        // Dijkstra
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
        
        
        
    }
    
    else if(type === 'BFS'){
        // No heuristic
        currentHeuristicFunc = heuristicEnum.NONE;
        
        bfsInit();
        currentPathfinding = function(){
            return bfsStep();
        };
        
        
    }else if(type === 'DFS'){
        // No heuristic
        currentHeuristicFunc = heuristicEnum.NONE;
        
        dfsInit();
        currentPathfinding = function(){
            return dfsStep();
        };
    }
}