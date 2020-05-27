/** ---------------- Matt's Pathfinder ----------------
 *   Author: Mattia Iodice
 *   Info: Pathfinding and maze-generation visualizer
 */

// TODO Hanno senso tutti questi var scritti? Leggi documentazione!
// Global variables

// Grid
var width = 400; // Size grid
var height = 400;
var rows = 24; // Rows grid
var cols = 24; // Cols grid
var wCell = width / cols;  // Weight and height of a cell
var hCell = height / rows;
var startX = 1;
var startY = 1;
var endX = rows-2;
var endY = cols-2;
var grid = new Array(cols);
var source;
var target;

// Function pointers
var currentHeuristicFunc;
var currentPathfinding;
var currentMaze;

// Pathfinding
var openSet = [];       // Q, this is a stack
var closedSet = [];     // V \ Q, this is a stack
var pred = new Map();   // Shortest path

// Pathfindings status
const status = {
    DEACTIVE: 'deactive',
    ACTIVE: 'inprocess',
    SUCCESS: 'success',
    FAILURE: 'failure'
};
const heuristicEnum = {
    MANHATTAN:  function(a,b){
                    return Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
                },
    EUCLIDEAN:  function(a,b){
                    return dist(a.i, a.j, b.i, b.j);
                },
    CHEBYCHEV:  function(a,b){
                    return max(Math.abs(a.i-b.i), Math.abs(a.j-b.j));
                },
    NONE:       function(a,b){
                    return 0;
                }
};
var pathfindingStatus;

// Other
var velocity = 0;

// Map flag
var mapChanged;
var lastCellUpdated;
var currentCellType;
var movingStart;
var movingEnd;
var denseWallsProb;




/** =========== Setup Function ===========
 * Init function of p5.js
 * @returns {undefined}
 */
function setup() {
    createCanvas(400, 400);
    
    for(var i = 0; i < cols; i++)
        grid[i] = new Array(rows);
    
    for(var i = 0; i < cols; i++)
        for(var j = 0; j < rows; j++){
            grid[i][j] = new CellNode(i,j);
        }
    
    source = grid[startX][startY];
    target = grid[endX][endY];
    
    
    currentHeuristicFunc = function(a,b){ // Init dynamic function pointers
        return Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
    };
    currentPathfinding = null;
    currentMaze = null;
    
    pathfindingStatus = status.DEACTIVE; // Init pathfindings status
    currentPathfinding = null;
    
    mapChanged = true; // Init map flags
    currentCellType = -1;
    denseWallsProb = 0.8;
    movingStart = false;
    movingEnd = false;
}


/** ====================== Draw function ======================
 *  draw function of p5.js
 *  It alternates one step of A* with one of draw
 * @returns {undefined}
 */

function startPathfinding(){
    if(currentPathfinding !== null){
        pathfindingStatus = status.ACTIVE;
    }
    else
        console.log('Error!\nSelect a pathfinding algorithm!\n');
}

function updateLogic(){
    // Logic step
    if(pathfindingStatus === status.ACTIVE){
        currentPathfinding();
        mapChanged = true;
    }
}

function updateMap(){
    // Refresh map
    if(mapChanged === true){
        background(180);
        
        visualizeMap();
        
        if(pathfindingStatus === status.SUCCESS){
            console.log("The shortest path distance is " + target.g);
            
            visualizePath(target);
            
            // Reset pathfindings status
            pathfindingStatus = status.DEACTIVE;
        }else if(pathfindingStatus === status.FAILURE){
            console.log("There is not exist a path");
            
            // Reset pathfindings status
            pathfindingStatus = status.DEACTIVE;
        }
        
        mapChanged = false;
    }
}

function draw() {
    updateLogic();
    updateMap();
}

function mousePressed() {
    if(pathfindingStatus === status.DEACTIVE){
        /* global mouseX, mouseY */
        currX = int(mouseX / wCell);
        currY = int(mouseY / hCell);
        
        if( (currX !== startX || currY !== startY) &&
            (currX !== endX || currY !== endY) ){
            console.log('movingStart = false');
            // If you don't click on start neither end
        
            if(grid[currX][currY].additionalEdgeValue === currentCellType)
                grid[currX][currY].additionalEdgeValue = 0;
            else
                grid[currX][currY].additionalEdgeValue = currentCellType;
            
            lastCellUpdated = grid[currX][currY];
            
            movingStart = false;
            movingEnd = false;
        }else if(currX === startX && currY === startY){
            console.log('movingStart = true');
            // If you click on start
            movingStart = true;
            movingEnd = false;
        }else if(currX === endX && currY === endY){
            // If you click on end
            movingEnd = true;
            movingStart = false;
        }
        
        mapChanged = true; // Notify view
    }
}

function mouseDragged() {
    
    if(pathfindingStatus === status.DEACTIVE){
        /* global mouseX, mouseY */
        currX = int(mouseX / wCell);
        currY = int(mouseY / hCell);
        
        console.log("currX " + currX);
        console.log("currY " + currY);
    
        // TODO Fix when outside of map
        if(movingStart){
            source = grid[currX][currY];
            startX = currX;
            startY = currY;
        }else if(movingEnd){
            target = grid[currX][currY];
            endX = currX;
            endY = currY;
        }else{
            if( (currX !== startX || currY !== startY) &&
            (currX !== endX || currY !== endY) &&
                grid[currX][currY] !== lastCellUpdated){
                
                if(grid[currX][currY].additionalEdgeValue === currentCellType)
                    grid[currX][currY].additionalEdgeValue = 0;
                else
                    grid[currX][currY].additionalEdgeValue = currentCellType;

                lastCellUpdated = grid[currX][currY];
            }
        }
        
        mapChanged = true;
    }
}