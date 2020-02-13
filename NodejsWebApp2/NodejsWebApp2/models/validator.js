const statusCodes = require("../models/statusCodes.js");

module.exports.checkLogin = function (email, password) {
    let code = "m015";

    if (!validateEmail(email))
        code = "m011";

    if (!validatePassword(password))
        return statusCodes.getMessageByCodeAndPswd("m013", password);

    return statusCodes.getAnswerObjectByCode(code)
}

module.exports.checkUsersData = function (users) {
    let code = "m015";

    if (hasNoData(users))
        code = "m010";

    return statusCodes.getAnswerObjectByCode(code)  
}

module.exports.checkRegister = function (email, emailRepeat, password, passwordRepeat) {
    let code = "m015";

    if (!validateEmail(email))
        code = "m011";

    if (!checkEmailRepeat(email, emailRepeat))
        code = "m012";

    if (!validatePassword(password) && password.length !== 0) {
        return statusCodes.getMessageByCodeAndPswd("m013", password);
    }

    if (!checkPasswordRepeat(password, passwordRepeat))
        code = "m014";

    return statusCodes.getAnswerObjectByCode(code) 
}

module.exports.checkForgot = function (email) {
    let code = "m015";

    if (!validateEmail(email))
        code = "m011";

    return statusCodes.getAnswerObjectByCode(code)
}


function checkPasswordRepeat(password, passwordRepeat) {
    return password === passwordRepeat;
}

function checkEmailRepeat(email, emailRepeat) {
    return email === emailRepeat;
}

function validateEmail(email) {
    let pattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    return pattern.test(email);
}

function validatePassword(pswd) {
    let pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;

    return pattern.test(pswd);
}

function hasNoData(data) {
    return data.length === 0;
}