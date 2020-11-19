import { Spaceship } from './Spaceship.js';
import { Enemy } from './enemy.js';
import { Statistic } from './statistic.js';
import { Media } from './media.js';
          
class Game {
  
  constructor(){
    this.media = new Media;
    }
  
  htmlElements = {
    spaceship: document.querySelector('.spaceship'),
    container: document.querySelector('.game'),
    paralax1: document.querySelector('.parallax-1'),
    mainMenu: document.querySelector('.main-menu'),
    modal: document.querySelector('.modal'),
    button: document.querySelector('.modal__button'),
    scoreInfo: document.querySelector('.modal__text'),
    newGameButton: document.querySelector('.new-game__button'),
    settingsButton: document.querySelector('.settings__button'),
    settingsMenu: document.querySelector('.settings'),
    muteButton: document.querySelector('.mute__button'),
    unMutteButton: document.querySelector('.unmute__button'),
    exitButton: document.querySelector('.return__button'),
    
  
  };
  
  enemies = [];
  buttonHandler = null;
  enemiesInterval = null;
  checkPositionInterval = null;
  createEnemyInterval = null;
  backgroundInterval = null;
  levelInterval = null;
 
  
  init() {
    this.htmlElements.newGameButton.addEventListener('click', () => this.start());
    this.htmlElements.settingsButton.addEventListener('click', ()=> this.showSettings());
    this.media.playMusic();
    
  }
  start(){
    this.ship = new Spaceship(
      this.htmlElements.spaceship,
      this.htmlElements.container,);
      this.ship.init();
      this.htmlElements.mainMenu.classList.add('hidden');
      this.htmlElements.newGameButton.style.display ='none'
      this.newGame()
    }

  showSettings(){
      this.htmlElements.mainMenu.classList.add('hidden');
      this.htmlElements.settingsMenu.classList.remove('hidden');
      this.htmlElements.muteButton.addEventListener('click', () => this.media.mute());
      this.htmlElements.unMutteButton.addEventListener('click', () => this.media.unMute());
      this.htmlElements.exitButton.addEventListener('click', () => this.setingsExit());
    }
  
  setingsExit(){
    this.htmlElements.mainMenu.classList.remove('hidden');
    this.htmlElements.settingsMenu.classList.add('hidden');
  }
  
  newGame() {
    
    this.backgroundPosition = 1000;   
    this.paralax1Position = 0;   
    this.enemiesInterval = 30;
    this.enemiesLevel = 1000;
    this.htmlElements.modal.classList.add('hidden');
    this.htmlElements.button.style.display = 'none'
    this.ship.element.style.left = '0px';
    this.ship.setPosition();
    this.statistic = new Statistic;  
    this.createEnemyInterval = setInterval(() => this.randomNewEnemy(), this.enemiesLevel);
    this.checkPositionInterval = setInterval(() => this.checkPosition(), 1);
    this.backgroundInterval = setInterval(() => this.moveBackground(), 40);
    this.statistic.resetCounter();
    this.statistic.setLives();
    this.changeLevel()
  }

  endGame() {
    this.htmlElements.button.addEventListener('click', ()=> this.newGame()
      );
    this.htmlElements.modal.classList.remove('hidden');
    this.htmlElements.button.style.display = 'block'
    this.htmlElements.scoreInfo.textContent = `You loose! Your score is: ${
    this.statistic.points}`;
    this.enemies.forEach((enemy) => enemy.explode());
    this.enemies.length = 0;
    clearInterval(this.createEnemyInterval);
    clearInterval(this.checkPositionInterval);
    clearInterval(this.backgroundInterval);
  }

  randomNewEnemy() {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    randomNumber % 5
      ? this.createNewEnemy(
          this.htmlElements.container,
          this.enemiesInterval,
          'enemy',
          'explosion',
        )
      : this.createNewEnemy(
          this.htmlElements.container,
          this.enemiesInterval * 2,
          'enemy--big',
          'explosion--big',
          3,
        );
  }

  createNewEnemy(...params) {
    const enemy = new Enemy(...params);
    enemy.init();
    this.enemies.push(enemy);
  }

  checkPosition() {
    
    if(this.statistic.lives == 0){
      this.endGame();
  }
    
    this.enemies.forEach((enemy, enemyIndex, enemiesArr) => {
      const enemyPosition = {
        top: enemy.element.offsetTop,
        right: enemy.element.offsetLeft + enemy.element.offsetWidth,
        bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
        left: enemy.element.offsetLeft,
      };
      if (enemyPosition.top > window.innerHeight) {
        enemy.explode();
        enemiesArr.splice(enemyIndex, 1);
        this.statistic.remLive();
        this.backgroundFlash();
        
      }
      this.ship.missiles.forEach((missile, missileIndex, missileArr) => {
        const missilePosition = {
          top: missile.element.offsetTop,
          right: missile.element.offsetLeft + missile.element.offsetWidth,
          bottom: missile.element.offsetTop + missile.element.offsetHeight,
          left: missile.element.offsetLeft,
        };
        if (
          missilePosition.bottom >= enemyPosition.top &&
          missilePosition.top <= enemyPosition.bottom &&
          missilePosition.right >= enemyPosition.left &&
          missilePosition.left <= enemyPosition.right
        ) {
          enemy.hit();
          if (!enemy.lives) {
           this.statistic.addPoint(enemy.classList == 'enemy--big' ? 'big' : 'small') 
          enemiesArr.splice(enemyIndex, 1);
          
          }
          missile.remove();
          missileArr.splice(missileIndex, 1);
          
        }
        if (missilePosition.bottom < 0) {
          missile.remove();
          missileArr.splice(missileIndex, 1);
        }
      });
    });
  }
  moveBackground(){
    this.backgroundPosition += 1;
    this.paralax1Position += 2;
    this.htmlElements.container.style.backgroundPositionY = `${this.backgroundPosition}px`;
    this.htmlElements.paralax1.style.backgroundPositionY = `${this.paralax1Position}px`;
  
  }

  backgroundFlash(){
  this.htmlElements.container.style.backgroundImage = `none`;
   setTimeout(() => this.htmlElements.container.style.backgroundImage= "url('images/backgorund.jpg')", 80);

  }
  changeLevel(){
    setInterval(()=>{
       this.enemiesInterval -= 2;
       this.enemiesLevel -= 40;
    },12000)
  }

}

const newGame = function () {
  const game = new Game();
  game.init();
};

newGame();
