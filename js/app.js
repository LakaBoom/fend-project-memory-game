/*
 * Create a list that holds all of your cards
 */
 let cards = ['fa-diamond','fa-diamond',
              'fa-paper-plane-o','fa-paper-plane-o',
              'fa-anchor','fa-anchor',
              'fa-bolt','fa-bolt',
              'fa-cube','fa-cube',
              'fa-leaf','fa-leaf',
              'fa-bicycle','fa-bicycle',
              'fa-bomb','fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
let finalMove = 0;

function initilization(){
  var deck = document.querySelector('.deck');
  deck.innerHTML='';
  document.querySelector('.moves').innerText='0';
  document.querySelector('.stars').innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  openCards = [];
  finalMove = 0;
  generateCards(shuffle(cards));
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
    if(!cardClicked.classList.contains('open') && !cardClicked.classList.contains('show')){
        cardClicked.classList.add('open','show');
        openCards.push(cardClicked);
      }

    if(openCards.length === 2){
      //no matter match or not, increase one movement
      moveEvent.innerText ++;
      let moveNo = moveEvent.innerText;
      starScore(moveNo);

      if(openCards[0].id === openCards[1].id){
        matchSituation(openCards);
      }

      setTimeout(function(){
        openCards.forEach(function(element){
          element.classList.remove('open','show');
        });
        openCards=[];
      },400);
    }
  }
});


function matchSituation(openCards){

  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  let matches = document.getElementsByClassName('match');
  let moveNo = document.querySelector('.moves').innerText;

  // find all math cards.
  console.log(`the matches are ${matches.length}`);
  if(matches.length === 16){
    console.log(`the total movement is ${moveNo}`);
     // display a new page.

  }
}

function starScore(moveNo){
  let stars = document.querySelector('.stars');
  var twoStarsTemplate = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>`;
  var oneStarTemplate = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`;
  var noStarTemplate = `<li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`;

  if(moveNo <= 15 && moveNo > 10){
    stars.innerHTML = '';
    stars.innerHTML = twoStarsTemplate;
  }else if(moveNo <= 20 && moveNo > 15){
    stars.innerHTML = '';
    stars.innerHTML = oneStarTemplate;
  }else if(moveNo > 20){
    stars.innerHTML = '';
    stars.innerHTML = noStarTemplate;
  }
}

initilization();
