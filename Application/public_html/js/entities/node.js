/** ------------------------ Node Graph ---------------------
  * 
  * A node is a cell of the grid identified by (i,j) position
  * @param {int} i
  * @param {int} j
  * @returns {object} Node 
*/
 
/* global hCell, wCell, cols, rows */

function CellNode(i,j){
    this.i = i; // Position
    this.j = j;
    
    this.f = 0; // estimate, f = g+h
    this.g = 0; // distance
    this.h = 0; // heuristic
    this.predecessor;
    
    this.neighbors = [];
    /* ---- Important property of node ----
     * additionalEdgeValue = -1 <=> Wall
     * additionalEdgeValue = 0  <=> Ground
     * additionalEdgeValue = 1  <=> Mug
     * additionalEdgeValue = 2  <=> Water
     */
    this.additionalEdgeValue = 0;
    
    // Methods
    this.show = function(col){
        fill(col);
        noStroke();
        rect(this.i*wCell, this.j*hCell, wCell-1, hCell-1);
    };
    
    this.addNeighbors = function(grid){
        var i = this.i;
        var j = this.j;
        
        if(i < cols-1 && grid[i+1][j].additionalEdgeValue !== -1)
            this.neighbors.push(grid[i+1][j]);
        
        if(i > 0 && grid[i-1][j].additionalEdgeValue !== -1)
            this.neighbors.push(grid[i-1][j]);
        
        if(j < rows-1 && grid[i][j+1].additionalEdgeValue !== -1)
            this.neighbors.push(grid[i][j+1]);
        
        if(j > 0 && grid[i][j-1].additionalEdgeValue !== -1)
            this.neighbors.push(grid[i][j-1]);
    };
}