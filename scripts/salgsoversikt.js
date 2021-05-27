import SalgModule from "./modules/SalgModule.js";
import UtilsModule from "./modules/UtilsModule.js"
const tableBody = document.getElementById("table-body");
const tableHeader = document.getElementById("table-head");
const tableFooter = document.getElementById("table-foot");
const fromDateField = document.getElementById("from-date");
const toDateField = document.getElementById("to-date");
const searchBtn = document.getElementById("filter-table");
const toDateDiv = document.getElementById("optional-to-date");

const PeriodTypes = {DAY: 'day', WEEK: 'week', FREE: 'free'};
let periodSelection = PeriodTypes.WEEK;

const RenderModes = {ALL: 4}
let renderMode, columns = RenderModes.ALL;

const initialise = (function(){
    let children = document.getElementById("buttons").children;
    for(let i = 0; i < children.length; i++){
        if(children[i].hasAttribute("class", "button"))
            children[i].addEventListener("click", function() {setTimePeriod(children, this)});
    }
    //fromDateField.addEventListener("blur", debugBlur);
    //toDateField.addEventListener("blur", debugBlur);
    searchBtn.addEventListener('click', runSearch);
    const currentDate = new Date();
    let fromDate = new Date();
    fromDate.setDate(currentDate.getDate()-6);

    fromDateField.value = fromDate.toISOString().substr(0,10);
    toDateField.value = currentDate.toISOString().substr(0,10);
    renderTable(SalgModule.getByDateRange(fromDate, currentDate));
    
}());

function runSearch(){
    let fromDate = new Date(fromDateField.value);
    let toDate = new Date(fromDateField.value);
    switch(periodSelection){
        case PeriodTypes.WEEK:
            toDate.setDate(toDate.getDate()+7);
            break;
        case PeriodTypes.DAY:
            toDate.setDate(toDate.getDate());
            break;
        case PeriodTypes.FREE:
            toDate = new Date(toDateField.value);
            toDate.setDate(toDate.getDate()+1);
            break;
    }
    renderTable(SalgModule.getByDateRange(fromDate, toDate));
}

function setTimePeriod(children, element){
    for(let i = 0; i < children.length; i++){
        children[i].setAttribute("class", "button");
    }
    element.setAttribute("class", "button is-info");
    if(element.id === "period-day"){
        toDateDiv.classList.add("is-hidden");
        periodSelection = PeriodTypes.DAY;
    }else if(element.id === "period-week"){
        toDateDiv.classList.add("is-hidden");
        periodSelection = PeriodTypes.WEEK;
    }else if(element.id === "period-free-select"){
        toDateDiv.classList.remove("is-hidden");

        periodSelection = PeriodTypes.FREE;
    }

}



function renderHeader(){
    let cells = "";
    for(let i = 0; i < columns; i++){
        cells += `<th>Column ${i+1}</th>`;
    }
    tableHeader.innerHTML = `<tr>${cells}</tr>`;
    switch(renderMode){
        case RenderModes.ALL: 
            tableHeader.innerHTML = `
            <tr>
                <th class="is-narrow">ID</th>
                <th>Dato</th>
                <th>Ansatt</th>
                <th>Beløp</th>
            </tr>`;
        break;
        default:
            tableHeader.innerHTML = `
            <tr>
                <th class="is-narrow">ID</th>
                <th>Dato</th>
                <th>Ansatt</th>
                <th>Beløp</th>
            </tr>`;
    }
    tableHeader.innerHTML = `
        <tr>
            <th class="is-narrow has-text-centered">ID</th>
            <th>Dato</th>
            <th>Ansatt</th>
            <th>Beløp</th>
        </tr>`;
}

function renderFooter(array){
    let cells = "";
    for(let i = 0; i < columns-1; i++){
        cells += `<td>Sum ${i+1}</td>`;
    }
    const sumCell = `<td>${SalgModule.getSumOfOrders(array)}</td>`;
    tableFooter.innerHTML = `<tr>${cells}${sumCell}</tr>`;
}

function renderTable(array){
    renderHeader();
    renderFooter(array);
    //renderGenericContent(); //This generates 10 rows of cell data    
    renderAll(array);
}

function renderAll(array){
    tableBody.innerHTML = "";
    array.forEach(order =>{
        tableBody.innerHTML += `
            <td>${order.orderID}</td>
            <td>${order.date.toISOString().substr(0, 10)}</td>
            <td>${order.employeeID.fullName}</td>
            <td>${order.getOrderSum()}</td>
        `;
    })
}
function renderGenericContent(){
    tableBody.innerHTML = "";
    let cellNr = 1;
    let rows = 10;
    const orderVertically = true;
    for(let i = 0; i < rows; i++){
        let cells = ""; 
        for(let j = 0; j < columns; j++){
            if(orderVertically)
                cells += `<td>Cell ${(i + j*rows)+1}</td>`;
            else
                cells += `<td>Cell ${cellNr++}</td>`;
                
        }
        tableBody.innerHTML += `<tr>${cells}</tr>`;
    }
}