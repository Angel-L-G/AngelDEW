function initCanvas(){
    let ctx = document.getElementById('my_canvas').getContext('2d');
    let backgroundImage = new Image();
    let naveImage   = new Image();
    let enemiespic1  = new Image();
    let enemiespic2 = new Image();

    backgroundImage.src = "./Img/background.jpg";
    naveImage.src = "./Img/ship.png";
    enemiespic1.src = "./Img/alien1.png";
    enemiespic2.src = "./Img/alien2.png";
    
    let cW = ctx.canvas.width; // 700px 
    let cH = ctx.canvas.height; // 600px

    let enemyTemplate = function(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemiespic1
        }
    }

    let enemies = [
        new enemyTemplate({id: "enemy1", x: 100, y: -20, w: 50, h: 30 }),
        new enemyTemplate({id: "enemy2", x: 225, y: -20, w: 50, h: 30 }),
        new enemyTemplate({id: "enemy3", x: 350, y: -20, w: 80, h: 30 }),
        new enemyTemplate({id: "enemy4", x: 100,  y: -70,  w: 80,  h: 30}),
        new enemyTemplate({id: "enemy5", x: 225,  y: -70,  w: 50,  h: 30}),
        new enemyTemplate({id: "enemy6", x: 350,  y: -70,  w: 50,  h: 30}),
        new enemyTemplate({id: "enemy7", x: 475,  y: -70,  w: 50,  h: 30}),
        new enemyTemplate({id: "enemy8", x: 600,  y: -70,  w: 80,  h: 30}),
        new enemyTemplate({id: "enemy9", x: 475,  y: -20,  w: 50,  h: 30}),
        new enemyTemplate({id: "enemy10", x: 600, y: -20, w: 50, h: 30}),

        new enemyTemplate({ id: "enemy11", x: 100, y: -220, w: 50, h: 30, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy12", x: 225, y: -220, w: 50, h: 30, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy13", x: 350, y: -220, w: 80, h: 50, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy14", x: 100, y: -270, w: 80, h: 50, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy15", x: 225, y: -270, w: 50, h: 30, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy16", x: 350, y: -270, w: 50, h: 30, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy17", x: 475, y: -270, w: 50, h: 30, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy18", x: 600, y: -270, w: 80, h: 50, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy19", x: 475, y: -200, w: 50, h: 30, image: enemiespic2 }),
        new enemyTemplate({ id: "enemy20", x: 600, y: -200, w: 50, h: 30, image: enemiespic2 })
    ];


    let renderEnemies = function (enemyList) {
        for (let i = 0; i < enemyList.length; i++) {
            //console.log(enemyList[i]);
            ctx.drawImage(enemyList[i].image, enemyList[i].x, enemyList[i].y += .5, enemyList[i].w, enemyList[i].h);
            
            launcher.hitDetectLowerLevel(enemyList[i]);
        }
    }

    function Launcher(){
        this.y = 500, 
        this.x = cW*.5-25, 
        this.w = 100, 
        this.h = 100,   
        this.direccion, 
        this.bg="white",
        this.misiles = [];

        this.gameStatus = {
            over: false, 
            message: "",
            fillStyle: 'red',
            font: 'italic bold 36px Arial, sans-serif',
        }

        this.render = function () {
            if(this.direccion === 'left'){
                this.x-=5;
            } else if(this.direccion === 'right'){
                this.x+=5;
            } else if(this.direccion === "down"){
                this.y+=5;
            } else if(this.direccion === "up"){
                this.y-=5;
            }

            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 10, 10);
            ctx.drawImage(naveImage,this.x,this.y, 100, 90);

            for(let i=0; i < this.misiles.length; i++){
                let m = this.misiles[i];
                ctx.fillRect(m.x, m.y-=5, m.w, m.h);
                this.hitDetect(this.misiles[i],i);
                if(m.y <= 0){ // If a missile goes past the canvas boundaries, remove it
                    this.misiles.splice(i,1); // splice that missile out of the misiles array
                }
            }
            // This happens if you win
            if (enemies.length === 0) {
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = 'yellow';
                ctx.font = this.gameStatus.font;
                ctx.fillText('You win!', cW * .5 - 80, 50);
            }
        }
        // Detectar impacto de bullet (bala)
        this.hitDetect = function (m, mi) {
            console.log('crush');
            for (let i = 0; i < enemies.length; i++) {
                let e = enemies[i];
                if(m.x+m.w >= e.x && 
                   m.x <= e.x+e.w && 
                   m.y >= e.y && 
                   m.y <= e.y+e.h){
                    this.misiles.splice(this.misiles[mi],1); // Remove the missile
                    enemies.splice(i, 1); // Remove the enemy that the missile hit
                    document.querySelector('.barra').innerHTML = "Destroyed "+ e.id+ " ";
                }
            }
        }
        
        this.hitDetectLowerLevel = function(enemy){
            if(enemy.y > 550){
                this.gameStatus.over = true;
                this.gameStatus.message = 'Enemy(s) have passed!';
            }

            if(enemy.id === 'enemy3'){
                console.log(this.x);
            }

            if ((enemy.y < this.y + 25 && enemy.y > this.y - 25) &&
                (enemy.x < this.x + 45 && enemy.x > this.x - 45)) { // Checking if enemy is on the left or right of spaceship
                    this.gameStatus.over = true;
                    this.gameStatus.message = 'You Died!'
            }

            if(this.gameStatus.over === true){  
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = this.gameStatus.fillStyle; // set color to text
                ctx.font = this.gameStatus.font;
                // To show text on canvas
                ctx.fillText(this.gameStatus.message, cW * .5 - 80, 50); // text x , y
            }
        }
    }
    
    let launcher = new Launcher();
    
    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }
    let animateInterval = setInterval(animate, 6);
    
    let left_btn  = document.getElementById('left_btn');
    let right_btn = document.getElementById('right_btn');
    let fire_btn  = document.getElementById('fire_btn'); 

    document.addEventListener('keydown', function(event) {
        if(event.key == "a" || event.key == "A"){
            launcher.direccion = 'left';

            if(launcher.x < cW*.2-130){
                launcher.x+=0;
                launcher.direccion = '';
            }
        } else if (event.key == "d" || event.key == "D"){
            launcher.direccion = 'right';

            if(launcher.x > cW-110){
                launcher.x-=0;
                launcher.direccion = '';
            }
        } else if(event.key == "w" || event.key == "W"){
            launcher.direccion = 'up';

            if(launcher.y < cH*.2-80){
                console.log("1");
                launcher.y += 0;
                launcher.direccion = '';
            }
        } else if(event.key == "s" || event.key == "S"){
            launcher.direccion = 'down';

            if(launcher.y > cH - 110){
                launcher.y -= 0;
                launcher.direccion = '';
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.key == "a" || event.key == "A"){
            launcher.direccion = 'left';

            launcher.x+=0;
            launcher.direccion = '';
        } else if (event.key == "d" || event.key == "D"){
            launcher.direccion = 'right';

            launcher.x-=0;   
            launcher.direccion = '';
        } else if(event.key == "w" || event.key == "W"){
            launcher.direccion = 'up';

            launcher.y -= 0;
            launcher.direccion = '';
        } else if(event.key == "s" || event.key == "S"){
            launcher.direccion = 'down';

            launcher.y += 0;
            launcher.direccion = '';
        }
    });

    /*document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) // left arrow
        {
         launcher.direccion = 'left';  
            if(launcher.x < cW*.2-130){
                launcher.x+=0;
                launcher.direccion = '';
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37)
        {
         launcher.x+=0;
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39) // right arrow
        {
         launcher.direccion = 'right';
         if(launcher.x > cW-110){
            launcher.x-=0;
            launcher.direccion = '';
         }
        
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39) // right arrow
        {
         launcher.x-=0;   
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 38) // up arrow
         {
           launcher.direccion = 'upArrow';  
           if(launcher.y < cH*.2-80){
              launcher.y += 0;
              launcher.direccion = '';
            }
         }
    });

    document.addEventListener('keyup', function(event){
         if(event.keyCode == 38) // up arrow
         {
           launcher.y -= 0;
           launcher.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 40) // down arrow
         {
           launcher.direccion = 'downArrow';  
          if(launcher.y > cH - 110){
            launcher.y -= 0;
            launcher.direccion = '';
           }
         }
    });
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 40) // down arrow
         {
           launcher.y += 0;
           launcher.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 80) // restart game
         {
          location.reload();
         }
    })*/

    // control buttons
    left_btn.addEventListener('mousedown', function(event) {
        launcher.direccion = 'left';
    });

    left_btn.addEventListener('mouseup', function(event) {
        launcher.direccion = '';
    });

    right_btn.addEventListener('mousedown', function(event) {
        launcher.direccion = 'right';
    });

    right_btn.addEventListener('mouseup', function(event) {
        launcher.direccion = '';
    });
    //This code below fires bullets (balas)
    fire_btn.addEventListener('mousedown', function(event) {
        launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3, h: 10});
    });
    // This fires when clicking on space button from keyboard
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
           launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3,h: 10});
        }
    });
}

window.addEventListener('load', function(event) {
    initCanvas();
});