/* global pathfindingStatus */

function startAndPauseButtonEvent(){
    let element = document.getElementById("startAndPauseButton");
    if(pathfindingStatus === status.ACTIVE){
        element.className = "btn btn-primary navbar-btn fa fa-play";
        pathfindingStatus = status.PAUSE;
    }else{
        element.className = "btn btn-primary navbar-btn fa fa-pause";
        pathfindingStatus = status.ACTIVE;
    }
}