/* global grid, rows, cols, startX, startY, endX, endY */

function generateMaze(type){
    
    if(type === 'Recursive'){
        // Recursive Division
        console.log("Recursive Division Standard");
        recursiveDivision(grid, rows, cols, true);
        
    }else if(type === 'RecHorizontal'){
        // TODO Recursive Division Horizontal
        console.log("Recursive Division Horizontal");
        recursiveDivision(grid, rows, cols, true);
        
    }else if(type === 'RecVertical'){
        // TODO Recursive Division Vertical
        console.log("Recursive Division Vertical");
        recursiveDivision(grid, rows, cols, false);
        
    }else if(type === 'Prim'){
        // TODO Prim
        console.log("Prim's Algorithm");
        
    }else if(type === 'Basic'){
        // Random Basic Maze
        console.log("Basic Random Maze");
        randomMaze(grid, cols, rows, 0.4, startX, startY, endX, endY);

    }else if(type === 'Basic Dense'){
        // Random Basic Maze (Dense)
        console.log("Basic Random Maze (Dense)");
        randomMaze(grid, cols, rows, 0.8, startX, startY, endX, endY);

    }else{
        // Hello! Maze
        console.log("Hello! Maze");
        helloMaze(grid);
        
    }
}