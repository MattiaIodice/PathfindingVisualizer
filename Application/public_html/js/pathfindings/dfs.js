/* ---------------- DFS Algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Depth-First Search
 */


/* global grid, rows, cols, source, currentPathfinding */
function dfsInit(){
    
    // Init openSet (Stack) and closedSet (Array)
    openSet = new Stack();
    openSet.push(source); // S
    closedSet = [];
    
    // Recalculate neighbors
    // TODO Inefficient, I could call the
    // update of neighbors in runtime during
    // the UI drawing of the map
    updateNeighborsAllNodes();
    
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j].predecessor = null;
            grid[i][j].g = Infinity;
        }
    }
    
    source.g = 0;
}

function dfsStep(){
    if(!openSet.isEmpty()){
        curr = openSet.pop();
        
        if(curr === target){
            // SUCCESS
            pathfindingStatus = status.SUCCESS;
        }else{
            let adjacents = curr.neighbors;
            for(let i = 0; i < adjacents.length; i++){
                let currAdj = adjacents[i];
                
                if(!closedSet.includes(currAdj)){
                    openSet.push(currAdj);
                    currAdj.g = curr.g+1;
                    currAdj.predecessor = curr;
                }
                    
            }
        }
        
        closedSet.push(curr);
    }else{
        // FAILURE
        pathfindingStatus = status.FAILURE;
    }
}