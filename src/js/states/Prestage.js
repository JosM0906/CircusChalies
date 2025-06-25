/* global GameCtrl */

// Aquí usamos una función que se ejecuta inmediatamente para evitar que las variables dentro contaminen el espacio global.
// Esto se conoce como IIFE (función autoejecutable).
// Dentro de esta función, definimos un nuevo estado para el juego llamado "Prestage" dentro del objeto global GameCtrl.

(function(){
'use strict';  // Activamos el modo estricto para que JavaScript sea más estricto con los errores y evitar malas prácticas.

GameCtrl.Prestage = function () {
    // Este es el constructor del estado Prestage, por ahora está vacío.
};

// Aquí definimos los métodos que tendrá este estado.
// En este caso, solo el método create que se ejecuta cuando el estado inicia.
GameCtrl.Prestage.prototype = {
    
    create: function () {
        // Mostramos un texto en pantalla centrado (con un pequeño desplazamiento hacia arriba y a la izquierda).
        // El texto que mostramos viene guardado en GameCtrl.data.textToRender.
        // Usamos la fuente arcadeclasic, tamaño 48 y color blanco.
        this.add.text(
            this.game.world.centerX - 100,  // posición horizontal
            this.game.world.centerY - 50,   // posición vertical
            GameCtrl.data.textToRender,     // texto a mostrar
            {
                font : '48px "arcadeclasic"',
                fill : '#fff',
                align : 'left'
            }
        );

        // Después de 1 segundo (1000 ms), cambiamos al siguiente estado del juego.
        // Usamos setTimeout para esperar ese tiempo y luego llamar al método start.
        setTimeout(function(that){
            that.game.state.start(GameCtrl.data.nextState);
        }, 1000, this);
    }

};

}());
