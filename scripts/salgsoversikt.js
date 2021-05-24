import SalgModule from "./modules/SalgModule.js";
const columns = 3;
const tableBody = document.getElementById("table-body");
const tableHeader = document.getElementById("table-head");

const PeriodTypes = {DAY: 'day', WEEK: 'week', FREE: 'free'};
let periodSelection = PeriodTypes.WEEK;

const initButtons = (function(){
    let children = document.getElementById("buttons").children;
    for(let i = 0; i < children.length; i++){
        if(children[i].hasAttribute("class", "button"))
            children[i].addEventListener("click", function() {setTimePeriod(children, this)});
    }
}());

function setTimePeriod(children, element){
    const toDateField = document.getElementById("optional-to-date");
    for(let i = 0; i < children.length; i++){
        children[i].setAttribute("class", "button");
    }
    element.setAttribute("class", "button is-info");
    if(element.id === "period-day"){
        toDateField.classList.add("is-hidden");
        periodSelection = PeriodTypes.DAY;
    }else if(element.id === "period-week"){
        toDateField.classList.add("is-hidden");
        periodSelection = PeriodTypes.WEEK;
    }else if(element.id === "period-free-select"){
        toDateField.classList.remove("is-hidden");

        periodSelection = PeriodTypes.FREE;
    }
}
function renderHeader(){
    let cells = "";
    for(let i = 0; i < columns; i++){
        cells += `<th>Column ${i+1}</th>`;
    }
    tableHeader.innerHTML = `<tr>${cells}</tr>`;
}
function renderTable(array){
    renderHeader();
    tableBody.innerHTML = "";
    let cellNr = 1;
    let rows = 10;
    for(let i = 0; i < rows; i++){
        let cells = ""; 
        for(let j = 0; j < columns; j++){
            cells += `<td>Cell ${cellNr++}</td>`;
        }
        tableBody.innerHTML += `<tr>${cells}</tr>`;
    }
}
function dateInput(){

}
renderTable(SalgModule.getAll());