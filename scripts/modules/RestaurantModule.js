//Simple database for all the restaurants

const RestaurantModule = (function(){
    class Restaurant {
        constructor(id, username, name, address, phone){
            this.id = id;
            this.username = username;
            this.name = name;
            this.address = address;
            this._phone = phone;
        }
        get phone() {
            let formattedNumber = this._phone.toString();
            formattedNumber = formattedNumber.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
            return formattedNumber;
        }
    }

    const restaurants = [
        new Restaurant(1, "gp-storgata", "Avd. Storgata", "Storgata 27, 0000 OSLO", 12345678),
        new Restaurant(2, "gp-bjølsen", "Avd. Bjølsen", "Storgata 27, 0000 OSLO", 23456789),
        new Restaurant(3, "gp-løkka", "Avd. Løkka", "Storgata 27, 0000 OSLO", 34567890),
        new Restaurant(4, "gp-bislett", "Avd. Bislett", "Thereses Gate 12, 0000 OSLO", 45678901)
    ];

    const getAll = () => restaurants;
    const getById = (id) => { return restaurants[id-1]; }
    const getByName = (name) => { 
        restaurants.forEach(restaurant => {
            if(restaurant.name === name)
                return restaurant;
        })
    }
    return {getAll, getById, getByName}
}());

export default RestaurantModule;