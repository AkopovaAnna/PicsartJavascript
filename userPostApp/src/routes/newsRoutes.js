const controller = require("../controller/postController");

let router = require("express").Router();


exports.newsRoute = router.get("/news", controller.getAllPosts);