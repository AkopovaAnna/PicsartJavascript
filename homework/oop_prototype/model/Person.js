function Person(id, name, userName, age, isAdmin) {
    this.id= id;
    this.name = name;
    this.userName = userName;
    this.age = age;
}

Person.prototype.printInfo = function (){
    console.log(`id : ${this.id}`);
    console.log(`name : ${this.name}`);
    console.log(`userName : ${this.userName}`);
    console.log(`age : ${this.age}`);
}