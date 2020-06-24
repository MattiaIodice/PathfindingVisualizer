/* global pathfindingStatus */

function stopButtonEvent(){
    
    let element = document.getElementById("startAndPauseButton");
    element.className = "btn btn-primary navbar-btn fa fa-pause";
    element.disabled = true;
    
    document.getElementById("StopButton").disabled = true;
    
    pathfindingStatus = status.DEACTIVE;
    resetAlgo();
}