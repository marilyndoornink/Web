/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console': 0*/

var filterKnop = document.querySelector("section>ul>li");
var filter = document.querySelector("section>form");

var likeKnop = document.querySelectorAll("article>button:first-of-type");

var downloadKnop = document.querySelectorAll("article>button:last-of-type");

var isNietGedownload = true;

var melding = document.querySelector("body>section:nth-of-type(3)");

var meldingtekst = document.querySelector("body>section:nth-of-type(3)>p");

var sfeerknop = document.querySelector("section>ul>li:nth-of-type(2)");

var leesDuur = document.querySelector("section>ul>li:nth-of-type(3)");



// Functies
function filterUitklappen() {
  filter.classList.toggle('is-open');
}

//this gebruiken om like van alle verhalen in 1x te voorkomen
function likeVerhaal(){
    this.classList.toggle('liked');
    if (this.classList.contains('liked')) {
        melding.classList.toggle('show');
        setTimeout(function() {
            melding.classList.toggle('show');  
        }, 4000);
    }
    //als die het toggled en heeft niet de class, dan voert die het ook niet uit ivm met melding
    meldingtekst.textContent = "Goedzo, je hebt dit verhaal geliked! Je kunt al je gelikde verhalen terug vinden onder verhalen in de navigatiebalk bovenaan de pagina.";
    
}

function getRandomNum() {
    return Math.round(Math.random() * 4);
}

function downloadVerhaal(){
    //element is gekopeld aan this = button. Anders blijft this gevangen in de functie en kan class niet worden verwijderd.
    var element = this;
    var randomNum = getRandomNum();

    // Als het element de class 'klaar' nog niet heeft, speel dan de animatie af
    if(element.classList.contains('klaar')) {
        element.classList.remove('klaar');
    // Als het element wel de class 'klaar' heeft, verwijder die dan.
    } else if (element.classList.contains('error')) {
        element.classList.remove('error');
    } else {
        element.classList.add('laden');
        
        //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
        setTimeout(function() {
            element.classList.remove('laden');
            
            if (randomNum < 3) {
                element.classList.add('klaar');
                melding.classList.add('gedownload');
                meldingtekst.textContent = "Gefeliciteerd, dit verhaal is gedownload! Je kunt deze alle tijden terug vinden onder het navigatie icon download";
                melding.classList.toggle('show');
                setTimeout(function() {
                    melding.classList.toggle('show');
                    melding.classList.remove('gedownload');
                }, 4000);
            } else {
                element.classList.add('error');
                melding.classList.add('error');
                meldingtekst.textContent = "Helaas je download is mislukt, controleer je verbinding en probeer de download opnieuw.";
                melding.classList.toggle('show');
                setTimeout(function() {
                    melding.classList.toggle('show');
                    melding.classList.remove('error');
                }, 4000);
            }
        }, 3000);
    }    
}

// Eventlisteners komen hier
// Klap filter uit
filterKnop.addEventListener("click", filterUitklappen);
sfeerknop.addEventListener("click", filterUitklappen);
leesDuur.addEventListener("click", filterUitklappen);

// Like het verhaal

for (var i = 0; i < likeKnop.length; i++){
	likeKnop[i].addEventListener("click", likeVerhaal);
}

for (var i = 0; i < downloadKnop.length; i++){
	downloadKnop[i].addEventListener("click", downloadVerhaal);
}

