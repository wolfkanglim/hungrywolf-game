const btn = document.getElementById('btn');

btn.addEventListener('click', function() {
    //reset();
    btn.classList.add('moveout');
    startGame();    
});

document.addEventListener('keydown', e => {
    if(e.keyCode === 32){
    btn.classList.add('moveout');
    }
    startGame();
})

slidebar.addEventListener('click', function(){
    slidebar.classList.remove('slide');
    reset();
    btn.classList.remove('moveout');    
});

////setViewHeigh
function setViewportHeight(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('-vh', `${vh}px`)
}
setViewportHeight();
window.addEventListener('resize', () => {
    setTimeout(setViewportHeight, 100);
})
