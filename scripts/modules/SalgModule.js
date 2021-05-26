import VareModule from "./VareModule.js";
import AnsattModule from "./AnsattModule.js";
import RestaurantModule from "./RestaurantModule.js"
import UtilsModule from "./UtilsModule.js";

const SalgModule = (function(){
    class OrderLine {
        constructor(item, quantity){
            this._item = item;
            this._quantity = quantity;
        }
        get item(){ return this._item; }
        get quantity(){ return this._quantity; }
    }
    
    class Order {        
        constructor(orderID, date, employeeID, restaurantID, orderLines){
            this._orderID = orderID;
            this._date = date;
            this._employeeID = employeeID;
            this._restaurantID = restaurantID;
            this._orderLines = orderLines;         
        }
        get orderID() { return this._orderID; }
        get date() { return this._date; }
        get employeeID() { return this._employeeID; }
        get restaurantID() { return this._restaurantID; }
        get orderLines() { return this._orderLines; }
        getOrderSum() {
            let sum = 0;
            this._orderLines.forEach(orderLine =>{
                sum += orderLine.item.price * orderLine.quantity;
            })
            return sum;
        }
    }

    const getRandom = (min, max) => { return UtilsModule.randomNumberInRange(min, max); }
    const idGenerator = new UtilsModule.IdGenerator();

    function generateRandomOrder(afterDate) {
        const id = idGenerator.getID() + UtilsModule.leadingZeros(getRandom(0, 10000),5);
        const restaurant = RestaurantModule.getById(getRandom(0, 3));
        const employee = AnsattModule.getByIndex(getRandom(0, numOfEmployees));
        
        let linesToGenerate = getRandom(1, 4);
        let orderLines = [];
        for(; linesToGenerate >= 1; linesToGenerate--){
            let product = VareModule.getByID(getRandom(0, numOfItems));
            orderLines.push(new OrderLine(product, getRandom(1, 5)));
        }
        return new Order(id, UtilsModule.getRandomDate(afterDate), employee, restaurant, orderLines);
        
    }
    //Generates 60 random orders for the database
    let orders = [];
    const numOfEmployees = AnsattModule.getAll().length;
    const numOfItems = VareModule.getAll().length;
    for(let i = 0; i < 60; i++){
        orders.push(generateRandomOrder());
    }
    for(let i = 0; i < 30; i++){
        orders.push(generateRandomOrder(2021));
    }
    orders.sort(function(a, b){ return (a.date.valueOf() - b.date.valueOf()); });        
    const getSumOfOrders = (array) => {
        let sum = 0;
        array.forEach(element => sum += element.getOrderSum());
        return sum;
    }

    //Returns all elements, sorted chronologically
    const getAll = () => {
        orders.sort(function(a, b){
            const dateA = a.date.valueOf();
            const dateB = b.date.valueOf();
            return (dateA - dateB);
        });        
        return orders;
    }
    const getByDate = (date) => {
        return orders.filter( (order) => order.date > date);
    }
    const getByDateRange = (from, to) => {
        return orders.filter( order => order.date > from && order.date < to);
    }

    const getTodaysProfits = () => {
        //TODO - actually calculate profits for today
        return getSumOfOrders(orders);
    }
    return {getAll, getByDate, getSumOfOrders, getTodaysProfits, getByDateRange}

}());

export default SalgModule;