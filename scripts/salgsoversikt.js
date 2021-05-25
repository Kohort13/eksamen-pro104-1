import SalgModule from "./modules/SalgModule.js";
const tableBody = document.getElementById("table-body");
const tableHeader = document.getElementById("table-head");
const tableFooter = document.getElementById("table-foot");

const PeriodTypes = {DAY: 'day', WEEK: 'week', FREE: 'free'};
let periodSelection = PeriodTypes.WEEK;

const RenderModes = {ALL: 4}
let renderMode, columns = RenderModes.ALL;

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
    tableHeader.innerHTML = `
        <tr>
            <th class="is-narrow">ID</th>
            <th>Dato</th>
            <th>Ansatt</th>
            <th>Beløp</th>
        </tr>`;
}

function renderFooter(){
    let cells = "";
    for(let i = 0; i < columns; i++){
        cells += `<td>Sum ${i+1}</td>`;
    }
    tableFooter.innerHTML = `<tr>${cells}</tr>`;
}

function renderTable(array){
    renderHeader();
    renderFooter();
    //renderGenericContent(); //This generates 10 rows of cell data    
    renderAll();
}

function renderAll(array){
    tableBody.innerHTML = "";
    SalgModule.getAll().forEach(order =>{
        tableBody.innerHTML += `
            <td>${order.orderID}</td>
            <td>${order.date}</td>
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
renderTable(SalgModule.getAll());