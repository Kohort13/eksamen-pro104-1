import VareModule from './modules/VareModule.js';

//Defining various variables.
let searchInput, addProductBtn, closeAddProductBtn, sortPriceBtn, sortNameBtn, sortIdBtn, saveProdBtn, closeEditProductBtn;

//defines variable. Gets info from "VareModule.getAllAllergies();"
let allergyNames = VareModule.getAllAllergies();

function initialise(){
    searchInput = document.getElementById("search-input");
    searchInput.addEventListener('keyup', menuSearch);
    
    //Creating tableTitles.
    //Will be all <th> info for products
    let tableTitles = `
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodId"></a></th>
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodName"></a></th>
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodPrice"></a></th>
    <th colspan="10" class="has-text-centered"><a class="has-text-grey-dark" id = "prodAllergies">Allergener</a></th>`;
    
    //ForEach loop that creates a table cell for each type of allergy in table header.
    let allergyTitles = "";
    allergyNames.forEach(name => {
        allergyTitles += `<td class="has-text-centered">${name}</td>`;
    });
    
    const menuHead = document.getElementById("menu-head");
    //emptyTitles are a set of merged empty table cells. To keep table organized.
    let emptyTitles = `<td colspan="3"></td>`;
    //Adds relevant data to menuHead
    menuHead.innerHTML = `<tr>${tableTitles}</tr><tr>${emptyTitles}${allergyTitles}</tr>`;
    
    //Creating button that sorts table by price.
    initialiseHeader();
    initialiseAddProdModal();
    initialiseEditProdModal();
    renderTable(VareModule.getAll());    
}
initialise();


function initialiseHeader() {
    sortPriceBtn = document.getElementById("prodPrice");
    sortPriceBtn.innerHTML = `<span>Pris</span><span class = "icon"><i class="fas fa-caret-down"></i></span>`;
    sortPriceBtn.addEventListener('click', sortByPrice);

    //Creating button that sorts table by name.
    sortNameBtn = document.getElementById("prodName");
    sortNameBtn.innerHTML = `<span>Produkt Navn</span><span class="icon"><i class="fas fa-caret-down"></i></span>`;
    sortNameBtn.addEventListener('click', sortByName);

    //Creating button that sorts table by id.
    sortIdBtn = document.getElementById("prodId");
    sortIdBtn.innerHTML = `<span>ID</span><span class = "icon"><i class="fas fa-caret-down"></i></span>`;
    sortIdBtn.addEventListener('click', sortById);
}

function initialiseAddProdModal(){
    const checkAllergyTableBody = document.getElementById("allergies-checkbox");    
    
    for(let i = 0; i < 2; i++){
        let header = "";
        let boxes = "";
        let columns = 5;
        //Multiplying by 5 to get 5 elements on each row (only works since we know that allergyNames.length is divisable by 5);
        for(let j = 0 + (i*columns); j < columns + (i*columns); j++){
            header += `<th class="has-text-centered">${allergyNames[j]}</th>`;
            boxes += `<td class="has-text-centered"><input type="checkbox" id="${allergyNames[j]}"></td>`;
        }
        header = `<tr>${header}</tr>`;
        boxes = `<tr>${boxes}</tr>`;
        checkAllergyTableBody.innerHTML += `${header}${boxes}`;
    }    
    
    //Creating button with click listner. Connecting to HTML.
    //Opens the modal
    addProductBtn = document.getElementById("add-prod-btn");
    addProductBtn.addEventListener('click', openAddProduct);
    
    //Creating button with click listner. Connecting to HTML.
    //closes the modal
    closeAddProductBtn = document.getElementById("close-btn");
    closeAddProductBtn.addEventListener('click', exitAddProduct);
    
    //Creating button with click listner. Connecting to HTML.
    //Will save input.
    saveProdBtn = document.getElementById("save-prod-btn");
    saveProdBtn.addEventListener('click', saveNewProd);
}

