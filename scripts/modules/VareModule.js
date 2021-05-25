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
        constructor(productID, productType, productName, price, allergies, description){
            this._productID = productID;
            this._productType = productType;
            this._productName = productName;
            this._price = price;
            this._allergies = allergies;
            this._description = description;
        }
        get productID() { return this._productID; }
        get productType() { return this._productType; }
        get productName() { return this._productName; }
        get price() { return this._price; }
        get allergies() { return this._allergies; }
        get description() { return this._description; }
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
        new Vare(0, productType.PIZZA, "Pizza Marinara", priceClass1, allergiesL, "Glutenfri pizza med tomatsaus"),
        new Vare(1, productType.PIZZA, "Pizza Margherita", priceClass2, allergiesL, "Glutenfri pizza med tomatsaus og mozzarella"),
        new Vare(2, productType.PIZZA, "Pizza Capricciosa", priceClass3, allergiesG_L, "Pizza med tomatsaus, mozzarella, skinke, artisjokk, sopp og svarte oliven"),
        new Vare(3, productType.PIZZA, "Prosciutto e funghi", priceClass4, allergiesG_L_PN, "Pizza med tomatsaus, mozzarella, prosciutto, sopp, ruccola og pinjekjenren"),
        new Vare(4, productType.PIZZA, "Quatro Formaggi", priceClass3, allergiesG_L, "Pizza med tomatsaus, mozzarella, gorgonzola, fontina og parmesan"),
        new Vare(5, productType.PIZZA, "Pizza Pepperoni", priceClass2, allergiesG_L, "Pizza med tomatsaus, mozzarella, pepperoni"),
        new Vare(6, productType.PIZZA, "Pizza Pesto", priceClass2, allergiesG_L_PN, "Pizza med tomatsaus, mozzarella, pesto"),
        new Vare(7, productType.PIZZA, "Pizza Di Parma", priceClass4, allergiesG_L_PN, "Pizza med crème fraîche, cherry tomater, atiskokkbunner, mozzarella, parmaskinke, ruccolasalat og pinjekjerner"),
        new Vare(8, productType.PIZZA, "Pizza Ortolana", priceClass3, allergiesG_L, "Pizza med tomatsaus, mozzarella, paprika, grillet aubergine, artisjokk og toppet med basilikum"),
        new Vare(9, productType.DRINK, "Coca Cola", nonAlcoholicDrikPrice, noAllergies, "500ml glass coca cola"),
        new Vare(10, productType.DRINK, "Kaffe", nonAlcoholicDrikPrice, noAllergies, "Svart Kaffe"),
        new Vare(11, productType.DRINK, "Cappuccino", nonAlcoholicDrikPrice, allergiesL, "Kaffe med melk")
    ];
    const getAll = () => varer;

    const getByName = (prodName) => {
        return varer.filter(vare => vare.productName.toLowerCase().includes(prodName.toLowerCase()));
    }
    const findItemByname = (name) =>{
        varer.forEach(vare => {
            if(vare.name.toLowerCase().includes(name.toLowerCase())){
                return vare;
            }
        })
    }
    const getByID = (id) => {
        return varer.filter(vare => vare.productID === id);
    }
    const sortByID = () => {
        return varer.sort((v, v2) => {
            if(v.id > v2.id){
                return 1;
            }else if(v.id === v2.id){
                return 0;
            }else{
                return -1;
            }
        })
    }

    const getByPrice = (price) => {
        return varer.filter(vare => vare.price === price);
    }
    const getSortedByPrice = () =>{
        return varer.sort((v, v2) => {
            if(v.price > v2.price){
                return 1;
            }else if(v.price === v2.price){
                return 0;
            }else{
                return -1;
            }
        })
    }

    const getByProductType = (type) => {
        return varer.filter(vare => vare.productType === type);
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



    return {getAll, getByName, getByID, sortByID, getByPrice, getSortedByPrice, 
        getByProductType, getSortedByType, getByAllergies, getAllAllergies, findItemByname}
}());
export default VareModule;