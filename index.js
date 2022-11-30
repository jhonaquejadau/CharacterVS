import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false;

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack(){

    if(!isWaiting){
        wizard.setDiceHtml();
        monster.setDiceHtml();

        wizard.takeDamage(monster.currentDiceScore);
        monster.takeDamage(wizard.currentDiceScore);

        /*If statment to render our character when a monster die */

        if(wizard.dead) {
            endGame();
        } else if (monster.dead){
            isWaiting = true;
            if(monstersArray.length > 0){
            
                setTimeout(() => {
                    monster = getNewMonster();
                    render();
                    isWaiting = false;
                }, 1500);

            
            } else {
                endGame();
            }
        }
    }
    
    render();
}

function endGame(){
    isWaiting = true;
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
        "The Orc is Victorious"
    const endEmoji = wizard.health > 0 ? "️️️🔮" : "☠️"

    setTimeout(() => {
        document.body.innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>`
    }, 1500); 
    
}

/*Function to render our charcater in the DOM */
function render(){
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
    document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}

/*Create a constructor to get an instance of the constructor function*/
const wizard = new Character(characterData.hero);
// const orc = new Character(characterData.monster);
let monster = getNewMonster(monstersArray);

/*Render layout using the constructor*/
render();
document.getElementById('attack-button').addEventListener('click', attack);



