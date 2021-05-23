
//Funksjon for login-knapp
function validateUser(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "user" && password == "user"){
        alert("Login ok");
        window.location = "index.html"; //Sender deg til index siden om login ok.
        //return false;
    }
    else{
        alert("Feil brukernavn eller passord")
    }
}
