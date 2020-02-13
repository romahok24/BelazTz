exports.main = function (request, response) {
    response.sendFile(__dirname.replace("controllers", "") + "views/main.html");
};