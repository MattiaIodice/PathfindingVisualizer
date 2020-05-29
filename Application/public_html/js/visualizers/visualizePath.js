/* ---------------- Visualize Path ----------------
 *  Author: Mattia Iodice
 *  Info: Visualize the colored path from source to
 *        target. This is the reverse path
 */

/* global source, target, colorEnum */


function visualizePathSourceTarget(){
    visualizePath(target);
    source.show(colorEnum.SOURCE);
    target.show(colorEnum.TARGET);
}

function visualizePath(curr){
    if(curr !== null){
        visualizePath(curr.predecessor);
        curr.show(colorEnum.GOLD);
    }
}