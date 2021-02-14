function Reaction(id, postId,userId,likeType) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.likeType = likeType;
}


Reaction.prototype.printInfo = function (){
    console.log(`id : ${this.id}`);
    console.log(`post : ${this.postId}`);
    console.log(`user : ${this.userId}`);
    console.log(`reaction : ${this.likeType}`);
}

