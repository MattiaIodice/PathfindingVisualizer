/* TODO Functions for event and change of velocity */

/* global velocity */

function setVelocity(evt){
    // TODO It should be better with enum
    if(evt.target.value === "Fast")
        velocity = 0;
    else if(evt.target.value === "Medium")
        velocity = 1;
    else
        velocity = 2;
}

function updateVelocity(){
    if(velocity !== 3){ // Not fast
        if(velocity === 1){ // Slow
            setTimeout(4000);
        }else{ // Medium
            setTimeout(500);
        }
    }
}