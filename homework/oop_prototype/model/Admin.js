function Admin(id, name, userName, age) {
    Person.call(this, arguments)
}

Admin.prototype = Object.create(Person.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.printInfo = function () {
    Person.prototype.printInfo.call(this);
}

User.prototype.blockUser = function (uname) {

    let user = Storage.getUser(uname);
        if (user.isBlocked)
            console.log('User is blocked')
        else user.isBlocked = true;

}

User.prototype.unblockUser = function (uname) {
    let user = Storage.getUser(uname);
    if (!user.isBlocked)
        console.log('User already unblocked')
    else user.isBlocked = false;
}

