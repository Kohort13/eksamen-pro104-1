
//Funksjoner for index-siden
function renderAnnouncement() {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, rerum.";
    let kunngjøringText = document.getElementById('kunngjøring');
    renderFreeShifts(kunngjøringText);

    renderProfits(kunngjøringText);
    for (let i = 0; i < 100; i++) {
        kunngjøringText.innerHTML +=`<a class="panel-block">
                                <span class="panel-icon">
                                    <i class="fas fa-pen" aria-hidden="true"></i>
                                </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, amet!
                            </a>` ;
        
    }
                      
}
function renderProfits(output) {
    output.innerHTML += `<a class="panel-block">
                                <span class="panel-icon">
                                    <i class="fas fa-pen" aria-hidden="true"></i>
                                </span>Dagens omsetning
                            </a>`;
    
}

function renderFreeShifts(output) {
    output.innerHTML += `<a class="panel-block is-active" >
                                <span class="panel-icon">
                                    <i class="fas fa-pen" aria-hidden="true"></i>
                                </span>Ledige vakter!
                            </a>`;
    
}
renderAnnouncement();
