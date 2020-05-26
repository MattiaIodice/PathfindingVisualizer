/* ---------------- A* and Dijkstra's Algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Functions for both A* and Dijkstra
 */



/* ===================== One step of A* =====================
 * It is one step of A*, instead of while there is an if
 */
/* global openSet, closedSet, target */

function aStarStep(){
    
    // Wait
    //updateVelocity();
    
    if(openSet.length > 0){
        
        let winner = 0;
        // TODO Inefficient (linear instead of log)
        for(let i = 0; i < openSet.length; i++){
            // 1) The best is on f ...
            if(openSet[i].f < openSet[winner].f)
                winner = i;
        }
        curr = openSet[winner];
        removeFromArray(openSet, curr);
        
        if(curr === target){
            // SUCCESS
            pathfindingStatus = status.SUCCESS;
        }else{
            let adjacents = curr.neighbors;
            for(let i = 0; i < adjacents.length; i++){
                let currAdj = adjacents[i];

                if(!closedSet.includes(currAdj)){
                    openSet.push(currAdj);
                    let tentativeScore = curr.g + 1 + currAdj.additionalEdgeValue;
                    // 2) ... the "relax" check is on g
                    if(currAdj.g > tentativeScore){
                        currAdj.g = tentativeScore;
                        currAdj.h = heuristic(currAdj, target);
                        currAdj.f = currAdj.g + currAdj.h;
                        currAdj.predecessor = curr;
                    }
                }
            }
        }
        
        closedSet.push(curr);
    }else{
        // FAILURE
        pathfindingStatus = status.FAILURE;
    }
    
    return null;
}

/* ================= Init A* =================
 * For each v set f, g and h
 * Init openSet (global)
 */
/* global grid, rows, cols, source, currentPathfinding */
function aStarInit(){
    updateNeighborsAllNodes();
    
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            /* global Infinity */
            grid[i][j].f = Infinity;
            grid[i][j].g = Infinity;
            grid[i][j].predecessor = null;
            //pred[grid[i][j]] = null;
        }
    }
    source.f = 0;
    source.g = 0;
    openSet.push(source); // Q
}

/* ================= Update Neighbors =================
 * Reset neighbors for each cell due to modified map
 * @param None
 * @returns void
 */
function updateNeighborsAllNodes(){
    // TODO Inefficient
    for(var i = 0; i < cols; i++)
        for(var j = 0; j < rows; j++){
            // Delete old neighbors
            grid[i][j].neighbors = [];
            // Add new neighbors
            grid[i][j].addNeighbors(grid);
        }
    source.isWall = false;
    target.isWall = false;
}

function heuristic(curr, target){
    return currentHeuristicFunc(curr, target);
}