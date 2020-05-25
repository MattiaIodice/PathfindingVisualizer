/* ---------------- Remove From Array ----------------
 *  Author: Mattia Iodice
 *  Info: Remove from the input array an element
 */


function removeFromArray(arr, elt){
    for(let i = arr.length-1; i >= 0; i--){
        if(arr[i] === elt)
            arr.splice(i, 1);
    }
}