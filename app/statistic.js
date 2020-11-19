export class Statistic{
    pointsElement = document.querySelector('.points__counter') 
    livesWrapper = document.querySelector('.lives') 
    
    constructor(){
        this.points = 0;
        this.lives = 3;
        this.resetCounter();
        this.livesWrapper.innerHTML = '';
    }

    addPoint(enemyType){
       
        if(enemyType == 'big'){
            this.points += 60;
        }
        if(enemyType == 'small'){
            this.points += 10;
        }
    this.pointsElement.textContent = this.points;
        
    }
    
    resetCounter(){
        this.pointsElement.textContent = this.points; 
    }
    
    setLives(){

        
        for (let i = 0; i <= this.lives - 1; i++){
        let element = `<div class="information__live" dataX=${i+1} ></div>`;
        this.livesWrapper.insertAdjacentHTML('beforeend', element)
        }
    }

    remLive(){
        document.querySelector(`[dataX="${this.lives}"]`).remove()
        this.lives -= 1;
        
    }

}