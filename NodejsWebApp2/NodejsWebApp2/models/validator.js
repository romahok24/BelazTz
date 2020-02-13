const statusCodes = require("../models/statusCodes.js");

/**
 * Валидация почты и пароля при входе.
 * @param {any} email
 * @param {any} password
 */
module.exports.checkLogin = function (email, password) {
    let code = "m015";

    if (!validateEmail(email))
        code = "m011";

    if (!validatePassword(password))
        return statusCodes.getMessageByCodeAndPswd("m013", password);

    return statusCodes.getAnswerObjectByCode(code)
}

/**
 * Проверка на существование пользователя.
 * @param {any} users
 */
module.exports.checkUsersData = function (users) {
    let code = "m015";

    if (hasNoData(users))
        code = "m010";

    return statusCodes.getAnswerObjectByCode(code)  
}

/**
 * Валидация при регистрации.
 * @param {any} email
 * @param {any} emailRepeat
 * @param {any} password
 * @param {any} passwordRepeat
 */
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

/**
 * Валидация при востановлении пароля.
 * @param {any} email
 */
module.exports.checkForgot = function (email) {
    let code = "m015";

    if (!validateEmail(email))
        code = "m011";

    return statusCodes.getAnswerObjectByCode(code)
}

/**
 * Проверка на совпадение паролей.
 * @param {any} password
 * @param {any} passwordRepeat
 */
function checkPasswordRepeat(password, passwordRepeat) {
    return password === passwordRepeat;
}

/**
 * Проверка на совпадение почты.
 * @param {any} email
 * @param {any} emailRepeat
 */
function checkEmailRepeat(email, emailRepeat) {
    return email === emailRepeat;
}

/**
 * Проверка на корректность почты.
 * @param {any} email
 */
function validateEmail(email) {
    let pattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    return pattern.test(email);
}

/**
 * Проверка на корректность пароля.
 * @param {any} pswd
 */
function validatePassword(pswd) {
    let pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;

    return pattern.test(pswd);
}

/**
 * Проверка на наличие данных.
 * @param {any} data
 */
function hasNoData(data) {
    return data.length === 0;
}