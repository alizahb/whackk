const startGameBtn = document.getElementById('start'); 
const resetGameBtn = document.getElementById('reset');   
const scoreDisplay = document.getElementById('score');  
const statusDisplay = document.querySelector('#game-status'); 
let squareEls = document.querySelectorAll('.sqr');  
let currentBabaSqr; 
let currentBookSqr; 
let currentChildSqr; 
let board = document.querySelector('.board');  
let babaInterval;
let bookInterval; 
let childInterval; 
let timerInterval;
let gameOver;
let score; 
let timer = document.getElementById('timer'); 
let timeLeft = 60; 


const init = () => {
score = 0; 
timeLeft = 60; 
scoreDisplay.innerText = 'Score: 0'; 
statusDisplay. innerText = "You can't get rid of the Babadook, but you can try...Whack the Babadook or his popup book to score points but be careful not to whack your child in the process..."; 
timer.innerText = timeLeft; 
gameOver = false; 
squareEls.forEach((square) => {
    square.innerHTML = ' '; 
});  

if(babaInterval) clearInterval(babaInterval); 
if(bookInterval) clearInterval(bookInterval);
if(childInterval) clearInterval(childInterval); 
if(timerInterval) clearInterval(timerInterval); 

clearInterval(babaInterval);
clearInterval(bookInterval); 
clearInterval(childInterval); 
clearInterval(timerInterval);
}

const startTimer = function() {
    if(gameOver) {
        clearInterval(timerInterval);
        return;  
    }
 timeLeft--;
 timer.innerText = timeLeft; 
 if(timeLeft === 0) {
    endGame(); 
    }
 }

const endGame= function() {
    gameOver = true; 
clearInterval(timerInterval); 
clearInterval(babaInterval);
clearInterval(bookInterval); 
clearInterval(childInterval);
statusDisplay.innerText = `GAME OVER. Final Score:` + `${score}`; 
squareEls.forEach((square) => {
    square.removeEventListener('click', selectSqr); 
    square.innerHTML = ' '; 
    });  
}

const startGame = () => {
init();
getRandomSqr();
setBaba(); 
setBook(); 
setChild();  
babaInterval = setInterval(setBaba, 2000); 
bookInterval = setInterval(setBook, 3050); 
childInterval = setInterval(setChild, 6000); 
timerInterval = setInterval(startTimer, 1000); 
squareEls.forEach((square) => {
    square.addEventListener('click', selectSqr); 
    }); 
}


const getRandomSqr = () => {
    let num = Math.floor(Math.random()* 16); 
    return num.toString(); 
}

const setBaba = () => {
    if (currentBabaSqr) { 
    currentBabaSqr.innerHTML = ' '; 

   }
    let baba = document.createElement('img'); 
    baba.src = 'https://assets2.ignimgs.com/2014/12/10/the-babadookjpg-886ab8.jpg'; 
    baba.alt = "Babadook"; 
    let num;
    do {
        num = getRandomSqr();
    } while ((currentBookSqr && currentBookSqr.id == num) || (currentChildSqr && currentChildSqr.id== num ));
    
    currentBabaSqr = document.getElementById(num); 
    if (currentBabaSqr) {
    currentBabaSqr.innerHTML = ' '; 
    currentBabaSqr.appendChild(baba); 
    }
}

const setBook = () => {
    if(currentBookSqr) {
        currentBookSqr.innerHTML = ' '; 
    }
let book = document.createElement('img');
book.src = 'https://m.media-amazon.com/images/I/91zWn2jJBfL._AC_UF894,1000_QL80_.jpg'; 
book.alt = "Pop-up Book"; 
let num; 
    do {
    num = getRandomSqr();
    } while ((currentBabaSqr && currentBabaSqr.id == num) || (currentChildSqr && currentChildSqr.id == num )); 

currentBookSqr = document.getElementById(num); 
    if(currentBookSqr) {
    currentBookSqr.innerHTML = ' '; 
    currentBookSqr.appendChild(book); 
    }
 }

const setChild = () => {
    if(currentChildSqr) {
      currentChildSqr.innerHTML = " "; 
    }
    let child = document.createElement("img");
    child.src = "https://bloody-disgusting.com/wp-content/uploads/2016/03/Babadook.jpg"
  child.alt = "Screaming Child"; 
    let num; 
    do {
      num = getRandomSqr();
  } while ((currentBabaSqr && currentBabaSqr.id == num)|| (currentBookSqr && currentBookSqr.id == num));
  
  currentChildSqr = document.getElementById(num);   
    if (currentChildSqr) {
      currentChildSqr.innerHTML = ' '; 
      currentChildSqr.appendChild(child); 
     } 
}

const selectSqr = function() {
    if(gameOver) {
        return; 
    }
    if(this === currentBabaSqr) {
        score += 10;
        scoreDisplay.innerText = `Score:` + `${score}`; 
        currentBabaSqr.innerHTML = ' '; 
        currentBabaSqr = null; 
   } else if (this === currentBookSqr) {
      score +=5; 
      scoreDisplay.innerText = `Score:` + `${score}`;
      currentBookSqr.innerHTML = ' '; 
      currentBookSqr = null; 
   } else if (this === currentChildSqr) {
    statusDisplay.innerText = `GAME OVER. Final Score:` + `${score}`; 
    gameOver = true; 
   endGame();  
    }
}



squareEls.forEach((square, index) => { 
    square.id = index; 
    square.addEventListener('click', selectSqr);     
    }); 


startGameBtn.addEventListener('click',startGame); 

resetGameBtn.addEventListener('click', () => {
    init(); 
}); 

init(); 