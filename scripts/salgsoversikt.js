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
let rows = [];

const initialise = (function(){
    let children = document.getElementById("buttons").children;
    for(let i = 0; i < children.length; i++){
        if(children[i].hasAttribute("class", "button"))
            children[i].addEventListener("click", function() {setTimePeriod(children, this)});
    }
    searchBtn.addEventListener('click', runSearch);
    const currentDate = new Date();
    let fromDate = new Date();
    fromDate.setDate(currentDate.getDate()-6);
    fromDateField.value = fromDate.toISOString().substr(0,10);
    toDateField.value = currentDate.toISOString().substr(0,10);
    runSearch();
    
}());

function runSearch(){
    let fromDate = new Date(fromDateField.value);
    let toDate = new Date(fromDateField.value);
    switch(periodSelection){
        case PeriodTypes.WEEK:
            toDate.setDate(toDate.getDate()+7);
            renderTable(SalgModule.getByDateRange(fromDate, toDate));
            break;
            case PeriodTypes.DAY:
                toDate.setDate(toDate.getDate());
                renderTable(SalgModule.getByDate(fromDate));
            break;
        case PeriodTypes.FREE:
            toDate = new Date(toDateField.value);
            toDate.setDate(toDate.getDate()+1);
            renderTable(SalgModule.getByDateRange(fromDate, toDate));
            break;
    }
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
        let toDate = new Date(fromDateField.value);
        toDate.setMonth(toDate.getMonth() + 1);
        toDateField.value = toDate.toISOString().substr(0,10);
        periodSelection = PeriodTypes.FREE;
    }
    runSearch();

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

//Function that renders all orders in an array
function renderAll(array){    

    array.forEach(order =>{
        var id = document.createElement("td"),
            date = document.createElement("td"),
            employee = document.createElement("td"),
            sum = document.createElement("td"),
            row = document.createElement("tr");

        id.textContent = order.orderID;
        date.textContent = order.date.toISOString().substr(0, 10);
        employee.textContent = order.employeeID.fullName;
        sum.textContent = order.getOrderSum();

        row.appendChild(id);
        row.appendChild(date);
        row.appendChild(employee);
        row.appendChild(sum);
        tableBody.appendChild(row);
        row.addEventListener('click', function() {viewOrderDetails(order.orderID)});
    })
}


function viewOrderDetails(id){

    alert("With ID " + id);
}
/*function renderGenericContent(){
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
}*/