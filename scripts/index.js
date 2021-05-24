import LoremModule from "./modules/LoremModule.js";
//Funksjoner for index-siden
function renderAnnouncement() {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, rerum.";
    let kunngjøringText = document.getElementById('kunngjøring');
    renderProfits(kunngjøringText);
    renderFreeShifts(kunngjøringText);

    for (let i = 0; i < 45; i++) {
        kunngjøringText.innerHTML +=
        `<a class="panel-block">
            <span class="panel-icon has-text-info">
                <i class="fas fa-comment" aria-hidden="true"></i>
            </span>
            <span>${LoremModule.getLorem()}</span>
        </a>` ;
        
    }
                      
}
function renderProfits(output) {
    // Solution for formatting number from https://stackoverflow.com/a/32355056
    let profit = String(45000).replace(/(.)(?=(\d{3})+$)/g,'$1 ');

    output.innerHTML += 
    `<a class="panel-block">
        <span class="panel-icon has-text-success">
            <i class="fas fa-chart-line" aria-hidden="true"></i>
        </span>
        <span>Dagens omsetning: ${profit},-</span>
    </a>`;
    
}

function renderFreeShifts(output) {
    output.innerHTML += 
    `<a class="panel-block">
        <span class="panel-icon has-text-danger">
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
        </span>
        <span>Noen vakter er ikke blitt tildelt!</span>
    </a>`;
    
}
renderAnnouncement();
