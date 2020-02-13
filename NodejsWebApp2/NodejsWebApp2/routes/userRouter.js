const express = require("express");
const jsonParser = express.json();

const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.use("/register", jsonParser, userController.register);
userRouter.use("/enter", userController.enter);
userRouter.use("/login", jsonParser, userController.login);
userRouter.use("/forgot", jsonParser, userController.forgot);
userRouter.use("/getPageText", jsonParser, userController.getPageText);
userRouter.use("/changeLanguage", jsonParser, userController.changeLanguage);

module.exports = userRouter;