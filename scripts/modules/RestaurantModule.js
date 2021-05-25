const RestaurantModule = (function(){
    class Restaurant {
        constructor(id, name, address, phone){
            this.id = id;
            this.name = name;
            this.address = address;
            this.phone = phone;
        }
    }

    const restaurants = [
        new Restaurant(1, "GP Storgata", "Storgata 27, 0000 OSLO", 22323332),
        new Restaurant(2, "GP Bjølsen", "Storgata 27, 0000 OSLO", 22323332),
        new Restaurant(3, "GP Løkka", "Storgata 27, 0000 OSLO", 22323332),
        new Restaurant(4, "GP Bislett", "Thereses Gate 12, 0000 OSLO", 22323332)
    ];

    const getAll = () => restaurants;
    const getById = (id) => { return restaurants[id]; }
    const getByName = (name) => { 
        restaurants.forEach(restaurant => {
            if(restaurant.name === name)
                return restaurant;
        })
    }
    return {getAll, getById, getByName}
}());

export default RestaurantModule;