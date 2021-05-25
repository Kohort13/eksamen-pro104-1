import VareModule from "./VareModule.js";
import AnsattModule from "./AnsattModule.js";
import RestaurantModule from "./RestaurantModule.js"
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

    //TODO make itemID actually correspond to menu items, instead of strings
    const products = VareModule.getAll();
    const restaurants = RestaurantModule.getAll();
    const productBN = (name) => {return VareModule.getByName(name)[0]}; //Wrapping function in simplified name to clean up array initialiser
    const empById = (id) => { return AnsattModule.getByIndex(id) };
    const randomNumber = (min, max) => { return Math.floor(Math.random() * (max-min) + min)}
    const randomDate = () => { 
        const day = randomNumber(1, 28); 
        const month = randomNumber(1, 12);
        const year = randomNumber(1, 21);
        const dayStr = (day < 10) ? "0" + day.toString() : day.toString();
        const monthStr = (month < 10) ? "0" + month.toString() : month.toString();
        let yearStr = "20"
        yearStr += (year < 10) ? "0" + year.toString() : year.toString();

        return `${dayStr}-${monthStr}-${yearStr}`;
    };

    //Using random function to generate faux-unique ids for each order
    const orders = [
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(0), restaurants[1], [new OrderLine(productBN("quatro"),1), new OrderLine(productBN("cola"),2)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(1), restaurants[1], [new OrderLine(productBN("marinara"),1), new OrderLine(productBN("cola"),1)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(1), restaurants[2], [new OrderLine(productBN("prosc"),2), new OrderLine(productBN("cola"),3)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(2), restaurants[0], [new OrderLine(productBN("pesto"),5), new OrderLine(productBN("cola"),12)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(0), restaurants[0], [new OrderLine(productBN("pepperoni"),3), new OrderLine(productBN("cola"),6)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(0), restaurants[0], [new OrderLine(productBN("pepperoni"),3), new OrderLine(productBN("cola"),6)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(1), restaurants[1], [new OrderLine(productBN("marinara"),1), new OrderLine(productBN("cola"),1)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(0), restaurants[0], [new OrderLine(productBN("quatro"),1), new OrderLine(productBN("cola"),2)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(1), restaurants[0], [new OrderLine(productBN("fung"),3), new OrderLine(productBN("cola"),6)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(1), restaurants[0], [new OrderLine(productBN("prosc"),2), new OrderLine(productBN("cola"),3)]),
        new Order((Math.random() * 1000).toFixed(0), randomDate(), empById(2), restaurants[0], [new OrderLine(productBN("pesto"),5), new OrderLine(productBN("cola"),12)]),
        new Order((Math.random() * 1000).toFixed(0), "21-05-2021", empById(1), restaurants[0], [new OrderLine(productBN("fung"),3), new OrderLine(productBN("cola"),6)]),
    ];

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