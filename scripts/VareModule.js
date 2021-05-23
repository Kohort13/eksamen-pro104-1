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
    let allergiesG_L = createAllergies(true, true, false, false, false, false, false, false, false, false);
    let allergisL = createAllergies(true, true, false, false, false, false, false, false, false, false);
    let allergiesG_L_PN = createAllergies(true, true, false, false, false, false, false, true, false, false);
    const varer = [
        new Vare("Pizza Marinara", 99, allergisL, "Glutenfri pizza med tomatsaus"),
        new Vare("Pizza Margherita", 149, allergisL, "glutenfri pizza med tomatsaus og mozzarella"),
        new Vare("Pizza Capricciosa", 169, allergiesG_L, "pizza med tomatsaus, mozzarella, skinke, artisjokk, sopp og svarte oliven"),
        new Vare("Prosciutto e funghi", 169, allergiesG_L_PN, "pizza med tomatsaus, mozzarella, prosciutto, sopp, ruccola og pinjekjenren"),
        new Vare("Quatro Formaggi", 169, allergiesG_L, "pizza med tomatsaus, mozzarella, gorgonzola, fontina og parmesan"),
        new Vare("Pizza Pepperoni", 149, allergiesG_L, "pizza med tomatsaus, mozzarella, pepperoni"),
        new Vare("Pizza Pesto", 149, allergiesG_L_PN, "pizza med tomatsaus, mozzarella, pesto"),
        new Vare("Pizza Di Parma", 199, allergiesG_L_PN, "pizza med crème fraîche, cherry tomater, atiskokkbunner, mozzarella, parmaskinke, ruccolasalat og pinjekjerner"),
    ];
    const getAll = () => varer;
    const getByAllergies = (allergies) => {
        return varer.filter(varer => varer.allergies === allergies);
    }
    return {getAll, getByAllergies}
}());
export default VareModule;