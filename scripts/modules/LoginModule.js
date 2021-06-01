import RestaurantModule from './RestaurantModule.js';


//Module for pseudo-handling user login. This is in no ways a secure method, but is here to showcase the functionality
const LoginModule = (function(){
    class User {
        constructor(username, displayName, password){
            this.username = username;
            this.displayName = displayName;
            this.password = password;
        }
    }
    let users = [];
    RestaurantModule.getAll().forEach(restaurant =>{
        users.push(new User(restaurant.username, restaurant.name, "user"));
    });
    users.push(new User("test", "Test-bruker", "user"));
    
    let currentUser = null;

    const login = (username, password) => {
        let validLogin = false
        users.forEach( user =>{
            if(username == user.username && password == user.password){
                setCookie("username", username, 2);
                validLogin = true;
                currentUser = user;
            }
        });
        if(validLogin)
            return true;
        else{
            document.getElementById("wrong-password").classList.toggle("is-hidden", false);
            return false;
        }
    }

    const logout = () => {
        setCookie("username", "", -2);
        window.location.href = "../html/login.html";
        currentUser = null;
    }

    //Cookie implementation from https://www.w3schools.com/js/js_cookies.asp    
    const setCookie = (name, value, expirydays) => {
        var d = new Date();
        d.setTime(d.getTime() + (expirydays*24*60*60*1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    const getCookie = (name) => {
        var n = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(n) == 0) {
                return c.substring(n.length, c.length);
            }
        }
        return "";
    }

    //Method for returning the currently logged in user
    const getUser = () => {
        const storedUsername = getCookie("username");
        if(storedUsername != ""){
            users.forEach( user => {
                if(user.username == storedUsername)
                    currentUser = user;
            })
            return currentUser;
        }else{
            return null;
        }
    }
    return {getUser, login, logout};
}());

export default LoginModule;