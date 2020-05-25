/* global currentCellType */

function setTypeCell(type){
    // TODO It should be better with enum
    if(type === 'Wall')
        // Add wall
        currentCellType = -1;
    else if(type === 'Mug')
        // Add mug
        currentCellType = 1;
    else
        // Add water
        currentCellType = 2;
}