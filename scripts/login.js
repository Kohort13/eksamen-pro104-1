//Funksjon for login-knapp
document.getElementById('login-form').onsubmit = function() {
    return validateUser();
};
function validateUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if(username !== "user" || password !== "user"){ //Terrible security, only here as a proof-of-concept
        document.getElementById("wrong-password").classList.toggle("is-hidden", false);
        return false;
    }
}

const rmCheck = document.getElementById("remember"), usernameInput = document.getElementById("username"), passwordInput = document.getElementById("password");

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
