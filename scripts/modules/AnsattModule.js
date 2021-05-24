const AnsattModule = (function(){

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
    }

    const ansatte = [
        new Ansatt("Ola", "Nordmensch", 98480551, "ola@nordmench.org", "Storgata 12, 0858 Oslo", "12.06.1978", "465 000kr", "Assisterende Kokk", "Restaurant 2"), 
        new Ansatt("Trine", "Svenskamensch", 48983802, "trine@svensk.se", "Storgata 14, 0858 Oslo", "12.06.1989", "647 000kr", "Kokk", "Restaurant 2"), 
        new Ansatt("Bob Kåre", "Johnniebjørn", 47985826, "bob@kåre.org", "Storgata 66, 0858 Oslo", "12.06.1996", "731 000kr", "Assisterende Avdelingssjef", "Restaurant 4")
    ];

    const getAll = () => ansatte;
    const getByPosition = (position) => {
        return ansatte.filter( ansatt => ansatt.position === position);
    }
    return {getAll, getByPosition}
}());

export default AnsattModule;