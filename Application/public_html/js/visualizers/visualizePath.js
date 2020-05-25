/* ---------------- Visualize Path ----------------
 *  Author: Mattia Iodice
 *  Info: Visualize the colored path to curr.
 *       This is the reverse path
 */


function visualizePath(curr){
    if(curr !== null){
        visualizePath(curr.predecessor);
        curr.show(color(255, 255, 0));
    }
}