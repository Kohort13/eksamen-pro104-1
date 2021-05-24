import VareModule from "./VareModule.js";
const SalgModule = (function(){

    class OrderLine {
        constructor(item, quantity){
            this._item = item;
            this._quantity = quantity;
        }
        get orderID(){ return this._orderID; }
        get itemID(){ return this._itemID; }
        get quantity(){ return this._quantity; }

        set orderID(id){ this._orderID = id; }
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

        set orderID(id) { this._orderID = id; }
    }

    //TODO make itemID actually correspond to menu items, instead of strings
    const products = VareModule.getAll();
    const orders = [];    

    const getAll = () => orders;
    const getByDate = (date) => {
        return orders.filter( order => {order.date === date});
    }

    const getByItemID = (id) => {
        return orders.filter(order => {
            order.orderLines.forEach(line => { return (line.itemID === id)});
        })
    }
    return {getAll, getByDate, getByItemID}
}());

export default SalgModule;