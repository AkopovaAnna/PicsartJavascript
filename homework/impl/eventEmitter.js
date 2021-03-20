
function EventEmitter() {}

EventEmitter.prototype.on = function (event, callback) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(callback);
        return this;
    };

EventEmitter.prototype.emit = function (event) {
    this._events = this._events || {};
    if (!(event in this._events)) return false;
    for (let i=0; i < this._events[event].length; i++) {
        this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    return true;
};

function Test() {}

Test.prototype = Object.create(EventEmitter.prototype);
Test.prototype.constructor = Test;
Test.prototype.sayHello = function () {
    console.log('Hello!');
    this.emit('greeted');
};

let test = new Test();

test.on('greeted', function () {
    console.log('has said hello');
});

test.sayHello();