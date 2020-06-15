/* ---------------- DFS Algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Depth-First Search
 */


/* -------- Initialize DFS --------
 * Info:    Init queue (Queue) --> To visit
 *               color (Map)   --> Node to String (i.e. color)
 */

/* global grid, rows, cols, source, currentPathfinding, Infinity, queue, color, target */
function dfsInit(){
    // Init openSet (Stack) and colored (Array of colors)
    resetAlgo();
    
    
    // Recalculate neighbors
    // TODO Inefficient, I could call the
    // update of neighbors in runtime during
    // the UI drawing of the map
    updateNeighborsAllNodes();
    
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            color.set(grid[i][j], 'w');
            grid[i][j].predecessor = null;
            grid[i][j].g = Infinity;
        }
    }
    
    
    stack.push(source);
    color.set(source, 'g');
    source.g = 0;
}

function dfsStep(){
    if(stack.length > 0){
        curr = stack.pop();
        
        if(curr === target){
            // SUCCESS
            pathfindingStatus = status.SUCCESS;
        }else{
            let adjacents = curr.neighbors;
            for(let i = 0; i < adjacents.length; i++){
                let currAdj = adjacents[i];
                
                if(color.get(currAdj) === 'w'){
                    color.set(currAdj, 'g');
                    stack.push(currAdj);
                    currAdj.g = curr.g+1;
                    currAdj.predecessor = curr;
                }
                    
            }
        }
        
        color.set(curr, 'b');
    }else{
        // FAILURE
        pathfindingStatus = status.FAILURE;
    }
}