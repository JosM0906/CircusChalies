// Crear la app PIXI que automáticamente se ajusta al tamaño de la pantalla
const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0x000000, // color del fondo
    antialias: false,
    resolution: window.devicePixelRatio || 1 // para que se vea bien en pantallas de alta densidad
});
document.body.appendChild(app.view); // agregamos el canvas al body

// Cargar recursos como imágenes y audio
const loader = PIXI.Loader.shared;

loader
    .add('stage01', 'assets/images/stage01.png')
    .add('stage02', 'assets/images/stage02.png')
    .add('charlie', 'assets/images/CircusCharlieSheet1.gif')
    .add('music', 'assets/audio/stage1-4.mp3')
    .load(setup); // cuando terminen de cargar, se llama a setup

let charlie;
let music;
let keys = {}; // aquí vamos a ir guardando qué teclas están presionadas
let currentStage = 1; // comenzamos en el stage 1
let background;
let stageTextures = {};
let message;

function setup(loader, resources) {
    // guardamos las texturas que cargamos
    stageTextures = {
        stage01: resources.stage01.texture,
        stage02: resources.stage02.texture
    };

    // creamos el fondo con la imagen del stage01
    background = new PIXI.Sprite(stageTextures.stage01);
    background.anchor.set(0.5); // que el punto central sea el centro del sprite
    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;
    app.stage.addChild(background); // lo añadimos a la escena

    // creamos a Charlie, el personaje
    charlie = new PIXI.Sprite(resources.charlie.texture);
    charlie.anchor.set(0.5, 0.5); // que su centro sea el punto central
    charlie.x = app.screen.width / 2;
    charlie.y = app.screen.height - 100; // un poco separado del suelo
    charlie.scale.set(2); // lo hacemos más grande
    app.stage.addChild(charlie);

    // texto que aparece en pantalla para guiar al jugador
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#ffffff'
    });
    message = new PIXI.Text('Presiona Enter para cambiar stage', style);
    message.anchor.set(0.5); // que se centre en su propio punto
    message.x = app.screen.width / 2;
    message.y = 50; // posición superior
    app.stage.addChild(message);

    // cargamos la música y la hacemos sonar en bucle
    music = new Audio(resources.music.url);
    music.loop = true;
    music.volume = 0.5;
    music.play();

    // escuchamos cuando el usuario aprieta o suelta teclas
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // añadimos la función gameLoop para que se ejecute en cada frame
    app.ticker.add(gameLoop);
}

// cuando una tecla se presiona
function onKeyDown(e) {
    keys[e.code] = true;
}

// cuando una tecla se suelta
function onKeyUp(e) {
    keys[e.code] = false;
}

// este es el bucle del juego que se ejecuta muchas veces por segundo
function gameLoop(delta) {
    const speed = 5;

    // mover a Charlie a la izquierda si se presiona flecha izquierda
    if (keys["ArrowLeft"]) {
        charlie.x -= speed;
    }
    // mover a Charlie a la derecha si se presiona flecha derecha
    if (keys["ArrowRight"]) {
        charlie.x += speed;
    }

    // salto cuando se presiona espacio, solo si no está ya saltando
    if (keys["Space"] && charlie.isJumping !== true) {
        charlie.isJumping = true; // marcamos que está saltando
        let jumpHeight = 150;
        let jumpSpeed = 5;
        let initialY = charlie.y;

        // función que hace que suba
        const jump = () => {
            if (jumpHeight > 0) {
                charlie.y -= jumpSpeed;
                jumpHeight -= jumpSpeed;
                requestAnimationFrame(jump); // seguimos subiendo
            } else {
                // cuando terminamos de subir, empieza a bajar
                const fall = () => {
                    if (charlie.y < initialY) {
                        charlie.y += jumpSpeed;
                        requestAnimationFrame(fall); // seguimos bajando
                    } else {
                        charlie.y = initialY; // ya tocó el suelo
                        charlie.isJumping = false;
                    }
                };
                fall();
            }
        };
        jump();
    }

    // cambiar de stage cuando se presiona Enter
    if (keys["Enter"]) {
        keys["Enter"] = false; // para que solo lo haga una vez por tecla
        currentStage = currentStage === 1 ? 2 : 1;
        background.texture = currentStage === 1 ? stageTextures.stage01 : stageTextures.stage02;
    }
}
