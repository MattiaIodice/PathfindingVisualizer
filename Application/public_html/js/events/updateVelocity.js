/* global velocity */

function updateVelocity(){
    if(velocity !== 3){ // Not fast
        if(velocity === 1){ // Slow
            setTimeout(4000);
        }else{ // Medium
            setTimeout(500);
        }
    }
}