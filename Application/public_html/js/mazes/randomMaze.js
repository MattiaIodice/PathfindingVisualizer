/* ---------------- Basic Random Maze ----------------
 * Given the grid, the number of columns, the number
 * rows and a double representing how many walls in
 * probability (denseProb), the function inserts walls
 * 
 * Author: Mattia Iodice
 * Description: Insert walls in the grid
 */


function freePointAndAdjacents(grid, pointX, pointY, rows, cols){
    grid[pointY][pointX].additionalEdgeValue = 0;
    
    if(pointY-1 >= 0)
        grid[pointX][pointY-1].additionalEdgeValue = 0;
    if(pointX-1 >= 0)
        grid[pointX-1][pointY].additionalEdgeValue = 0;
    if(pointX+1 < cols)
        grid[pointX-1][pointY].additionalEdgeValue = 0;
    if(pointY+1 < rows)
        grid[pointX-1][pointY].additionalEdgeValue = 0;
    
    grid[pointY][pointX].additionalEdgeValue = 0;
}

function randomMaze(grid, cols, rows, denseWallsProb, startX, startY, endX, endY){
    for(var i = 0; i < cols; i++)
        for(var j = 0; j < rows; j++){
            if(Math.random() <= denseWallsProb)
                grid[i][j].additionalEdgeValue = -1;
        }
    
    freePointAndAdjacents(grid, startX, startY, cols, rows);
    freePointAndAdjacents(grid, endX, endY, cols, rows);
}