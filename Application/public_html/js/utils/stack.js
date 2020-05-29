/* ---------------- Stack ----------------
 * Author: Mattia Iodice
 * Info: A util class for the stack
 */


class Stack{
    constructor(){
        // Array to implement a queue
        this.items = [];
    }
    
    push(element){
        this.items.push(element);
    }
    
    pop(){
        if(this.isEmpty())
            console.log('Error! The stack is empty!');
        return this.items.pop();
    }
    
    peek(){
        if(this.isEmpty())
            console.log('Error! The stack is empty!');
        return this.items[this.items.length-1];
    }
    
    isEmpty(){
        return this.items.length === 0;
    }
}