function Storage(){}

const users = new Map();
const posts = new Map();
const photos = new Map();

Storage.addUser = function (user){
    if (!users.has(user.userName))
        users.set(user.userName, user)
    else
        throw new Error('User already exists : ' + user.userName)
}

Storage.getUser = function (userName){
    let user = users.get(userName)
    if (user) return user
    throw new Error('User not found : ' + userName)
}

Storage.getAllUsers = function () {
    return users;
}
Storage.addPost = function (post){
    if (!posts.has(post.id))
        posts.set(post.id, post)
    else
        throw new Error('Post already exists : ' + post.id)
}

Storage.getPost = function (postId){
    let post = posts.get(postId)
    if (post) return post
    throw new Error('post not found : ' + postId)
}
Storage.getAllPosts = function () {
    return posts;
}

Storage.addPhoto = function (photo){
    if (!photos.has(photo.id))
        photo.set(photo.id, photo)
    else
        throw new Error('Post already exists : ' + post.id)
}

Storage.getPhoto = function (photoId){
    let photo = photos.get(photoId)
    if (photo) return photo
    throw new Error('User not found : ' + photoId)
}

Storage.getAllPhotos = function () {
    return photos;
}