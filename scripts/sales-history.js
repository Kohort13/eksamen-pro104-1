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

//The value of render mode is used to both clearly show what is being rendered, as well as dynamically changing the number of columns
const RenderModes = {ALL: 4, PRODUCTS: 7};
let renderMode = RenderModes.PRODUCTS;


const initialise = (function(){
    const periodBtnsChildren = document.getElementById("buttons").children;
    const modeBtnsChildren = document.getElementById("mode-buttons").children;
    for(let i = 0; i < periodBtnsChildren.length; i++){
        if(periodBtnsChildren[i].hasAttribute("class", "button"))
            periodBtnsChildren[i].addEventListener("click", function() {setTimePeriod(periodBtnsChildren, this)});
    }

    document.getElementById("mode-product").addEventListener('click', function(){setRenderMode(modeBtnsChildren, this)})
    document.getElementById("mode-all").addEventListener('click', function(){setRenderMode(modeBtnsChildren, this)})
    searchBtn.addEventListener('click', runSearch);
    const currentDate = new Date();
    let fromDate = new Date();
    fromDate.setDate(currentDate.getDate()-6);
    fromDateField.value = fromDate.toISOString().substr(0,10);
    toDateField.value = currentDate.toISOString().substr(0,10);
    runSearch();
    document.getElementById("close-btn").addEventListener('click', function(){ document.getElementById("order-modal").classList.toggle("is-active", false)});
    
}());

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
function setRenderMode(children, element){
    for(let i = 0; i < children.length; i++){
        children[i].setAttribute("class", "button");
    }    
    element.setAttribute("class", "button is-info");
    if(element.id === "mode-product"){
        toDateDiv.classList.add("is-hidden");
        renderMode = RenderModes.PRODUCTS;
    }else if(element.id === "mode-all"){
        toDateDiv.classList.add("is-hidden");
        renderMode = RenderModes.ALL;
    }
    runSearch();
}

function runSearch(){
    var fromDate = new Date(fromDateField.value);
    var toDate = new Date(fromDateField.value);

    switch(periodSelection){
        case PeriodTypes.WEEK:
            toDate.setDate(toDate.getDate()+6);
            break;
        case PeriodTypes.DAY:
            break;
        case PeriodTypes.FREE:
            toDate = new Date(toDateField.value);
            break;
    }
    renderTable(fromDate, toDate);
}





function renderHeader(){
    let cells = "";
    for(let i = 0; i < renderMode; i++){
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
        case RenderModes.PRODUCTS:
            tableHeader.innerHTML = `
            <tr>
                <th class="is-narrow">ID</th>
                <th>Vare</th>
                <th>FraDato</th>
                <th>TilDato</th>
                <th>Pris</th>
                <th>Antall</th>
                <th>Sum</th>
            </tr>`;
    }
}

function renderFooter(array){

    if(renderMode == RenderModes.ALL){
        const sumCell = `<td>${SalesModule.getSumOfOrders(array)},-</td>`;
        tableFooter.innerHTML = `<tr><td colspan = "3"></td>${sumCell}</tr>`;
        
    }else if(renderMode == RenderModes.PRODUCTS){
        let sum = 0;
        array.forEach(orderLine => {
            sum += orderLine.item.price * orderLine.quantity;
        })
        let sumString = sum.toString().replace(/(.)(?=(\d{3})+$)/g,'$1 ');    
        const sumCell = `<td>${sumString},-</td>`;
        tableFooter.innerHTML = `<tr><td colspan = "6"></td>${sumCell}</tr>`;        
    }
    tableFooter.classList.add("has-background-white")
    tableFooter.style = "position:sticky; bottom:-0; transform:translate(0,2px);"
}

function renderTable(fromDate, toDate){
    let array = [];
    if(renderMode == RenderModes.ALL){
        array = SalesModule.getByDateRange(fromDate, toDate);
    }else if(renderMode == RenderModes.PRODUCTS){
        array = SalesModule.getOrderLinesInRange(fromDate, toDate);        
    }
    renderHeader();
    renderFooter(array);
    renderOrders(array, fromDate, toDate);
}

//Function that renders all orders in an array
function renderOrders(array, fromDate, toDate){
    tableBody.innerHTML = "";  

    if(renderMode == RenderModes.ALL){
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
    }else if(renderMode == RenderModes.PRODUCTS){
        array.forEach(orderLine => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${orderLine.item.productID}</td>
                <td class="is-narrow">${orderLine.item.productName}</td>
                <td>${fromDate.toISOString().substr(0, 10)}</td>
                <td>${toDate.toISOString().substr(0, 10)}</td>
                <td>${orderLine.item.price}</td>
                <td>${orderLine.quantity}</td>
                <td>${orderLine.quantity * orderLine.item.price}</td>
            `
            tableBody.appendChild(row);
     
        })
    }
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
