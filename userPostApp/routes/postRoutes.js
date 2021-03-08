const postController = require("../controller/postController");
const uploadImage = require('../service/uploadService');
const auth = require('../filter/authFilter');

let router = require("express").Router();

module.exports = (app) => {

    router.get("/my/posts", auth, postController.getUserPosts);
    router.post("/:id/posts", auth, uploadImage('image'), postController.createPost);
    router.put("/:id/posts/:postId", auth, uploadImage('image'), postController.updatePost);
    router.get("/:id/posts/:postId", auth, postController.getPostById);
    router.delete("/:id/posts/:postId", auth, postController.deletePost);
    router.get("/:id/posts", auth, postController.getHandler);
    router.get("/:id/posts/:postId/photos", auth, postController.getPhotos);
    router.delete("/:id/posts:postId/photos/:photoId", auth, postController.deletePhoto);

    app.use("/api/users", router);
}