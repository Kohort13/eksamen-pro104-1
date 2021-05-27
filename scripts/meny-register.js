import VareModule from './modules/VareModule.js';

let searchInput;
let sortPriceBtn;
let sortNameBtn;
let sortIdBtn;

let allegyNames = VareModule.getAllAllergies();

function initialise(){
    searchInput = document.getElementById("search-input");
    searchInput.addEventListener('keyup', menuSearch);
    
    let tableTitles = `
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodId"></a></th>
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodName"></a></th>
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodPrice"></a></th>
    <th colspan="10" class="has-text-centered">Allergener</th>`;
    let allergyTitles = `<td colspan="3"></td>`;
    
    allegyNames.forEach(name => {
        allergyTitles += `<td class="has-text-centered">${name}</td>`;
    });
    
    const menuHead = document.getElementById("menu-head");
    menuHead.innerHTML = `<tr>${tableTitles}</tr><tr>${allergyTitles}</tr>`;

    sortPriceBtn = document.getElementById("prodPrice");
    sortPriceBtn.innerHTML = `<span>Pris</span><span class = "icon"><i class="fas fa-caret-down"></i></span>`;
    sortPriceBtn.addEventListener('click', sortByPrice);

    sortNameBtn = document.getElementById("prodName");
    sortNameBtn.innerHTML = `<span>Produkt Navn</span><span class="icon"><i class="fas fa-caret-down"></i></span>`;
    sortNameBtn.addEventListener('click', sortByName);

    sortIdBtn = document.getElementById("prodId");
    sortIdBtn.innerHTML =`<span>ID</span><span class = "icon"><i class="fas fa-caret-down"></i></span>`;
    sortIdBtn.addEventListener('click', sortById);
}
initialise();


function renderTable(array){
    const menuBody = document.getElementById("menu-body");
    menuBody.innerHTML = "";

    let type;
    let types = VareModule.getAllProductTypes();
    for(type in types){
        menuBody.innerHTML += `<tr><td colspan="13" class="has-text-centered"><b>${types[type]}</b></td><tr>`;
        const byTypeArray = VareModule.getByProductType(types[type].toString(), array);
        byTypeArray.forEach(vare =>{
            menuBody.innerHTML += "Vare<br>"
        });
    }
    
    /*for(var i = 0; i < array.length; i++){
        let result = "";
        if(previousType != array[i].productType){
            previousType = array[i].productType;
            result += `<tr><td colspan="13" class="has-text-centered"><b>${previousType}</b></td><tr>`;
        }
        result += `
            <td class="is-narrow">${array[i].productID}</td>
            <td class="is-narrow" title="${array[i].getDescription()}"><em>${array[i].productName}</em></td>
            <td>${array[i].price},-</id></td>`;
        array[i].allergies.forEach(allergy =>{
            if(allergy.state){
                result += `<td class="has-text-centered"><span class = "icon"><i class="fas fa-check has-text-danger"></i></span></td>`;
            }else{
                result += `<td class="has-text-centered"><span class = "icon"><i class="fas fa-times has-text-info-dark"></i></span></td>`;
            }
        });
        menuBody.innerHTML += `<tr>${result}</tr>`;
    }*/
}
renderTable(VareModule.getAll());

function menuSearch(){
    if(searchInput.value == ""){
        renderTable(VareModule.getSortedByType());
    }else{
        renderTable(VareModule.getByName(searchInput.value));
    }
}

function sortByPrice(){
    let icon = sortPriceBtn.children[1].firstChild;
    if(icon.classList.contains("fa-caret-down")){
        renderTable(VareModule.getSortedByPrice().reverse());
        icon.classList.toggle("fa-caret-up", true);
        icon.classList.toggle("fa-caret-down", false);
    }else if(icon.classList.contains("fa-caret-up")){
        renderTable(VareModule.getSortedByPrice());
        icon.classList.toggle("fa-caret-up", false);
        icon.classList.toggle("fa-caret-down", true);
    }
}
function sortByName(){
    let icon = sortNameBtn.children[1].firstChild;

    if(icon.classList.contains("fa-caret-down")){
        renderTable(VareModule.getSortedByName().reverse());
        icon.classList.toggle("fa-caret-up", true);
        icon.classList.toggle("fa-caret-down", false);
    }else if(icon.classList.contains("fa-caret-up")){
        renderTable(VareModule.getSortedByName());
        icon.classList.toggle("fa-caret-up", false);
        icon.classList.toggle("fa-caret-down", true);
    }
}
function sortById(){
    let icon = sortIdBtn.children[1].firstChild;

    if(icon.classList.contains("fa-caret-down")){
        renderTable(VareModule.getSortedByID().reverse());
        icon.classList.toggle("fa-caret-up", true);
        icon.classList.toggle("fa-caret-down", false);
    }else if(icon.classList.contains("fa-caret-up")){
        renderTable(VareModule.getSortedByID());
        icon.classList.toggle("fa-caret-up", false);
        icon.classList.toggle("fa-caret-down", true);
    }
}
