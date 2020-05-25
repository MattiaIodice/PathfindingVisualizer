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