function Queue() {
    let queue = [];
    let front = 0;
    let end = 0;

    this.enqueue = function (element) {
        if (element) {
            queue[end] = element;
            end++;
        }
    };

    this.dequeue = function () {
        if (this.isEmpty()) {
            console.log("queue is empty");
        } else {
            const element = queue[front];
            delete queue[front];
            queue = queue.filter(function () {
                return true
            }); //maybe wrong check for filter
            //filter(elem => elem != null) maybe wrong check for filter

            end--;
            return element;
        }
    };

    this.isEmpty = function () {
        return queue.length === 0;
    }

    this.size = function () {
        return queue.length;
    }

    this.printInfo = function () {
        console.log(queue);
    }
}

let queue = new Queue();
queue.dequeue();
queue.enqueue("A1");
queue.enqueue("B2");
queue.enqueue("C3");
queue.enqueue("D4");
queue.enqueue(null);
queue.enqueue(undefined);
console.log("size " + queue.size());
queue.printInfo();
console.log("deque: " + queue.dequeue())
console.log("size " + queue.size());
queue.printInfo();
console.log("deque: " + queue.dequeue())
console.log("size " + queue.size());
queue.enqueue("E5");
queue.enqueue("F6");
console.log("size " + queue.size());
queue.printInfo();
console.log("deque: " + queue.dequeue())
console.log("size " + queue.size());
queue.printInfo();
