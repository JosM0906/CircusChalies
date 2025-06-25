'use strict';
/* global GameCtrl */

// Este es el inicio del juego.
// Estamos creando un juego de Phaser y metiéndolo en un div que tenga el id "game".
// Usamos un tamaño de pantalla de 1024 x 768, que es ancho x alto.
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game', false, false);

/* exported CIRCUSDEBUG */
// Esta variable es para depuración, por ahora es falsa.
// Si luego la pones en true podrás ver cosas útiles para programar.
var CIRCUSDEBUG = false;

// Aquí añadimos los "estados" del juego, es decir, las pantallas o escenas que va a tener.
// Por ejemplo: Boot es cuando arranca el juego, Preloader es cuando carga recursos, etc.
game.state.add('Boot', GameCtrl.Boot);         // Estado inicial para preparar el juego
game.state.add('Preloader', GameCtrl.Preloader); // Estado que carga imágenes, sonidos, etc.
game.state.add('MainMenu', GameCtrl.MainMenu);  // Menú principal del juego
game.state.add('Prestage', GameCtrl.Prestage);  // Una escena entre niveles
game.state.add('Stage01', GameCtrl.Stage01);    // Primer nivel
game.state.add('Stage02', GameCtrl.Stage02);    // Segundo nivel

// Por último arrancamos el juego desde el estado 'Boot' para que todo empiece.
game.state.start('Boot');

