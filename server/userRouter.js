const Router = require("express");
const userRouter = new Router();
const userController = require("./userController");
const tokenMiddleware = require('./middleware/tokenMiddleware')

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.get("/auth",tokenMiddleware, userController.check);

module.exports = userRouter;
