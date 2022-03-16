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

/////timer setup//////
 const timer = document.getElementById('timer');
 let hr = 0;
 let min = 0;
 let sec = 0;
 let stopTimer = true;
//timer start
function timerStart(){
    if(stopTimer == true){
        timerCycle();
        stopTimer = false;
    }
    console.log(timer);
}
//timer stop
function timerStop(){
    if(stopTimer == false){
        stopTimer = true;
    }
}
//timer cycle
function timerCycle(){
    if(stopTimer == false){
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if(sec == 60) {
        min += 1;
        sec = 0;
        }
        if(min == 60){
            hr += 1;
            min = 0;
        }
        sec < 10 || sec == 0? sec = '0' + sec: sec = sec;
        min < 10 ? min = '0' + min: min = min;
        hr < 10 ? hr = '0' + hr: hr = hr;
        timer.innerHTML = hr +':' + min + ':' + sec;

    }    
    setTimeout(timerCycle, 1000);
}
//timer reset
function timerReset(){
    timer.innerHTML = '00:00:00';
    sec = 0;
    min = 0;
    hr = 0;
    stopTimer = true;
}
