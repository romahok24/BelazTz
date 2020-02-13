/**
 * GET-функция страницы main.
 * @param {any} request
 * @param {any} response
 */
exports.main = function (request, response) {
    response.sendFile(__dirname.replace("controllers", "") + "views/main.html");
};