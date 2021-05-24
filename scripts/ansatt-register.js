import AnsattModule from './modules/AnsattModule.js';
//JavaScript for ansatt-registeret


/* 
var testTag = document.getElementById("testid");
var testBtn = document.getElementById("test-btn");

function renderAnsatte() {
    var alleAnsatte = AnsattModule.getAll();
    for (var i = 0; i < alleAnsatt.length; i++) {
        var ansattRegister = "";
        ansattRegister += `
        <p> ${alleAnsatte[i]._firstName} </p>
        <br>
        `;
        testTag.innerHTML += `test  ${ansattRegister}`
    }

}
renderAnsatte();
*/

function renderTable(){
    var menuBody = document.getElementById("testid");
    var varer;
        varer = AnsattModule.getAll();
    for(var i = 0; i < varer.length; i++){
        let result = "";
        result += `
            <br>
            ${varer[i]._firstName}
            `;
           
        menuBody.innerHTML += `${result}`;
    }
}
renderTable();