import ProductModule from "./ProductModule.js";
import EmployeeModule from "./EmployeeModule.js";
import UtilsModule from "./UtilsModule.js";
import LoginModule from "./LoginModule.js";

const SalesModule = (function(){
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

    const generateRandomOrder = (afterDate, specificDate) => {
        const id = idGenerator.getID() + UtilsModule.leadingZeros(getRandom(0, 10000),5);
        const employee = EmployeeModule.getRandomWaiter();
        const restaurant = employee._restaurant;
        
        let linesToGenerate = getRandom(1, 4);
        let orderLines = [];
        for(; linesToGenerate >= 1; linesToGenerate--){
            let product = ProductModule.getByID(getRandom(0, numOfItems));
            orderLines.push(new OrderLine(product, getRandom(1, 5)));
        }
        if(specificDate){
            return new Order(id, specificDate, employee, restaurant, orderLines);
        }
        return new Order(id, UtilsModule.getRandomDate(afterDate), employee, restaurant, orderLines);    
    }

    //Generates 60 random orders for the database
    let orders = [];
    const numOfEmployees = EmployeeModule.getAll().length;
    const numOfItems = ProductModule.getAll().length;
    for(let i = 0; i < 60; i++){
        orders.push(generateRandomOrder());
    }
    for(let i = 0; i < 70; i++){
        orders.push(generateRandomOrder(2021));
        orders.push(generateRandomOrder(null, new Date()));
    }
    orders.sort(function(a, b){ return (a.date.valueOf() - b.date.valueOf()); });        
    const getSumOfOrders = (array) => {
        let sum = 0;
        array.forEach(element => sum += element.getOrderSum());
        let sumString = sum.toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ');
        return sumString;
    }

    /*This function returns orders sorted chronologically, as well as filtered by which user is logged in. 
    This is to avoid one restaurant accidentally editing data that doesn't belong to it. All other exposed functions use this, so data is always displayed for the relevant restaurant*/
    const getAll = () => {
        orders.sort(function(a, b){
            const dateA = a.date.valueOf();
            const dateB = b.date.valueOf();
            return (dateA - dateB);
        }); 
        const user = LoginModule.getUser().username;
        if(user == "test"){
            return orders;
        }else{
            return orders.filter(order => order.restaurantID.username == user);
        }
    }
    const getByDate = (date) => {
        return getAll().filter( (order) => {
            if(order.date.getFullYear() === date.getFullYear() && order.date.getMonth() === date.getMonth() && order.date.getDate() === date.getDate())
                return true;
        });
    }
    const getByDateRange = (from, to, bypassUser) => {
        const fromDate = from;
        let toDate = new Date(to.valueOf());
        toDate.setDate(toDate.getDate()+1)

        //Poor security, but need this case to return stats for all restaurants regardless of user
        if(bypassUser){
            const filteredArray = orders.filter( order => order.date > fromDate && order.date < toDate);
            return filteredArray;
        }
        else{
            const filteredArray = getAll().filter( order => order.date > fromDate && order.date < toDate);
            return filteredArray;
        }
    }

    //Returns an array of aggregated order lines within a given date range
    const getOrderLinesInRange = (from, to) => {
        const orders = getByDateRange(from, to);
        let orderLines = [];
        orders.forEach(order =>{
            order.orderLines.forEach(orderLine => {
                let match = false;
                orderLines.forEach(storedOrderLine => {
                    if(storedOrderLine.item == orderLine.item){
                        match = true;
                        storedOrderLine.quantity += orderLine.quantity;
                    }
                })
                if(!match)
                    orderLines.push({item: orderLine.item, quantity: orderLine.quantity});
            })
        })
        orderLines.sort(function(a,b){
            return a.item.productID - b.item.productID;
        })
        return orderLines;
    }

    //Returns the sum of all sales from the current date, formatted with spaces between 10^2;
    const getTodaysProfits = () => {
        const todaysOrders = getByDate(new Date());
        let sum = getSumOfOrders(todaysOrders);
        sum = sum.toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ');
        return sum;
    }

    //Returns the best employee and their order totals for a given period
    const getBestEmployee = (fromDate, toDate) => {
        let employeeStats = [];
        const orders = getByDateRange(fromDate, toDate);
        orders.forEach(order => {
            let match = false; 
            employeeStats.forEach(employee => {
                if(order.employeeID == employee){
                    employee.sumSales += order.getOrderSum();
                    match = true;
                }
            })
            if(!match){
                employeeStats.push({employee: order.employeeID, sumSales: order.getOrderSum()});
            }
        })
        employeeStats.sort(function(a,b){
            return a.sumSales - b.sumSales;
        });
        return employeeStats[employeeStats.length-1];
    }

    //Returns the best product and the total sum for a given period
    const getBestProduct = (fromDate, toDate) => {
        let productStats = [];
        const orders = getOrderLinesInRange(fromDate, toDate);
        orders.forEach(orderLine => {
            let match = false; 
            productStats.forEach(product => {
                if(orderLine.item == product.item){
                    product.sumSales += orderLine.item.price * orderLine.quantity;
                    product.sumQuantity += orderLine.quantity;
                    match = true;
                }
            })
            if(!match){
                productStats.push({product: orderLine.item, sumQuantity: orderLine.quantity ,sumSales: orderLine.item.price * orderLine.quantity});
            }
        })
        productStats.sort(function(a,b){
            return a.sumSales - b.sumSales;
        });
        return productStats[productStats.length-1];
    }

    const getRestaurantsProfitsInRange = (fromDate, toDate) => {
        let restaurantStats = [];
        const allOrders = getByDateRange(fromDate, toDate, true);
        allOrders.forEach(order => {
            let match = false;
            restaurantStats.forEach( statistic => {
                if(order.restaurantID == statistic.restaurant){
                    statistic.sumSales += order.getOrderSum();
                    match = true;
                }
            })
            if(!match)
                restaurantStats.push({restaurant: order.restaurantID, sumSales: order.getOrderSum()});
        })
        restaurantStats.sort(function(a,b){
            return a.sumSales - b.sumSales;
        });
        return restaurantStats;
    }
    
    const getById = (id) => {
        let foundOrder = null;
        getAll().forEach(order => {
            if(id == order.orderID)
                foundOrder = order;
        });
        return foundOrder;
    }
    return {getAll, getByDate, getById, getSumOfOrders, getTodaysProfits, getByDateRange, getOrderLinesInRange, getRestaurantsProfitsInRange, getBestEmployee, getBestProduct}

}());

export default SalesModule;