const router = require("express").Router();
const postController = require("../controller/postController");
const uploadImage = require('../service/uploadService');
const auth = require('../middleware/auth').auth;


exports.postRoute = router.get("/my/posts", auth, postController.getUserPosts)
    .post("/:id/posts", auth, uploadImage('image'), postController.createPost)
    .put("/:id/posts/:postId", auth, uploadImage('image'), postController.updatePost)
    .get("/:id/posts/:postId", auth, postController.getPostById)
    .get("/:id/posts", postController.getHandler)
    .get("/:id/posts/:postId/photos", auth, postController.getPhotos)
    .delete("/:id/posts/:postId", auth, postController.deletePost)
    .delete("/:id/posts/:postId/photos/:photoId", auth, postController.deletePhoto);

