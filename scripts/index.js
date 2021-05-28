import LoremModule from "./modules/LoremModule.js";
import SalgModule from "./modules/SalgModule.js";
import AnsattModule from "./modules/AnsattModule.js"

//Funksjoner for index-siden
function renderAnnouncement() {
    let kunngjøringText = document.getElementById('kunngjøring');
    let stickyAnnouncements = document.getElementById('sticky-announcements');
    renderProfits(stickyAnnouncements);
    renderFreeShifts(stickyAnnouncements);

    kunngjøringText.innerHTML += createAnnouncement("Ferie og fridager i skolen: alle må si i fra når de vil ha ferie i sommeren før slutten av mai", "fa-exclamation", "has-text-danger");
    kunngjøringText.innerHTML += createAnnouncement(`Hurra! ${AnsattModule.getByIndex(0).fullName} har bursdag neste uke! 🍰`, "fa-user");
    kunngjøringText.innerHTML += createAnnouncement("Innkalling til hastemøte for Oslos åpning til sommeren.");
    kunngjøringText.innerHTML += createAnnouncement("Rørleggerbesøk 03.juni. Kjøkkenet må eventuelt stenges neste helg pga lekkasje. Heng en lapp på døra asap.");
    kunngjøringText.innerHTML += createAnnouncement("Møte i starten av uken om ny sommer-meny. Alle servitører skal delta");
    kunngjøringText.innerHTML += createAnnouncement("Falsk brannalarm i andre etasje, får befaring på hele bygge av Sectorias Alarm");
    kunngjøringText.innerHTML += createAnnouncement("Sommer-meny klar til bruk!");
    kunngjøringText.innerHTML += createAnnouncement("Opplæring om sikkerhet neste mandag før åpningstid. Alle må være på møte.");
    kunngjøringText.innerHTML += createAnnouncement("Ny ledig stilling som servitør-ringevikar til sommeren.");



    for (let i = 0; i < 10; i++) {
        kunngjøringText.innerHTML += createAnnouncement(LoremModule.getLorem());        
    }                      
}
function createAnnouncement(announcement, icon, colour) {
    if(!icon){
        icon = "fa-comment"
    }if(!colour){
        colour = "has-text-info";
    }
    return `<a class="panel-block">
            <span class="panel-icon ${colour}">
                <i class="fas ${icon}" aria-hidden="true"></i>
            </span>
            <span>${announcement}</span>
        </a>`
}
function renderProfits(output) {
    // Solution for formatting number from https://stackoverflow.com/a/32355056
    let profit = String(SalgModule.getTodaysProfits()).replace(/(.)(?=(\d{3})+$)/g,'$1 ');

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
