const AnsattModule = (function(){

    const Positions = {
        MANAGER: 'Avdelingsleder',
        ASS_MANAGER: 'Assisterende avdelingsleder',
        CHEF: 'Kokk',
        ASS_CHEF: 'Assisterende kokk',
        WAITER: 'Servitør'         
    };
    const Restaurants = {
        RES_1: 'Restaurant 1', 
        RES_2: 'Restaurant 2', 
        RES_3: 'Restaurant 3', 
        RES_4: 'Restaurant 4'
    };

    class Ansatt {
        constructor(firstName, lastName, tel, email, addr, birthDate, salary, position, restaurant){
            this._firstName = firstName;
            this._lastName = lastName;
            this._telephone = tel;
            this._email = email;
            this._address = addr;
            this._birthDate = birthDate;
            this._salary = salary;
            this._position = position;
            this._restaurant = restaurant;
        }
        get fullName(){
            return `${this._firstName} ${this._lastName}`;
        }
    }

    const ansatte = [
        new Ansatt("Ola", "Nordmensch", 98480551, "ola@nordmench.org", "Storgata 12, 0858 Oslo", "12.06.1978", "465 000kr", Positions.ASS_CHEF, Restaurants.RES_1), 
        new Ansatt("Trine", "Svenskamensch", 48983802, "trine@svensk.se", "Storgata 14, 0858 Oslo", "12.06.1989", "647 000kr", Positions.CHEF, Restaurants.RES_2), 
        new Ansatt("Bob Kåre", "Johnniebjørn", 47985826, "bob@kåre.org", "Storgata 66, 0858 Oslo", "12.06.1996", "731 000kr", Positions.ASS_MANAGER, Restaurants.RES_3)
    ];

    const getAll = () => ansatte;
    const getByPosition = (position) => {
        return ansatte.filter( ansatt => ansatt.position === position);
    }
    const getByIndex = (index) => { return ansatte[index]; }
    return {getAll, getByPosition, getByIndex}
}());

export default AnsattModule;