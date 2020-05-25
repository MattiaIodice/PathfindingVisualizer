/* global openSet, closedSet, pred, mapChanged */

function resetAlgo(){
    
    let n = openSet.length;
    for(var i = 0; i < n; i++){
       console.log(i);
       openSet.pop();
    }
        
    n = closedSet.length;
    for(var i = 0; i < n; i++)
        closedSet.pop();
    
    
    
    pred = [];
    mapChanged = true;
}