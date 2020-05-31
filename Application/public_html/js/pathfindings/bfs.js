/* ---------------- BFS Algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Breadth-First Search
 */


/* global grid, rows, cols, source, currentPathfinding */

/* -------- Initialize BFS --------
 * Info:    Init openSet (Queue), colored (Map of colors),
 *          predecessor for all nodes and g value
 */
function bfsInit(){
    openSet = [];
    openSet.push(source);
    colored = new Map();
    
    // Recalculate neighbors
    // TODO Inefficient, I could call the update of neighbors
    // in runtime during the UI drawing of the map
    updateNeighborsAllNodes();
    
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            //colored.set(grid[i][j], false);
            grid[i][j].predecessor = null;
            grid[i][j].g = Infinity;
        }
    }
    
    source.g = 0;
}

function bfsStep(){
    
    if(openSet.length > 0){
        curr = openSet.shift();
        
        
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