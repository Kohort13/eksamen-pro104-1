import VareModule from './modules/VareModule.js'

const renderMenu = (function(){
    const output = document.getElementById("pizza");
    output.innerHTML = `<h1><b>VÅRE PIZZAER</b></h1><br>`
    VareModule.getByProductType("Pizza").forEach(element => {
        let vegetarian = (element.vegetarian) ? "Vegetar": "";
        output.innerHTML += `
        <h1>${element.productID}.<b> ${element.productName} </b>${element.price}kr <span style="color: green;">${vegetarian}</span></h1>
            <p>${element.description}</p>
        <hr>`;
    })
    output.innerHTML += ``;
}());

//Using syntax const renderMenu = (function() {}() ); means that the function is both declared and executed at the same time