function login() {
    let form = document.forms["loginForm"];

    let email = form.elements["name"].value;
    let password = form.elements["password"].value;

    let user = JSON.stringify({ email: email, password: password });
    let request = new XMLHttpRequest();

    request.open("POST", "/users/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let recieved = JSON.parse(request.response);

        if (!recieved.status) {
            showMessage(recieved);
        }
        else {
            window.location.replace("/main");
        }
    });

    request.send(user);
}

function register() {
    let form = document.forms["registrForm"];

    let email = form.elements["name"].value;
    let emailRepeat = form.elements["nameRepeat"].value;

    let password = form.elements["password"].value;
    let passwordRepeat = form.elements["passwordRepeat"].value;

    let user = JSON.stringify({ email: email, emailRepeat: emailRepeat, password: password, passwordRepeat: passwordRepeat });
    let request = new XMLHttpRequest();

    request.open("POST", "/users/register", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let recieved = JSON.parse(request.response);

        if (!recieved.status)
            showMessage(recieved);
        else
            showSuccess(recieved);

    });

    request.send(user);
}

function forgot() {
    let form = document.forms["forgotForm"];

    let email = form.elements["name"].value;

    let user = JSON.stringify({ email: email });

    let request = new XMLHttpRequest();

    request.open("POST", "/users/forgot", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let recieved = JSON.parse(request.response);

        if (!recieved.status)
            showMessage(recieved);
        else
            showSuccess(recieved);
    });

    request.send(user);
}

function changeLanguage(obj) {
    let request = new XMLHttpRequest();

    let lang = JSON.stringify(obj);
    console.log(obj);
    request.open("POST", "/users/changeLanguage", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        console.log(request.response);
        let recieved = JSON.parse(request.response);

        for (var key in recieved) {
            let elements = document.getElementsByClassName(key);

            for (let i = 0; i < elements.length; i++)
                elements[i].innerText = recieved[key];
        }
    });

    request.send(lang);
}

function showPageText() {
    let request = new XMLHttpRequest();

    request.open("POST", "/users/getPageText", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
        let recieved = JSON.parse(request.response);

        for (var key in recieved) {
            let elements = document.getElementsByClassName(key);

            for (let i = 0; i < elements.length; i++)
                elements[i].innerText = recieved[key];
        }
    });

    request.send();
}

function getErrorDiscription(error) {
    for (var key in error) {
        return error[key];
    }
}

function removeInfo() {
    document.getElementById("info").style.display = "none";
    document.getElementById("info").innerText = "";
}

function showSuccess(message) {
    let tabs = document.getElementsByClassName("tab");

    for (let i = 0; i < tabs.length; i++)
        tabs.item(i).classList.remove("active");


    for (let i = 0; i < document.forms.length; i++)
        document.forms.item(i).classList.remove("active");

    showMessage(message);
}

function showMessage(recieved) {
    document.getElementById("info").style.display = "block";
    document.getElementById("info").innerText = getErrorDiscription(recieved.message);
}

function changeToRus() {
    changeLanguage({ language: "ru" });
    document.getElementsByClassName("back")[0].style.width = "240px";
}

function changeToEng() {
    changeLanguage({ language: "en" });
    document.getElementsByClassName("back")[0].style.width = "225px";
}

$(document).ready(function () {
    $(".dws-form").on("click", ".tab", function () {
        $(".dws-form").find(".active").removeClass("active");
        $(this).addClass("active");
        $(".tab-form").eq($(this).index()).addClass("active");
        removeInfo();
    });

    $(".dws-form").on("click", "#forgotButton", function () {
        $(".dws-form").find(".active").removeClass("active");
        $("#form-3").addClass("active");
        removeInfo();
    });   

    showPageText();
});

