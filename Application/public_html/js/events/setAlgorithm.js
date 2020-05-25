/* Set true the flag of algorithmInProcess and
 * set the function pointer to an algorithm
 * 
 * global algorithmInProcess, currentPathfinding, currentHeuristicFunc */

function setAlgorithm(type){
    
    if(type === 'A*'){
        console.log("Selected A*");
        // A*
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
         
    }else if(type === 'Dijkstra'){
        console.log("Selected Dijkstra");
        // No heuristic (Dijkstra)
        aStarInit();
        currentPathfinding = function(){
            return aStarStep();
        };
        
        currentHeuristicFunc = function(a,b){
            return 0;
        };
        
    }else if(type === 'BFS'){
        console.log("Selected BFS");
        // TODO
        // Implement BFS
        console.log("BFS has not been implemented yet");
        
    }else if(type === 'DFS'){
        console.log("Selected DFS");
        // TODO
        // Implement DFS
        console.log("DFS has not been implemented yet");
        
    }
}