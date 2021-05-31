import UtilsModule from "./UtilsModule.js";

const ProductModule = (function(){

    const productTypes = {
        PIZZA: 'Pizza',
        MINERAL_WATER: 'Mineralvann', 
        BEER: 'Øl', 
        WINE: 'Vin', 
        HOT_DRINK: 'Varm drikke' 
    };
    function createAllergies(gluten, lactose, egg, peanuts, nuts, shellfish, fish, pineNuts, soy, celery){
        let allergies = [
            {name: "Gluten", state: gluten},
            {name: "Laktose", state: lactose},
            {name: "Egg", state: egg},
            {name: "Peanøtter", state: peanuts},
            {name: "Nøtter", state: nuts},
            {name: "Skalldyr", state: shellfish},
            {name: "Fisk", state: fish},
            {name: "Pinjekjerner", state: pineNuts},
            {name: "Soya", state: soy},
            {name: "Selleri", state: celery}
        ];
        return allergies;
    }
    class Vare {
        constructor(productID, productType, productName, price, allergies, isVegetarian, ingredients){
            this._productID = productID;
            this._productType = productType;
            this._productName = productName;
            this._price = price;
            this._allergies = allergies;
            this._isVegetarian = isVegetarian;
            this._ingredients = ingredients;
        }
        get productID() { return this._productID; }
        get productType() { return this._productType; }
        get productName() { return this._productName; }
        get price() { return this._price; }
        get allergies() { return this._allergies; }
        get isVegetarian() { return this._isVegetarian; }
        get ingredients() { return this._ingredients; }
        getProductIngredients(){
            switch(this.productType){
                case productTypes.PIZZA: 
                    return `Pizza med ${this.ingredients}`;
                default: 
                    return this.ingredients;
            }
        }
    }
    let priceClass1 = 99;
    let priceClass2 = 149;
    let priceClass3 = 169;
    let priceClass4 = 219;
    let nonAlcoholicDrinkPrice = 55;
    let alcoholicDrinkPrice = 89;
    let craftAlcoholicDrinkPrice = 129;
    let expensiveWine = 1500;
    let glassOfWine = 149;

    let allergiesG = createAllergies(true, false, false, false, false, false, false, false, false, false);
    let allergiesG_L = createAllergies(true, true, false, false, false, false, false, false, false, false);
    let allergiesG_L_E = createAllergies(true, true, true, false, false, false, false, false, false, false);
    let allergiesL = createAllergies(false, true, false, false, false, false, false, false, false, false);
    let allergiesG_L_PN = createAllergies(true, true, false, false, false, false, false, true, false, false);
    let allergiesG_L_F = createAllergies(true, true, false, false, false, false, true, false, false, false);
    let noAllergies = createAllergies(false, false, false, false, false, false, false, false, false, false);
    const idGenerator = new UtilsModule.IdGenerator();
    const getUniqueID = () => { return idGenerator.getID()}
    const varer = [
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Marinara", priceClass1, allergiesL, true, "tomatsaus"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Margherita", priceClass2, allergiesL, true, "tomatsaus og mozzarella"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Veronese", priceClass2, allergiesG_L, false, "tomatsaus, prosciutto, sopp"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Quattro stagioni", priceClass2, allergiesG_L_E, false, "tomatsaus, artisjokk, oliven, paprika, mozzarella, tomater, kokt egg og sopp"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Pugliese", priceClass1, allergiesG_L, true, "tomatsaus, oliven, kapers, mozzarella, tomater"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza alla Napoletana", priceClass1, allergiesG_L_F, false, "tomatsaus, oliven, kapers, mozzarella, tomater"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Capricciosa", priceClass3, allergiesG_L, false, "tomatsaus, mozzarella, skinke, artisjokk, sopp og svarte oliven"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Prosciutto e funghi", priceClass4, allergiesG_L_PN, false, "tomatsaus, mozzarella, prosciutto, sopp, ruccola og pinjekjerner"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Quatro Formaggi", priceClass3, allergiesG_L, true, "tomatsaus, mozzarella, gorgonzola, fontina og parmesan"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Pepperoni", priceClass2, allergiesG_L, false, "tomatsaus, mozzarella, pepperoni"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Pesto", priceClass2, allergiesG_L_PN, true, "tomatsaus, mozzarella, pesto"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Di Parma", priceClass4, allergiesG_L_PN, false, "crème fraîche, cherry tomater, atiskokkbunner, mozzarella, parmaskinke, ruccolasalat og pinjekjerner"),
        new Vare(getUniqueID(), productTypes.PIZZA, "Pizza Ortolana", priceClass3, allergiesG_L, true, "tomatsaus, mozzarella, paprika, grillet aubergine, artisjokk. Toppet med basilikum"),
        new Vare(getUniqueID(), productTypes.MINERAL_WATER, "Coca Cola", nonAlcoholicDrinkPrice, noAllergies, false, "500ml glass mineralvann"),
        new Vare(getUniqueID(), productTypes.MINERAL_WATER, "Coca Cola Zero", nonAlcoholicDrinkPrice, noAllergies, false, "500ml glass mineralvann"),
        new Vare(getUniqueID(), productTypes.MINERAL_WATER, "Fanta", nonAlcoholicDrinkPrice, noAllergies, false, "500ml mineralvann"),
        new Vare(getUniqueID(), productTypes.MINERAL_WATER, "Sprite", nonAlcoholicDrinkPrice, noAllergies, false, "500ml mineralvann"),
        new Vare(getUniqueID(), productTypes.MINERAL_WATER, "Sprite Zero", nonAlcoholicDrinkPrice, noAllergies, false, "500ml glass mineralvann"),
        new Vare(getUniqueID(), productTypes.BEER, "Heineken", alcoholicDrinkPrice, allergiesG, false, "500ml glass Heineken, fra tapp"),
        new Vare(getUniqueID(), productTypes.BEER, "Brewdog Lost Lager", craftAlcoholicDrinkPrice, allergiesG, false, "330ml flaske med Brewdog Lost Lager"),
        new Vare(getUniqueID(), productTypes.WINE, "Brunello Di Montalcino", expensiveWine, noAllergies, false, "750ml flaske med Brunello Di Montalcino fra Toscana"),
        new Vare(getUniqueID(), productTypes.WINE, "Cote des Roses Rosé 2019", glassOfWine, noAllergies, false, "140ml Glass med Rosévin"),
        new Vare(getUniqueID(), productTypes.WINE, " Bogle Chardonnay 2018", glassOfWine, noAllergies, false, "140ml Glass med Hvitvin"),
        new Vare(getUniqueID(), productTypes.WINE, "Ripasso valpolicella", glassOfWine, noAllergies, false, "140ml Glass med Rødvin"),
        new Vare(getUniqueID(), productTypes.WINE, "Mionetto Prosecco Brut", glassOfWine, noAllergies, false, "140ml Glass med Prosecco"),
        new Vare(getUniqueID(), productTypes.HOT_DRINK, "Kaffe", nonAlcoholicDrinkPrice, noAllergies, false, "Svart Kaffe"),
        new Vare(getUniqueID(), productTypes.HOT_DRINK, "Cappuccino", nonAlcoholicDrinkPrice, allergiesL, false, "Kaffe med melk")
    ];
    const getAll = () => varer;

    function addVare(productType, productName, price, allergies, isVegetarian, ingredients){
        const allergiesObj = createAllergies(allergies[0],allergies[1],allergies[2],allergies[3],allergies[4],allergies[5],allergies[6],allergies[7],allergies[8],allergies[9])
        varer.push(new Vare(getUniqueID(), productType, productName, price, allergiesObj, isVegetarian, ingredients))
    }
    function changeProduct(productID, productType, productName, price, allergies, isVegetarian, ingredients){
        const allergiesObj = createAllergies(allergies[0],allergies[1],allergies[2],allergies[3],allergies[4],allergies[5],allergies[6],allergies[7],allergies[8],allergies[9])
        // ProductID -1 => because array counts from 0, but id's counts from 1.
        varer[productID-1] = new Vare(productID, productType, productName, price, allergiesObj, isVegetarian, ingredients);
    }
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
    const getSortedByName = () =>{
        return varer.sort((v, v2) =>{
            if(v.productName > v2.productName){
                return 1;
            }else if(v.productName === v2.productName){
                return 0;
            }else{
                return -1;
            }
        })
    }

    const getByID = (id) => {
        return varer[id];
    }
    const getNextId = () =>{
        return idGenerator.getNextId();
    }
    const getSortedByID = () => {
        return varer.sort(((v, v2) => {
            if(v.productID > v2.productID){
                return 1;
            }else if(v.productID === v2.productID){
                return 0;
            }else{
                return -1;
            }
        }))
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

    const getByProductType = (type, array) => {
        if(array){
            return array.filter(vare => vare.productType.toLowerCase().includes(type.toLowerCase()));
        }
        return varer.filter(vare => vare.productType.toLowerCase().includes(type.toLowerCase()));
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
        allAllergies.forEach(allergy =>{
            allergyNames.push(allergy.name);
        })
        return allergyNames;
    }

    const getAllProductTypes = () => {
        return productTypes;
    }

    return {getAll, addVare, changeProduct, getByName, getSortedByName, getByID, getNextId, getSortedByID, getByPrice, 
        getSortedByPrice, getByProductType, getSortedByType, getByAllergies, 
        getAllAllergies, findItemByname, getAllProductTypes}
}());
export default ProductModule;