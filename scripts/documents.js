//import DocumentsModule from "./modules/DocumentsModule.js"

//cards in html contain the title and link to the .txt file
let cards = "";
let documentsList = [egenmeldingsskjema, permisjon, medatbeidersamtale, lovverk, personalrabatter,
     ferieoverføring, nyansatte, avviksskjema, varsling];
     documentsList.forEach(myFunction);
     document.getElementById("document-list").innerHTML = documentsList;

     //not sure if Array should have the ⬇ arrays name ??!!
function myFunction(value, index, documentsList) {
  cards = cards + value + `<a href="${link}" download="${skjemanavn}.txt">
                        <div class="card-content">
                            <div class="block pt-7 has-text-centered">
                                <span class="icon">
                                    <i class="fas fa-${icon}"></i>
                                </span>
                            </div>
                            <div class="block">
                                <h2 class="title is-size-7 has-text-centered">${cardsTitle}</h2>
                            </div>
                        </div>
                    </a>`; 
}
