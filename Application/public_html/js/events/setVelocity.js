/* ------------ Set velocity ------------
 *  Author: Mattia Iodice
 *  Info: Set the frameRate of Processing
 */

/* global velocity, velocityEnum */

function setVelocity(typeVelocity){
    // TODO It should be better with enum
    if(typeVelocity === 'Default')
        velocity = velocityEnum.DEFAULT;
    else if(typeVelocity === 'Slow')
        velocity = velocityEnum.SLOW;
    else
        velocity = velocityEnum.VERYSLOW;
}