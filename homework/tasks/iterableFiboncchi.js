const fib = {

    [Symbol.iterator]: function () {
        let n1 = 0;
        let n2 = 1;
        let value = n1 + n2;
        return {
            next() {
                n1 = n2;
                n2 = value;
                value = n1 + n2;

                return {
                    value: n1,
                    done: false
                }
            }
        }
    }
}

console.log("iterator");
for (let v of fib) {
    if (v > 10) break;
    console.log(v);
}

function* genFib(num) {

    let n1 = 0;
    let n2 = 1;
    let value = n1 + n2;
    yield n1;
    yield n2;
    while (value <= num) {
        yield value;
        n1 = n2;
        n2 = value;
        value = n1 + n2;
    }
}

console.log("generator");
let gen = genFib(8);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
