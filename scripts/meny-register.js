import VareModule from './VareModule.js';


// function checkAllergies(){

// }

function renderTable(){
    let menuBody = document.getElementById("menu-body")
    let varer = VareModule.getByAllergies("PineNuts");
    //let varer = VareModule.getAll();
    for(var i = 0; i < varer.length; i++){
        let result = "";
        result += `
            <td>${varer[i]._productID}</td>
            <td>${varer[i]._productName}</td>
            <td>${varer[i]._price}</td>`;
        varer[i]._allergies.forEach(allergy =>{
            if(allergy.state){
                result += `
                <td><i class="fas fa-check"></i></td>`;
            }else{
                result += `
                <td><i class="fas fa-times"></i></td>`;
            }
        });
        menuBody.innerHTML += `<tr>${result}</tr>`;
    }
}
renderTable();