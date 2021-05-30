import LoginModule from './modules/LoginModule.js';


//Funksjon for login-knapp
document.getElementById('login-form').onsubmit = function() {
    return validateUser();
};
function validateUser() {
    const usernames = ["test", "gp-storgata", "gp-bjølsen", "gp-løkka", "gp-bislett"];
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //Cannot use usernames.find() for search, as it bypasses validation for some reason...
    let foundUsername;
    for(let i = 0; i < usernames.length; i++){
        if(username == usernames[i]){
            foundUsername = username;
            break;
        }
    }
    if(foundUsername && password == "user"){ //Terrible security, only here as a proof-of-concept
        LoginModule.login(foundUsername);
        return true;
    }else{
        document.getElementById("wrong-password").classList.toggle("is-hidden", false);
        return false;
    }
}

// const rmCheck = document.getElementById("remember"), usernameInput = document.getElementById("username"), passwordInput = document.getElementById("password");

/*if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked","checked");
    usernameInput.value = localStorage.username;
    passwordInput.value = localStorage.password;
}else{
    rmCheck.removeAttribute("checked");
    usernameInput.value = "";
    passwordInput.value = "";
}


function rememberMe(){
    if(rmCheck.checked && usernameInput.value !== "" && passwordInput.value !== "") {
        localStorage.username = usernameInput.value;
        localStorage.password = passwordInput.value;
        localStorage.checkbox = rmCheck.value;
    } else {
        localStorage.username = "";
        localStorage.password = "";
        localStorage.checkbox = "";
    }
}*/
