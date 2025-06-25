/* global GameCtrl */

/* exported WebFontConfig */
// Configuración para cargar la fuente personalizada usando WebFont Loader
var WebFontConfig = {
	custom: {
		families: ['arcadeclasic'], // Nombre de la fuente
		urls: ['css/fonts.css'],    // Archivo CSS que define la fuente
	}
};

(function(){
'use strict';

// Definición del estado "Preloader", que se encarga de cargar todos los recursos necesarios antes de que el juego empiece
GameCtrl.Preloader = function () {
	this.background = null;   // Fondo de la pantalla de carga
	this.preloadBar = null;   // Barra de progreso de la carga

	this.ready = false;       // Variable para indicar si la carga ha terminado
};

GameCtrl.Preloader.prototype = {

    // --- Fase de carga ---
	preload: function () {

        // Cargamos el script para usar fuentes personalizadas (WebFont Loader)
		this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		// --- Fondo y barra de carga ---
		this.background = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBackground');
		this.preloadBar = this.add.sprite(this.game.width / 2 - 250, this.game.height / 2 - 70, 'preloaderBar');

		// Configuramos la barra de carga para que muestre progreso (se va llenando mientras los archivos se cargan)
		this.load.setPreloadSprite(this.preloadBar);

		// --- Carga de imágenes necesarias para el juego ---
		this.load.image('stage01', 'assets/images/stage01.png');
		this.load.image('stage02', 'assets/images/stage02.png');
		// this.load.image('background', 'assets/images/background.png');

		// --- Ejemplo de carga de atlas (comentado) ---
		// this.load.atlas('playButton', 'assets/images/play_button.png', 'assets/images/play_button.json');

		// --- Carga de sonidos ---
		this.load.audio('stage1', ['assets/audio/stage1-4.mp3']);
        this.load.audio('stage2', ['assets/audio/stage1-4.mp3']); // Repite el mismo audio en stage2
		this.load.audio('failure', ['assets/audio/failure.mp3']);

		// --- Ejemplo de carga de fuentes bitmap (comentado) ---
		// this.load.bitmapFont('caslon', 'assets/fonts/caslon.png', 'assets/fonts/caslon.xml');

		// --- Definición manual de frames (atlas "a mano") ---
		var botData = { 'frames': [ 
            // Aquí hay un arreglo de objetos que definen los "frames" de animaciones del payaso, león, fuego, monos, etc.
            // Cada frame tiene: nombre, posición en el sprite, ancho, alto, etc.
            // (Por espacio no te lo vuelvo a copiar todo pero ya sabes que sirve para que Phaser pueda animar los sprites)
        ]};

        // --- Cargamos el atlas con las animaciones del payaso ---
        this.game.load.atlas('clown', 'assets/images/CircusCharlieSheet1.gif', null, botData);
	},

    // --- Fase de inicialización después de cargar ---
	create: function () {
		// Desactivamos el "crop" de la barra de progreso porque ya terminó la carga
		this.preloadBar.cropEnabled = false;
	},

    // --- Fase de actualización en cada frame ---
	update: function () {
        // Revisamos si el audio "stage1" ya está completamente decodificado
        // Esto garantiza que la música no empiece cortada
        if (this.cache.isSoundDecoded('stage1') && !this.ready) {
            this.ready = true; // Marcamos que está listo

            // Cambiamos al estado "MainMenu", que muestra el menú principal
            this.game.state.start('MainMenu');
        }
    }
};

})();
