//Funksjon for login-knapp
function validateUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "user" && password == "user"){
        window.location = "index.html"; //Sender deg til index siden om login ok.
    }
    else{
        let errorField = document.getElementById("error-message");
        errorField.innerHTML = `<p class="has-text-danger is-italic">
                                    <span class="icon-text">
                                        <span class="icon">
                                            <i class="fas fa-exclamation"></i>
                                        </span>
                                        <span>Feil passord</span>
                                    </span>
                                </p>`;
    }
}
const rmCheck = document.getElementById("remember"), usernameInput = document.getElementById("username"), passwordInput = document.getElementById("password");

if (localStorage.checkbox && localStorage.checkbox !== "") {
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
}
