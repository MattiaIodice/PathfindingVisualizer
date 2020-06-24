/* ------------ Set velocity ------------
 *  Author: Mattia Iodice
 *  Info: Set the frameRate of Processing
 */

/* global velocity, velocityEnum */

function setVelocity(typeVelocity){
    // TODO It should be better with enum
    if(typeVelocity === 'Default'){
        velocity = velocityEnum.DEFAULT;
        document.getElementById("currentSpeed").innerHTML = "<b>Normal</b>";
    }else if(typeVelocity === 'Slow'){
        velocity = velocityEnum.SLOW;
        document.getElementById("currentSpeed").innerHTML = "<b>Slow</b>";
    }else{
        velocity = velocityEnum.VERYSLOW;
        document.getElementById("currentSpeed").innerHTML = "<b>Very slow</b>";
    }
}