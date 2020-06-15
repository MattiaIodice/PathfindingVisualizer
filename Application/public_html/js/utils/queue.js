/* ---------------- Priiority Queue ----------------
 * Author: Mattia Iodice
 * Info: Util class for the min heap data structure
 */


class Queue{
    constructor(){
        // Array to implement a queue
        this.items = [];
    }
    
    enqueue(element){
        this.items.push(element);
    }
    
    dequeue(){
        if(this.isEmpty())
            console.log('Error! The queue is empty!');
        return this.items.shift();
    }
    
    front(){
        if(this.isEmpty())
            console.log('Error! The queue is empty!');
        return this.items[0];
    }
    
    isEmpty(){
        return this.items.length === 0;
    }
}