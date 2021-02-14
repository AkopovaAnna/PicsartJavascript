function Post(id, userId, photoId, text, creationDate) {
    this.id = id;
    this.userId = userId;
    this.photoId = photoId;
    this.text = text;
    this.creationDate = creationDate
    this._reaction = [];
}

Post.prototype.printInfo = function (){
    console.log(`id : ${this.id}`);
    console.log(`text : ${this.text}`);
    console.log(`creationDate : ${this.creationDate}`);
}

Post.prototype.addReaction = function (reaction) {
    this._reaction.push(reaction);
    console.log('reaction is ' + reaction)
}

Post.prototype.addPost = function (post) {
    Storage.addPost(post);
    console.log('post ' + post)
}

Post.prototype.deletePost = function (postId) {
    let posts = Storage.getAllPosts()
    posts.delete(postId);
}
