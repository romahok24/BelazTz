const User = require("../models/user.js");
const statusCodes = require("../models/statusCodes.js");
const validator = require("../models/validator.js");

exports.enter = function (request, response) {
    response.sendFile(__dirname.replace("controllers", "") + "views/create.html");
};

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

exports.changeLanguage = function (request, response) {
    statusCodes.changeLanguage(request.body.language);
    response.json(getPageText());
}

exports.getPageText = function (request, response) {
    response.json(getPageText());
}

function getPageText() {
    var ans = {};
    for (var i = 1; i < 10; i++)
        ans["m02" + i] = statusCodes.getMessageStringByCode("m02" + i);

    return ans;
}