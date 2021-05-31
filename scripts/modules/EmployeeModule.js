import UtilsModule from "./UtilsModule.js";
import RestaurantModule from "./RestaurantModule.js"

const EmployeeModule = (function(){

    const Positions = {
        MANAGER: 'Avdelingsleder',
        ASS_MANAGER: 'Assisterende avdelingsleder',
        CHEF: 'Kokk',
        ASS_CHEF: 'Assisterende kokk',
        WAITER: 'Servitør'         
    };
    class Employee {
        constructor(picture, firstName, lastName, tel, email, addr, birthDate, salary, position, restaurant){
            this._picture = picture;
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
        return `${number.substr(0, 3)} ${number.substr(2, 2)} ${number.substr(4, 3)}`; 
    };
    const randomBirthDate = () => { return UtilsModule.getRandomDate(1969, 1999)};
    const randomAdresss = () => {return `Storgata ${UtilsModule.randomNumberInRange(1,73)}, 0858 Oslo`};
    const employees = [
        //Restaurant 1
        new Employee("female1.png","Jenny", "Olovsdottir", randomPhoneNr(), "j@oldottr.org", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(1)), 
        new Employee("male1.png", "Ola", "Nordmensch", randomPhoneNr(), "ola@nordmench.org", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(1)), 
        new Employee("female2.png", "Mari", "Halvorson", randomPhoneNr(), "mari.h@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(1)), 
        new Employee("male2.png", "Eddie", "Gravdal", randomPhoneNr(), "edigvalley@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)), 
        new Employee("female3.png", "Cathrine", "Nagel", randomPhoneNr(), "cnagel@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)), 
        new Employee("female4.png", "Johanne", "Bergersen", randomPhoneNr(), "joh.bergersen@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)),
        //Restaurant 2
        new Employee("male3.png", "Bob Kåre", "Johnniebjørn", randomPhoneNr(), "bob@kåre.org", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(2)),
        new Employee("female5.png", "Trine", "Svenskamensch", randomPhoneNr(), "trine@svensk.se", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(2)), 
        new Employee("male4.png", "Gustav", "Jonson", randomPhoneNr(), "gustav.jonson@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(2)), 
        new Employee("female6.png","Sarah", "Wallenius", randomPhoneNr(), "s.wallenius@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)), 
        new Employee("male5.png","Petter", "Måneberg", randomPhoneNr(), "its_not_the_fart@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)), 
        new Employee("female7.png", "Birgitte", "Valentýna", randomPhoneNr(), "its_the_smell@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)),
        //Restaurant 3
        new Employee("male6.png","Adrian", "Overgård", randomPhoneNr(), "aoverg@coldmail.com", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(3)), 
        new Employee("female8.png", "Charlotte", "Hansen", randomPhoneNr(), "ch.hansen@coldmail.com", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(3)), 
        new Employee("male7.png", "David", "Olssen", randomPhoneNr(), "d.olssen@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(3)), 
        new Employee("female9.png", "Eva", "Gunnarsson", randomPhoneNr(), "egun@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)), 
        new Employee("male8.png", "Fredrik", "Al'Égie", randomPhoneNr(), "f.uck@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)), 
        new Employee("female10.png" ,"Guro", "Mortensen", randomPhoneNr(), "g.mort@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)),
        //Restaurant 4
        new Employee("male9.png", "Javier", "Gonzales", randomPhoneNr(), "jgone@coldmail.com", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(4)), 
        new Employee("female11.png", "Iselin", "Ingebretsen", randomPhoneNr(), "ising@coldmail.com", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(4)), 
        new Employee("male10.png", "Jesper", "Hoyt", randomPhoneNr(), "yawnie@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(4)), 
        new Employee("female12.png", "Karoline", "Bache", randomPhoneNr(), "edigvalley@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)), 
        new Employee("male11.png","Lars", "Larsen", randomPhoneNr(), "lars1@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)), 
        new Employee("female13.png", "Mina", "Marinara", randomPhoneNr(), "min.mar@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)),
    ];

    const getAll = () => employees;
    const getByPosition = (position) => {
        return employees.filter( employee => employee._position === position);
    }
    const getRandomWaiter = () => {
        const waiters = getByPosition(Positions.WAITER);
        const randomId = UtilsModule.randomNumberInRange(0, waiters.length -1)
        return waiters[randomId];
    }
    const getByIndex = (index) => { return employees[index]; }
    return {getAll, getByPosition, getByIndex, getRandomWaiter}
}());

export default EmployeeModule;