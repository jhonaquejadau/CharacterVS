/* 1- Function to roll dice */
function getDiceRollArray(diceCount){
    /*Array constructor to create an array initalize in 0 that would be render with the map() method to change all values with the random number*/
    return new Array(diceCount).fill(0).map( () => ( Math.floor(Math.random() * 6) + 1));
}

function getDicePlaceHolderHtml(diceCount){
    return new Array(diceCount).fill(0).map( () => `<div class="placeholder-dice"></div>`).join(' ');
}

const getPercentage = (remainingHealth, maximumHealth) => (remainingHealth * 100) / maximumHealth;

export {getDiceRollArray, getDicePlaceHolderHtml, getPercentage}