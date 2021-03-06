/** ---------------- Matt's Pathfinder ----------------
 *   Author: Mattia Iodice
 *   Info: Pathfinding and maze-generation visualizer
 */

// Global variables

// Size canvas
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 600;
// Rows and columns of grid
var rows = 24;
var cols = 24;
// Weight and height of a grid cell
var wCell = CANVAS_WIDTH / cols;
var hCell = CANVAS_HEIGHT / rows;
// Source info
var startX = 1;
var startY = 1;
var source;
// Target info
var endX = rows-2;
var endY = cols-2;
var target;

var grid = new Array(cols);

// Function pointers
var currentHeuristicFunc;
var currentPathfinding;
var currentMaze;

// Pathfinding Data Structures
var openSet;            // For A* and Dijkstra, i.e. Q
var closedSet;          // For A* and Dijkstra, i.e. V \ Q
var color;              // For BFS and DFS
var queue;              // For BFS
var stack;              // For DFS

// Pathfindings status
const status = {
    // Set Enum for strings
    DEACTIVE: 'deactive',
    ACTIVE: 'inprocess',
    PAUSE: 'pause',
    SUCCESS: 'success',
    FAILURE: 'failure'
};
var algorithmInProgress;
const heuristicEnum = {
    // Set Enum for functions
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
const cellEnum = {
    // Set Enum for weights
    WALL:      -1,
    PASSAGE:    0,
    TALLGRASS:  1,
    MUG:        3,
    WATER:      4
};
var colorEnum;
const velocityEnum = {
    DEFAULT: 'default',
    SLOW : 'slow',
    VERYSLOW: 'veryslow'
};
var velocity;


var pathfindingStatus;

// Map flag
var mapChanged;
var lastCellUpdated;
var currentCellType;
var movingStart;
var movingEnd;
var denseWallsProb;




/** =================================================================
 *  =========== p5JS function - Init all global variables ===========
 *  ================================================================= */
function setup() {
    colorEnum = {
        // Empty cells
        BLACK:  color(0),
        WHITE:  color(255),
        GREEN:  color(0, 135, 0),
        BROWN:  color(173, 81, 0),
        BLUE:   color(0, 135, 131),

        // closedSet
        DARKGREY:   color(70, 70, 70),
        DARKGREEN:  color(0, 45, 0),
        DARKBROWN:  color(85, 30, 0),
        DARKBLUE:   color(0, 36, 86),

        // openSet
        ORANGE: color(255, 119, 0),

        // path
        GOLD: color(255, 255, 0),

        // path
        SOURCE: color(0, 0, 255),
        TARGET: color(255, 0, 255)
    };
    console.log('CANVAS_WIDTH ' + CANVAS_WIDTH);
    console.log('CANVAS_HEIGHT ' + CANVAS_HEIGHT);
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent('sketch-holder');
    
    for(var i = 0; i < cols; i++)
        grid[i] = new Array(rows);
    
    openSet = [];           // For A* and Dijkstra, i.e. Q
    closedSet = [];         // For A* and Dijkstra, i.e. V \ Q
    color = new Map();      // For BFS and DFS
    queue = [];             // For BFS and DFS
    
    for(var i = 0; i < cols; i++)
        for(var j = 0; j < rows; j++){
            grid[i][j] = new CellNode(i,j);
            color.set(grid[i][j], 'w');
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
    
    background(180);
}

/** =================================================================
 *  ================ p5JS function - Logic + Refresh ================
 *  ================================================================= */
function draw() {
    if(pathfindingStatus === status.ACTIVE){
        // Pathfinding in progress
        currentPathfinding();
        updateMap();
        console.log('status = ACTIVE');
    }else if(mapChanged === true){
        // User interaction
        updateMap();
        console.log('status = UI');
    }else if(pathfindingStatus === status.PAUSE){
        console.log('status = PAUSE');
    }
    
}



navbarFlag = false;
/** =================================================================
 *  ================ p5JS function - Left click mouse ===============
 *  ================================================================= */
/* global mouseX, mouseY */
function mousePressed() {
    // Click inside the map
    if(navbarFlag === true){
        navbarFlag = false;
        return;
    }
    
    if(mouseX >= 0 && mouseX < CANVAS_WIDTH && mouseY >= 0 && mouseY < CANVAS_HEIGHT){
        // If there is not an algorithm in process
        if(pathfindingStatus === status.DEACTIVE){            
            currX = int(mouseX / wCell);
            currY = int(mouseY / hCell);

            if( (currX !== startX || currY !== startY) &&
                (currX !== endX || currY !== endY) ){
                // Click neither on start nor on end
                if(grid[currX][currY].additionalEdgeValue === currentCellType)
                    grid[currX][currY].additionalEdgeValue = 0;
                else
                    grid[currX][currY].additionalEdgeValue = currentCellType;

                lastCellUpdated = grid[currX][currY];

                movingStart = false;
                movingEnd = false;
            }else if(currX === startX && currY === startY){
                // Click on start
                movingStart = true;
                movingEnd = false;
            }else if(currX === endX && currY === endY){
                // Click on end
                movingEnd = true;
                movingStart = false;
            }
            
            // Notify view
            mapChanged = true;
        }
    }
    
}

/** =================================================================
 *  ================ p5JS function - Left drag mouse ================
 *  ================================================================= */
/* global mouseX, mouseY */
function mouseDragged() {
    // Click inside the map
    if(mouseX >= 0 && mouseX < CANVAS_WIDTH && mouseY >= 0 && mouseY < CANVAS_HEIGHT){
        // If there is not an algorithm in process
        if(pathfindingStatus === status.DEACTIVE){
            currX = int(mouseX / wCell);
            currY = int(mouseY / hCell);
            
            if(movingStart){
                if(currX !== endX || currY !== endY){
                    // Drag start point
                    source = grid[currX][currY];
                    startX = currX;
                    startY = currY;
                }
            }else if(movingEnd){
                if(currX !== startX || currY !== startY){
                    // Drag end point
                    target = grid[currX][currY];
                    endX = currX;
                    endY = currY;
                }
            }else{
                if( (currX !== startX || currY !== startY) &&
                (currX !== endX || currY !== endY) &&
                    grid[currX][currY] !== lastCellUpdated){
                    // Drag neither on start nor on end
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
}

