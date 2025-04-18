const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const SnakeParts = [];
let tailLenght = 2;

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

let score = 0;

const gulpSound = new Audio('gulp-37759.mp3');
const gameOverSound = new Audio('gameOverSound.mp3');


//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    // if(score > 2){
    //     speed = 11;
    // }
    // if(score > 5){
    //     speed = 15;
    // }
    // if(score > 10){
    //     speed = 20;
    // }

    setTimeout(drawGame,1000/speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity ===0 && xVelocity === 0){
        return false;
    }

    if(headX< 0 || headX === tileCount){
        gameOver = true;
        gameOverSound.play();
    }
    else if(headY < 0 || headY === tileCount){
        gameOver = true;
        gameOverSound.play();
    }

    for(let i = 0;i < SnakeParts.length;i++){
        let part = SnakeParts[i];
        if(part.x == headX && part.y == headY){
            gameOver = true;
            gameOverSound.play();
            break;
            
        }
    }

    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = '21px Verdana';

        ctx.fillText(`Game Over! Your score is ${score}.`,canvas.width/6.5,canvas.height/2)
    }
    
    return gameOver;
    
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '13px Verdana'
    ctx.fillText('Score ' + score, canvas.width-55,15)
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
  
    ctx.fillStyle = 'green';
    for(let i=0; i<SnakeParts.length;i++){
        let part = SnakeParts[i];
        ctx.fillRect(part.x * tileCount,part.y*tileCount,tileSize,tileSize)
    }

    SnakeParts.push(new SnakePart(headX,headY));
    if(SnakeParts.length > tailLenght){
        SnakeParts.shift();
    }
    ctx.fillStyle = 'yellow';
    ctx.fillRect(headX * tileCount,headY * tileCount,tileSize,tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize);
}

function checkAppleCollision(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLenght++;
        score++;
        speed++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown',keyDown);

function keyDown(event){
    //up 
    if (event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down

    if (event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if (event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if (event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame()

//requestAnimationFrame
//setInterval xtimes per a second 
//setTimeOut