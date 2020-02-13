const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");

app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/", homeRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

mongoose.connect("mongodb://localhost:27017/testdb4", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,}, function (err) {
    if (err) return console.log(err);
    app.listen(1337, function () {
        console.log("Сервер ожидает подключения...");
    });
});