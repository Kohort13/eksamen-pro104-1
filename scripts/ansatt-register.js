import AnsattModule from './modules/AnsattModule.js';
//JavaScript for ansatt-registeret
/*
function ansattRegister(){
    var menuBody = document.getElementById("testid");
    var ansatte;
        ansatte = AnsattModule.getAll();
    for(var i = 0; i < ansatte.length; i++){
        var result = "";
        result += `
            <br>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="block">
                        <div class="media-left">
                            <figure class="image is-128x128 is-rounded">
                                <img class="is-rounded" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                            </figure>
                            </div>
                        </div>
                            <div class="container is-fluid">
                                <div class="notification ">
                                ${ansatte[i]._firstName} ${ansatte[i]._lastName}
                                </div>
                            </div>
                        <div class="block">
                            <h2 class="title is-size-5 has-text-centered">${ansatte[i]._position}</h2>
                        </div>
                    </div>
                </div>
            </div>
            `;
           
        menuBody.innerHTML += `${result}`;
    }
}
ansattRegister();


*/

function ansattRegister(){
    var ansattMain = document.getElementById("main-body");
    var ansatte;
        ansatte = AnsattModule.getAll();
    for(var i = 0; i < ansatte.length; i++){
        var result = "";
        result += 
        `
            <br>
            <div class="box">
            <strong>${ansatte[i]._firstName} ${ansatte[i]._lastName}</strong> - <strong>${ansatte[i]._position}</strong> 
            <br>
            <a id="modal-button" class = "button is-secondary modal-button" data-target = "#modal">Se mer informasjon</a>



            <div id="ansatt-modalINACTIVE" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Ansatt Informasjon</p>
                <button id="image-modal-closeINACTIVE" class="delete" aria-label="close"></button>
              </header> 
              <section class="modal-card-body">


                <article class="media">
                    <div class="media-left">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>${ansatte[i]._firstName} ${ansatte[i]._lastName}</strong> 
                                - 
                                <strong>${ansatte[i]._position}</strong>
                                <br>
                                <small>
                                <b>Kontaktinformasjon:</b>
                                <br>
                                ${ansatte[i]._birthDate}
                                <br>
                                ${ansatte[i]._telephone}
                                <br>
                                ${ansatte[i]._email}
                                <br>
                                ${ansatte[i]._address}
                                <br>
                                <b>Jobbinformasjon:</b>
                                <br>
                                ${ansatte[i]._position} - ${ansatte[i]._restaurant}
                                <br>
                                ${ansatte[i]._salary}
                                </small>
                            </p>
                        </div>
                    </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button id="modal-closeINACTIVE" class="button">Lukk</button>
                    </footer>
            </div>
            </div>
              
            </div>
        `;
           
        ansattMain.innerHTML += `${result}`;
    }
    var modalButton = document.querySelector(`#modal-button`);
    var ansattModal = document.querySelector(`#ansatt-modal`)
    var modalCloseBtn = document.querySelector('#image-modal-close');
    var modalClose = document.querySelector(`#close-modal-button`)
    modalButton.addEventListener('click', function(){
        ansattModal.classList.add('is-active');
      });
    
      modalCloseBtn.addEventListener('click', function(){
        ansattModal.classList.remove('is-active');
      });
      modalClose.addEventListener('click', function(){
        ansattModal.classList.remove('is-active');
      });
}
ansattRegister();

