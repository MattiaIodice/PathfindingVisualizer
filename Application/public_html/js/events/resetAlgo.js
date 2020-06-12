/* global openSet, closedSet, pred, mapChanged */

function resetAlgo(){ // Init data stractures of algorithms
    
    // A* and Dijkstra
    openSet = [];
    closedSet = [];
    algorithmInProgress = '';
    
    // BFS and DFS
    queue = [];
    color = new Map();
    
    
    mapChanged = true;
    
    /*
    Maybe it is possible to compute just
    closedSet = [] and openSet = [] due to
    the garbage collection
    
    let n = openSet.length;
    
    for(var i = 0; i < n; i++){
       console.log(i);
       openSet.pop();
    }
        
    n = closedSet.length;
    for(var i = 0; i < n; i++)
        closedSet.pop();
    
    
    
    pred = [];
    mapChanged = true;
    */
}