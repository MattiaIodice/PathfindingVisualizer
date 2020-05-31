/* ---------------- DFS Algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Depth-First Search
 */


/* global grid, rows, cols, source, currentPathfinding */
function dfsInit(){
    
    // Init openSet (Stack) and colored (Array of colors)
    openSet = [];
    openSet.push(source);
    colored = new Map();
    
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
    if(openSet.length > 0){
        curr = openSet.pop();
        
        if(curr === target){
            // SUCCESS
            pathfindingStatus = status.SUCCESS;
        }else{
            let adjacents = curr.neighbors;
            for(let i = 0; i < adjacents.length; i++){
                let currAdj = adjacents[i];
                
                if(!colored.get(currAdj)){
                    colored.set(currAdj, true);
                    openSet.push(currAdj);
                    currAdj.g = curr.g+1;
                    currAdj.predecessor = curr;
                }
                    
            }
        }
        
        colored.set(curr, true);
    }else{
        // FAILURE
        pathfindingStatus = status.FAILURE;
    }
}