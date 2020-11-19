export class Media {
    constructor(){
       this.backgroundSound = new Audio();
       this.shot = new Audio()
    }

    playMusic(){
        this.backgroundSound.src = ('sounds/Pulsar.mp3');
        this.backgroundSound.loop = true;
        this.backgroundSound.volume = 1;
        this.backgroundSound.autoplay = false;
        this.backgroundSound.play();
        }

    playShoot(){
        this.shot.src = ('/sounds/laser.mp3');
        this.shot.loop = false;
        this.shot.volume = 0.3;
        this.shot.autoplay = false;
        this.shot.play();
    }
    
    mute(){
    this.backgroundSound.volume = 0;
    this.shot.volume = 0;
    }
    unMute(){
    this.backgroundSound.volume = 1;
    this.shot.volume = 1;
    }
}