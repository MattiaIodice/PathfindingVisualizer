/* ---------------- Visualize Map ----------------
 *  Author: Mattia Iodice
 *  Info: Show map changing additionalEdgeValue
 *        for each cell of the grid
 */


/* global grid, cols, rows, openSet, closedSet, source, target, cellEnum, colorEnum */

// TODO Inefficient, I may save the needed change cells

function visualizeMap(){
    
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
        

    source.show(colorEnum.SOURCE);
    target.show(colorEnum.TARGET);
}