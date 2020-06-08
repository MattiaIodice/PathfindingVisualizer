/** ---------------- Matt's Pathfinder ----------------
 *   Author: Mattia Iodice
 *   Info: Pathfinding and maze-generation visualizer
 */

// TODO Hanno senso tutti questi var scritti? Leggi documentazione!
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
// Start point position
var startX = 1;
var startY = 1;
var source;
// End point position
var endX = rows-2;
var endY = cols-2;
var target;

var grid = new Array(cols);

// Function pointers
var currentHeuristicFunc;
var currentPathfinding;
var currentMaze;

// Pathfinding
var openSet = [];           // For A* and Dijkstra, i.e. Q
var closedSet = [];         // For A* and Dijkstra, i.e. V \ Q
var colored = new Map();    // For BFS and DFS
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
const cellEnum = {
    WALL:      -1,
    PASSAGE:    0,
    TALLGRASS:  1,
    MUG:        2,
    WATER:      3
};
var colorEnum;
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
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    
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

var num = 0;

function updateLogic(){
    // Logic step
    if(pathfindingStatus === status.ACTIVE){
        console.log('Before callback ' + (num++));
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
            
            visualizePathSourceTarget();

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

/* global mouseX, mouseY */
function mousePressed() {
    // Click inside the map
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