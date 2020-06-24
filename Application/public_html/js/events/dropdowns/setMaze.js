/* global grid, rows, cols, startX, startY, endX, endY */

function generateMaze(type){
    
    resetButtonEvent();
    
    if(type === 'Recursive'){
        // Recursive Division
        console.log("Recursive Division Standard");
        recursiveDivision(grid, rows, cols, true);
        
    }else if(type === 'Prim'){
        // TODO Prim
        console.log("Prim's Algorithm");
        
    }else if(type === 'Random'){
        // Random Basic Maze
        console.log("Sparse Random Maze");
        randomMaze(grid, cols, rows, 0.2, startX, startY, endX, endY);

    }else if(type === 'Dense'){
        // Basic Random Maze
        console.log("Dense Random Maze");
        randomMaze(grid, cols, rows, 0.4, startX, startY, endX, endY);

    }else{
        // Hello! Maze
        console.log("Hello! Maze");
        helloMaze(grid, startX, startY, endX, endY);
        
    }
    
    mapChanged = true;
}