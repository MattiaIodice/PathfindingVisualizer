function helloMaze(grid, startX, startY){
    
    // Letter H
    for(let i = 2; i <= 10; i++){
        grid[3][i].additionalEdgeValue = -1;
        grid[7][i].additionalEdgeValue = -1;
    }
    for(let i = 3; i <= 7; i++)
        grid[i][6].additionalEdgeValue = -1;
    
    // Letter e
    grid[10][6].additionalEdgeValue = -1;
    grid[9][7].additionalEdgeValue = -1;
    grid[11][7].additionalEdgeValue = -1;
    grid[9][8].additionalEdgeValue = -1;
    grid[10][8].additionalEdgeValue = -1;
    grid[11][8].additionalEdgeValue = -1;
    grid[9][9].additionalEdgeValue = -1;
    grid[10][10].additionalEdgeValue = -1;
    grid[11][10].additionalEdgeValue = -1;
    
    // Letters ll
    for(let i = 0; i <= 1; i++){
        for(let j = 3; j <= 9; j++){
            grid[13+3*i][j].additionalEdgeValue = -1;
        }
        grid[14+3*i][10].additionalEdgeValue = -1;
    }
    
    // Letter o
    grid[20][7].additionalEdgeValue = -1;
    grid[19][8].additionalEdgeValue = -1;
    grid[21][8].additionalEdgeValue = -1;
    grid[19][9].additionalEdgeValue = -1;
    grid[21][9].additionalEdgeValue = -1;
    grid[20][10].additionalEdgeValue = -1;
    
    // Letter M
    for(let i = 12; i <= 20; i++){
        grid[3][i].additionalEdgeValue = -1;
        grid[7][i].additionalEdgeValue = -1;
    }
    grid[6][13].additionalEdgeValue = -1;
    grid[5][14].additionalEdgeValue = -1;
    grid[4][13].additionalEdgeValue = -1;
    
    // Letter a
    grid[10][16].additionalEdgeValue = -1;
    grid[11][16].additionalEdgeValue = -1;
    grid[11][17].additionalEdgeValue = -1;
    grid[9][18].additionalEdgeValue = -1;
    grid[10][18].additionalEdgeValue = -1;
    grid[11][18].additionalEdgeValue = -1;
    grid[9][19].additionalEdgeValue = -1;
    grid[11][19].additionalEdgeValue = -1;
    grid[10][20].additionalEdgeValue = -1;
    grid[11][20].additionalEdgeValue = -1;
    
    // Letter z
    for(let i = 0; i < 3; i++){
        grid[13+i][16].additionalEdgeValue = -1;
        grid[13+i][20].additionalEdgeValue = -1;
    }
    
    grid[13][19].additionalEdgeValue = -1;
    grid[14][18].additionalEdgeValue = -1;
    grid[15][17].additionalEdgeValue = -1;
    
    // Letter e
    let translateX = 8;
    let translateY = 10;
    grid[10+translateX][6+translateY].additionalEdgeValue = -1;
    grid[9+translateX][7+translateY].additionalEdgeValue = -1;
    grid[11+translateX][7+translateY].additionalEdgeValue = -1;
    grid[9+translateX][8+translateY].additionalEdgeValue = -1;
    grid[10+translateX][8+translateY].additionalEdgeValue = -1;
    grid[11+translateX][8+translateY].additionalEdgeValue = -1;
    grid[9+translateX][9+translateY].additionalEdgeValue = -1;
    grid[10+translateX][10+translateY].additionalEdgeValue = -1;
    grid[11+translateX][10+translateY].additionalEdgeValue = -1;
    
    // Letter !
    for(let i = 12; i <= 18; i++)
        grid[21][i].additionalEdgeValue = -1;
    
    grid[21][20].additionalEdgeValue = -1;
    
    grid[startX][startY].additionalEdgeValue = 0;
    grid[endX][endY].additionalEdgeValue = 0;
}