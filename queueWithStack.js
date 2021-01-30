function createStack() {
    const stack = [];
    return {
        push: function (item) {
            if (item) {
                stack[stack.length++] = item;
            } else {
                console.log("not valid value");
            }
        },

        peek: function () {
            if (isEmpty()) {
                console.log("stack is empty");
            } else {
                return stack[stack.length - 1];
            }
        },

        pop: function () {
            if (this.isEmpty()) {
                console.log("stack is empty");
            } else {
                let topVal = stack[stack.length - 1];
                --stack.length;
                return topVal;
            }

        },

        isEmpty: function () {
            return stack.length === 0;
        },

        print: function () {
            for (let i = stack.length - 1; i >= 0; i--) {
                console.log(stack[i]);
            }
        }
    }
}

function createQueue() {

    let stack1 = createStack();
    let stack2 = createStack();


    return {
        enqueue: function (element) {
            stack1.push(element)
        },

        dequeue: function () {
            if (stack2.isEmpty()) {
                while (!stack1.isEmpty()) {
                    stack2.push(stack1.pop());
                }
            }
            return stack2.pop();
        },
    }
}

let queue1 = createQueue();

queue1.dequeue();
queue1.enqueue("A1");
queue1.enqueue("B2");
queue1.enqueue("C3");
queue1.enqueue("D4");
console.log(queue1.dequeue())


