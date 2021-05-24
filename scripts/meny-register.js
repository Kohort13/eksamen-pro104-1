import VareModule from './modules/VareModule.js';


function renderTable(array){
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
    
    let previousType;

    for(var i = 0; i < array.length; i++){
        let result = "";
        if(previousType != array[i]._productType){
            previousType = array[i]._productType;
            result += `<tr><td colspan="13"><b>${previousType}</b></td><tr>`;
        }
        result += `
            <td>${array[i]._productID}</td>
            <td title="${array[i]._description}"><em>${array[i]._productName}</em></td>
            <td>${array[i]._price},-</td>`;
        array[i]._allergies.forEach(allergy =>{
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
renderTable(VareModule.getAll());

function menuSearch(){
    alert("yo");
    // let searchInput = document.getElementById("search-input").value;
    // renderTable(VareModule.getByName(searchInput));
}