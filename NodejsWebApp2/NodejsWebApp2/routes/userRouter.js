const express = require("express");

const userController = require("../controllers/userController.js");

const userRouter = express.Router();
const jsonParser = express.json();

userRouter.use("/register", jsonParser, userController.register);
userRouter.use("/enter", userController.enter);
userRouter.use("/login", jsonParser, userController.login);
userRouter.use("/forgot", jsonParser, userController.forgot);
userRouter.use("/getPageText", jsonParser, userController.getPageText);
userRouter.use("/changeLanguage", jsonParser, userController.changeLanguage);

module.exports = userRouter;