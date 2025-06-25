(function(){
'use strict'; // Modo estricto de JavaScript para prevenir errores comunes

/* global GameCtrl */

// Definimos el estado "MainMenu", que será la pantalla del menú principal del juego
GameCtrl.MainMenu = function (/*game*/) {
    // Variables internas del estado
    this.music = null;       // Puede usarse para la música del menú
    this.playButton = null;  // Se podría usar para un botón de inicio (aunque en este caso se usa ENTER)
};

// Definimos las funciones del prototipo para el estado MainMenu
GameCtrl.MainMenu.prototype = {

    preload: function(){
        // Aquí no se carga nada porque ya se cargaron los recursos en el preloader
    },

    create: function () {
        // --- Fondo del menú ---
        var bg = this.game.add.sprite(0, 0, 'stage01');
        bg.scale.setTo(
            this.game.width / bg.width,
            this.game.height / bg.height
        );

        // --- Efecto visual adicional (estrellas del menú) ---
        var starsmenu = this.game.add.sprite(130, 100, 'starsmenu');
        starsmenu.scale.x = 5;
        starsmenu.scale.y = 5;

        // --- Logo del juego ---
        var logo = this.game.add.sprite(250, 170, 'logo');
        logo.scale.x = 0.8;
        logo.scale.y = 0.8;

        // --- Texto de instrucciones (usar ENTER para empezar el juego) ---
        var textstyle = {
            font: '50px "arcadeclasic"', // Usamos la fuente arcade personalizada
            fill: '#fff',                // Color blanco
            align: 'center'              // Texto centrado
        };

        // Texto en pantalla que indica cómo empezar
        this.startText = this.game.add.text(
            this.game.width / 2 - 180,   // Posición X centrada
            this.game.height / 2 + 120,  // Posición Y más abajo
            'Press  ENTER  to\n start playing', // Texto
            textstyle
        );

        // --- Activamos sistema de físicas ---
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // --- Animación de un payaso moviéndose ---
        var clown = this.game.add.sprite(100, 600, 'clown');
        clown.scale.x = 4;
        clown.scale.y = 4;

        // Activamos físicas para el payaso
        this.game.physics.enable(clown, Phaser.Physics.ARCADE);

        // Le damos velocidad horizontal (se moverá a la derecha)
        clown.body.velocity.x = 100;

        // Definimos la animación de "correr" para el payaso
        clown.animations.add('run', Phaser.Animation.generateFrameNames('clown', 0, 2, '', 4), 10, true);
        
        // Iniciamos la animación de correr
        clown.animations.play('run', 8, true);

        // Variable para saber si ENTER ya fue presionado (para no repetir acción)
        this.enterPressed = false;
    },

    update: function () {
        // En cada frame se verifica si ENTER fue presionado
        if (!this.enterPressed && this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.enterPressed = true; // Marcamos que ENTER fue presionado

            this.blinkedTimes = -1; // Contador para parpadeo del texto

            // --- Iniciamos un intervalo que hace parpadear el texto antes de cambiar de estado ---
            this.timerBlinker = setInterval(function (_this) {
                _this.blinkedTimes++; // Incrementamos el contador de parpadeos

                if (_this.blinkedTimes > 10) {
                    // Si ya parpadeó suficiente, detenemos el intervalo y pasamos al siguiente estado
                    clearInterval(_this.timerBlinker);

                    // Guardamos información para el siguiente estado (texto a mostrar y próximo estado)
                    GameCtrl.data = { textToRender: 'STAGE 01', nextState: 'Stage01' };

                    // Cambiamos al estado 'Prestage'
                    _this.game.state.start('Prestage');
                }

                // Hacemos parpadear el texto (visible/no visible)
                _this.startText.visible = !_this.startText.visible;

            }, 30, this); // Intervalo de 30 ms entre parpadeos
        }
    }

};

})();
