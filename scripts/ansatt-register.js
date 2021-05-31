import AnsattModule from './modules/AnsattModule.js';
import UtilsModule from './modules/UtilsModule.js';

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
var ansattModal = document.querySelector(`#ansatt-modal`);
function renderModal(id) {
    
    document.getElementById("ansatt-module");
    var ansattModal = document.querySelector(`#ansatt-modal`);
    ansattModal.classList.toggle('is-active',true);
    const employee = AnsattModule.getByIndex(id);
    var modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = 
    `
    <article class="media">
    <div class="media-left">
        <figure class="image is-128x128">
            <img src="../resources/images/${employee._picture}" alt="Placeholder Image">
        </figure>
    </div>
    <div class="media-content">
        <div class="content">
            <p>
                <strong>Kontaktinformasjon</strong> 
                <br>
                <small>
                    <strong>Navn:</strong> ${employee.fullName}
                    <br>
                    <strong>Telefonnummer:</strong> ${employee._telephone}
                    <br>
                    <strong>Epost:</strong> ${employee._email}
                    <br>
                    <strong>Adresse:</strong> ${employee._address}
                </small>
                <br>
                <br>
                <strong>Stillingsinformasjon</strong> 
                <br>
                <small>
                    <strong>Stilling:</strong> ${employee._position}
                    <br>
                    <strong>Lønn:</strong> ${employee._salary}
                    <br>
                    <strong>Resturant:</strong> ${employee._restaurant.name}
                </small>
                <br>
            </p>
        </div>
    </div>
    
    `
    
    console.log(employee);
}

function ansattRegister(){
    var ansattMain = document.getElementById("main-body");
    var ansatte;
        ansatte = AnsattModule.getAll();
    for(let i = 0; i < ansatte.length; i++){
       var row = document.createElement(`tr`);
       row.id = `employee-${i}`
       row.addEventListener(`click`,function(){renderModal(i)});
        ansattMain.appendChild(row);
        row.innerHTML = 
        `
        <td> 
        <figure class="image is-32x32">
        <img class="is-rounded" src="../resources/images/${ansatte[i]._picture}">
        </figure>
        </td>
        <td>
        ${ansatte[i].fullName}
        </td>
        <td> ${ansatte[i]._position}</td>
            
        `
    };
    
    
    var modalCloseBtn = document.querySelector('#image-modal-close');
    var modalClose = document.querySelector(`#close-modal-button`);
   
    
      modalCloseBtn.addEventListener('click', function(){
        ansattModal.classList.remove('is-active');
      });
      modalClose.addEventListener('click', function(){
        ansattModal.classList.remove('is-active');
      });
}
ansattRegister();

