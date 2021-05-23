const VareModule = (function(){

    const productType = {DRINK: 'drink', PIZZA: 'pizza'};
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
        return allergies;
    }
    class Vare {
        constructor(productID, productType, productName, price, allergies, description){
            this._productID = productID;
            this._productType = productType;
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
    let allergiesL = createAllergies(false, true, false, false, false, false, false, false, false, false);
    let allergiesG_L_PN = createAllergies(true, true, false, false, false, false, false, true, false, false);
    let noAllergies = createAllergies(false, false, false, false, false, false, false, false, false, false);
    const varer = [
        new Vare(0, productType.PIZZA, "Pizza Marinara", priceClass1, allergiesL, "Glutenfri pizza med tomatsaus"),
        new Vare(1, productType.PIZZA, "Pizza Margherita", priceClass2, allergiesL, "glutenfri pizza med tomatsaus og mozzarella"),
        new Vare(2, productType.PIZZA, "Pizza Capricciosa", priceClass3, allergiesG_L, "pizza med tomatsaus, mozzarella, skinke, artisjokk, sopp og svarte oliven"),
        new Vare(3, productType.PIZZA, "Prosciutto e funghi", priceClass4, allergiesG_L_PN, "pizza med tomatsaus, mozzarella, prosciutto, sopp, ruccola og pinjekjenren"),
        new Vare(4, productType.PIZZA, "Quatro Formaggi", priceClass3, allergiesG_L, "pizza med tomatsaus, mozzarella, gorgonzola, fontina og parmesan"),
        new Vare(5, productType.PIZZA, "Pizza Pepperoni", priceClass2, allergiesG_L, "pizza med tomatsaus, mozzarella, pepperoni"),
        new Vare(6, productType.PIZZA, "Pizza Pesto", priceClass2, allergiesG_L_PN, "pizza med tomatsaus, mozzarella, pesto"),
        new Vare(7, productType.PIZZA, "Pizza Di Parma", priceClass4, allergiesG_L_PN, "pizza med crème fraîche, cherry tomater, atiskokkbunner, mozzarella, parmaskinke, ruccolasalat og pinjekjerner"),
        new Vare(8, productType.DRINK, "Coca Cola", 55, noAllergies, "500ml glass coca cola"),
        new Vare(9, productType.DRINK, "Kaffe", 55, noAllergies, "500ml glass coca cola"),
        new Vare(10, productType.DRINK, "Cappuccino", 55, allergiesL, "kaffe med melk")
    ];
    const getAll = () => varer;

    const getByName = (prodName) => {
        return varer.filter(vare => vare._productName === prodName);
    }
    const getByID = (id) => {
        return varer.filter(vare => vare._productID === id);
    }
    const getByPrice = (price) => {
        return varer.filter(vare => vare._price === price);
    }
    const getByProductType = (type) => {
        return varer.filter(vare => vare._productType === type);
    }

    const getByAllergies = (inputAllergy) => {
        let outputArray = [];
        varer.forEach(vare => {
            vare._allergies.forEach(allergy => {
                if(inputAllergy === allergy.name && allergy.state)
                    outputArray.push(vare);
            })
        })
        return outputArray;
    }


    return {getAll, getByName, getByID, getByPrice, getByProductType, getByAllergies}
}());
export default VareModule;