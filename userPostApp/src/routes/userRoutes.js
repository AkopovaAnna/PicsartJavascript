let router = require("express").Router();
const controller = require("../controller/userController");
const auth = require('../middleware/auth').auth;

exports.userRoute = router.post("/", controller.register)
    .post("/token", controller.login)
    .put("/:id", auth, controller.updateUser)
    .get("/:id", controller.getById)
    .get("/:id/search", controller.getOtherUserByQuery)
    .delete("/:id", auth, controller.deleteUser)
