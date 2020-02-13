let language = "ru";

const statusCodes = {

    "m001": { "ru": "Ошибка подключения к базе данных", "en": "Error connecting to database" },
    "m003": { "ru": "Ошибка ввода значения", "en": "Error input value" },
    "m010": { "ru": "Неверное имя или пароль", "en": "Invalid username or password" },
    "m011": { "ru": "Адрес электронной почты недействителен", "en": "Email address is invalid" },
    "m012": { "ru": "Электронная почта и повтор электронной почты не совпадают", "en": "Email and Email repeat are not the same" },
    "m013": { "ru": "Ошибка sha1(пароль)", "en": "Error sha1(password)" },
    "m014": { "ru": "Пароль и повтор пароля не совпадают", "en": "Password and password repeat are not the same" },
    "m015": { "ru": "Войдите в свою учетную запись электронной почты, чтобы подтвердить свой адрес электронной почты.", "en": "Sign in to your email account to confirm your email address" },
    "m016": { "ru": "Недостаточно прав доступа", "en": "Not enough access rights" },
    "m017": { "ru": "Аккаунт заблокирован", "en": "Account blocked" },
    "m018": { "ru": "Пользователь c таким именем уже зарегистрирован", "en": "User with this name is already registered" },
    "m019": { "ru": "Пользователя с таким e-mail адресом не существует", "en": "There is no user with such e-mail address" },
    "m020": { "ru": "Истек срок доступа", "en": "Expired access" },
    "m021": { "ru": "Войти", "en": "Login" },
    "m022": { "ru": "Почта", "en": "Email" },
    "m023": { "ru": "Пароль", "en": "Password" },
    "m024": { "ru": "Введите пароль", "en": "Enter Password" },
    "m025": { "ru": "Регистрация", "en": "Registration" },
    "m026": { "ru": "Забыли пароль?", "en": "Forgot password?" },
    "m027": { "ru": "Повторите почту", "en": "Repeat Email" },
    "m028": { "ru": "Повторите пароль", "en": "Repeat Password" },
    "m029": { "ru": "Продолжить", "en": "Continue" }
};

module.exports.codes = statusCodes;
module.exports.language = language;

/**
 * Получение ответа от сервера по коду.
 * @param {String} code Код ответа.
 */
module.exports.getAnswerObjectByCode = function (code) {
    let ans = {};

    ans[code] = statusCodes[code][language];
    let status = code === "m015";

    return { "status": status, "message": ans };  
}

/**
 * Получение ответа от сервера по коду(Используется для кода m013, где строка динамически изменяется взависимости от пароля).
 * @param {String} code Код ответа.
 * @param {String} password Пароль.
 */
module.exports.getMessageByCodeAndPswd = function (code, password){
    let ans = {};
    ans[code] = (language === "ru" ? "Ошибка " : "Error ") + password;

    return { "status": false, "message": ans };
}

/**
 * Изменение языка.
 * @param {String} lang Язык.
 */
module.exports.changeLanguage = function (lang) {
    language = lang;;
}

/**
 * Получение строки сообщения по коду ошибки.
 * @param {String} code Код ошибки.
 */
module.exports.getMessageStringByCode = function (code) {
    return statusCodes[code][language];
}