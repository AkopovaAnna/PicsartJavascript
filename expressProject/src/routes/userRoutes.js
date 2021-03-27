const controller = require("../controller/userController");

let router = require("express").Router();

exports = router.get("/", controller.getHandler)
    .post("/", controller.create)
    .get("/:id", controller.getById)
    .put("/:id", controller.updateUser)
    .delete("/:id", controller.deleteUser)
// module.exports = router;
// app.use("/api/users", router);
