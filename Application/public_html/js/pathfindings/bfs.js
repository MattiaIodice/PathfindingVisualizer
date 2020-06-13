/* ---------------- BFS Algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Breadth-First Search
 */


/* -------- Initialize BFS --------
 * Info:    Init queue (Queue) --> To visit
 *               color (Map)   --> Node to String (i.e. color)
 */

/* global grid, rows, cols, source, target, queue, color, Infinity, algorithmInProgress */
function bfsInit(){
    resetAlgo();
    algorithmInProgress = 'Traversal';
    
    // Recalculate neighbors
    // TODO Inefficient, I could call the update of neighbors
    // in runtime during the UI drawing of the map
    updateNeighborsAllNodes();
    
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            color.set(grid[i][j], 'w');
            grid[i][j].predecessor = null;
            grid[i][j].g = Infinity;
        }
    }
    
    queue.push(source);
    color.set(source, 'g');
    source.g = 0;
}

function bfsStep(){
    
    if(queue.length > 0){
        curr = queue.shift();
        
        if(curr === target){
            // SUCCESS
            pathfindingStatus = status.SUCCESS;
        }else{
            let adjacents = curr.neighbors;
            for(let i = 0; i < adjacents.length; i++){
                let currAdj = adjacents[i];
                
                if(color.get(currAdj) === 'w'){
                    color.set(currAdj, 'g');
                    queue.push(currAdj);
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