//creating renderTable function.
//Will print out the entire table of products. Including product info.
function renderTable(array){
    //Getting ref to body of table and clearing
    const menuBody = document.getElementById("menu-body");
    menuBody.innerHTML = "";
    
    //Define variables for loop to work (for loop won't work with inline declarations for some obscene, unfathomable, utterly shitty (probably) reason, conceived by the mad lads behind JS. #notAmused)
    let type, types = VareModule.getAllProductTypes();
    for(type in types){
        //Adding table tags for menuBody. Fetch info from "let types = VareModule.getAllProductTypes();"
        //Prints a cells with ID-info, name-info, price-info and allegy-info
        var divider = document.createElement("tr");
        divider.innerHTML = `<td colspan="13" class="has-text-centered"><b>${types[type]}</b></td>`;

        //Using appendChild for all direct children of menuBody; mixing the two caused bugs
        menuBody.appendChild(divider);
        //Fetch info from VareModule.
        const byTypeArray = VareModule.getByProductType(types[type].toString(), array);
        byTypeArray.forEach(vare =>{
            var id = document.createElement("td"),
                name = document.createElement("td"),
                price = document.createElement("td"),
                row = document.createElement("tr");
            id.textContent = vare.productID;
            name.innerHTML = `<a>${vare.productName}</a>`;
            price.textContent = vare.price + ",-";
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(price);
            id.classList.add("is-narrow");
            row.id = vare.productID;
            name.classList.add("is-narrow");
            name.title = vare.getProductIngredients();
            
            //Adding status for all allergies (boolean). Set icon for true/false.
            vare.allergies.forEach(allergy =>{
                var allergyTd = document.createElement("td");
                allergyTd.classList.add("has-text-centered");
                if(allergy.state){
                    allergyTd.innerHTML = `<span class = "icon"><i class="fas fa-check has-text-danger"></i></span>`;
                }else{
                    allergyTd.innerHTML = `<span class = "icon"><i class="fas fa-times has-text-info-dark"></i></span>`;
                }
                row.appendChild(allergyTd);
            });
            menuBody.appendChild(row);
            row.addEventListener('click', function(){editProduct(vare.productID)});
        });
    }
}
//Defines openEditProdModal and HTML location
function initialiseEditProdModal(){
    const checkAllergyTableBody = document.getElementById("edit-allergies-checkbox");    
    
    for(let i = 0; i < 2; i++){
        let header = "";
        let boxes = "";
        let columns = 5;
        //Multiplying by 5 to get 5 elements on each row (only works since we know that allergyNames.length is divisable by 5);
        for(let j = 0 + (i*columns); j < columns + (i*columns); j++){
            header += `<th class="has-text-centered">${allergyNames[j]}</th>`;
            boxes += `<td class="has-text-centered"><input type="checkbox" id="edit-${allergyNames[j]}"></td>`;
        }
        header = `<tr>${header}</tr>`;
        boxes = `<tr>${boxes}</tr>`;
        checkAllergyTableBody.innerHTML += `${header}${boxes}`;
    }    

    closeEditProductBtn = document.getElementById("close-edit-btn");
    closeEditProductBtn.addEventListener('click', closeEditProd);
}

const openEditProdModal = document.getElementById("edit-prod-modal")

function openEditProd(){
    openEditProdModal.classList.toggle("is-active", true);
}
function closeEditProd(){
    openEditProdModal.classList.toggle("is-active",false);
}
//Getting prod id for clicked on row
function getProdInfo(id){
    id--;
    const product = VareModule.getByID(id);
    
    //getting productId info for specified id (row). Adding info to placeholder
    let productInfoId = product.productID;
    let productId = document.getElementById("prod-id");
    productId.placeholder = productInfoId;

    let productInfoType = product.productType;
    let productType = document.getElementById("edit-prod-type").children;
    for (var i = 0; i<5; i++){
        if(productInfoType === productType[i].value){
            productType[i].selected = true;
        }
    }

    //getting productName info for specified id (row). Adding info to placeholder
    let productInfoName = product.productName;
    let productName = document.getElementById("prod-name");
    productName.value = productInfoName;
    
    //getting productPrice info for specified id (row). Adding info to placeholder
    let productInfoPrice = product.price;
    let productPrice = document.getElementById("prod-price");
    productPrice.value = productInfoPrice;

    //Getting productAllergy info for specified id (row). Adding info to placeholder
    let productInfoAllergies = product.allergies;
    //let productAllergies = document.getElementById("edit-allergies-checkbox");
    for(let i = 0; i < productInfoAllergies.length; i++){
        document.getElementById(`edit-${productInfoAllergies[i].name}`).checked = productInfoAllergies[i].state;
    }

    //Getting productIngredients info for specified id (row). Adding info to placeholder
    let productInfoIngredients = product.ingredients;
    let productIngredients = document.getElementById("edit-prod-ingredients");
    productIngredients.value = productInfoIngredients;

    //Getting productIsVegitarian status for specified id (row). Adding info to placeholder
    let productInfoIsVegitarian = product.isVegetarian;
    let productIsVegitarian = document.getElementById("edit-is-vegitarian-checkbox");
    productIsVegitarian.checked = productInfoIsVegitarian;

}
function saveProdInfo(id){
    
}
function editProduct(id){
    openEditProd();
    getProdInfo(id);
}


//Checks for input in search-bar.
function menuSearch(){
    if(searchInput.value == ""){
        //Nothing written
        renderTable(VareModule.getSortedByType());
    }else{
        //Anything written
        renderTable(VareModule.getByName(searchInput.value));
    }
}

