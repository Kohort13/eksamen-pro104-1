import LoginModule from './modules/LoginModule.js';

const initialise = (function(){

    //Checking if user is logged in is handled by the header (so if a page doesn't have the header, the user won't be logged out)
    //Should be a separate script, but wrote it in here as a quick solution
    let username = LoginModule.getUser().displayName;
    if(username === ""){
        window.location.href = "../html/login.html";
    }
    renderHeader(username);
}());

//Clears cookie
function logout(){
    LoginModule.logout();
}

function renderHeader(user){
    let mainHeader = document.getElementById("main-header");
    mainHeader.style.backgroundColor = "#444444";
    mainHeader.innerHTML = `
        <nav class="navbar is-size-4" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="index.html">
                    <img src="../resources/logoforslag.png">
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>    
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a href="index.html" class="navbar-item">Hjem</a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">More</a>
                        <div class="navbar-dropdown">
                            <a href="employee-register.html" class="navbar-item">👤 Ansattregister</a>
                            <a href="product-register.html" class="navbar-item">🍕 Vareregister</a>
                            <a href="sales-history.html" class="navbar-item">📈 Salgsoversikt</a>
                            <a href="menu.html" class="navbar-item">📝 Menyen</a>
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <p class="is-size-6 is-italic"><b>Logget inn som: </b>${user}</p>
                    </div>
                    <div class="navbar-item">
                        <div class="buttons">
                            <a href="login.html"  id="logout-btn" class="button is-light">Logg ut</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>`; 
    document.getElementById("logout-btn").addEventListener('click', logout);

    //Boilerplate burger-implementation from Bulma.io
    document.addEventListener('DOMContentLoaded', () => {
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach( el => {
                el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

                });
            });
        }
    });
}