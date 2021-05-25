function renderHeader(){
  let mainHeader = document.getElementById("main-header");
  mainHeader.innerHTML = `
  <nav class="navbar is-size-4" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <h1 class="navbar-item">🍕 Gyldne Pizza</h1>     
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>    
      </div>
      
      <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a href="index.html" class="navbar-item">
          Hjem
        </a>
  
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>
  
          <div class="navbar-dropdown">
            <a href="ansatt-register.html" class="navbar-item">
              👤Ansatt register
            </a>
            <a href="meny-register.html" class="navbar-item">
              🍕Meny register
            </a>
            <a href="salgsoversikt.html" class="navbar-item">
              📈 Salgsoversikt
            </a>
          </div>
        </div>
      </div>
  
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a href="login.html"  class="button is-light">
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>`; 

    //Legg inn kode som henter id fra siden her, og gjør innerHtml = ``;
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
renderHeader();