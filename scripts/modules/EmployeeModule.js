import UtilsModule from "./UtilsModule.js";
import RestaurantModule from "./RestaurantModule.js"
import LoginModule from "./LoginModule.js";

const EmployeeModule = (function(){

    const Positions = {
        MANAGER: 'Avdelingsleder',
        ASS_MANAGER: 'Assisterende avdelingsleder',
        CHEF: 'Kokk',
        ASS_CHEF: 'Assisterende kokk',
        WAITER: 'Servitør'         
    };
    class Employee {
        constructor(id, picture, firstName, lastName, tel, email, addr, birthDate, salary, position, restaurant){
            this._id = id;
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
    const idGenerator = new UtilsModule.IdGenerator();
    const getUniqueID = () => {return idGenerator.getID();}
    const employees = [
        //Restaurant 1
        new Employee(getUniqueID(), "female1.png","Jenny", "Olovsdottir", randomPhoneNr(), "j@oldottr.org", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(1)), 
        new Employee(getUniqueID(), "male1.png", "Ola", "Nordmensch", randomPhoneNr(), "ola@nordmench.org", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(1)), 
        new Employee(getUniqueID(), "female2.png", "Mari", "Halvorson", randomPhoneNr(), "mari.h@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(1)), 
        new Employee(getUniqueID(), "male2.png", "Eddie", "Gravdal", randomPhoneNr(), "edigvalley@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)), 
        new Employee(getUniqueID(), "female3.png", "Cathrine", "Nagel", randomPhoneNr(), "cnagel@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)), 
        new Employee(getUniqueID(), "female4.png", "Johanne", "Bergersen", randomPhoneNr(), "joh.bergersen@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(1)),
        //Restaurant 2
        new Employee(getUniqueID(), "male3.png", "Bob Kåre", "Johnniebjørn", randomPhoneNr(), "bob@kåre.org", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(2)),
        new Employee(getUniqueID(), "female5.png", "Trine", "Svenskamensch", randomPhoneNr(), "trine@svensk.se", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(2)), 
        new Employee(getUniqueID(), "male4.png", "Gustav", "Jonson", randomPhoneNr(), "gustav.jonson@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(2)), 
        new Employee(getUniqueID(), "female6.png","Sarah", "Wallenius", randomPhoneNr(), "s.wallenius@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)), 
        new Employee(getUniqueID(), "male5.png","Petter", "Måneberg", randomPhoneNr(), "its_not_the_fart@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)), 
        new Employee(getUniqueID(), "female7.png", "Birgitte", "Valentýna", randomPhoneNr(), "its_the_smell@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(2)),
        //Restaurant 3
        new Employee(getUniqueID(), "male6.png","Adrian", "Overgård", randomPhoneNr(), "aoverg@coldmail.com", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(3)), 
        new Employee(getUniqueID(), "female8.png", "Charlotte", "Hansen", randomPhoneNr(), "ch.hansen@coldmail.com", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(3)), 
        new Employee(getUniqueID(), "male7.png", "David", "Olssen", randomPhoneNr(), "d.olssen@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(3)), 
        new Employee(getUniqueID(), "female9.png", "Eva", "Gunnarsson", randomPhoneNr(), "egun@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)), 
        new Employee(getUniqueID(), "male8.png", "Fredrik", "Al'Égie", randomPhoneNr(), "f.uck@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)), 
        new Employee(getUniqueID(), "female10.png" ,"Guro", "Mortensen", randomPhoneNr(), "g.mort@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(3)),
        //Restaurant 4
        new Employee(getUniqueID(), "male9.png", "Javier", "Gonzales", randomPhoneNr(), "jgone@coldmail.com", randomAdresss(), randomBirthDate(), "712 000kr", Positions.MANAGER, RestaurantModule.getById(4)), 
        new Employee(getUniqueID(), "female11.png", "Iselin", "Ingebretsen", randomPhoneNr(), "ising@coldmail.com", randomAdresss(), randomBirthDate(), "647 000kr", Positions.CHEF, RestaurantModule.getById(4)), 
        new Employee(getUniqueID(), "male10.png", "Jesper", "Hoyt", randomPhoneNr(), "yawnie@coldmail.com", randomAdresss(), randomBirthDate(), "587 000kr", Positions.ASS_CHEF, RestaurantModule.getById(4)), 
        new Employee(getUniqueID(), "female12.png", "Karoline", "Bache", randomPhoneNr(), "edigvalley@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)), 
        new Employee(getUniqueID(), "male11.png","Lars", "Larsen", randomPhoneNr(), "lars1@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)), 
        new Employee(getUniqueID(), "female13.png", "Mina", "Marinara", randomPhoneNr(), "min.mar@coldmail.com", randomAdresss(), randomBirthDate(), "465 000kr", Positions.WAITER, RestaurantModule.getById(4)),
    ];

    const getAll = () => {
        const user = LoginModule.getUser().username;
        if(user == "test"){
            return employees;
        }else{
            return employees.filter(employee => employee._restaurant.username == user);
        }
    }
    const getByPosition = (position) => {
        return employees.filter( employee => employee._position === position);
    }
    const getRandomWaiter = () => {
        const waiters = getByPosition(Positions.WAITER);
        const randomId = UtilsModule.randomNumberInRange(0, waiters.length)
        return waiters[randomId];
    }
    const getByIndex = (index) => { 
        let foundEmployee = null;
        getAll().forEach(employee => {
            if(employee._id == index)
                foundEmployee = employee;
        })
        return foundEmployee;
    }

    //Gets the manager of a given restaurant, used for generating contact info
    const getManager = (restaurantId) => {
        let foundEmployee = null;
        employees.forEach( employee => {
            if(employee._restaurant.id == restaurantId && employee._position == Positions.MANAGER)
                foundEmployee = employee;
        })
        return foundEmployee;
    }

    const getByName = (name) => {
        return getAll().filter(employee => employee.fullName.toLowerCase().includes(name.toLowerCase()));
    }
    return {getAll, getByPosition, getByIndex, getRandomWaiter, getByName, getManager}
}());

export default EmployeeModule;