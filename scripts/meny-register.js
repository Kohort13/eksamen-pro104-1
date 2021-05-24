import VareModule from './modules/VareModule.js';
let searchInput;
function initialise(){
    searchInput = document.getElementById("search-input");
    searchInput.addEventListener('keyup', menuSearch);
}
initialise();
function renderTable(array){
    let tableTitles = `
    <th>ID</th>
    <th>Produkt navn</th>
    <th class="is-narrow">Pris</th>
    <th colspan="10" class="has-text-centered">Allergener</th>`;
    let allergyTitles = `<td colspan="3"></td>`;
    let allegyNames = VareModule.getAllAllergies();
    allegyNames.forEach(name => {
        allergyTitles += `<td class="has-text-centered">${name}</td>`;
    });

    const menuHead = document.getElementById("menu-head");
    menuHead.innerHTML = `<tr>${tableTitles}</tr><tr>${allergyTitles}</tr>`;
    
    let previousType;
    const menuBody = document.getElementById("menu-body");
    menuBody.innerHTML = "";

    for(var i = 0; i < array.length; i++){
        let result = "";
        if(previousType != array[i]._productType){
            previousType = array[i]._productType;
            result += `<tr><td colspan="13" class="has-text-centered"><b>${previousType}</b></td><tr>`;
        }
        result += `
            <td class="is-narrow">${array[i]._productID}</td>
            <td class="is-narrow" title="${array[i]._description}"><em>${array[i]._productName}</em></td>
            <td>${array[i]._price},-</td>`;
        array[i]._allergies.forEach(allergy =>{
            if(allergy.state){
                result += `<td class="has-text-centered"><i class="fas fa-check has-text-danger"></i></td>`;
            }else{
                result += `<td class="has-text-centered"><i class="fas fa-times has-text-info-dark"></i></td>`;
            }
        });
        menuBody.innerHTML += `<tr>${result}</tr>`;
    }
}
renderTable(VareModule.getAll());

function menuSearch(){
    if(searchInput.value == ""){
        renderTable(VareModule.getSortedByType())
    }else{
        renderTable(VareModule.getByName(searchInput.value));
    }
}