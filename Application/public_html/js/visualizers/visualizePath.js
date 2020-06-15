/* ---------------- Visualize Path ----------------
 *  Author: Mattia Iodice
 *  Info: Visualize colored path to target that is the reverse path
 */

/* global source, target, colorEnum */

function visualizePath(curr){
    if(curr !== null){
        visualizePath(curr.predecessor);
        curr.show(colorEnum.GOLD);
    }
}