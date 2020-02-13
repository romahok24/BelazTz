const User = require("../models/user.js");
const statusCodes = require("../models/statusCodes.js");
const validator = require("../models/validator.js");

/**
 * GET-функция страницы enter.
 * @param {any} request
 * @param {any} response
 */
exports.enter = function (request, response) {
    response.sendFile(__dirname.replace("controllers", "") + "views/enter.html");
};

/**
 * POST-функция логина.
 * @param {any} request
 * @param {any} response
 */
exports.login = function (request, response) {
    let email = request.body.email;
    let password = request.body.password;

    let answer = validator.checkLogin(email, password);

    if (!answer.status)
        return response.json(answer);

    User.find({ email: email, password: password }, function (err, users) {

        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }

        answer = validator.checkUsersData(users);

        if (!answer.status)
            return response.json(answer);

        response.json({ status: true });
    });
};

/**
 * POST-функция регистрации.
 * @param {any} request
 * @param {any} response
 */
exports.register = function (request, response) {
    const email = request.body.email;
    const emailRepeat = request.body.emailRepeat;

    const password = request.body.password;
    const passwordRepeat = request.body.passwordRepeat;

    let answer = validator.checkRegister(email, emailRepeat, password, passwordRepeat);

    if (!answer.status)
        return response.json(answer);

    const user = new User({ email: email, password: password});

    user.save(function (err) {
        let code = "m015";

        if(err)
            code = "m018";

        return response.json(statusCodes.getAnswerObjectByCode(code));
    });  
};

/**
 * POST-функция востановления пароля.
 * @param {any} request
 * @param {any} response
 */
exports.forgot = function (request, response) {
    const email = request.body.email;

    let answer = validator.checkForgot(email);

    if (!answer.status)
        return response.json(answer);

    User.find({ email: email }, function (err, users) {

        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }

        let answer = validator.checkUsersData(users);

        response.json(answer);
    });
}

/**
 * POST-функция изменения языка.
 * @param {any} request
 * @param {any} response
 */
exports.changeLanguage = function (request, response) {
    statusCodes.changeLanguage(request.body.language);
    response.json(getPageText());
}

/**
 * POST-функция получения списка используемых слов в формах блока.
 * @param {any} request
 * @param {any} response
 */
exports.getPageText = function (request, response) {
    response.json(getPageText());
}

/**
 * Получение объекта статус_код : сообщение.
 */
function getPageText() {
    var ans = {};
    for (var i = 1; i < 10; i++)
        ans["m02" + i] = statusCodes.getMessageStringByCode("m02" + i);

    return ans;
}