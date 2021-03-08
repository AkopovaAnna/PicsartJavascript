const controller = require("../controller/postController");

let router = require("express").Router();

module.exports = (app) => {

    router.get("/news", controller.getAllPosts);

    app.use("/api/blog", router);
}