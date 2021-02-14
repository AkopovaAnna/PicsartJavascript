function Photo(id, userId, size, extension, url) {
    this.id = id;
    this.userId = userId;
    this.size = size;
    this.ext = extension;
    this.url = url;
}

Photo.prototype.printInfo = function (){
    console.log(`id : ${this.id}`);
    console.log(`size : ${this.size}`);
    console.log(`extension : ${this.ext}`);
    console.log(`url : ${this.url}`);
}

Photo.prototype.addUserPhoto = function (photo) {
        Storage.addPhoto(photo)
        console.log('Photo successfully added')
}
