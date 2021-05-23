const VareModule = (function(){


    function createAllergies(gluten, lactose, egg, peanuts, nuts, shellfish, fish, pineNuts, soy, celery){
        let allergies = [
            {name: "Gluten", state: gluten},
            {name: "Lactose", state: lactose},
            {name: "Egg", state: egg},
            {name: "Peanuts", state: peanuts},
            {name: "Nuts", state: nuts},
            {name: "Shellfish", state: shellfish},
            {name: "Fish", state: fish},
            {name: "PineNuts", state: pineNuts},
            {name: "Soy", state: soy},
            {name: "Celery", state: celery}
        ];
    }
    class Vare {
        constructor(productName, price, allergies, description){
            this._productName = productName;
            this._price = price;
            this._allergies = allergies;
            this._description = description;
        }
    }
    let priceClass1 = 99;
    let priceClass2 = 149;
    let priceClass3 = 169;
    let priceClass4 = 219;

    let allergiesG_L = createAllergies(true, true, false, false, false, false, false, false, false, false);
    let allergisL = createAllergies(true, true, false, false, false, false, false, false, false, false);
    let allergiesG_L_PN = createAllergies(true, true, false, false, false, false, false, true, false, false);
    const varer = [
        new Vare("Pizza Marinara", priceClass1, allergisL, "Glutenfri pizza med tomatsaus"),
        new Vare("Pizza Margherita", priceClass2, allergisL, "glutenfri pizza med tomatsaus og mozzarella"),
        new Vare("Pizza Capricciosa", priceClass3, allergiesG_L, "pizza med tomatsaus, mozzarella, skinke, artisjokk, sopp og svarte oliven"),
        new Vare("Prosciutto e funghi", priceClass4, allergiesG_L_PN, "pizza med tomatsaus, mozzarella, prosciutto, sopp, ruccola og pinjekjenren"),
        new Vare("Quatro Formaggi", priceClass3, allergiesG_L, "pizza med tomatsaus, mozzarella, gorgonzola, fontina og parmesan"),
        new Vare("Pizza Pepperoni", priceClass2, allergiesG_L, "pizza med tomatsaus, mozzarella, pepperoni"),
        new Vare("Pizza Pesto", priceClass2, allergiesG_L_PN, "pizza med tomatsaus, mozzarella, pesto"),
        new Vare("Pizza Di Parma", priceClass4, allergiesG_L_PN, "pizza med crème fraîche, cherry tomater, atiskokkbunner, mozzarella, parmaskinke, ruccolasalat og pinjekjerner"),
    ];
    const getAll = () => varer;
    const getByAllergies = (allergies) => {
        return varer.filter(varer => varer.allergies === allergies);
    }
    return {getAll, getByAllergies}
}());
export default VareModule;