const controller = require("../controller/userController");

let router = require("express").Router();

module.exports = (app) => {

    router.get("/", controller.getHandler);
    router.post("/", controller.create);
    router.get("/:id", controller.getById);
    router.put("/:id", controller.updateUser);
    router.delete("/:id", controller.deleteUser);

    app.use("/api/users", router);
}