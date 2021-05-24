const VareModule = (function(){

    const productType = {DRINK: 'Drikke', PIZZA: 'Pizza'};
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
        constructor(productID, productType, productName, price, allergies, description, vegetarian){
            this._productID = productID;
            this._productType = productType;
            this._productName = productName;
            this._price = price;
            this._allergies = allergies;
            this._description = description;
            this._vegetarian = vegetarian; 
        }
        get productID() { return this._productID; }
        get productType() { return this._productType; }
        get productName() { return this._productName; }
        get price() { return this._price; }
        get allergies() { return this._allergies; }
        get description() { return this._description; }
        get vegetarian() { return this._vegetarian; }
    }
    let priceClass1 = 99;
    let priceClass2 = 149;
    let priceClass3 = 169;
    let priceClass4 = 219;
    let nonAlcoholicDrikPrice = 55;

    let allergiesG_L = createAllergies(true, true, false, false, false, false, false, false, false, false);
    let allergiesL = createAllergies(false, true, false, false, false, false, false, false, false, false);
    let allergiesG_L_PN = createAllergies(true, true, false, false, false, false, false, true, false, false);
    let noAllergies = createAllergies(false, false, false, false, false, false, false, false, false, false);
    const varer = [
        new Vare(0, productType.PIZZA, "Pizza Marinara", priceClass1, allergiesL, "tomatsaus", true),
        new Vare(1, productType.PIZZA, "Pizza Margherita", priceClass2, allergiesL, "tomatsaus og mozzarella", true),
        new Vare(2, productType.PIZZA, "Pizza Capricciosa", priceClass3, allergiesG_L, "tomatsaus, mozzarella, skinke, artisjokk, sopp og svarte oliven"),
        new Vare(3, productType.PIZZA, "Prosciutto e funghi", priceClass4, allergiesG_L_PN, "tomatsaus, mozzarella, prosciutto, sopp, ruccola og pinjekjerner"),
        new Vare(4, productType.PIZZA, "Quatro Formaggi", priceClass3, allergiesG_L, "tomatsaus, mozzarella, gorgonzola, fontina og parmesan", true),
        new Vare(5, productType.PIZZA, "Pizza Pepperoni", priceClass2, allergiesG_L, "tomatsaus, mozzarella, pepperoni"),
        new Vare(6, productType.PIZZA, "Pizza Pesto", priceClass2, allergiesG_L_PN, "tomatsaus, mozzarella, pesto", true),
        new Vare(7, productType.PIZZA, "Pizza Di Parma", priceClass4, allergiesG_L_PN, "crème fraîche, cherry tomater, artisjokkbunner, mozzarella, parmaskinke, ruccolasalat og pinjekjerner"),
        new Vare(7, productType.PIZZA, "Pizza Ortolana", priceClass3, allergiesG_L, "tomatsaus, mozzarella, paprika, grillet aubergine, artisjokk og toppet med basilikum", true),
        new Vare(8, productType.DRINK, "Coca Cola", nonAlcoholicDrikPrice, noAllergies, "500ml glass coca cola"),
        new Vare(9, productType.DRINK, "Kaffe", nonAlcoholicDrikPrice, noAllergies, "500ml glass coca cola"),
        new Vare(10, productType.DRINK, "Cappuccino", nonAlcoholicDrikPrice, allergiesL, "Kaffe med melk")
    ];
    const getAll = () => varer;

    const getByName = (prodName) => {
        return varer.filter(vare => vare.productName.toLowerCase().includes(prodName.toLowerCase()));
    }
    const getByID = (id) => {
        return varer.filter(vare => vare.productID === id);
    }
    const getByPrice = (price) => {
        return varer.filter(vare => vare.price === price);
    }
    const getByProductType = (type) => {
        return varer.filter(vare => vare.productType === type);
    }

    const getByAllergies = (inputAllergy) => {
        let outputArray = [];
        varer.forEach(vare => {
            vare.allergies.forEach(allergy => {
                if(inputAllergy === allergy.name && allergy.state)
                    outputArray.push(vare);
            })
        })
        return outputArray;
    }
    const getAllAllergies = ()=> {
        const allAllergies = createAllergies(false, false, false, false, false, false, false, false, false, false);
        const allergyNames = [];
        allAllergies.forEach(allegy =>{
            allergyNames.push(allegy.name);
        })
        return allergyNames;
    }
    const findItemByname = (name) =>{
        varer.forEach(vare => {
            if(vare.name.toLowerCase().includes(name.toLowerCase())){
                return vare;
            }
        })
    }
    const getSortedByType = ()=>{
        return varer.sort((v, v2) => {
            if(v.type > v2.type){
                return 1;
            }else if(v.type === v2.type){
                return 0;                
            }else{
                return -1;
            }
        });
    }

    return {getAll, getByName, getByID, getByPrice, getByProductType, getByAllergies,
         getAllAllergies, findItemByname, getSortedByType}
}());
export default VareModule;