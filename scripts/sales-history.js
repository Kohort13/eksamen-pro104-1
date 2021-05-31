import SalesModule from "./modules/SalesModule.js";

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
    searchBtn.addEventListener('click', runSearch);
    const currentDate = new Date();
    let fromDate = new Date();
    fromDate.setDate(currentDate.getDate()-6);
    fromDateField.value = fromDate.toISOString().substr(0,10);
    toDateField.value = currentDate.toISOString().substr(0,10);
    runSearch();
    document.getElementById("close-btn").addEventListener('click', function(){ document.getElementById("order-modal").classList.toggle("is-active", false)});
    
}());

function runSearch(){
    let fromDate = new Date(fromDateField.value);
    let toDate = new Date(fromDateField.value);
    switch(periodSelection){
        case PeriodTypes.WEEK:
            toDate.setDate(toDate.getDate()+7);
            renderTable(SalesModule.getByDateRange(fromDate, toDate));
            break;
            case PeriodTypes.DAY:
                toDate.setDate(toDate.getDate());
                renderTable(SalesModule.getByDate(fromDate));
            break;
        case PeriodTypes.FREE:
            toDate = new Date(toDateField.value);
            toDate.setDate(toDate.getDate()+1);
            renderTable(SalesModule.getByDateRange(fromDate, toDate));
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
        tableHeader.classList.add("has-background-white")
        tableHeader.style = "position:sticky; top:0; transform:translate(0,-10px);"
}

function renderFooter(array){
    
    const sumCell = `<td>${SalesModule.getSumOfOrders(array)},-</td>`;
    tableFooter.innerHTML = `<tr><td colspan = "3"></td>${sumCell}</tr>`;
    tableFooter.classList.add("has-background-white")
    tableFooter.style = "position:sticky; bottom:-0; transform:translate(0,2px);"
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
    const modal = document.getElementById("order-modal");
    const modalContent = document.getElementById("order-modal-content");
    const modalTitle = document.getElementById("order-title");
    modal.classList.toggle("is-active", true);
    modalTitle.innerHTML = `Ordrenr. ${id}`;

    let orderInfo = SalesModule.getById(id);
    
    let orderInfoId = orderInfo.date.toISOString().substr(0,10);
    let orderInfoEmployee = orderInfo.employeeID.fullName;

    let orderInfoProducts = orderInfo.orderLines;
    var rows = "";

    
    for (var i = 0; i< orderInfoProducts.length; i++){
        const product = orderInfoProducts[i].item;
        const quantity = orderInfoProducts[i].quantity;
        const productInfoId = product.productID;
        const productInfoName = product.productName;
        const productInfoPrice = product.price;
        
        let total = productInfoPrice*quantity;
        
        rows += `
            <tr>
            <td>${productInfoId}</td>
            <td>${productInfoName}</td>
            <td>${productInfoPrice}</td>
            <td>${quantity}</td>
            <td>${total}</td>
            </tr>
        `;
    }

    var content = `
        <p><b>Dato: </b>${orderInfoId}</p>
        <a href = "../html/employee-register.html">
            <b class = "has-text-grey-dark">Ansatt:</b>
        ${orderInfoEmployee}</a>
        

        <div class = "table-container mt-4">
            <table class ="table is-fullwidth is-striped is-narrow is-hoverable">
                <p><b>Varer: </b></p>
                <tr>
                    <th>Id: </th>
                    <th>Navn: </th>
                    <th>Pris: </th>
                    <th>Antall: </th>
                    <th>Sum: </th>
                </tr>
                <tr>
                ${rows}
                </tr>
            </table>
        </div>
        `;
        
        
        
    modalContent.innerHTML = content;
}
