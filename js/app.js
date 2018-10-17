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

//generate the cards that been shuffled.
generateCards(shuffle(cards));

//fliping the cards
let wholeDeck = document.querySelector('.deck');
let openCards = [];
wholeDeck.addEventListener('click',function(event){
  if(event.target.classList.contains('card')){
    var cardClicked = event.target;
      //flip the card only it hasn't been showned and open situation.
    if(!cardClicked.classList.contains('open') && !cardClicked.classList.contains('show')){
        cardClicked.classList.add('open','show');
        openCards.push(cardClicked);
      }
    console.log(openCards.length);
    if(openCards.length === 2){
      if(openCards[0].id === openCards[1].id){
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
      }

      setTimeout(function(){
        openCards.forEach(function(element){
          element.classList.remove('open','show');
        });
        openCards=[];
      },500);
    }
  }
});
