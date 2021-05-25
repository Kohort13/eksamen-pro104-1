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

    //Generates 60 random orders for the database
    let orders = [];
    const numOfEmployees = AnsattModule.getAll().length;
    const numOfItems = VareModule.getAll().length;
    for(let i = 0; i < 60; i++){
        const id = idGenerator.getID() + UtilsModule.leadingZeros(getRandom(0, 10000),5);
        const restaurant = RestaurantModule.getById(getRandom(0, 3));
        const employee = AnsattModule.getByIndex(getRandom(0, numOfEmployees));
        
        let linesToGenerate = getRandom(1, 4);
        let orderLines = [];
        for(; linesToGenerate >= 1; linesToGenerate--){
            let product = VareModule.getByID(getRandom(0, numOfItems));
            orderLines.push(new OrderLine(product, getRandom(1, 5)));
        }
        let randomOrder = new Order(id, UtilsModule.getRandomDate(), employee, restaurant, orderLines);
        orders.push(randomOrder);
    }
    const getSumOfOrders = (array) => {
        let sum = 0;
        array.forEach(element => sum += element.getOrderSum());
        return sum;
    }

    //Returns all elements, sorted chronologically
    const getAll = () => {
        orders.sort(function(a, b){
            const dayA = a.date.substr(0,2);
            const dayB = b.date.substr(0,2);
            return (dayA - dayB);
        });
        orders.sort(function(a, b){
            const monthA = a.date.substr(3,2);
            const monthB = b.date.substr(3,2);    
            return (monthA - monthB);
        });
        orders.sort(function(a, b){
            const yearA = a.date.substr(6,4);
            const yearB = b.date.substr(6,4);    
            return (yearA - yearB);
        });        
        return orders;
    }
    const getByDate = (date) => {
        return orders.filter( order => {order.date >= date});
    }

    const getByItemID = (id) => {        
        return orders.filter(order => {
            order.orderLines.forEach(line => { return (line.itemID === id)});
        })
    }

    const getTodaysProfits = () => {
        //TODO - actually calculate profits for today
        return getSumOfOrders(orders);
    }
    return {getAll, getByDate, getByItemID, getSumOfOrders, getTodaysProfits}

}());

export default SalgModule;