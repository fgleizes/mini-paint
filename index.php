<!DOCTYPE HTML>
<html>
    <head>
		<title>Mon Mini Paint</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="style.css" type="text/css" />
    </head>
    <body>
		<h1>Mon Mini Paint</h1>

        <canvas id="canvas"></canvas>
		
		<div id="panel">
			<ul id="couleurs">
				<li><a href="#" data-couleur="#000000" class="actif">Noir</a></li>
				<li><a href="#" data-couleur="#ffffff">Blanc</a></li>
				<li><a href="#" data-couleur="#ff0000">Rouge</a></li>
				<li><a href="#" data-couleur="brown">Marron</a></li>
				<li><a href="#" data-couleur="orange">Orange</a></li>
				<li><a href="#" data-couleur="yellow">Jaune</a></li>
				<li><a href="#" data-couleur="green">Vert</a></li>
				<li><a href="#" data-couleur="cyan">Cyan</a></li>
				<li><a href="#" data-couleur="blue">Bleu</a></li>
				<li><a href="#" data-couleur="indigo">Indigo</a></li>
				<li><a href="#" data-couleur="Violet">Violet</a></li>
				<li><a href="#" data-couleur="pink">Rose</a></li>
			</ul>
			<form id="selector_color">
				<input type="radio" id="blanc" name="fond" value="blanc" checked>
				<label for="blanc">Fond blanc</label>
				
				<input type="radio" id="transparent" name="fond" value="transparent">
				<label for="transparent">Fond transparent</label>
				
				<label for="color_picker">Pipette à couleurs :</label>
				<div id="color" >
					<input id="color_picker" type="color" />
				</div>
			</form>
			<br>
			<form id="largeurs_pinceau">
				<label for="largeur_pinceau">Largeur du pinceau :</label>
				<input id="largeur_pinceau" type="range" min="2" max="50" value="5" />
				<output id="output">5 pixels</output><div id="fond_largeur"><div id="largeur"></div></div>
			</form>
			<br>
			

			<button id="back">Retour</button>
			<button id="next">Suivant</button>

			<input type="reset" id="reset" value="Réinitialiser" />
			<a id="save" href=""><input type="button" id="saveButton" value="Exporter mon image" /></a>
		</div>

		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript" src="paint.js"></script>
    </body>
</html>