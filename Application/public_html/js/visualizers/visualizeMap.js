/* ---------------- Visualize Map ----------------
 *  Author: Mattia Iodice
 *  Info:   Set pathfinding visualization
 */

/* global grid, cols, rows, openSet, closedSet, source, target,
 *        cellEnum, colorEnum, colors, algorithmInProgress */


function updateMap(){
    
    if(pathfindingStatus === status.ACTIVE){
        visualizeGrid();
        
        if(algorithmInProgress === 'Traversal')
            color.forEach(visualizeTraversalAlgo);
        else if(algorithmInProgress === 'Shortest')
            visualizeShortestPathAlgo();
    }else if(pathfindingStatus === status.SUCCESS){
        // Show path
        visualizePath(target);
        
        // Change HTML
        document.getElementById('startAndPauseButton').disabled = true;
        document.getElementById('StopButton').disabled = true;
        
        if(target.g === 1)
            document.getElementById('resultText').innerHTML =
                "The resulting path is just <b>1 step</b> long!";
        else if(algorithmInProgress === 'Traversal'){
            document.getElementById('resultText').innerHTML =
                "The resulting path is <b>" + target.g + " steps</b> long!<br>\n\
                Attention! You chose a traversal algorithm, so it is\n\
                not guaranteed the shortest path!";
        }else{
            document.getElementById('resultText').innerHTML =
                "The resulting path is <b>" + target.g + " steps</b> long!";
        }
            
        
        
        // Change app status
        pathfindingStatus = status.DEACTIVE;
    }else if(pathfindingStatus === status.FAILURE){
        // Change HTML
        document.getElementById('startAndPauseButton').disabled = true;
        document.getElementById('StopButton').disabled = true;
        document.getElementById('resultText').innerHTML =
                "There is not exist any path from source to target!";
        // Change app status
        pathfindingStatus = status.DEACTIVE;
    }else
        visualizeGrid();
    
    source.show(colorEnum.SOURCE);
    target.show(colorEnum.TARGET);
    mapChanged = false;
}

function visualizeGrid(){
    // TODO Inefficient, I may save the needed change cells
    
    // Show cells
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            if(grid[i][j].additionalEdgeValue === cellEnum.WALL)
                grid[i][j].show(colorEnum.BLACK); // Wall --> black
            
            else if(grid[i][j].additionalEdgeValue === cellEnum.PASSAGE)
                grid[i][j].show(colorEnum.WHITE); // Passage --> white
            
            else if(grid[i][j].additionalEdgeValue === cellEnum.TALLGRASS)
                grid[i][j].show(colorEnum.GREEN); // TallGrass --> green
            
            else if(grid[i][j].additionalEdgeValue === cellEnum.MUG)
                grid[i][j].show(colorEnum.BROWN); // Mug --> brown
            
            else if(grid[i][j].additionalEdgeValue === cellEnum.WATER)
                grid[i][j].show(colorEnum.BLUE); // Water --> blue
        }
    }
}

function visualizeTraversalAlgo(value, key, map){
    if(value === 'b'){
        // Passage in closedSet --> dark grey
        if(key.additionalEdgeValue === cellEnum.PASSAGE)
            key.show(colorEnum.DARKGREY);

        // Tall Grass in closedSet --> dark green
        else if(key.additionalEdgeValue === cellEnum.TALLGRASS)
            key.show(colorEnum.DARKGREEN);

        // Mug in closedSet --> dark brown
        else if(key.additionalEdgeValue === cellEnum.MUG)
            key.show(colorEnum.DARKBROWN);

        // Water in closedSet --> dark blue
        else if(key.additionalEdgeValue === cellEnum.WATER)
            key.show(colorEnum.DARKBLUE);
    }else if(value === 'g'){
        key.show(colorEnum.ORANGE);
    }
}

function visualizeShortestPathAlgo(){
    // Show openSet
    for(let i = 0; i < openSet.length; i++)
        openSet[i].show(colorEnum.ORANGE);
        
    // Show closedSet
    for(let i = 0; i < closedSet.length; i++){
        // Passage in closedSet --> dark grey
        if(closedSet[i].additionalEdgeValue === cellEnum.PASSAGE)
            closedSet[i].show(colorEnum.DARKGREY);

        // Tall Grass in closedSet --> dark green
        else if(closedSet[i].additionalEdgeValue === cellEnum.TALLGRASS)
            closedSet[i].show(colorEnum.DARKGREEN);

        // Mug in closedSet --> dark brown
        else if(closedSet[i].additionalEdgeValue === cellEnum.MUG)
            closedSet[i].show(colorEnum.DARKBROWN);

        // Water in closedSet --> dark blue
        else if(closedSet[i].additionalEdgeValue === cellEnum.WATER)
            closedSet[i].show(colorEnum.DARKBLUE);
    }
}