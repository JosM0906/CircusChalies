// Definimos un objeto global "GameCtrl" para mantener variables globales que persisten entre los cambios de estado del juego
var GameCtrl = {

    /* Variable global para llevar el puntaje del juego */
    score: 0,

    /* Si la música debe seguir sonando entre distintos estados del juego, podemos referenciarla aquí */
    music: null,

    /* Variable para controlar la orientación del dispositivo, útil para pausar/reanudar el juego si cambia la orientación */
    orientated: false

};

(function(){
'use strict'; // Modo estricto de JavaScript para evitar ciertos errores

// Constructor del estado "Boot", encargado de preparar el juego antes de que empiece
GameCtrl.Boot = function () {
};

// Definimos las funciones del prototipo del estado "Boot"
GameCtrl.Boot.prototype = {

    preload: function () {

        // Aquí cargamos los recursos que necesita el preloader (pantalla de carga)
        // Imágenes como logo, fondo de menú, barra de progreso, etc.
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('starsmenu', 'assets/images/stars.png');
        this.load.image('preloaderBackground', 'assets/images/progress_bar_background.png');
        this.load.image('preloaderBar', 'assets/images/progress_bar.png');

        // Carga de un spritesheet (hoja de sprites) para el personaje "clown"
        // Parámetros: ruta, ancho, alto, número de frames
        this.load.spritesheet('clown', 'assets/images/CircusCharlieSheet1.gif', 16, 24, 10);
    },

    create: function () {

        // Inicializa el sistema de físicas Arcade de Phaser
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Limita el número máximo de punteros (toques/pulsaciones) a 1
        this.game.input.maxPointers = 1;

        // Evita que el juego se pause automáticamente cuando se pierde el foco (útil en móviles)
        this.game.stage.disableVisibilityChange = true;

        // Configuración de escalado para que se ajuste al tamaño de la pantalla, mostrando todo
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // Definimos los tamaños mínimos y máximos que puede tener la pantalla del juego
        this.game.scale.minWidth = 480;
        this.game.scale.minHeight = 260;
        this.game.scale.maxWidth = 1024;
        this.game.scale.maxHeight = 768;

        // Centramos la pantalla del juego tanto horizontal como verticalmente
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        // Forzamos a que se ajuste el tamaño de pantalla al dispositivo
        this.game.scale.setScreenSize(true);

        // Cambiamos al siguiente estado: "Preloader"
        this.game.state.start('Preloader');
    },

    gameResized: function () {
        // Esta función podría ser útil si necesitamos hacer algo especial cuando la pantalla se redimensiona
        // Por ejemplo: si el jugador gira su dispositivo
    },

    enterIncorrectOrientation: function () {
        /*
        Código comentado: este método podría servir para pausar el juego y mostrar un mensaje 
        si el dispositivo está en una orientación no deseada.
        
        GameCtrl.orientated = false;
        document.getElementById('orientation').style.display = 'block';
        */
    },

    leaveIncorrectOrientation: function () {
        /*
        Código comentado: este método podría servir para reanudar el juego cuando el dispositivo
        vuelve a la orientación correcta.

        GameCtrl.orientated = true;
        document.getElementById('orientation').style.display = 'none';
        */
    }
};

})();
