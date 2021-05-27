import VareModule from "./modules/VareModule.js"

var pizzaDiv = document.getElementById("pizza");
var sodaDiv = document.getElementById("soda");
var hotDrinksDiv = document.getElementById("hotDrink");
var beerDiv = document.getElementById("beer");
//var wineDiv = document.getElementById("wine");


//GENERATING PIZZAS
function generatePizza(){
    const pizzaer = VareModule.getByProductType("Pizza");
    for (let i = 0; i < pizzaer.length; i++) {
        if(pizzaer[i].isVegetarian){

            pizzaDiv.innerHTML += `
                <h1>${pizzaer[i].productID}.
                    <b> ${pizzaer[i].productName} </b>${pizzaer[i].price}kr 
                        <span style="color: green;">Vegetar</span>
                        <span class="icon is-small">
                            <i class="fas fa-leaf" style="color: green;"></i>
                        </span>
                </h1>
                <p>${pizzaer[i].ingredients}</p>
                <hr>
            `;
        } else {
            pizzaDiv.innerHTML += `
                <h1>${pizzaer[i].productID}.
                    <b> ${pizzaer[i].productName} </b>${pizzaer[i].price}kr 
                </h1>
                <p>${pizzaer[i].ingredients}</p>
                <hr>
            `;
        }        
    }    
}
generatePizza(VareModule.getAll);

//GENERATING ALL OF THE DIFFERENT DRINKS (SODA, HOT DRINKS AND BEER)
function generateSoda(){
    const brus = VareModule.getByProductType("Mineralvann");
    for (let i = 0; i < brus.length; i++){

        sodaDiv.innerHTML += `
            <h1>${brus[i].productID}. 
                <b> ${brus[i].productName} </b> ${brus[i].price}kr
            </h1>
            <p>${brus[i].ingredients}</p>
            <hr>
        `;
    }
}
generateSoda(VareModule.getAll);


function generateHotDrinks(){
    const hotDrink = VareModule.getByProductType("Varm drikke");
    for (let i = 0; i < hotDrink.length; i++){

        hotDrinksDiv.innerHTML += `
            <h1>${hotDrink[i].productID}. 
                <b> ${hotDrink[i].productName} </b> ${hotDrink[i].price}kr
            </h1>
            <p>${hotDrink[i].ingredients}</p>
            <hr>
        `;
    }
}
generateHotDrinks(VareModule.getAll);


function generateBeer(){
    const beer = VareModule.getByProductType("Øl");
    for (let i = 0; i < beer.length; i++){

        beerDiv.innerHTML += `
            <h1>${beer[i].productID}. 
                <b> ${beer[i].productName} </b> ${beer[i].price}kr
            </h1>
            <p>${beer[i].ingredients}</p>
            <hr>
        `;
    }
}
generateBeer(VareModule.getAll);

/** 
function generateWine(){
    const wine = VareModule.getByProductType("Vin");
    for (let i = 0; i < wine.length; i++){

        wineDiv.innerHTML += `
            <h1>${wine[i].productID}. 
                <b> ${wine[i].productName} </b> ${wine[i].price}kr
            </h1>
            <p>${wine[i].ingredients}</p>
            <hr>
        `;
    }
}
generateWine(VareModule.getAll);
*/

