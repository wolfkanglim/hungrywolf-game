const memoryCard = document.querySelectorAll('.memory-card');

function startGame(){
    shuffle();    
    timerStart();
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
    checkChicken.currentTime = 0;
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
    gotChicken.currentTime = 0;
    gotChicken.volume = 0.25;
    count++;
    resetBoard();

    if(count === 10){
        congrat();
        timerStop();
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
    timerReset();
}

 const timer = document.getElementById('timer');
/////Timer setup Date.now()/////
function timerCycle(time){
    let hrs = time / 3600000;
    let hh = Math.floor(hrs);
    let min = (hrs - hh) * 60;
    let mm = Math.floor(min);
    let sec = (min - mm) * 60;
    let ss = Math.floor(sec);
    let msec = (sec- ss) * 100;
    let ms = Math.floor(msec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");
  return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

function print(txt){
    timer.innerHTML = txt;
}
let startTime;
let elapsedTime = 0
let timerInterval;

function timerStart(){
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;           
        print(timerCycle(elapsedTime));
    }, 10);
}

function timerStop(){
    clearInterval(timerInterval);
}

function timerReset(){
    clearInterval(timerInterval);
    timer.innerHTML = '00:00:00:00';
    elapsedTime = 0;
}
