import UtilsModule from "./UtilsModule.js";
import RestaurantModule from "./RestaurantModule.js"

const AnsattModule = (function(){

    const Positions = {
        MANAGER: 'Avdelingsleder',
        ASS_MANAGER: 'Assisterende avdelingsleder',
        CHEF: 'Kokk',
        ASS_CHEF: 'Assisterende kokk',
        WAITER: 'Servitør'         
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
    const randomPhoneNr = () => { 
        let number = UtilsModule.randomNumberInRange(90000000, 99999999).toString();
        //TODO - consider moving this to ansatt-register.js instead (so that class has phone stored as int instead of string)
        return `${number.substr(0, 3)} ${number.substr(2, 2)} ${number.substr(4, 3)}`; 
    };
    const randomBirthDate = () => { return UtilsModule.getRandomDate(1969, 1999)};
    const ansatte = [
        new Ansatt("Ola", "Nordmensch", randomPhoneNr(), "ola@nordmench.org", "Storgata 12, 0858 Oslo", randomBirthDate(), "465 000kr", Positions.ASS_CHEF, RestaurantModule.getById(1).name), 
        new Ansatt("Trine", "Svenskamensch", randomPhoneNr(), "trine@svensk.se", "Storgata 14, 0858 Oslo", randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(2).name), 
        new Ansatt("Bob Kåre", "Johnniebjørn", randomPhoneNr(), "bob@kåre.org", "Storgata 66, 0858 Oslo", randomBirthDate(), "731 000kr", Positions.ASS_MANAGER, RestaurantModule.getById(3).name)
    ];

    const getAll = () => ansatte;
    const getByPosition = (position) => {
        return ansatte.filter( ansatt => ansatt.position === position);
    }
    const getByIndex = (index) => { return ansatte[index]; }
    return {getAll, getByPosition, getByIndex}
}());

export default AnsattModule;