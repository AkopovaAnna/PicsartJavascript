let stack = [];

function pop() {
    if (isEmpty()) {
        console.log("stack is empty");
    }

    let topVal = stack[stack.length - 1];
    --stack.length;
    return topVal;
}

function peek() {
    if (isEmpty()) {
        console.log("stack is empty");
    } else {
        return stack[stack.length - 1];
    }
}

function push(item) {
    if (item) {
        stack[stack.length++] = item;
    } else {
        console.log("not valid value");
    }
}

function isEmpty() {
    return stack.length === 0;
}

function size() {
    return stack.length;
}

function print() {
    for (let i = stack.length - 1; i >= 0; i--) {
        console.log(stack[i]);
    }
}

peek()
push(3);
push(4);
push(5);

console.log(stack)
console.log(peek())
console.log("size: " + size());
console.log(pop());
console.log("size: " + size());
console.log("print");
print();
