import {getDiceRollArray, getDicePlaceHolderHtml, getPercentage} from './utils.js'


/* 3- Constrcutor function to create an object with all information about characters*/
class Character {

    constructor(data){
        Object.assign(this, data)

        this.maxHealth = this.health;

        /*Set the value of the box that contain the socre of each charcater by default non value - Without any value */
        this.diceHtml = getDicePlaceHolderHtml(this.diceCount);
    }
    

    /* Set damage of reach character when we use Attack() in the index.js */
    takeDamage = attackScore => {

        const totalAttackScore = attackScore.reduce( (total, currentScore) => total + currentScore);

        /* Inline IF Statement to render health of the charcaters */
        // const total = (this.health <= 0 || totalAttackScore > this.health) ? this.health = 0 : this.health -= totalAttackScore
        this.health -= totalAttackScore
        if (this.health <= 0 || totalAttackScore > this.health){
            this.dead = true  
            this.health = 0
        }

    }
    
    /*Function to render the health bar of the character*/
    getHealthBarHtml = () => {
        const percent = getPercentage(this.health, this.maxHealth);
        
        // const condition = percent < 40 ? "danger" : (40 < condition < 70) ? "alert" : " "
        // const condition = percent < 40 ? "danger" : " "

        let condition = " ";

        if (percent > 40 && percent < 70){
            condition = "alert"
        } else if (percent < 40){
            condition = "danger"
        } else {
            condition = " "
        }

        return `
        <div class="health-bar-outer">
            <div class = "health-bar-inner ${condition} " 
                style = " width:${percent}%;">
            </div>
        </div>
        `
    }
    
    /* Set the value of the boxes equal to values of the random number in base of the diceCount property of each charcater  */
    setDiceHtml = () => {
        this.currentDiceScore = getDiceRollArray(this.diceCount);
        this.diceHtml = this.currentDiceScore.map( num => `<div class="dice">${num}</div>` ).join('')
    }; 
    
    /* Set render of the content in the layout */
    getCharacterHtml = () => {
    /*Variables to get keys of the object, and the function that render layout with the random number of the dices*/
    const {elementId, name, avatar, health, diceCount} = this;
    const healthBar = this.getHealthBarHtml();
    
    /*Method to get and render element of the DOM*/
    return `
    <div class="character-card">
        <h4 class="name"> ${name} </h4>
        <img class="avatar" src="${avatar}" />
        <div class="health">health: <b>${health}</b></div>
        ${healthBar}
        <div class="dice-container">
            ${this.diceHtml}
        </div>
    </div>`
    };
}

export default Character