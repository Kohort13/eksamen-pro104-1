import VareModule from "./modules/VareModule.js"

var testDiv = document.getElementById("test");

function generatePizza(){

    const pizzaer = VareModule.getByProductType("Pizza");

    for (let i = 0; i < pizzaer.length; i++) {
        if(pizzaer[i].isVegetarian){

            testDiv.innerHTML += `
                <h1>${pizzaer[i].productID}.
                    <b> ${pizzaer[i].productName} </b>${pizzaer[i].price} 
                        <span style="color: green;">Vegetar</span>
                        <span class="icon is-small">
                            <i class="fas fa-leaf" style="color: green;"></i>
                        </span>
                </h1>
                <p>${pizzaer[i].ingredients}</p>
                <hr>
            `;

        } else {

            testDiv.innerHTML += `
                <h1>${pizzaer[i].productID}.
                    <b> ${pizzaer[i].productName} </b>${pizzaer[i].price} 
                </h1>
                <p>${pizzaer[i].ingredients}</p>
                <hr>
            `;
        }        
    }    
}


generatePizza(VareModule.getAll);

function generateDrinks(){

    const drikke = VareModule.getByProductType("Drikke");

}