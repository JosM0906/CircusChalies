/* global GameCtrl */
(function(){
'use strict';
GameCtrl.Stage02 = function () {

        //        When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
/*
    this.game;                //        a reference to the currently running game
    this.add;                //        used to add sprites, text, groups, etc
    this.camera;        //        a reference to the game camera
    this.cache;                //        the game cache
    this.input;                //        the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;                //        for preloading assets
    this.math;                //        lots of useful common math operations
    this.sound;                //        the sound manager - add a sound, play one, set-up markers, etc
    this.stage;                //        the game stage
    this.time;                //        the clock
    this.tweens;        //        the tween manager
    this.world;                //        the game world
    this.particles;        //        the particle manager
    this.physics;        //        the physics manager
    this.rnd;                //        the repeatable random number generator
*/
    
};

GameCtrl.Stage02.prototype = {
    
    /**
     * Dibuja los metros para que el jugador vea qué tanto ha avanzado.
     */
    _createMeters:function(){
        var graphics = this.game.add.graphics(0, 0); // Crea un objeto para dibujar
        var x;
        for(var i=10;i>=0;i--){
            x=(10-i)*705;
            // Escribimos el número de metros
            this.add.text(x+15, 694, (i*10)+' m', {
                font : '46px "arcadeclasic"',
                fill : '#fff',
                align : 'left'
            });

             // Dibujamos rectángulos como referencia en el suelo
            graphics.lineStyle(2, 0x000000, 1);
            graphics.beginFill(0x000000, 1);
            graphics.drawRect(x, 690, 130, 50);
            graphics.lineStyle(5, 0xd42700, 1);
            graphics.drawRect(x+5, 695, 120, 40);
            
        }


    },
    /**
     * Crea el jugador (el payaso que camina en la cuerda floja)
     */
    _createPlayer:function(){
        this.player=this.add.sprite(85, 348, 'clown','walkBalance0'); // Coloca el sprite del jugador
        this.physics.enable(this.player, Phaser.Physics.ARCADE); // Activar físicas para colisiones y gravedad
        
        this.player.scale.x =3;
        this.player.scale.y =3;
        
        this.physics.enable(this.player, Phaser.Physics.ARCADE,true);
        
                
        this.player.body.setSize(35, 69, 0, 0); // Área de colisión del jugador
        

        this.player.animations.add('walkBalance', Phaser.Animation.generateFrameNames('walkBalance', 0, 2, '', 0), 3 /*fps */, true); // Animación al caminar

        this.player.body.collideWorldBounds=true; // No salirse del mapa
        
    },
    /**
     * Quita monos que ya salieron de pantalla.
     */
    _monkyOut:function(m){
        this.monkeys.remove(m); // Removemos el mono que salió
    },
    /**
     * Crea un mono que aparecerá como obstáculo.
     */
    _addMonkey:function(){
        if(this.monkeys.total>3){
            return; // No más de 3 monos a la vez
        }
    
        var createMonky=function(x){
            // Calcula dónde colocar al nuevo mono
            if(!x){
                x=this.player.x +950+this.rnd.integerInRange(-400,200); // Una posición aleatoria delante del jugador
                var xLast=(this.monkeys.length>0) ? this.monkeys.getAt(this.monkeys.length-1).x : false;
                x=(xLast && (x-xLast)<500) ? xLast+500 : x;
            }
            

            var monkey=this.monkeys.create(x, 372, 'clown','monkey0'); // Añadimos el sprite del mono
            monkey.scale.x=3;
            monkey.scale.y=3;
            monkey.body.velocity.x=-90; // Los monos se mueven hacia la izquierda
            monkey.animations.add('monkey', Phaser.Animation.generateFrameNames('monkey', 0, 2, '', 0), 3 /*fps */, true); // Animación del mono
            monkey.animations.play('monkey',6);  // Lo animamos
            monkey.checkWorldBounds = true;
            monkey.events.onOutOfBounds.add(this._monkyOut, this); // Cuando se salga de pantalla, se remueve
            monkey.body.setSize(44, 49, 0, 0); // Área de colisión
            monkey.body.gravity.y=400; // Gravedad para que caiga
            return monkey;
        };

        var difficulty=this.rnd.integerInRange(1,100); // Calculamos dificultad
        var nMonkeys=(difficulty>40)? this.rnd.integerInRange(1,4) : 1; // Cuántos monos aparecen

        var distance=50;
        
        var jumpTime=this.rnd.integerInRange(200,700); // Cada cuánto saltan

        for(var i=0;i<nMonkeys;i++){
            difficulty=100;
            if(i>1){
                distance=100*i;
                jumpTime=this.rnd.integerInRange(1000,2000); // Más tiempo entre saltos
            }

            var x=(i>0) ? this.monkeys.getAt(this.monkeys.length-1).x+distance : null;
            var _monkey=createMonky.call(this,x); // Crear mono
            
            _monkey.jumpTime=(difficulty>70)? jumpTime:false;
            _monkey.lastJump=this.time.lastTime;
        }
    },
    /**
     * Crea el grupo que contiene a los monos (se llama cuando arranca el nivel).
     */
    _createObstacles:function(){
        this.monkeys=this.add.group();
        this.monkeys.enableBody = true;
        this.monkeys.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.game.time.events.loop(Phaser.Timer.SECOND, this._addMonkey, this); // Cada segundo, intentamos poner monos nuevos

    },
    /**
     * Esta es la función que arranca cuando empieza el nivel.
     */
    create: function () {
       
        this.gameover=false;
        this.music = this.add.audio('stage2'); // Sonido de fondo
        this.music.play();
        

        this.cursors =this.game.input.keyboard.createCursorKeys(); // Controles con flechas
        this.world.setBounds(0,0,1024 * 8, 200); // Ancho del mundo
        //this.background=this.game.add.tileSprite(0, 200, 1024, 552, 'background');
        this.background=this.add.tileSprite(0, 200, 1024 * 8, 552, 'stage02');



        this._createMeters(); // Dibujamos metros
        this._createPlayer(); // Creamos jugador
        this._createObstacles(); // Creamos obstáculos
        

        this.floor = this.game.add.sprite(0, 417); // Piso invisible
        this.endStage=this.game.add.sprite(1024*8-300, 620, 'clown','endLevel1'); // Meta del nivel
        this.physics.enable(this.floor, Phaser.Physics.ARCADE);
        this.physics.enable(this.endStage, Phaser.Physics.ARCADE);
        this.endStage.scale.x=3;
        this.endStage.scale.y=3;
        this.endStage.body.immovable = true; // Para que no se mueva la meta

        //this.endStage.body.checkCollision.left = false;
        //this.endStage.body.checkCollision.right = false;
        this.endStage.body.collideWorldBounds = true;


        this.floor.body.immovable = true;
        this.floor.body.collideWorldBounds = true;
        this.floor.body.width = this.game.world.width;

        this.recicleFireCirclesWall = this.game.add.sprite(-12, 600); // Una pared invisible para reciclar fuego (no se usa en este nivel)
        this.physics.enable(this.recicleFireCirclesWall, Phaser.Physics.ARCADE);
        this.recicleFireCirclesWall.body.immovable = true;
        this.recicleFireCirclesWall.body.height = 500;
        this.recicleFireCirclesWall.body.width = 2;
         
    },

    /**
     * Esta función sucede cuando pierdes.
     */
    triggerGameover: function(){
        var that=this;
        this.music.stop();
        this.failureSound=this.add.audio('failure'); // Sonido al perder
        this.failureSound.play();
         
        setTimeout(function(){
            // Detenemos animación y movimiento del jugador
            that.player.animations.stop();
            that.player.frameName='clownburn0000';

            that.player.body.gravity.y=0;
            that.player.body.speed=0;
            that.player.body.velocity.y=0;
            that.player.body.velocity.x=0;

            // Detenemos a los monos
            that.monkeys.setAll('body.velocity.x',0);
            that.monkeys.setAll('body.gravity.y',0);
            that.monkeys.setAll('body.velocity.y',0);
            that.monkeys.callAll('animations.stop', 'animations');
            
        },1);
        
        setTimeout(function(){
            that.game.state.start('Stage02'); // Reinicia el nivel después de un tiempo
            that.failureSound.stop();
        },3100);

        this.gameover=true;
    },

    /**
     * Esta función sucede muchas veces por segundo para mover y actualizar todo.
     */
    update: function () {
        if(this.gameover){
            return; // Si ya perdiste, no hace nada
        }

    /*    if(this.player.body.x<(this.world.width-1600)){
            this.game.physics.arcade.collide(this.recicleFireCirclesWall,this.fireCollisionGroup, this._recicleFireCircle,null,this);
        }



        this.game.physics.arcade.collide(this.player, this.fireCollisionGroup, this.triggerGameover, null, this);

        
      */
      // Revisamos colisión entre el jugador y los monos
        this.game.physics.arcade.collide(this.player, this.monkeys, this.triggerGameover, null, this);
        // Hacemos que los monos salten si tienen jumpTime
        this.monkeys.forEach(function(m){
            if(m.jumpTime && m.body.y<370 && ((m.lastJump-this.time.lastTime)<m.jumpTime)){
                m.body.velocity.y=-500; // Saltar
            }
        }, this);

        this.game.physics.arcade.collide(this.endStage, this.player); // Llegar a la meta
        this.game.physics.arcade.collide(this.floor, this.player); // Caminar en el piso
        this.game.physics.arcade.collide(this.floor, this.monkeys); // Los monos caminan sobre el piso también

        this.player.body.gravity.y=800; // Gravedad para que caiga

        var isJumping=!this.player.body.touching.down;
        this.game.camera.x=this.player.x-120; // La cámara sigue al jugador
       // Cambiamos el sprite según si salta o camina
        if(isJumping){
            this.player.frameName='jumpBalance';
        }

        if (this.cursors.up.isDown&& !isJumping){
            this.player.body.velocity.y=-480;
        }
        
        
        if(isJumping){
            // Mantengo la velocidad del fondo

            return; // Cuando está saltando, solo cae
        }

        if (this.cursors.right.isDown){
            
            this.player.body.velocity.x=150; // Avanzar
            
            this.player.animations.play('walkBalance', 10, true); // Animación de caminar
        }else if (this.cursors.left.isDown){
            
            this.player.body.velocity.x=-130; // Ir a la izquierda
            this.player.animations.play('walkBalance', 5, true);
        }else{
            this.player.body.velocity.x=0; // Quieto
                
            this.player.animations.stop();
            this.player.frameName='walkBalance2'; // Imagen estática
            //this.player.animations.play('walkBalance',8,true);
        }


    },

    /**
     * Esta función es solo para dibujar las cajas invisibles cuando CIRCUSDEBUG es true.
     */
    render: function(){
        /* global CIRCUSDEBUG */
        //CIRCUSDEBUG=true;
        if(CIRCUSDEBUG){
            this.game.debug.bodyInfo(this.player, 32, 320);
            
            this.game.debug.body(this.player);
            this.monkeys.forEach(function (e) {
                this.game.debug.body(e);
            }, this);
        }

    

        /*this.game.debug.renderPhysicsBody(this.endStage.body);
        this.game.debug.renderPhysicsBody(this.floor.body);
        
        this.obstacles.forEach(function (e) {
                this.game.debug.renderPhysicsBody(e.body);
        }, this);*/
    },

    /**
     * Esta función es para salir del juego y volver al menú.
     */
    quitGame: function () {

            //        Here you should destroy anything you no longer need.
            //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

            //        Then let's go back to the main menu.
            this.game.state.start('MainMenu');

    }

};

}());