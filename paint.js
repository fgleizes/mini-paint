let body = document.querySelector('body')
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');

canvas.width = body.offsetWidth;
canvas.height = body.offsetHeight;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;


// Variables :
let started = false;
let painting = false;
let color = "#000";
let width_brush = 5;
let cursorPosition;

let canvasArray = new Array();
let canvasIndex = -1;


// Trait arrondi :
ctx.lineJoin = 'round';
ctx.lineCap = 'round';


// Click souris enfoncé sur le canvas, je dessine :
canvas.addEventListener("mousedown", function ( e ) {
	painting = true;

	// Coordonnées de la souris :
	/* L'événement reçu depuis le navigateur est envoyé en param 
	à la fonction getPosition. On a besoin d'avoir les infos
	sur le click dans getPosition */
	cursorPosition = getPosition( e );
	ctx.beginPath();
	ctx.moveTo( cursorPosition.x, cursorPosition.y );
	drawLine();
});


// Relachement du Click sur tout le document, j'arrête de dessiner :
canvas.addEventListener("mouseup", function () {
    if (painting) {
    	painting = false;
			cPush();
    }
});

// Si la souris sort du canvas, j'arrête de dessiner :
canvas.addEventListener("mouseleave", function () {
    if (painting) {
    	painting = false;
			cPush();
    }
});


// Mouvement de la souris sur le canvas :
canvas.addEventListener("mousemove", function (e) {
	// Si je suis en train de dessiner (click souris enfoncé) :
	if (painting) {
		// Set Coordonnées de la souris :
		cursorPosition = getPosition( e );
		// Dessine une ligne :
		drawLine();
	}
});

drawImage();

// Fonction qui récupère la position de la souris, par rapport à la position du canvas dans l'écran :
function getPosition( event ){
	let offset = canvas.getBoundingClientRect();
	let x = ( event.clientX - offset.left ); // attention décalage du curseur si il y a une bordure;
	let y = ( event.clientY - offset.top );

	return { x, y };
}


// Fonction qui dessine une ligne :
function drawLine() {
	ctx.lineTo( cursorPosition.x, cursorPosition.y );
	ctx.strokeStyle = color;
	ctx.lineWidth = width_brush;
	ctx.stroke();
	started = true;
}


function drawImage() {
	let image = new Image();
	
	image.onload = function () {
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		cPush();
	}

	image.src = 'image/fond-blanc-1024x957.jpg';
}

// Clear du Canvas :
function clear_canvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawImage();
}


// CHANGEMENT DE LA COULEUR DU PINCEAU !! 
// - avec une palette de couleur :

// let lis = document.querySelectorAll( "#couleurs li a" );
let lis = document.querySelectorAll( "#couleurs li a" );

// Pour chaque carré de couleur :
for (let i = 0; i < lis.length; i++) {
	// Je lui attribut une couleur de fond et de texte :
	lis[i].style.backgroundColor = lis[i].dataset.couleur;

	// Et au click :
	lis[i].addEventListener("click", function( e ) {
		e.preventDefault();

		// Je change la couleur du pinceau :
		color = this.style.backgroundColor;
		brushWidthIcon.style.backgroundColor = color;
		// Et les classes CSS :
		for (let i = 0; i < lis.length; i++) {
			lis[i].classList.remove("actif");
		}
		colorWell.classList.remove("actif");
		this.classList.add("actif");
	});
}


// CHANGEMENT DE LA COULEUR DU PINCEAU !! 
// - avec un picker color => input type"color" :

let colorWell = document.querySelector("#color_picker");
let defaultColor = "#0000ff";

window.addEventListener("load", startup, false);

function startup() {
	colorWell.value = defaultColor;
	colorWell.addEventListener("input", updateFirst, false);
	colorWell.addEventListener("change", updateAll, false);
	colorWell.select();
}

function updateFirst(event) {
	color = event.target.value;
	brushWidthIcon.style.backgroundColor = color;
	if (color = event.target.value) {
		for (let i = 0; i < lis.length; i++) {
		lis[i].classList.remove("actif");
	}
		colorWell.classList.add("actif");
	}
}

function updateAll(event) {
	color = event.target.value;
}


// Largeur du pinceau :
let brushElem = document.querySelector("#largeur_pinceau");
let brushOutput = document.querySelector("#output");
let brushWidthIcon = document.querySelector("#largeur");
brushWidthIcon.style.backgroundColor = color;
brushWidthIcon.style.width = width_brush+"px";
brushWidthIcon.style.height = width_brush+"px";

brushElem.addEventListener("change", function( e ) {
	if ( !isNaN( this.value ) ) {
		width_brush = this.value;
		brushOutput.innerHTML = this.value+ " pixels"
		brushWidthIcon.style.width = width_brush+"px";
		brushWidthIcon.style.height = width_brush+"px";
	}
});

// Bouton Reset :
let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", function() {
	// Clear canvas :
	clear_canvas();
	
	// Valeurs par défaut :
	canvasArray = new Array();
	canvasIndex = -1;
	brushElem.value = 5;
	width_brush = 5;
	brushOutput.innerHTML = "5 pixels";
	brushWidthIcon.style.width = width_brush+"px";
	brushWidthIcon.style.height = width_brush+"px";
	brushWidthIcon.style.backgroundColor = color;
	started = false;
});


// Bouton Save :
let downloadLink = document.querySelector("#save");

downloadLink.addEventListener('click', function(e) {
	
	if (started) {
	    downloadLink.href = canvas.toDataURL("image/jpg");
	    downloadLink.download = "image.jpg";
	}else{
		e.preventDefault();
		alert("L'image à télécharger est vide.");
	}
}, false);


// Bouton retour en arrière :
let backButton = document.querySelector("#back");
backButton.addEventListener("click", function() {
	cUndo();
});

// Bouton retour en avant :
let nextButton = document.querySelector("#next");
nextButton.addEventListener("click", function() {
	cRedo();
});


// Fonction qui envoie la ligne dessinée dans un tableau, quans le bouton de la souris remonte :
function cPush() {
    canvasIndex++;
    if (canvasIndex < canvasArray.length) { 
    	canvasArray.length = canvasIndex; 
    }
    canvasArray.push(canvas.toDataURL());
}

// Fonction qui va chercher la ligne dessinée précédente dans un tableau, quans on click le bouton retour :
function cUndo() {
    if (canvasIndex > 0) {
        canvasIndex--;
        let canvasPic = new Image();
        canvasPic.src = canvasArray[canvasIndex];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

// Fonction qui va chercher la ligne dessinée suivante dans un tableau, quans on click le bouton suivant :
function cRedo() {
    if (canvasIndex < canvasArray.length-1) {
        canvasIndex++;
        let canvasPic = new Image();
        canvasPic.src = canvasArray[canvasIndex];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

document.querySelector('#toggle-panel').addEventListener('click', function(){
	document.querySelector('#panel-color').classList.toggle('hide')

	if (document.querySelector('.hide')) {
		document.querySelector('#toggle-panel').textContent = "Afficher panel"
	} else {
		document.querySelector('#toggle-panel').textContent = "Masquer panel"
	}
})