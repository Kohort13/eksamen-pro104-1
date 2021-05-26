const UtilsModule = (function(){
    
    const randomNumberInRange = (min, max) => { return Math.floor(Math.random() * (max-min) + min)}
    const getRandomDate = (startYear, endYear) => { 
        const dayStr = leadingZeros(randomNumberInRange(1, 28),2);
        const monthStr = leadingZeros(randomNumberInRange(1, 12),2);
        let randomDate = new Date();
        if(!startYear)
            startYear = 2000;
        if(!endYear)
            endYear = 2021;
        randomDate.setFullYear(randomNumberInRange(startYear, endYear));
        randomDate.setMonth(randomNumberInRange(0, 11));
        randomDate.setDate(randomNumberInRange(1, 31))
        return randomDate;
        //return `${randomDate.getFullYear()}-${leadingZeros(randomDate.getMonth()+1,2)}-${leadingZeros(randomDate.getDate(), 2)}`;
    };

    const leadingZeros = (num, digits) => {
        let numString = num.toString();
        let diff = digits - numString.length;
        for(let i = 0; i < diff; i++){
            numString = "0"+numString;
        }
        return numString;
    }

    class IdGenerator {
        id = 1;
        getID(){
            return this.id++;
        }
    }
    
    return {randomNumberInRange, getRandomDate, leadingZeros, IdGenerator}
}());

export default UtilsModule;