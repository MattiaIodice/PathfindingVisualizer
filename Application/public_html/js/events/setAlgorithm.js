/* ---------------- Set the pathfinding algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Set true the algorithmInProcess flag, set what
 *  algorithm and the functions pointer realted to
*/


/* global currentPathfinding, currentHeuristicFunc, heuristicEnum, velocity, velocityEnum */
function setAlgorithm(type){
    
    pathfindingStatus = status.ACTIVE;
    
    document.getElementById('PauseButton').disabled = false;
    document.getElementById('StopButton').disabled = false;
    
    if(velocity === velocityEnum.SLOW)
        frameRate(20); // Slow
    else if(velocity === velocityEnum.VERYSLOW)
        frameRate(8); // Very slow
    else
        frameRate(60); // Average (Default)
        
    
        
        
    
    if(type === 'A*_1'){
        // A* (Manhattan)
        currentHeuristicFunc = heuristicEnum.MANHATTAN;
        algorithmInProgress = 'Shortest';
        
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
    
    }else if(type === 'A*_2'){
        // A* (Euclidean)
        currentHeuristicFunc = heuristicEnum.EUCLIDEAN;
        algorithmInProgress = 'Shortest';
        
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
    
    }else if(type === 'A*_3'){
        // A* (Chebychev)
        currentHeuristicFunc = heuristicEnum.CHEBYCHEV;
        algorithmInProgress = 'Shortest';
        
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        }; 
    
    }else if(type === 'Dijkstra'){
        // Dijkstra (A* without heuristic)
        currentHeuristicFunc = heuristicEnum.NONE;
        algorithmInProgress = 'Shortest';
        
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
    
    }else if(type === 'BFS'){
        // BFS (traversal)
        currentHeuristicFunc = heuristicEnum.NONE;
        algorithmInProgress = 'Traversal';
        
        bfsInit();
        currentPathfinding = function(){
            return bfsStep();
        };
    
    }else if(type === 'DFS'){
        // DFS (traversal)
        currentHeuristicFunc = heuristicEnum.NONE;
        algorithmInProgress = 'Traversal';
        
        dfsInit();
        currentPathfinding = function(){
            return dfsStep();
        };
    }
}