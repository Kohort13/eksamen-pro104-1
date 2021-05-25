const UtilsModule = (function(){
    
    const randomNumberInRange = (min, max) => { return Math.floor(Math.random() * (max-min) + min)}
    const getRandomDate = (startYear, endYear) => { 
        const dayStr = leadingZeros(randomNumberInRange(1, 28),2);
        const monthStr = leadingZeros(randomNumberInRange(1, 12),2);
        if(!startYear)
            startYear = 2000;
        if(!endYear)
            endYear = 2021;
        const yearStr = leadingZeros(randomNumberInRange(startYear, endYear),2);
        return `${dayStr}-${monthStr}-${yearStr}`;
    };

    const leadingZeros = (num, digits) => {
        let numString = num.toString();
        let diff = digits - numString.length;
        for(let i = 0; i < diff; i++){
            numString = "0"+numString;
        }
        return numString;
    }
    
    return {randomNumberInRange, getRandomDate, leadingZeros}
}());

export default UtilsModule;