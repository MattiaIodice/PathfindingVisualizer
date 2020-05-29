/* Set true the flag of algorithmInProcess and
 * set the function pointer to an algorithm
*/

/* global currentPathfinding, currentHeuristicFunc, heuristicEnum */

function setAlgorithm(type){
    
    if(type === 'A*'){
        // If the heuristic is not set
        if(currentHeuristicFunc === heuristicEnum.NONE)
            // Set Manhattan as default
            currentHeuristicFunc = heuristicEnum.MANHATTAN;
        
        document.getElementById('HeuristicsDropdown').classList.remove("disabled");
        
        // A*
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
        
         
    }else if(type === 'Dijkstra'){
        // No heuristic
        currentHeuristicFunc = heuristicEnum.NONE;
        document.getElementById('HeuristicsDropdown').classList.add("disabled");
        
        // Dijkstra
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
        
        
        
    }else if(type === 'BFS'){
        // No heuristic
        currentHeuristicFunc = heuristicEnum.NONE;
        document.getElementById('HeuristicsDropdown').classList.add("disabled");
        
        console.log('Choose BFS');
        bfsInit();
        currentPathfinding = function(){
            return bfsStep();
        };
        
        
    }else if(type === 'DFS'){
        // No heuristic
        currentHeuristicFunc = heuristicEnum.NONE;
        document.getElementById('HeuristicsDropdown').classList.add("disabled");
        
        console.log('Choose DFS');
        dfsInit();
        currentPathfinding = function(){
            return dfsStep();
        };
    }
}