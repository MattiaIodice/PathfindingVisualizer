/* ---------------- BFS Algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Breadth-First Search
 */


/* global grid, rows, cols, source, currentPathfinding */
function bfsInit(){
    
    // Init openSet (Queue) and closedSet (Array)
    openSet = []; // new Queue();
    openSet.push(source); // Q
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

var step = 0;

function bfsStep(){
    
    if(openSet.length > 0){     
        /*if(step === 1){
            pathfindingStatus = status.SUCCESS;
            return;
        }*/
        console.log("Step " + (step++));
        curr = openSet.shift();
        console.log('Computing (' + curr.i + ", " + curr.j + ")");
        
        
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
        
        /*console.log('openSet = ' + openSet.items);
        console.log('closedSet = ' + closedSet);*/
        
        closedSet.push(curr);
    }else{
        // FAILURE
        pathfindingStatus = status.FAILURE;
    }
}