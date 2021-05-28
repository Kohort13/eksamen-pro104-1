import LoremModule from "./modules/LoremModule.js";
import SalgModule from "./modules/SalgModule.js";

//Funksjoner for index-siden
function renderAnnouncement() {
    let kunngjøringText = document.getElementById('kunngjøring');
    let stickyAnnouncements = document.getElementById('sticky-announcements');
    renderProfits(stickyAnnouncements);
    renderFreeShifts(stickyAnnouncements);

    kunngjøringText.innerHTML += createAnnouncement("Ferie og fridager i skolen, alle må si i fra når de vil ha ferie i sommeren før sluten av mai");
    kunngjøringText.innerHTML += createAnnouncement("Hurra!!!Ola Normensch har bursdag neste uke!!!!");
    kunngjøringText.innerHTML += createAnnouncement("Kalle inn for hastemøte for Oslos åpning til sommeren.");
    kunngjøringText.innerHTML += createAnnouncement("Rørlegebesøk 03.juni. Kjøkkenet skal eventuelt stenges neste helg pga lekasje. Heng en lapp på døra asap.");
    kunngjøringText.innerHTML += createAnnouncement("møte i starten av uke om ny sommer meny, alle servitører skal delta");
    kunngjøringText.innerHTML += createAnnouncement("Falsk brannalarm i andre etasje, får befaring på hele bygge av Sectorias Alram");
    kunngjøringText.innerHTML += createAnnouncement("Ingen vakt er dekket på siste helg iaugust. Det haster med oppdatering av feriekalenderen.");
    kunngjøringText.innerHTML += createAnnouncement("Sommer meny klar til bruk!");
    kunngjøringText.innerHTML += createAnnouncement("opplæring om sikkerhet neste mandag før åpningstid. Alle må være på møte.");
    kunngjøringText.innerHTML += createAnnouncement("Ny ledig servitør stilling som ringevikar til sommeren.");



    for (let i = 0; i < 10; i++) {
        kunngjøringText.innerHTML += createAnnouncement(LoremModule.getLorem());        
    }                      
}
function createAnnouncement(announcement) {
    return `<a class="panel-block">
            <span class="panel-icon has-text-info">
                <i class="fas fa-comment" aria-hidden="true"></i>
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
