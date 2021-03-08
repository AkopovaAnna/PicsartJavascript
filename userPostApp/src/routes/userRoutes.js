const controller = require("../controller/userController");
const auth = require('../filter/authFilter');

let router = require("express").Router();

module.exports = (app) => {

    router.post("/", controller.register);
    router.post("/token", controller.login);
    router.get("/:id", auth, controller.getById);
    router.put("/:id", auth, controller.updateUser);
    router.delete("/:id", auth, controller.deleteUser);
    router.post("/logout", auth, controller.logout);
    router.get("/:id/search", auth, controller.getOtherUser);

    app.use("/api/users", router);
}