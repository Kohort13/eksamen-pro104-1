import LoginModule from './modules/LoginModule.js';


//Function for logging in
document.getElementById('login-form').onsubmit = function() {
    //Returns true or false depending upon whether login was successful. 
    //If invalid, the submission of the form is cancelled, and the action of the form (action="index.html") is not executed.
    return validateUser();
};
function validateUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const isSuccess = LoginModule.login(username, password);
    return isSuccess;
}


function rememberMe(){
    const rmCheck = document.getElementById("remember"), usernameInput = document.getElementById("username"), passwordInput = document.getElementById("password");
}

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
