import VareModule from './modules/VareModule.js';

let searchInput;
let addProductBtn;
let closeAddProductBtn;
let sortPriceBtn;
let sortNameBtn;
let sortIdBtn;
let saveProdBtn;

let allegyNames = VareModule.getAllAllergies();


function initialise(){
    searchInput = document.getElementById("search-input");
    searchInput.addEventListener('keyup', menuSearch);
    
    
    let tableTitles = `
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodId"></a></th>
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodName"></a></th>
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodPrice"></a></th>
    <th colspan="10" class="has-text-centered"><a class="has-text-grey-dark" id = "prodAllergies">Allergener</a></th>`;
    let emptyTitles = `<td colspan="3"></td>`;
    let allergyTitles = "";
    
    allegyNames.forEach(name => {
        allergyTitles += `<td class="has-text-centered">${name}</td>`;
    });
    
    const menuHead = document.getElementById("menu-head");
    menuHead.innerHTML = `<tr>${tableTitles}</tr><tr>${emptyTitles}${allergyTitles}</tr>`;
    
    const checkAllergiesTableHead = document.getElementById("allergies-check-tablehead");
    const checkAllergyTableBody = document.getElementById("allergies-checkbox");
    
    let tableHeadCheck = "";
    tableHeadCheck += `${allergyTitles}`;
    
    let tableBodyCheck ="";
    allegyNames.forEach(name =>{
        tableBodyCheck += `<td class="has-text-centered"><input type="checkbox" id="${name}"></td>`;
    });
    checkAllergiesTableHead.innerHTML +=`<tr>${tableHeadCheck}</tr>`;
    checkAllergyTableBody.innerHTML +=`<tr>${tableBodyCheck}</tr>`;
    
    sortPriceBtn = document.getElementById("prodPrice");
    sortPriceBtn.innerHTML = `<span>Pris</span><span class = "icon"><i class="fas fa-caret-down"></i></span>`;
    sortPriceBtn.addEventListener('click', sortByPrice);
    
    sortNameBtn = document.getElementById("prodName");
    sortNameBtn.innerHTML = `<span>Produkt Navn</span><span class="icon"><i class="fas fa-caret-down"></i></span>`;
    sortNameBtn.addEventListener('click', sortByName);
    
    sortIdBtn = document.getElementById("prodId");
    sortIdBtn.innerHTML =`<span>ID</span><span class = "icon"><i class="fas fa-caret-down"></i></span>`;
    sortIdBtn.addEventListener('click', sortById);
    
    
    addProductBtn = document.getElementById("add-prod-btn");
    addProductBtn.addEventListener('click', openAddProduct);
    
    closeAddProductBtn = document.getElementById("close-btn");
    closeAddProductBtn.addEventListener('click', exitAddProduct);
    
    saveProdBtn = document.getElementById("save-prod-btn");
    saveProdBtn.addEventListener('click', saveNewProd);
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
            let result = "";
            result += `
            <td class="is-narrow">${vare.productID}</td>
            <td class="is-narrow" title="${vare.getDescription()}"><em>${vare.productName}</em></td>
            <td>${vare.price},-</id></td>`;
            
            vare.allergies.forEach(allergy =>{
                if(allergy.state){
                    result += `<td class="has-text-centered"><span class = "icon"><i class="fas fa-check has-text-danger"></i></span></td>`;
                }else{
                    result += `<td class="has-text-centered"><span class = "icon"><i class="fas fa-times has-text-info-dark"></i></span></td>`;
                }
            });
            menuBody.innerHTML += `<tr>${result}</tr>`;
        });
    }
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

const openModal = document.getElementById("add-prod-modal");

function openAddProduct(){
    openModal.classList.toggle("is-active", true);
    setNewProdId();
}
function exitAddProduct(){
    openModal.classList.toggle("is-active", false);
}

function setNewProdId(){
    const newProdID = document.getElementById("new-prod-id");
    let setProdID = VareModule.newProdID();
    newProdID.placeholder = setProdID;
}


function saveNewProd(){
    let newProdType = document.getElementById("new-prod-type").value;
    
    let newProdName = document.getElementById("new-prod-name").value;
    let newProdPrice = document.getElementById("new-prod-price").value;
    
    let newProdAllergies =``;
    allegyNames.forEach(name =>{
        newProdAllergies += document.getElementById(name).checked;
    });

    let newProductDescription = document.getElementById("new-prod-description").value;
    // console.log(newProdType);
    // console.log(newProdAllergies);
    // console.log(newProdName);
    // console.log(newProdPrice);
    // console.log(newProductDescription);
}
