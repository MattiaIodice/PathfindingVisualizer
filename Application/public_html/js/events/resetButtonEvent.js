/* global grid, rows, cols */

function resetButtonEvent(){
    for(var i = 0; i < cols; i++)
        for(var j = 0; j < rows; j++)
            grid[i][j].additionalEdgeValue = 0;
    resetAlgo();
}