//Funksjon for login-knapp
function validateUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "user" && password == "user"){
        window.location = "index.html"; //Sender deg til index siden om login ok.
        //return false;
    }
    else{
        alert("Feil brukernavn eller passord")
    }
}
const rmCheck = document.getElementById("remember"), usernameInput = document.getElementById("username");

if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked","checked");
    usernameInput.value = localStorage.username;
}else{
    rmCheck.removeAttribute("checked");
    usernameInput.value = "";
}

function rememberMe(){
    if(rmCheck.checked && usernameInput.value !== "") {
        localStorage.username = usernameInput.value;
        localStorage.checkbox = rmCheck.value;
        alert("is checked")
    } else {
        localStorage.username = "";
        localStorage.checkbox = "";
        alert("is not checked")
    }
}
