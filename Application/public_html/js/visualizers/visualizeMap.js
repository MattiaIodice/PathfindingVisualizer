/* ---------------- Visualize Map ----------------
 *  Author: Mattia Iodice
 *  Info: Show map changing additionalEdgeValue
 *        for each cell of the grid
 */


/* global grid, cols, rows, openSet, closedSet, primInProcess, source, target */

function visualizeMap(){
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            if(grid[i][j].additionalEdgeValue === -1)
                // wall = black
                grid[i][j].show(color(0));
            else if(grid[i][j].additionalEdgeValue === 0)
                // ground = white
                grid[i][j].show(color(255));
            else if(grid[i][j].additionalEdgeValue === 1)
                // mug = brown
                grid[i][j].show(color(173, 81, 0));
            else
                // water = blue
                grid[i][j].show(color(0, 135, 131));
        }
    }

    for(let i = 0; i < openSet.length; i++)
        openSet[i].show(color(0, 255, 0));

    // if(primInProcess === false)
        for(let i = 0; i < closedSet.length; i++)
            closedSet[i].show(color(255, 0, 0));

    source.show(color(0, 0, 255));
    target.show(color(255, 0, 255));
}