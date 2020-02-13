const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

homeRouter.get("/main", homeController.main);
homeRouter.get("/", homeController.main);

module.exports = homeRouter;