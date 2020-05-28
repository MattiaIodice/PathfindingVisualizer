/* global currentCellType, cellEnum */

function setTypeCell(type){
    
    if(type === 'Wall')
        // Add wall
        currentCellType = cellEnum.WALL;
    else if(type === 'TallGrass')
        // Add water
        currentCellType = cellEnum.TALLGRASS;
    else if(type === 'Mug')
        // Add mug
        currentCellType = cellEnum.MUG;
    else if(type === 'Water')
        // Add water
        currentCellType = cellEnum.WATER;
    else
        console.log('Error! Not yet implemented this cell type.');
}