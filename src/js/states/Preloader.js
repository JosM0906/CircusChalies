
/* global GameCtrl */

/* exported WebFontConfig */
var WebFontConfig ={
	custom: {
		families: ['arcadeclasic'],
		urls: ['css/fonts.css'],
	}
};

(function(){
'use strict';

GameCtrl.Preloader = function () {
	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

GameCtrl.Preloader.prototype = {

	preload: function () {
		this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar		
		this.background = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBackground');
		this.preloadBar = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.		
		this.load.image('stage01', 'assets/images/stage01.png');
		this.load.image('stage02', 'assets/images/stage02.png');
       // this.load.image('background', 'assets/images/background.png');



		//  This is how you load an atlas
		//this.load.atlas('playButton', 'assets/images/play_button.png', 'assets/images/play_button.json');

		this.load.audio('stage1', ['assets/audio/stage1-4.mp3']);
        this.load.audio('stage2', ['assets/audio/stage1-4.mp3']);
		this.load.audio('failure', ['assets/audio/failure.mp3']);

		//  This is how you load fonts
		//this.load.bitmapFont('caslon', 'assets/fonts/caslon.png', 'assets/fonts/caslon.xml');


// Definimos un objeto llamado botData que contiene la información de los frames del personaje "clown".
// Cada frame representa una imagen específica dentro del sprite sheet (atlas).
var botData = {
  'frames': [
    {
      'filename': 'clown0000', // Nombre del frame (puede usarse para animaciones)
      'frame': { 'x': 164, 'y': 5, 'w': 16, 'h': 24 }, // Ubicación y tamaño del sprite dentro del atlas
      'rotated': false,          // Indica si el frame está rotado (en este caso, no)
      'trimmed': true,           // Indica si el sprite fue recortado para optimizar espacio
      'spriteSourceSize': { 'x': 0, 'y': 0, 'w': 16, 'h': 24 }, // Tamaño del área visible del sprite
      'sourceSize': { 'w': 16, 'h': 24 } // Tamaño original del sprite antes del recorte
    },
    {
      'filename': 'clown0001', // Segundo frame de animación
      'frame': { 'x': 185, 'y': 5, 'w': 16, 'h': 24 },
      'rotated': false,
      'trimmed': true,
      'spriteSourceSize': { 'x': 0, 'y': 0, 'w': 16, 'h': 24 },
      'sourceSize': { 'w': 16, 'h': 24 }
    },
    {
      'filename': 'clown0002', // Tercer frame de animación
      'frame': { 'x': 205, 'y': 5, 'w': 16, 'h': 24 },
      'rotated': false,
      'trimmed': true,
      'spriteSourceSize': { 'x': 0, 'y': 0, 'w': 16, 'h': 24 },
      'sourceSize': { 'w': 16, 'h': 24 }
    },
    {
      'filename': 'clownJump0003', // Frame para animación de salto del payaso
      'frame': { 'x': 226, 'y': 5, 'w': 16, 'h': 24 },
      'rotated': false,
      'trimmed': true,
      'spriteSourceSize': { 'x': 0, 'y': 0, 'w': 16, 'h': 24 },
      'sourceSize': { 'w': 16, 'h': 24 }
    },
    {
      'filename': 'clownStand0000', // Frame del payaso en posición de reposo (parado)
      'frame': { 'x': 164, 'y': 58, 'w': 15, 'h': 24 },
      'rotated': false,
      'trimmed': true,
      'spriteSourceSize': { 'x': 0, 'y': 0, 'w': 16, 'h': 24 },
      'sourceSize': { 'w': 15, 'h': 24 }
    },
    {
    'filename': 'clownStandJump0000',
    'frame': {'x':182,'y':58,'w':15,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':15,'h':24}
    },
    {
    'filename': 'clownburn0000',
    'frame': {'x':164,'y':32,'w':15,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':16,'h':24}
    },
    {
    'filename': 'lion0002',
    'frame': {'x':164,'y':87,'w':33,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':33,'h':16},
    'sourceSize': {'w':33,'h':16}
    },
    {
    'filename': 'lion0001',
    'frame': {'x':200,'y':87,'w':33,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':33,'h':16},
    'sourceSize': {'w':33,'h':16}
    },
    {
    'filename': 'lion0000',
    'frame': {'x':234,'y':87,'w':33,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':33,'h':16},
    'sourceSize': {'w':33,'h':16}
    },
    {
    'filename': 'lionburn0000',
    'frame': {'x':272,'y':87,'w':33,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':33,'h':16},
    'sourceSize': {'w':33,'h':16}
    },
    {
    'filename': 'firepot0000',
    'frame': {'x':221,'y':194,'w':24,'h':31},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':24,'h':31},
    'sourceSize': {'w':24,'h':31}
    },
    {
    'filename': 'firepot0001',
    'frame': {'x':195,'y':194,'w':24,'h':31},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':24,'h':31},
    'sourceSize': {'w':24,'h':31}
    },
    {
    'filename': 'firecirclel0000',
    'frame': {'x':136,'y':145,'w':12,'h':80},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':12,'h':80},
    'sourceSize': {'w':12,'h':80}
    
    },
    {
    'filename': 'firecirclel0001',
    'frame': {'x':165,'y':145,'w':12,'h':80},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':12,'h':80},
    'sourceSize': {'w':12,'h':80}
    },
    {
    'filename': 'firecircler0000',
    'frame': {'x':148,'y':145,'w':12,'h':80},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':12,'h':80},
    'sourceSize': {'w':12,'h':80}
    },
    {
    'filename': 'firecircler0001',
    'frame': {'x':177,'y':145,'w':12,'h':80},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':12,'h':80},
    'sourceSize': {'w':12,'h':80}
    },
    {'filename': 'endLevel1',
    'frame': {'x':129,'y':243,'w':37,'h':22},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':37,'h':22},
    'sourceSize': {'w':37,'h':18}
    },
    {'filename': 'walkBalance0',
    'frame': {'x':164,'y':5,'w':16,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':16,'h':24}
    },
    {'filename': 'walkBalance1',
    'frame': {'x':185,'y':5,'w':15,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':15,'h':24},
    'sourceSize': {'w':15,'h':24}
    },
    {'filename': 'walkBalance2',
    'frame': {'x':205,'y':5,'w':16,'h':24},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':24},
    'sourceSize': {'w':16,'h':24}
    },
    {'filename': 'jumpBalance',
    'frame': {'x':226, 'y':7,'w':16,'h':22},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':22},
    'sourceSize': {'w':16,'h':22}
    },
    {'filename': 'monkey0',
    'frame': {'x':78, 'y':106,'w':16,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':16},
    'sourceSize': {'w':16,'h':16}
    },
    {'filename': 'monkey1',
    'frame': {'x':98, 'y':106,'w':16,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':16,'h':16},
    'sourceSize': {'w':16,'h':16}
    },
    {'filename': 'monkey2',
    'frame': {'x':118, 'y':106,'w':17,'h':16},
    'rotated': false,
    'trimmed': true,
    'spriteSourceSize': {'x':0,'y':0,'w':17,'h':16},
    'sourceSize': {'w':17,'h':16}
    }
    ]};


    // Cargamos el atlas del payaso ("clown")
	// Parámetros:
	// 1. Nombre clave del recurso ('clown')
	// 2. Ruta del archivo de imagen que contiene todos los sprites (GIF en este caso)
	// 3. null (normalmente aquí se pone un archivo JSON externo, pero en este caso usamos un objeto definido manualmente)
	// 4. botData: es el objeto que contiene la definición de todos los frames del atlas (ya lo mostraste antes)
	this.game.load.atlas('clown', 'assets/images/CircusCharlieSheet1.gif', null, botData);


	},

	// Función que se ejecuta justo después de que todos los recursos han sido cargados
		create: function () {
			// Desactivamos el recorte automático del sprite de la barra de carga (preloadBar)
			// Esto se hace porque ya terminó la carga, y no es necesario seguir actualizando la barra
			this.preloadBar.cropEnabled = false;
		},


	// Función que se ejecuta en cada frame del juego mientras este estado esté activo
update: function () {
    // Verifica si el audio 'stage1' ya fue completamente decodificado por el navegador
    // Esto es importante porque si cambiamos de estado antes, la música podría comenzar con un corte
    if (this.cache.isSoundDecoded('stage1') && !this.ready) {
        // Marcamos como listo
        this.ready = true;

        // Cambiamos al siguiente estado del juego: 'MainMenu'
        this.game.state.start('MainMenu');
    }
}



};

})();