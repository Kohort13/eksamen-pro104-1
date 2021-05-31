import EmployeeModule from './modules/EmployeeModule.js';

var ansattModal = document.querySelector(`#ansatt-modal`);
function renderModal(id) {
    
    document.getElementById("ansatt-module");
    var ansattModal = document.querySelector(`#ansatt-modal`);
    ansattModal.classList.toggle('is-active',true);
    const employee = EmployeeModule.getByIndex(id);
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
        ansatte = EmployeeModule.getAll();
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

