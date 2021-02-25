const controller = require("../controller/userController");

let router = require("express").Router();

module.exports = (app) => {

    router.get("/all", controller.getAll);
    router.post("/add", controller.create);
    router.put("/update/:id", controller.updateUser);
    router.get("/get/:id", controller.getById);
    router.delete("/delete/:id", controller.deleteUser);
    router.get("/filter", controller.getByQuery);

    app.use("/api/users", router);
}