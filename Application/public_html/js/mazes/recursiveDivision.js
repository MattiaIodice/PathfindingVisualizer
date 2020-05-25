/* ---------------- Recursive Division Algorithm ----------------
 * This is a function created by Clement Mihailescu that I
 * changed to adapt to my application. I splitted it into two
 * different functions per side
 * 
 * Author: Clement Mihailescu
 * Description: Generate a maze with Recursive Division Algorithm
 */

function recursiveDivision(grid, rows, cols, sideHorizontal){
    initWalls(grid, rows, cols);
    
    if(sideHorizontal === true){
        recursiveDivisionHorizontal(grid, 1, rows-2, 1, cols-2);
    }else{
        recursiveDivisionVertical(grid, 1, rows-2, 1, cols-2);
    }
};



function initWalls(grid, rows, cols){
    for(let i = 0; i < cols; i++){
        grid[i][0].additionalEdgeValue = -1;
        grid[i][rows-1].additionalEdgeValue = -1;
    }
    
    for(let i = 0; i < rows; i++){
        grid[0][i].additionalEdgeValue = -1;
        grid[cols-1][i].additionalEdgeValue = -1;
    }
};

function recursiveDivisionHorizontal(grid, rowStart, rowEnd, colStart, colEnd, surroundingWalls) {
    console.log("Horizontal");
    console.log("rowStart: " + rowStart +
              ", colStart: " + colStart +
              ", rowEnd: " + rowEnd +  
              ", colEnd: " + colEnd);
    
    if (rowEnd < rowStart || colEnd < colStart)
        return;
  
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number+=2) {
        possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart-1; number <= colEnd+1; number+=2) {
        possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    console.log("currentRow: " + currentRow +
                ", colRandom: " + colRandom);
    
    // Add line of walls
    for(let c = colStart-1; c <= colEnd+1; c++){
        if(c !== colRandom)
            grid[c][currentRow].additionalEdgeValue = -1;
    }
    
    // Divide in two and solve recursively
    if (currentRow - 2 - rowStart > colEnd - colStart) {
        recursiveDivisionHorizontal(grid, rowStart, currentRow - 2, colStart, colEnd, surroundingWalls);
    } else {
        recursiveDivisionVertical(grid, rowStart, currentRow - 2, colStart, colEnd, surroundingWalls);
    }
    
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        recursiveDivisionHorizontal(grid, currentRow + 2, rowEnd, colStart, colEnd, surroundingWalls);
    } else {
        recursiveDivisionVertical(grid, currentRow + 2, rowEnd, colStart, colEnd, surroundingWalls);
    }
};

function recursiveDivisionVertical(grid, rowStart, rowEnd, colStart, colEnd, surroundingWalls) {
    console.log("Vertical");
    console.log("rowStart: " + rowStart +
              ", colStart: " + colStart +
              ", rowEnd: " + rowEnd +  
              ", colEnd: " + colEnd);
    
    if (rowEnd < rowStart || colEnd < colStart)
        return;

    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
        possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart + 1; number <= rowEnd + 1; number += 2) {
        possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    console.log("currentCol: " + currentCol +
                ", rowRandom: " + rowRandom);
    
    // Add line of walls
    for(let r = rowStart-1; r <= rowEnd+1; r++){
        if(r !== rowRandom)
            grid[currentCol][r].additionalEdgeValue = -1;
    }
    
    // Divide in two and solve recursively
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
        recursiveDivisionHorizontal(grid, rowStart, rowEnd, colStart, currentCol - 2, surroundingWalls);
    } else {
        recursiveDivisionVertical(grid, rowStart, rowEnd, colStart, currentCol - 2, surroundingWalls);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        recursiveDivisionHorizontal(grid, rowStart, rowEnd, currentCol + 2, colEnd, surroundingWalls);
    } else {
        recursiveDivisionVertical(grid, rowStart, rowEnd, currentCol + 2, colEnd, surroundingWalls);
    }
};