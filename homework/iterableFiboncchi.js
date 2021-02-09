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

for (let v of fib) {
    if (v > 10) break;
    console.log(v);
}
