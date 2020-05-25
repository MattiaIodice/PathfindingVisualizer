/* ---------------- Prim's Algorithm ----------------
 *  Author: Mattia Iodice
 *  Info: Functions for Prim's Algorithm
 */


/* global grid, rows, cols, source, openSet, closedSet, primInProcess */

function primInit(){
    
    curr = null;
    
    // Create a grid of walls adding a forced complete adjancy
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            curr = grid[i][j];
            curr.neighbors = [];
            curr.additionalEdgeValue = -1; // Wall
            
            if(i < cols-1)
                curr.neighbors.push(grid[i+1][j]);
            if(i > 0)
                curr.neighbors.push(grid[i-1][j]);
            if(j < rows-1)
                curr.neighbors.push(grid[i][j+1]);
            if(j > 0)
                curr.neighbors.push(grid[i][j-1]);
        }
    }
    
    // Source is not a wall, push adjacents in openSet
    source.additionalEdgeValue = 0;
    let adjacents = source.neighbors;
    for(var i = 0; i < adjacents.length; i++)
        openSet.push(adjacents[i]);
    
    closedSet.push(source);
    primInProcess = true;
}

function checkWalls(curr, set){
    let adjacents;
    let currAdj;
    let count = 0;
    
    adjacents = curr.neighbors;
    for(var i = 0; i < adjacents.length; i++){
        currAdj = adjacents[i];
        if(set.includes(currAdj)){
            if(count === 1){
                console.log(curr.i + ", " + curr.j +  " is not valid cell");
                return false;
            }else
                count++;
        }
    }
    console.log(curr.i + ", " + curr.j +  " is a valid cell");
    return true;
}

function primStep(){
    let randomIndex = 0;
    let randomWall = null;
    let currAdj = null;
    let adjacents = [];
    
    if(openSet.length > 0){
        // Pop a random wall
        let a = Math.random();
        randomIndex = int(a*openSet.length);
        randomWall = openSet[randomIndex];
        
        console.log("Length = " + openSet.length);
        console.log("R_i 1 = " + a);
        console.log("R_i 2 = " + randomIndex);
        console.log("Picked random node = " + randomWall.i + ", " + randomWall.j);
        
        // If it is an ammisible wall
        if(checkWalls(randomWall, closedSet)){
            // Make it as ground
            randomWall.additionalEdgeValue = 0;
            
            // Add its neighbors as possible walls
            adjacents = randomWall.neighbors;
            for(var i = 0; i < adjacents.length; i++){
                currAdj = adjacents[i];
                console.log("    Adj = " + currAdj.i + ", " + currAdj.j);
                if(!closedSet.includes(currAdj)){
                    openSet.push(currAdj);
                    console.log("    Added in openSet");
                }else
                    console.log("    Not added in openSet");   
            }
        }
        
        
        removeFromArray(openSet, randomWall);
        closedSet.push(randomWall);
        
        //closedSet.push(curr);
    }else{
        openSet = [];
        closedSet = [];
        primInProcess = false;
        primFinished = true;
    }
    
    /*steps++;
    if(steps === 24){
        primInProcess = false;
        primFinished = false;
    }*/
}