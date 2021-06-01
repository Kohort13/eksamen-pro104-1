import UtilsModule from "./UtilsModule.js";

//Database for all the products the restaurants offer
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
    class Product {
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


    //Fields and helper methods for cleaning up initialization of the products array
    const priceClass1 = 99;
    const priceClass2 = 149;
    const priceClass3 = 169;
    const priceClass4 = 219;
    const nonAlcoholicDrinkPrice = 55;
    const alcoholicDrinkPrice = 89;
    const craftAlcoholicDrinkPrice = 129;
    const expensiveWine = 1500;
    const glassOfWine = 149;

    const allergiesG = createAllergies(true, false, false, false, false, false, false, false, false, false);
    const allergiesG_L = createAllergies(true, true, false, false, false, false, false, false, false, false);
    const allergiesG_L_E = createAllergies(true, true, true, false, false, false, false, false, false, false);
    const allergiesL = createAllergies(false, true, false, false, false, false, false, false, false, false);
    const allergiesG_L_PN = createAllergies(true, true, false, false, false, false, false, true, false, false);
    const allergiesG_L_F = createAllergies(true, true, false, false, false, false, true, false, false, false);
    const noAllergies = createAllergies(false, false, false, false, false, false, false, false, false, false);
    
    const idGenerator = new UtilsModule.IdGenerator();
    const getUniqueID = () => { return idGenerator.getID()}
    const products = [
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Marinara", priceClass1, allergiesL, true, "tomatsaus"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Margherita", priceClass2, allergiesL, true, "tomatsaus og mozzarella"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Veronese", priceClass2, allergiesG_L, false, "tomatsaus, prosciutto, sopp"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Quattro stagioni", priceClass2, allergiesG_L_E, false, "tomatsaus, artisjokk, oliven, paprika, mozzarella, tomater, kokt egg og sopp"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Pugliese", priceClass1, allergiesG_L, true, "tomatsaus, oliven, kapers, mozzarella, tomater"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza alla Napoletana", priceClass1, allergiesG_L_F, false, "tomatsaus, oliven, kapers, mozzarella, tomater"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Capricciosa", priceClass3, allergiesG_L, false, "tomatsaus, mozzarella, skinke, artisjokk, sopp og svarte oliven"),
        new Product(getUniqueID(), productTypes.PIZZA, "Prosciutto e funghi", priceClass4, allergiesG_L_PN, false, "tomatsaus, mozzarella, prosciutto, sopp, ruccola og pinjekjerner"),
        new Product(getUniqueID(), productTypes.PIZZA, "Quatro Formaggi", priceClass3, allergiesG_L, true, "tomatsaus, mozzarella, gorgonzola, fontina og parmesan"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Pepperoni", priceClass2, allergiesG_L, false, "tomatsaus, mozzarella, pepperoni"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Pesto", priceClass2, allergiesG_L_PN, true, "tomatsaus, mozzarella, pesto"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Di Parma", priceClass4, allergiesG_L_PN, false, "crème fraîche, cherry tomater, atiskokkbunner, mozzarella, parmaskinke, ruccolasalat og pinjekjerner"),
        new Product(getUniqueID(), productTypes.PIZZA, "Pizza Ortolana", priceClass3, allergiesG_L, true, "tomatsaus, mozzarella, paprika, grillet aubergine, artisjokk. Toppet med basilikum"),
        new Product(getUniqueID(), productTypes.MINERAL_WATER, "Coca Cola", nonAlcoholicDrinkPrice, noAllergies, false, "500ml glass mineralvann"),
        new Product(getUniqueID(), productTypes.MINERAL_WATER, "Coca Cola Zero", nonAlcoholicDrinkPrice, noAllergies, false, "500ml glass mineralvann"),
        new Product(getUniqueID(), productTypes.MINERAL_WATER, "Fanta", nonAlcoholicDrinkPrice, noAllergies, false, "500ml mineralvann"),
        new Product(getUniqueID(), productTypes.MINERAL_WATER, "Sprite", nonAlcoholicDrinkPrice, noAllergies, false, "500ml mineralvann"),
        new Product(getUniqueID(), productTypes.MINERAL_WATER, "Sprite Zero", nonAlcoholicDrinkPrice, noAllergies, false, "500ml glass mineralvann"),
        new Product(getUniqueID(), productTypes.BEER, "Heineken", alcoholicDrinkPrice, allergiesG, false, "500ml glass Heineken, fra tapp"),
        new Product(getUniqueID(), productTypes.BEER, "Brewdog Lost Lager", craftAlcoholicDrinkPrice, allergiesG, false, "330ml flaske med Brewdog Lost Lager"),
        new Product(getUniqueID(), productTypes.WINE, "Brunello Di Montalcino", expensiveWine, noAllergies, false, "750ml flaske med Brunello Di Montalcino fra Toscana"),
        new Product(getUniqueID(), productTypes.WINE, "Cote des Roses Rosé 2019", glassOfWine, noAllergies, false, "140ml Glass med Rosévin"),
        new Product(getUniqueID(), productTypes.WINE, " Bogle Chardonnay 2018", glassOfWine, noAllergies, false, "140ml Glass med Hvitvin"),
        new Product(getUniqueID(), productTypes.WINE, "Ripasso valpolicella", glassOfWine, noAllergies, false, "140ml Glass med Rødvin"),
        new Product(getUniqueID(), productTypes.WINE, "Mionetto Prosecco Brut", glassOfWine, noAllergies, false, "140ml Glass med Prosecco"),
        new Product(getUniqueID(), productTypes.HOT_DRINK, "Kaffe", nonAlcoholicDrinkPrice, noAllergies, false, "Svart Kaffe"),
        new Product(getUniqueID(), productTypes.HOT_DRINK, "Cappuccino", nonAlcoholicDrinkPrice, allergiesL, false, "Kaffe med melk")
    ];
    const getAll = () => products;

    //Function that adds a product to the database. Note that this isn't stored persistently
    function addProduct(productType, productName, price, allergies, isVegetarian, ingredients){
        const allergiesObj = createAllergies(allergies[0],allergies[1],allergies[2],allergies[3],allergies[4],allergies[5],allergies[6],allergies[7],allergies[8],allergies[9])
        products.push(new Product(getUniqueID(), productType, productName, price, allergiesObj, isVegetarian, ingredients))
    }
    function changeProduct(productID, productType, productName, price, allergies, isVegetarian, ingredients){
        const allergiesObj = createAllergies(allergies[0],allergies[1],allergies[2],allergies[3],allergies[4],allergies[5],allergies[6],allergies[7],allergies[8],allergies[9])
        // ProductID -1 => because array counts from 0, but id's counts from 1.
        let product = getByID(productID); //new Product(productID, productType, productName, price, allergiesObj, isVegetarian, ingredients);
        product._productType = productType;
        product._productName = productName;
        product._price = price;
        product._allergies = allergiesObj;
        product._isVegetarian = isVegetarian;
        product._ingredients = ingredients;
    }
    const getByName = (prodName) => {
        return products.filter(product => product.productName.toLowerCase().includes(prodName.toLowerCase()));
    }
    const findItemByname = (name) =>{
        products.forEach(product => {
            if(product.name.toLowerCase().includes(name.toLowerCase())){
                return product;
            }
        })
    }
    const getSortedByName = () =>{
        return products.sort((p1, p2) =>{
            if(p1.productName > p2.productName){
                return 1;
            }else if(p1.productName === p2.productName){
                return 0;
            }else{
                return -1;
            }
        })
    }

    const getByID = (id) => {
        let foundProduct = null;
        products.forEach(product => {
            if(product.productID == id)
                foundProduct = product;
        })
        return foundProduct;
    }
    const getNextId = () =>{
        return idGenerator.getNextId();
    }
    const getSortedByID = () => {
        return products.sort(((v, v2) => {
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
        return products.filter(product => product.price === price);
    }
    const getSortedByPrice = () =>{
        return products.sort((p1, p2) => {
            return p1.price - p2.price;
        })
    }

    const getByProductType = (type, array) => {
        if(array){
            return array.filter(product => product.productType.toLowerCase().includes(type.toLowerCase()));
        }
        return products.filter(product => product.productType.toLowerCase().includes(type.toLowerCase()));
    }

    const getSortedByType = ()=>{
        return products.sort((p1, p2) => {
            if(p1.type > p2.type){
                return 1;
            }else if(p1.type === p2.type){
                return 0;                
            }else{
                return -1;
            }
        });
    }

    //Function for outputting an array of products with a given input allergy. Not used in the final product
    const getByAllergies = (inputAllergy) => {
        let outputArray = [];
        products.forEach(product => {
            product.allergies.forEach(allergy => {
                if(inputAllergy === allergy.name && allergy.state)
                    outputArray.push(product);
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

    return {getAll, addProduct, changeProduct, getByName, getSortedByName, getByID, getNextId, getSortedByID, getByPrice, 
        getSortedByPrice, getByProductType, getSortedByType, getByAllergies, 
        getAllAllergies, findItemByname, getAllProductTypes}
}());
export default ProductModule;