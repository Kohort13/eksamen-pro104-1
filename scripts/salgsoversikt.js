import SalgModule from "./modules/SalgModule.js";
const columns = 3;
const tableBody = document.getElementById("table-body");
const tableHeader = document.getElementById("table-head");
let children = document.getElementById("buttons").children;
for(let i = 0; i < children.length; i++){
    if(children[i].hasAttribute("class", "button"))
        children[i].addEventListener("click", function() {setTimePeriod(children, this)});
}
function setTimePeriod(children, element){
    for(let i = 0; i < children.length; i++){
        children[i].setAttribute("class", "button");
    }
    element.setAttribute("class", "button is-active is-info");
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
renderTable(SalgModule.getAll());