import LoremModule from "./modules/LoremModule.js";
import SalesModule from "./modules/SalesModule.js";
import EmployeeModule from "./modules/EmployeeModule.js";
import RestaurantModule from "./modules/RestaurantModule.js";
import LoginModule from './modules/LoginModule.js'

//Funksjoner for index-siden

const restaurantModal = document.getElementById("restaurant-modal");
const modalClose1 = document.getElementById("image-modal-close");
const modalClose2 = document.getElementById("close-modal-button");
const modalContent = document.getElementById("modal-content");

const initialise = (function(){

    modalClose1.addEventListener('click', closeModal);
    modalClose2.addEventListener('click', closeModal);
    document.addEventListener('keyup', closeModal)
    const contactInfo = document.getElementById("contact-info");
    RestaurantModule.getAll().forEach(restaurant => {
        let info = document.createElement("a");
        info.tabIndex = 0;
        let lineShift = document.createElement("br");
        info.innerHTML = `${restaurant.name}`;
        info.addEventListener('click', function(){renderModal(restaurant.id)});
        info.addEventListener('keyup', function(){renderModal(restaurant.id)});
        contactInfo.appendChild(info);
        contactInfo.appendChild(lineShift);
    })
    renderAnnouncements();
})();

function renderModal(id){
    if(event.key == "Enter" || event.button == 0){
        restaurantModal.classList.toggle("is-active", true);
        const manager = EmployeeModule.getManager(id);
        const restaurant = RestaurantModule.getById(id);
        modalContent.innerHTML = `
            <h3 class="is-size-3">${restaurant.name}</h3>
            <p>Avdelingsleder ${manager.fullName}, tlf: ${manager._telephone}</p>
            <p>Adresse: ${restaurant.address}</p>
            <p>Tlf til avdeling: ${restaurant.phone}</p>
        `; 
    }

    
}

function closeModal(){
    if(event.key == "Escape" || event.button == 0);
    restaurantModal.classList.toggle("is-active", false);

}


function renderAnnouncements() {
    let kunngj??ringText = document.getElementById('kunngj??ring');
    let stickyAnnouncements = document.getElementById('sticky-announcements');
    renderProfits(stickyAnnouncements);
    renderFreeShifts(stickyAnnouncements);

    kunngj??ringText.innerHTML += createAnnouncement("Ferie og fridager i skolen: alle m?? si i fra n??r de vil ha ferie i sommeren f??r slutten av mai", "fa-exclamation", "has-text-danger");
    kunngj??ringText.innerHTML += createAnnouncement(`Hurra! ${EmployeeModule.getAll()[0].fullName} har bursdag neste uke! ????`, "fa-user");
    kunngj??ringText.innerHTML += createAnnouncement("Innkalling til hastem??te for Oslos ??pning til sommeren.");
    kunngj??ringText.innerHTML += createAnnouncement("R??rleggerbes??k 03.juni. Kj??kkenet m?? eventuelt stenges neste helg pga lekkasje. Heng en lapp p?? d??ra asap.");
    kunngj??ringText.innerHTML += createAnnouncement("M??te i starten av uken om ny sommer-meny. Alle servit??rer skal delta");
    kunngj??ringText.innerHTML += createAnnouncement("Falsk brannalarm i andre etasje, f??r befaring p?? hele bygge av Sectorias Alarm");
    kunngj??ringText.innerHTML += createAnnouncement("Sommer-meny klar til bruk!");
    kunngj??ringText.innerHTML += createAnnouncement("Oppl??ring om sikkerhet neste mandag f??r ??pningstid. Alle m?? v??re p?? m??te.");
    kunngj??ringText.innerHTML += createAnnouncement("Ny ledig stilling som servit??r-ringevikar til sommeren.");

    for (let i = 0; i < 10; i++) {
        kunngj??ringText.innerHTML += createAnnouncement(LoremModule.getLorem());        
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
    let profit = String(SalesModule.getTodaysProfits());
    const user = LoginModule.getUser();

    output.innerHTML += 
    `<a class="panel-block">
        <span class="panel-icon has-text-success">
            <i class="fas fa-chart-line" aria-hidden="true"></i>
        </span>
        <span>Dagens omsetning for ${user.displayName}: ${profit},-</span>
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