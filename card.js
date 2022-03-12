const memoryCard = document.querySelectorAll('.memory-card');

function startGame(){
    shuffle();    
   
let hasFlipped = false;
let firstCard;
let secondCard;
let isLocked = false;
let count = 0;

const gotChicken = document.getElementById('got_chicken');
const checkChicken = document.getElementById('check_chicken');

function flipCard(){  
   if(isLocked){return;} 
   if(this === firstCard){return;} 
   
    this.classList.add('flip');
    checkChicken.play();
    checkChicken.volume = 0.2;
    if(!hasFlipped){
        hasFlipped = true;
        firstCard = this;
 return;
}
    hasFlipped = false;
    secondCard = this;
    checkForMatch();
}

function checkForMatch(){
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch?disableFlip():removeFlip(); 
}

function disableFlip(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    gotChicken.play();
    gotChicken.volume = 0.15;
    count++;
    resetBoard();

    if(count === 10){
        congrat();
    }
}

function removeFlip(){
    isLocked = true;
      setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');   
    resetBoard();
    }, 700)   
}

function resetBoard(){
    [hasFlipped, isLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle(){
    memoryCard.forEach(card => {
        let randomPosition = Math.floor(Math.random()* 12);
        card.style.order = randomPosition;
    })    
}

function congrat(){
    const slidebar = document.getElementById('slidebar');
    slidebar.classList.add('slide'); 
}

memoryCard.forEach(card => card.addEventListener('click', flipCard));
}

function reset(){
    memoryCard.forEach(card => {card.classList.remove('flip');})
}