//Sorts by price, direction depending on "arrow-up/down"
function sortByPrice(){
    //Finding the correct element to "look" at within "sortPriceBtn".
    let icon = sortPriceBtn.children[1].firstChild;
    if(icon.classList.contains("fa-caret-down")){
        //call on renderTable function with getSortedByPrice function from "VareModule" in mind.
        //Reversed order.
        renderTable(VareModule.getSortedByPrice().reverse());
        //Changes icon from "arrow-down" to "arrow-up".
        icon.classList.toggle("fa-caret-up", true);
        icon.classList.toggle("fa-caret-down", false);
    }else if(icon.classList.contains("fa-caret-up")){
        //call on renderTable function with getSortedByPrice function from "VareModule" in mind.
        renderTable(VareModule.getSortedByPrice());
        //Changes icon from "arrow-up" to "arrow-down".
        icon.classList.toggle("fa-caret-up", false);
        icon.classList.toggle("fa-caret-down", true);
    }
}

//Sorts alfabetically by name.
function sortByName(){
    //Finding the correct element to "look" at within "sortNameBtn".
    let icon = sortNameBtn.children[1].firstChild;
    if(icon.classList.contains("fa-caret-down")){
        //call on renderTable function with getSortedByName function from "VareModule" in mind.
        //Revesed order.
        renderTable(VareModule.getSortedByName().reverse());
        //Changes icon from "arrow-down" to "arrow-up".
        icon.classList.toggle("fa-caret-up", true);
        icon.classList.toggle("fa-caret-down", false);
    }else if(icon.classList.contains("fa-caret-up")){
        //call on renderTable function with getSortedByName function from "VareModule" in mind.
        renderTable(VareModule.getSortedByName());
        //Changes icon from "arrow-up" to "arrow-down".
        icon.classList.toggle("fa-caret-up", false);
        icon.classList.toggle("fa-caret-down", true);
    }
}
function sortById(){
    //Finding the correct element to "look" at within "sortIdBtn".
    let icon = sortIdBtn.children[1].firstChild;
    if(icon.classList.contains("fa-caret-down")){
        //call on renderTable function with getSortedById function from "VareModule" in mind.
        //Revesed order.
        renderTable(VareModule.getSortedByID().reverse());
        //Changes icon from "arrow-down" to "arrow-up"
        icon.classList.toggle("fa-caret-up", true);
        icon.classList.toggle("fa-caret-down", false);
    }else if(icon.classList.contains("fa-caret-up")){
        //call on renderTable function with getSortedById function from "VareModule" in mind.
        renderTable(VareModule.getSortedByID());
        //Changes icon from "arrow-up" to "arrow-down".
        icon.classList.toggle("fa-caret-up", false);
        icon.classList.toggle("fa-caret-down", true);
    }
}


//Defines openAddProdModal and HTML location.
const openAddProdModal = document.getElementById("add-prod-modal");
//Function for opening Modal.
function openAddProduct(){
    //Sets modal to active
    openAddProdModal.classList.toggle("is-active", true);
    //Call on function for premade newProductID.
    setNewProdId();
}
//Function that closes the modal.
function exitAddProduct(){
    //Sets modal to not active
    openAddProdModal.classList.toggle("is-active", false);
}

//Function that finds the next new productID
function setNewProdId(){
    //Connecting to HTML location
    const newProdID = document.getElementById("new-prod-id");
    //Pulls info from "VareModule.newProdID();"
    let setProdID = VareModule.newProdID();
    //Inserts informaton to HTML location as "placeholder value".
    newProdID.placeholder = setProdID;
}

//Function for saving information from user input.
function saveNewProd(){
    //Checks user input for product type.
    let newProdType = document.getElementById("new-prod-type").value;
    
    //Checks user input for product name.
    let newProdName = document.getElementById("new-prod-name").value;
    //Checks user input for product price.
    let newProdPrice = document.getElementById("new-prod-price").value;
    
    //checks user input on checkboxes for allergies.
    let newProdAllergies =[];
    allergyNames.forEach(name =>{
        newProdAllergies.push(document.getElementById(name).checked);
    });
    let newProdIsVegitarian = document.getElementById("is-vegitarian-checkbox").checked;


    //checks user input on ingredients
    let newProductIngredients = document.getElementById("new-prod-ingredients").value.toLowerCase();

    VareModule.addVare(VareModule.newProdID(), newProdType, newProdName,newProdPrice, newProdAllergies, newProdIsVegitarian, newProductIngredients);
    //Prints new table with added product
    renderTable(VareModule.getAll());

    //closes Modal
    openAddProdModal.classList.toggle("is-active", false);
}