function User(id, name, userName, age, isBlocked) {
    Person.call(this, arguments)
    this.accountType = "standard";
    this.isBlocked = isBlocked;
}

User.prototype = Object.create(Person.prototype);
User.prototype.constructor = User;

User.prototype.printInfo = function () {
    Person.prototype.printInfo.call(this);
    console.log(`Account type : ${this.accountType}`)
}

User.prototype.pay = function (userId) {
    console.log("payment done");

    let user = Storage.getUser(userId);
    user.accountType = "Gold";
}
