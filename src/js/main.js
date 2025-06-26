'use strict'; // Modo estricto para evitar errores comunes y mantener buenas prácticas

/* global GameCtrl */
// Esta línea indica que usamos el objeto GameCtrl definido globalmente (viene de tus otros scripts)

/*
 * Creamos la instancia del juego de Phaser:
 * - 1024 píxeles de ancho
 * - 768 píxeles de alto
 * - Phaser.AUTO: usa WebGL si está disponible, de lo contrario usa Canvas
 * - 'game': ID del elemento HTML donde se inyectará el juego (por ejemplo <div id="game"></div>)
 * - Los dos últimos 'false' son para desactivar WebGL antialias y transparencia (opcional)
 */
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game', false, false);

/* exported CIRCUSDEBUG */
// Variable de depuración global (por si quieres usar condicionales para debug dentro del juego)
var CIRCUSDEBUG = false;

/*
 * A continuación, registramos los "Estados" del juego.
 * Cada estado representa una etapa diferente del juego:
 * - Boot: configuración inicial
 * - Preloader: pantalla de carga
 * - MainMenu: menú principal
 * - Prestage: pantalla intermedia antes de cada nivel
 * - Stage01: primer nivel del juego
 * - Stage02: segundo nivel del juego
 */
game.state.add('Boot', GameCtrl.Boot);
game.state.add('Preloader', GameCtrl.Preloader);
game.state.add('MainMenu', GameCtrl.MainMenu);
game.state.add('Prestage', GameCtrl.Prestage);
game.state.add('Stage01', GameCtrl.Stage01);
game.state.add('Stage02', GameCtrl.Stage02);

/*
 * Finalmente, iniciamos el juego arrancando desde el estado "Boot"
 * Desde ahí se irá encadenando el flujo del juego.
 */
game.state.start('Boot');
