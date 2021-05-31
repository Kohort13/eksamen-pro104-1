const output = document.getElementById("document-list");

//Array of dummy documents
const documentsList = [
    {displayName: "Egenmeldingsskjema", icon: "fa-book", link: "egenmeldingsskjema.txt"},
    {displayName: "Fødsel eller adopsjons permisjon", icon: "fa-baby", link: "permisjonsskjema.txt"},
    {displayName: "Medarbeidersamtale sjekkeliste", icon: "fa-comment", link: "medarbeidersamtale.txt"},
    {displayName: "Lovverk til arbeidsgiver", icon: "fa-balance-scale", link: "lovverk.txt"},
    {displayName: "Oversikt personalrabatter_Mal", icon: "fa-money-check-alt", link: "personalrabatter.txt"},
    {displayName: "Søknad om overføring av ferie", icon: "fa-calendar-alt", link: "ferieoverføring.txt"},
    {displayName: "Sjekkeliste til nyansatte", icon: "fa-list", link: "nyansatte.txt"},
    {displayName: "Skade- og avviksskjema", icon: "fa-hammer", link: "avviksskjema.txt"},
    {displayName: "Rutine for intern varsling", icon: "fa-book", link: "varsling.txt"},
];

documentsList.forEach(document => myFunction(document));

function myFunction(document) {

    output.innerHTML += `
    <div class="column is-3">
        <div class="card">
            <a href="/resources/Documents/${document.link}" download="${document.link}">
                <div class="card-content">
                    <div class="block pt-7 has-text-centered">
                        <span class="icon">
                            <i class="fas ${document.icon}"></i>
                        </span>
                    </div>
                    <div class="block">
                        <h2 class="title is-size-7 has-text-centered">${document.displayName}</h2>
                    </div>
                </div>
            </a>
        </div>
    </div>`; 
}
