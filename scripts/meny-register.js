import VareModule from './modules/VareModule.js';

//Defining various variables.
let searchInput;
let addProductBtn;
let closeAddProductBtn;
let sortPriceBtn;
let sortNameBtn;
let sortIdBtn;
let saveProdBtn;

//defines variable. Gets info from "VareModule.getAllAllergies();"
let allegyNames = VareModule.getAllAllergies();

//Funcion that immediately runs on start. 
function initialise(){
    //Defines searchInput. Connecting it to HTML location with id = "search-input".
    searchInput = document.getElementById("search-input");
    //Adding "typing" listner. checks for any letter Will run menuSearch function.
    searchInput.addEventListener('keyup', menuSearch);
    
    //Creating tableTitles.
    //Will be all <th> info for products
    let tableTitles = `
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodId"></a></th>
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodName"></a></th>
    <th class ="is-narrow"><a class="has-text-grey-dark" id = "prodPrice"></a></th>
    <th colspan="10" class="has-text-centered"><a class="has-text-grey-dark" id = "prodAllergies">Allergener</a></th>`;
    //emptyTitles are a set of merged empty table cells. To keep table organized.
    let emptyTitles = `<td colspan="3"></td>`;
    //Define empty variable.
    let allergyTitles = "";
    
    //ForEach loop that creates a table cell for each type of allergy.
    //Gets info from "let allegyNames = VareModule.getAllAllergies();"
    allegyNames.forEach(name => {
        allergyTitles += `<td class="has-text-centered">${name}</td>`;
    });
    
    // creating const variable for menuHead. Connecting it to HTML location with id = "menu-head"
    const menuHead = document.getElementById("menu-head");
    //Adds relevant data to menuHead
    menuHead.innerHTML = `<tr>${tableTitles}</tr><tr>${emptyTitles}${allergyTitles}</tr>`;
    
    //Creating button with click listner. Connecting to HTML.
    //Will sort table by price.
    sortPriceBtn = document.getElementById("prodPrice");
    sortPriceBtn.innerHTML = `<span>Pris</span><span class = "icon"><i class="fas fa-caret-down"></i></span>`;
    sortPriceBtn.addEventListener('click', sortByPrice);
    
    //Creating button with click listner. Connecting to HTML.
    sortNameBtn = document.getElementById("prodName");
    sortNameBtn.innerHTML = `<span>Produkt Navn</span><span class="icon"><i class="fas fa-caret-down"></i></span>`;
    sortNameBtn.addEventListener('click', sortByName);
    
    //Creating button with click listner. Connecting to HTML.
    sortIdBtn = document.getElementById("prodId");
    sortIdBtn.innerHTML =`<span>ID</span><span class = "icon"><i class="fas fa-caret-down"></i></span>`;
    sortIdBtn.addEventListener('click', sortById);


    //Used in Modal. Accessed by "addProductBtn"
    //-----------------------------------------------------
    //defines variable. Connecting the variable to HTML location with id = "allergies-check-tablehead"
    const checkAllergiesTableHead = document.getElementById("allergies-check-tablehead");
    //defines variable. Connecting the variable to HTML location with id = "allergies-checkbox"
    const checkAllergyTableBody = document.getElementById("allergies-checkbox");
    
    //Adding allergyNames in cells.
    let tableHeadCheck = "";
    tableHeadCheck += `${allergyTitles}`;
    
    //Adding a checkbox for each allergy
    let tableBodyCheck ="";
    allegyNames.forEach(name =>{
        tableBodyCheck += `<td class="has-text-centered"><input type="checkbox" id="${name}"></td>`;
    });

    //sending info to html.
    checkAllergiesTableHead.innerHTML +=`<tr>${tableHeadCheck}</tr>`;
    checkAllergyTableBody.innerHTML +=`<tr>${tableBodyCheck}</tr>`;
    
    
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

//Run initialise function.
initialise();

//creating renderTable function.
//Will print out the entire table of products. Including product info.
function renderTable(array){
    // creating const variable for menuBody. Connecting it to HTML location with id = "menu-body"
    const menuBody = document.getElementById("menu-body");
    //Leaving everything inside tag empty.
    menuBody.innerHTML = "";
    
    //Define variable type
    let type;
    //Define variable types. Sets types as result from "getAllProductTypes" function from VareModule
    let types = VareModule.getAllProductTypes();
    //ForEach loop where we add table-content
    for(type in types){
        //Adding table tags for menuBody. Fetch info from "let types = VareModule.getAllProductTypes();"
        //Prints a cells with ID-info, name-info, price-info and allegy-info
        menuBody.innerHTML += `<tr><td colspan="13" class="has-text-centered"><b>${types[type]}</b></td><tr>`;
        //Fetch info from VareModule.
        const byTypeArray = VareModule.getByProductType(types[type].toString(), array);
        byTypeArray.forEach(vare =>{
            //Define results
            let result = "";
            result += `
            <td class="is-narrow">${vare.productID}</td>
            <td class="is-narrow" title="${vare.getDescription()}"><em>${vare.productName}</em></td>
            <td>${vare.price},-</id></td>`;
            
            //Adding status for all allergies (boolean). Set icon for true/false.
            vare.allergies.forEach(allergy =>{
                if(allergy.state){
                    result += `<td class="has-text-centered"><span class = "icon"><i class="fas fa-check has-text-danger"></i></span></td>`;
                }else{
                    result += `<td class="has-text-centered"><span class = "icon"><i class="fas fa-times has-text-info-dark"></i></span></td>`;
                }
            });
            //add "results" in "menuBody".
            menuBody.innerHTML += `<tr id = "${vare.productName}">${result}</tr>`;
        });
    }
}
//Prints "basic-table".
renderTable(VareModule.getAll());

function editProduct(){
    let prodList = VareModule.getAll().length;
    for (var i = 0; i<prodList; i++){
        if(document.getElementsByTagName("tr")===VareModule.productName){
            editProdBtn = document.getElementById(VareModule.productName)
            editProdBtn.addEventListener('click', test)
        }
    }
}

editProduct();
function test(){
    alert("yo");
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

//Defines openModal and HTML location.
const openModal = document.getElementById("add-prod-modal");

//Function for opening Modal.
function openAddProduct(){
    //Sets modal to active
    openModal.classList.toggle("is-active", true);
    //Call on function for premade newProductID.
    setNewProdId();
}
//Function that closes the modal.
function exitAddProduct(){
    //Sets modal to not active
    openModal.classList.toggle("is-active", false);
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
    allegyNames.forEach(name =>{
        newProdAllergies.push(document.getElementById(name).checked);
    });
    let newProdIsVegitarian = document.getElementById("is-vegitarian-checkbox").checked;


    //checks user input on description
    let newProductDescription = document.getElementById("new-prod-description").value;


    VareModule.addVare(VareModule.newProdID(), newProdType, newProdName,newProdPrice, newProdAllergies, newProdIsVegitarian, newProductDescription);

    renderTable(VareModule.getAll());

    console.log(newProdType);
    console.log(newProdAllergies);
    console.log(newProdName);
    console.log(newProdPrice);
    console.log(newProductDescription);
}

