const LoginModule = (function(){

    const login = (inputUsername) => {
        setCookie("username", inputUsername, 2);
    }

    const logout = () => {
        setCookie("username", "", -2);
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

    function checkCookie() {
        var username = getCookie("username");
        if (username != "")
            alert("Welcome again " + username);
        else {
            username = prompt("Please enter your name:", "");
            if (username != "" && username != null)
                setCookie("username", username, 2);
        }
    }
    return {setCookie, getCookie, checkCookie, login, logout};
}());

export default LoginModule;