// global variable
let openCards = [];
let finalMove = 0;
let starCount = 0;
let timer1 = 0; // store set interval time
let usingTime = 0;

//Create a list that holds all of your cards
 let cards = ['fa-diamond','fa-diamond',
              'fa-paper-plane-o','fa-paper-plane-o',
              'fa-anchor','fa-anchor',
              'fa-bolt','fa-bolt',
              'fa-cube','fa-cube',
              'fa-leaf','fa-leaf',
              'fa-bicycle','fa-bicycle',
              'fa-bomb','fa-bomb'];

// generate card using the card list
 function generateCards(cards){
   let deck = document.querySelector('.deck');
   cards.forEach(function(card){
     var newList = document.createElement('li');
     newList.className='card';
     newList.id= card;
     newList.innerHTML = `<i class='fa ${card}'></i>`;
     deck.appendChild(newList);
   });
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//initilization in begin, restart and play agian situation
function initilization(){
  var deck = document.querySelector('.deck');
  while(deck.firstChild){
    deck.removeChild(deck.firstChild);
  }
  document.querySelector('.congratBox').style.display='none';
  document.querySelector('.moves').innerText='0';
  clearInterval(timer1);
  if(document.querySelector('.timer').classList.contains('hurry')){
    document.querySelector('.timer').classList.remove('hurry');
  }
  document.querySelector('.timer').style.color = 'black';
  document.querySelector('.timer').innerHTML = `01:00`;
  document.querySelector('.stars').innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  openCards = [];
  finalMove = 0;
  starCount = 0;
  usingTime = 0;
  generateCards(shuffle(cards));
  countDownTimer();
}

let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click',function(){
  initilization();
});

//fliping the cards
let wholeDeck = document.querySelector('.deck');

wholeDeck.addEventListener('click',function(event){
  if(event.target.classList.contains('card')){
    var cardClicked = event.target;
    let moveEvent = document.querySelector('.moves'); // read the movement.

    //flip the card only it hasn't been showned and open situation.
    if(openCards.length < 2 &&!cardClicked.classList.contains('open') && !cardClicked.classList.contains('show')){
        cardClicked.classList.add('open','show');
        openCards.push(cardClicked);
      }

    if(openCards.length === 2){
      //no matter match or not, increase one movement
      moveEvent.innerText ++;
      let moveNo = moveEvent.innerText;
      starScore(moveNo);

      // check match or not
      if(openCards[0].id === openCards[1].id){
        matchSituation(openCards);
      }else{
        openCards.forEach(function(element){
        element.classList.add('wrong');
        });
      }

      //flip card back
      var tempCards = openCards;
      openCards=[];
      var timer2 = setTimeout(function flipBack(){
        tempCards.forEach(function(element){
          element.classList.remove('open','show');
          if(element.classList.contains('wrong')){
            element.classList.remove('wrong');
          }
        });
      },750);
    }
  }
});

// handle match situation
function matchSituation(openCards){

  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  let matches = document.getElementsByClassName('match');
  let moveNo = document.querySelector('.moves').innerText;

  // find all math cards.
  if(matches.length === 16){
    finalMove = moveNo;
    starCount = document.querySelectorAll('.fa-star').length;
    congratulations();
  }
}

//show corresponding star rating
function starScore(moveNo){
  let stars = document.querySelector('.stars');
  var twoStarsTemplate = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>`;
  var oneStarTemplate = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`;
  var noStarTemplate = `<li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`;

  if(moveNo <= 20 && moveNo > 10){
    stars.innerHTML = '';
    stars.innerHTML = twoStarsTemplate;
  }else if(moveNo <= 30 && moveNo > 20){
    stars.innerHTML = '';
    stars.innerHTML = oneStarTemplate;
  }else if(moveNo > 30){
    stars.innerHTML = '';
    stars.innerHTML = noStarTemplate;
  }
}

//after find all matches
function congratulations(){
  clearInterval(timer1);
  document.querySelector('.container').style.display='none';// hide everything have before.
  var newDiv = document.querySelector('.congratBox');

  newDiv.style.display='inline';
  newDiv.innerHTML='';
  var template = `<section class='imageSection'>
        <img class='checkbox' src="img/success.png" alt="checkbox"/>
        </section>
        <section class='textSection'>
        <p class='congrat'> Congratulations! You Won! </p>
        <p class='rating'> With ${finalMove} Moves and ${starCount} Stars in ${Math.floor(usingTime%60)} seconds.</p>
        <p class='cheerWords'> Woooooo! </p>
        </section>`;
  newDiv.innerHTML = template;
  buttonMaker();
}

function buttonMaker(){
  var btn = document.createElement('button');
  var t= document.createTextNode('Play Again!');
  btn.className = 'playAgain';
  btn.append(t);
  newDiv.appendChild(btn);
}

function fail(){
  document.querySelector('.container').style.display='none';// hide everything have before.
  var newDiv = document.querySelector('.congratBox');

  newDiv.style.display='inline';
  newDiv.innerHTML='';
  var template = `<section class='imageSection'>
        <img class='checkbox' style="animation-name: tada;"src="img/error.png" alt="checkbox"/>
        </section>
        <section class='textSection'>
        <p class='congrat'> Time Out! You lost! </p>
        <p class='cheerWords'> Please Try Again! </p>
        </section>`;
  newDiv.innerHTML = template;
  buttonMaker();
}

//click play again button ,everything call initilization function
var newDiv = document.querySelector('.congratBox')
newDiv.addEventListener('click', function(event){
  if(event.target.className ==='playAgain'){
    console.log('clicked');
    document.querySelector('.container').style.display='flex';
    initilization();
  }
});

function countDownTimer(){
  var startTime = 60;
  document.querySelector('.timer').innerHTML = '01:00';
  timer1 = setInterval(function(){
    startTime--;
    usingTime++;
    var minutes = Math.floor(startTime / 60);
    var seconds = Math.floor(startTime % 60);
  //  var miliSeconds = Math.floor((startTime % (1000 * 60)) % 1000);
    seconds < 10? document.querySelector('.timer').innerHTML = `0${minutes}:0${seconds}`:document.querySelector('.timer').innerHTML = `0${minutes}:${seconds}`;
    if(minutes === 0 && seconds <= 10){
      document.querySelector('.timer').style.color = 'red';
      if(minutes === 0 && seconds <= 5){
        document.querySelector('.timer').classList.add('hurry');
      }
    }
    if(startTime <= 0){
      clearInterval(timer1);
      document.querySelector('.timer').classList.remove('hurry');
      fail();
    }
  },1000);
}

initilization();
//congratulations();
//fail();
