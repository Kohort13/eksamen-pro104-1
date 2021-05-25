import VareModule from "./modules/VareModule.js"

var testDiv = document.getElementById("test");

function generatePizza(){

    const pizzaer = VareModule.getByProductType("Pizza");

    for (let i = 0; i < pizzaer.length; i++) {
        document.getElementById("test").innerHTML = pizzaer.toString();

        if(pizzaer.isVegetarian){

            testDiv += `
                <h1>${pizzaer.id[i]}.
                    <b> ${pizzaer.name[i]} </b>${pizzaer.price[i]} 
                        <span style="color: green;">Vegetar</span>
                        <span class="icon is-small">
                            <i class="fas fa-leaf" style="color: green;"></i>
                        </span>
                </h1>
                <p>${pizzaer.ingredients[i]}</p>
                <hr>
            `;

        } else {

            testDiv += `
                <h1>${pizzaer.id[i]}.
                    <b> ${pizzaer.name[i]} </b>${pizzaer.price[i]} 
                </h1>
                <p>${pizzaer.ingredients[i]}</p>
                <hr>
            `;
        }
        
    }

    
}
generatePizza(VareModule.getAll);

function generateDrinks(){

    const drikke = VareModule.getByProductType("Drikke");

}