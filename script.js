const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const menu = document.getElementById('menu');
const controls = document.querySelector('.controls');

let score = 0;
let gameInterval;
let obstacleInterval;
let difficulty = 'easy';

function startGame() {
    score = 0;
    player.style.left = '135px';
    restartButton.style.display = 'none';
    scoreDisplay.style.display = 'block';
    controls.style.display = 'block';
    scoreDisplay.textContent = 'النقاط: ' + score;
    gameArea.style.display = 'block';
    menu.style.display = 'none';
    clearObstacles();
    gameInterval = setInterval(updateScore, 1000);
    obstacleInterval = setInterval(createObstacle, difficulty === 'easy' ? 2000 : 1000);
}

function updateScore() {
    // The score will be updated when obstacles hit the ground
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 30)) + 'px';
    gameArea.appendChild(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    const moveInterval = setInterval(() => {
        const obstacleTop = parseInt(obstacle.style.top) || 0;
        obstacle.style.top = obstacleTop + 5 + 'px';

        if (obstacleTop >= gameArea.clientHeight - 30) {
            clearInterval(moveInterval);
            obstacle.remove();
            score++;
            scoreDisplay.textContent = 'النقاط: ' + score;
        } else if (isCollision(obstacle)) {
            clearInterval(moveInterval);
            gameOver();
        }
    }, 20);
}

function isCollision(obstacle) {
    const obstacleRect = obstacle.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    return !(
        obstacleRect.top > playerRect.bottom ||
        obstacleRect.bottom < playerRect.top ||
        obstacleRect.left > playerRect.right ||
        obstacleRect.right < playerRect.left
    );
}

function gameOver() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    alert('للأسف، لقد خسرت! النقاط: ' + score);
    restartButton.style.display = 'block';
    controls.style.display = 'none';
    gameArea.style.display = 'none';
    menu.style.display = 'block';
}

function clearObstacles() {
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());
}

leftButton.addEventListener('click', () => {
    const playerLeft = parseInt(player.style.left);
    if (playerLeft > 0) {
        player.style.left = playerLeft - 15 + 'px';
    }
});

rightButton.addEventListener('click', () => {
    const playerLeft = parseInt(player.style.left);
    if (playerLeft < gameArea.clientWidth - 30) {
        player.style.left = playerLeft + 15 + 'px';
    }
});

restartButton.addEventListener('click', startGame);

document.getElementById('easy').addEventListener('click', () => {
    difficulty = 'easy';
    startGame();
});

document.getElementById('hard').addEventListener('click', () => {
    difficulty = 'hard';
    startGame();
});
