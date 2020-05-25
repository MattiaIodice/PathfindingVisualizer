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
var algorithmInProcess; // Pathfindings flags
var algorithmFinished;
var algorithmSucess;

// Other
var lastCellUpdated;
var currentCellType = -1;
var velocity = 0;
var denseWallsProb = 0.8;
var mapChanged;




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
    
    // Init dynamic function pointers
    currentHeuristicFunc = function(a,b){
        return Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
    };
    currentPathfinding = null;
    currentMaze = null;
    // Init pathfindings flags
    algorithmInProcess = false;
    algorithmFinished = false;
    algorithmSucess = false;
    currentPathfinding = null;
    
    mapChanged = true;
}


/** ====================== Draw function ======================
 *  draw function of p5.js
 *  It alternates one step of A* with one of draw
 * @returns {undefined}
 */

function startPathfinding(){
    if(currentPathfinding !== null)
        algorithmInProcess = true;
    else
        console.log('Error!\nSelect a pathfinding algorithm!\n');
}

function updateLogic(){
    // Logic step
    if(algorithmInProcess === true){
        currentPathfinding();
    }
}

function updateMap(){
    // Refresh map
    if(mapChanged === true){
        background(180);
        
        visualizeMap();
        
        if(algorithmFinished === true && algorithmSucess === true){
            visualizePath(target);
            console.log("The shortest path distance is " + target.g);
            // Reset flags pathfindings
            algorithmFinished = false;
            algorithmSucess = false;
            currentPathfinding = null;
        }
        
        mapChanged = false;
    }
}

function draw() {
    updateLogic();
    updateMap();
}

function mousePressed() {
    console.log("mouseX " + mouseX);
    console.log("mouseY " + mouseY);
    if(algorithmInProcess === false && algorithmFinished === false){
        /* global mouseX, mouseY */
        currX = int(mouseX / wCell);
        currY = int(mouseY / hCell);
        // TODO Fix when outside of map
        if( (currX !== startX || currY !== startY) &&
            (currX !== endX || currY !== endY) ){
            
            if(grid[currX][currY].additionalEdgeValue === currentCellType)
                grid[currX][currY].additionalEdgeValue = 0;
            else
                grid[currX][currY].additionalEdgeValue = currentCellType;
            
            lastCellUpdated = grid[currX][currY];
            mapChanged = true; // Notify view
        }
    }
}

function mouseDragged() {
    console.log("mouseX " + mouseX);
    console.log("mouseY " + mouseY);
    if(algorithmInProcess === false && algorithmFinished === false){
        /* global mouseX, mouseY */
        currX = int(mouseX / wCell);
        currY = int(mouseY / hCell);
        // TODO Fix when outside of map
        if( (currX !== startX || currY !== startY) &&
            (currX !== endX || currY !== endY) &&
            grid[currX][currY] !== lastCellUpdated){
            
            if(grid[currX][currY].additionalEdgeValue === currentCellType)
                grid[currX][currY].additionalEdgeValue = 0;
            else
                grid[currX][currY].additionalEdgeValue = currentCellType;
            
            lastCellUpdated = grid[currX][currY];
            mapChanged = true;
        }
    }
}