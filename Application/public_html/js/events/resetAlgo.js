/* global openSet, closedSet, pred, mapChanged */

function resetAlgo(){ // Init data stractures of algorithms
    
    // Init A* and Dijkstra
    openSet = [];
    closedSet = [];
    
    // Init Traversal algorithms
    queue = []; // BFS
    stack = []; // DFS
    color = new Map();
    
    
    mapChanged = true;
}