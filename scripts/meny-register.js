import VareModule from './modules/VareModule.js';


// function checkAllergies(){

// }

function renderTable(){
    let menuBody = document.getElementById("menu-body");
    let varer;
    if(true)
        varer = VareModule.getByAllergies("PineNuts");
    else
        varer = VareModule.getAll();
    for(var i = 0; i < varer.length; i++){
        let result = "";
        result += `
            <td>${varer[i]._productID}</td>
            <td title="${varer[i]._description}">${varer[i]._productName}</td>
            <td>${varer[i]._price},-</td>`;
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