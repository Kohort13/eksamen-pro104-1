import VareModule from './modules/VareModule.js';


// function checkAllergies(){

// }

function renderTable(){
    let menuHead = document.getElementById("menu-head");
    let tableTitles = "";
    tableTitles += `
        <th>Produkt ID</th>
        <th>Produkt navn</th>
        <th>Pris</th>
        <th colspan="10">Allergener</th>`;
        let allergyTitles = "";
        let allegyNames = VareModule.getAllAllergies();
        allergyTitles += `<td colspan="3"></td>`;
        allegyNames.forEach(name => {
            allergyTitles += `
                <td>${name}</td>`;
        });
    menuHead.innerHTML += `<tr>${tableTitles}</tr><tr>${allergyTitles}</tr>`;


    let menuBody = document.getElementById("menu-body");
    let varer;

    varer = VareModule.getAll();

    // if(false)
    //     varer = VareModule.getByAllergies("PineNuts");
    // else
    //     varer = VareModule.getAll();
    for(var i = 0; i < varer.length; i++){
        let result = "";
        result += `
            <td>${varer[i]._productID}</td>
            <td title="${varer[i]._description}">${varer[i]._productName}</td>
            <td>${varer[i]._price},-</td>`;
        varer[i]._allergies.forEach(allergy =>{
            if(allergy.state){
                result += `
                <td><i class="fas fa-check has-text-danger"></i></td>`;
            }else{
                result += `
                <td><i class="fas fa-times has-text-info-dark"></i></td>`;
            }
        });
        menuBody.innerHTML += `<tr>${result}</tr>`;
    }
}
renderTable();