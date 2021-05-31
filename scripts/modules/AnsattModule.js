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
    const randomAdresss = () => {return `Storgata ${UtilsModule.randomNumberInRange(1,73)}, 0858 Oslo`};
    const ansatte = [
        //Restaurant 1
        new Ansatt("Jenny", "Olovsdottir", randomPhoneNr(), "j@oldottr.org", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(1)), 
        new Ansatt("Ola", "Nordmensch", randomPhoneNr(), "ola@nordmench.org", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(1)), 
        new Ansatt("Mari", "Halvorson", randomPhoneNr(), "mari.h@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(1)), 
        new Ansatt("Eddie", "Gravdal", randomPhoneNr(), "edigvalley@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)), 
        new Ansatt("Cathrine", "Nagel", randomPhoneNr(), "cnagel@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)), 
        new Ansatt("Johanne", "Bergersen", randomPhoneNr(), "joh.bergersen@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)),
        //Restaurant 2
        new Ansatt("Bob Kåre", "Johnniebjørn", randomPhoneNr(), "bob@kåre.org", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(2)),
        new Ansatt("Trine", "Svenskamensch", randomPhoneNr(), "trine@svensk.se", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(2)), 
        new Ansatt("Gustav", "Jonson", randomPhoneNr(), "gustav.jonson@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(2)), 
        new Ansatt("Sarah", "Wallenius", randomPhoneNr(), "s.wallenius@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)), 
        new Ansatt("Petter", "Måneberg", randomPhoneNr(), "its_not_the_fart@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)), 
        new Ansatt("Birgitte", "", randomPhoneNr(), "joh.bergersen@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)),
        //Restaurant 3
        new Ansatt("Adrian", "Overgård", randomPhoneNr(), "aoverg@coldmail.com", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(3)), 
        new Ansatt("Charlotte", "Hansen", randomPhoneNr(), "ch.hansen@coldmail.com", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(3)), 
        new Ansatt("David", "Olssen", randomPhoneNr(), "d.olssen@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(3)), 
        new Ansatt("Eva", "Gunnarsson", randomPhoneNr(), "egun@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)), 
        new Ansatt("Fredrik", "Al'Égie", randomPhoneNr(), "f.uck@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)), 
        new Ansatt("Guro", "Mortensen", randomPhoneNr(), "g.mort@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)),
        //Restaurant 4
        new Ansatt("Javier", "Gonzales", randomPhoneNr(), "jgone@coldmail.com", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(4)), 
        new Ansatt("Iselin", "Ingebretsen", randomPhoneNr(), "ising@coldmail.com", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(4)), 
        new Ansatt("Jesper", "Hoyt", randomPhoneNr(), "yawnie@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(4)), 
        new Ansatt("Karoline", "Bache", randomPhoneNr(), "edigvalley@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)), 
        new Ansatt("Lars", "Larsen", randomPhoneNr(), "lars1@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)), 
        new Ansatt("Mina", "Marinara", randomPhoneNr(), "min.mar@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)),
    ];

    const getAll = () => ansatte;
    const getByPosition = (position) => {
        return ansatte.filter( ansatt => ansatt._position === position);
    }
    const getRandomWaiter = () => {
        const waiters = getByPosition(Positions.WAITER);
        const randomId = UtilsModule.randomNumberInRange(0, waiters.length -1)
        return waiters[randomId];
    }
    const getByIndex = (index) => { return ansatte[index]; }
    return {getAll, getByPosition, getByIndex, getRandomWaiter}
}());

export default AnsattModule;