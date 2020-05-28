/* ---------------- Visualize Map ----------------
 *  Author: Mattia Iodice
 *  Info: Show map changing additionalEdgeValue
 *        for each cell of the grid
 */


/* global grid, cols, rows, openSet, closedSet, source, target, cellEnum */

function visualizeMap(){
    // TODO Inefficient, I may save the needed change cells
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            // colorWall --> black
            if(grid[i][j].additionalEdgeValue === cellEnum.WALL)
                grid[i][j].show(color(0));
            
            // colorGround --> white
            else if(grid[i][j].additionalEdgeValue === cellEnum.PASSAGE)
                grid[i][j].show(color(255));
            
            // colorTallGrass --> green
            else if(grid[i][j].additionalEdgeValue === cellEnum.TALLGRASS)
                grid[i][j].show(color(0, 135, 0));
            
            // colorMug --> brown
            else if(grid[i][j].additionalEdgeValue === cellEnum.MUG)
                grid[i][j].show(color(173, 81, 0));
            
            // colorWater --> blue
            else if(grid[i][j].additionalEdgeValue === cellEnum.WATER)
                grid[i][j].show(color(0, 135, 131));
        }
    }

    for(let i = 0; i < openSet.length; i++)
        openSet[i].show(color(0, 255, 0));

    for(let i = 0; i < closedSet.length; i++)
        closedSet[i].show(color(255, 0, 0));

    source.show(color(0, 0, 255));
    target.show(color(255, 0, 255));
}