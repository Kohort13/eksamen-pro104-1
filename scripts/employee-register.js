import EmployeeModule from './modules/EmployeeModule.js';

const employeeModal = document.querySelector(`#ansatt-modal`);
const searchInput = document.getElementById("search-input");
const employeeMain = document.getElementById("main-body");
searchInput.addEventListener('keyup', employeeSearch);


function renderModal(id) {
    
    document.getElementById("ansatt-module");
    employeeModal.classList.toggle('is-active',true);
    const employee = EmployeeModule.getByIndex(id);
    console.log(employee);
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
    
    `;    
}

function employeeSearch(){
    if(searchInput.value == ""){
        //Nothing written
        renderTable(EmployeeModule.getAll());
    }else{
        //Anything written
        renderTable(EmployeeModule.getByName(searchInput.value));
    }
}

function renderTable(array){
    var employees = array;
    employeeMain.innerHTML = "";

    employees.forEach(employee => {
        var row = document.createElement(`tr`);
        row.addEventListener(`click`,function(){renderModal(employee._id)});
         employeeMain.appendChild(row);
         row.innerHTML = 
         `
         <td> 
         <figure class="image is-32x32">
         <img class="is-rounded" src="../resources/images/${employee._picture}">
         </figure>
         </td>
         <td>
         ${employee.fullName}
         </td>
         <td> ${employee._position}</td>
         `;
    })
    
    
    var modalCloseBtn = document.querySelector('#image-modal-close');
    var modalClose = document.querySelector(`#close-modal-button`);
   
    
      modalCloseBtn.addEventListener('click', function(){
        employeeModal.classList.remove('is-active');
      });
      modalClose.addEventListener('click', function(){
        employeeModal.classList.remove('is-active');
      });
}
renderTable(EmployeeModule.getAll());

