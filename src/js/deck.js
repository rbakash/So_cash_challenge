// List of suits in deck of cards
let suits = ['hearts', 'diams', 'clubs', 'spades'];

// List of values for a suit 
let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// Number of cards per user
const numberOfCardsDealt = 3;

// Number of players
const numberOfPlayers = 4;

// List of users
let users = [];

// Wining user details 
let winingUser;

// Represents the actual card
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

// Represents a deck of cards - 52 cards
class Deck {
    constructor() {
        this.deck = [];
        this.resetTheDeck();
        this.shuffle();
    }

    // Reset a deck of cards in the standard sorted order - K,Q,J,10,9 ... etc
    resetTheDeck() {
        this.deck = [];
        // For each suits create values
        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(suit, value));
            }
        }
        return this.deck;
    }

    // Shuffles the deck of card
    shuffle() {
        let remainingCardTobeShuffled = this.deck.length, randomCardSwapIndex;

        // Swaps 52 times
        while (remainingCardTobeShuffled) {

            // Create a random index to be swapped
            randomCardSwapIndex = Math.floor(Math.random() * remainingCardTobeShuffled--);

            // Shortcut in js to swap two elements
            [this.deck[remainingCardTobeShuffled], this.deck[randomCardSwapIndex]] = [this.deck[randomCardSwapIndex], this.deck[remainingCardTobeShuffled]];
        }

    }
    // Distribute the card
    deal() {
        return this.deck.pop();
    }
    // Renders the cards in the HTML 
    renderTheDistibutedCards() {
        let playerHTMLElement, rankSpanHTMLElement, suitSpanHTMLElement, anchorHTMLElement, liHTMLElement, rankClassGenerator
    for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
        for (let cardsIterator = 0; cardsIterator < numberOfCardsDealt; cardsIterator++) {
            /**
             * HTML structure to display the card properly
             * <li>
                            <a class="card rank-4 diams" href="#">
                                <span class="rank">4</span>
                                <span class="suit">♦</span>
                            </a>
                        </li>
                        <li>
                            <a class="card rank-k hearts" href="#">
                                <span class="rank">K</span>
                                <span class="suit">♥</span>
                            </a>
                        </li>
                        <li>
                            <a class="card rank-a clubs" href="#">
                                <span class="rank">A</span>
                                <span class="suit">♣</span>
                            </a>
                        </li>
                        <li>
                            <a class="card rank-3 hearts" href="#">
                                <span class="rank">3</span>
                                <span class="suit">♥</span>
                            </a>
                        </li> -->
             */
            playerHTMLElement = document.getElementById('player-' + userIterator);
            rankSpanHTMLElement = document.createElement('span');
            rankSpanHTMLElement.classList.add('rank');

            // If value is more than 10 then use J,Q,K instead to display
            if (users[userIterator].cards[cardsIterator].value == 11) {
                rankSpanHTMLElement.innerHTML = 'J'
            }
            else if (users[userIterator].cards[cardsIterator].value == 12) {
                rankSpanHTMLElement.innerHTML = 'Q'
            }
            else if (users[userIterator].cards[cardsIterator].value == 13) {
                rankSpanHTMLElement.innerHTML = 'K'
            }
            else {
                rankSpanHTMLElement.innerHTML = users[userIterator].cards[cardsIterator].value;
            }

            suitSpanHTMLElement = document.createElement('span');
            suitSpanHTMLElement.classList.add('suit');
            suitSpanHTMLElement.after();
            suitSpanHTMLElement.innerHTML = '&' + users[userIterator].cards[cardsIterator].suit + ';';

            anchorHTMLElement = document.createElement('a');
            if (users[userIterator].cards[cardsIterator].value == 11) {
                rankClassGenerator = 'rank-j'
            }
            else if (users[userIterator].cards[cardsIterator].value == 12) {
                rankClassGenerator = 'rank-q'
            }
            else if (users[userIterator].cards[cardsIterator].value == 13) {
                rankClassGenerator = 'rank-k'
            }
            else {
                rankClassGenerator = 'rank-' + users[userIterator].cards[cardsIterator].value
            }
            anchorHTMLElement.classList.add('card', rankClassGenerator, users[userIterator].cards[cardsIterator].suit);
            anchorHTMLElement.appendChild(rankSpanHTMLElement);
            anchorHTMLElement.appendChild(suitSpanHTMLElement);

            liHTMLElement = document.createElement('li');
            liHTMLElement.appendChild(anchorHTMLElement);
            playerHTMLElement.appendChild(liHTMLElement);
        }

    }
    }
}

// Represents the actual user 
class User {
    constructor(username) {
        
        // Contains all the card for the user 
        this.cards = [];
        
        // User name
        this.userName=username;

        // Boolean flag for beter user message
        this.doesTripletExist = false;
        this.doesSequenceExists = false;
        this.doesPairExists = false;
    }

    // Sorts the cards for the given card in ascending order, ignores the suit
    sortTheCard() {
        this.sort = this.cards.sort((currentCard, nextCard) => currentCard.value - nextCard.value);
    }
}
/**
 * Starts the game nd distribute the cards from the shuffled deck 
 * Ideally you should have gameplay related control in a separate file  
 */
function startTheGame() {
    
    // Removes the previous user who won
    winingUser=undefined;

    // Remove all the previous distributed cards for each user
    for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
        users[userIterator].cards = [];
        users[userIterator].doesTripletExist=false;
        users[userIterator].doesSequenceExists=false;
        users[userIterator].doesPairExists=false;
    }

    // Remove the HTML node for the previous game 
    removeThePreviousCardsForAllUsers();

    // Distribute the cards for the deck among the users
    for (let cardsIterator = 0; cardsIterator < numberOfCardsDealt; cardsIterator++) {
        for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
            // Get a new deck if running out of cards
            if(deck1.deck.length < 4){
                deck1=new Deck();
            }
            // Get the card from the shuffled deck
            users[userIterator].cards.push(deck1.deal());
        }
    }

    // Sort the card in ascending value
    for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
        users[userIterator].sortTheCard();
    }

    // Create the HTML element for the each card of the user
    deck1.renderTheDistibutedCards();

    winingUser=declareTheWinner();

    // Add better user message
    if(winingUser){
        document.getElementById('userWhoWon').innerHTML=winingUser.userName +' won the game since he has';
        if(winingUser.doesTripletExist){
            document.getElementById('userWhoWon').innerHTML+=' triplets.'
        }
        else if(winingUser.doesSequenceExists){
            document.getElementById('userWhoWon').innerHTML+=' sequence.'
        }
        else if(winingUser.doesPairExists){
            document.getElementById('userWhoWon').innerHTML+=' a pair.'
        }
        else{
            document.getElementById('userWhoWon').innerHTML+=' highest number.'
        }
    }
}
/**
 * Returns the user who has triplets, if more than one user has triplet then returns the user who has the highest card value.
 *
 * @edgeCase {when user's have same triplets} draws new card till one of them has greater card.
 * @return {User} if user has triplet |undefined if no user has triplet.
 */
function findAllTheTriplets() {

    // For each user find out triplet exists
    for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
        if ((users[userIterator].cards[0].value == users[userIterator].cards[1].value) && (users[userIterator].cards[1].value == users[userIterator].cards[2].value)) {
            
            // Set the boolean flag to true which will used in finding out whether the user has triplets,sequence or pairs  
            users[userIterator].doesTripletExist = true;
            
            // Already contains the winingUser, then compare their values
            if (winingUser) {

                if (winingUser.cards[0].value == users[userIterator].cards[0].value) {
                    
                    // New card drawn for wining user and current user who has the same value
                    let newCardForWiningUser = deck1.deal();
                    let newCardForCurrentUser = deck1.deal();
                    
                    // Draw until the values are not same
                    while (newCardForCurrentUser.value == newCardForWiningUser.value) {
                        newCardForWiningUser = deck1.deal();
                        newCardForCurrentUser = deck1.deal();
                    }

                    // Declare the user as winner depending on the newly drawn card value
                    winingUser = newCardForWiningUser.value > newCardForCurrentUser.value ? winingUser : users[userIterator];

                } else {

                    // Declare the user as winner who has the highest value
                    winingUser = winingUser.cards[0].value < users[userIterator].cards[0].value ? users[userIterator] : winingUser;
                
                }
            } else {

                // If no user has triplets until now, then save the user fo future comparision
                winingUser = users[userIterator];

            }
        }
    }
    return winingUser;
}
/**
 * Returns the user who has sequence, if more than one user has triplet then returns the user who has the highest card value 
 *
 * @edgeCase {when user's have same sequence} draws new card till one of them has greater card.
 * @return {User} if user has sequence | undefined if no user has sequence.
 */
function findSequence() {

    for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
        // Compares the user for the sequence
        if ((users[userIterator].cards[2].value == users[userIterator].cards[1].value + 1) && (users[userIterator].cards[1].value == users[userIterator].cards[0].value + 1)) {
           
            // Set the boolean flag to true which will used in finding out whether the user has triplets,sequence or pairs  
            users[userIterator].doesSequenceExists = true;
            
            if (winingUser) {
                // If its a tie between two users
                if (winingUser.cards[0].value == users[userIterator].cards[0].value) {
                   
                    // New card drawn for wining user 
                    let newCardForWiningUser = deck1.deal();
                    let newCardForCurrentUser = deck1.deal();

                    // Draw untill the values are not same
                    while (newCardForCurrentUser.value == newCardForWiningUser.value) {
                        newCardForWiningUser = deck1.deal();
                        newCardForCurrentUser = deck1.deal();
                    }

                     // Declare the user as winner depending on the newly drawn card value
                    winingUser = newCardForWiningUser.value > newCardForCurrentUser.value ? winingUser : users[userIterator]
                } else {
                    // Declare the user as winner who has the highest value
                    winingUser = winingUser.cards[0].value < users[userIterator].cards[0].value ? users[userIterator] : winingUser;
                }
            } else {

                // If no user has triplets untill now, then save the user fo future comparision
                winingUser = users[userIterator];

            }
        }
    }
    return winingUser;
}

/**
 * Returns the user who has pairs, if more than one user has pair then returns the user who has the highest card value.
 *
 * @edgeCase {when user's have same pairs} draws new card till one of them has greater card.
 * @return {User} if user has pairs |undefined if no user has pair.
 */

function findAllThePairs() {

    // For each user find out pair exists
    for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
        if ((users[userIterator].cards[0].value == users[userIterator].cards[1].value) || (users[userIterator].cards[1].value == users[userIterator].cards[2].value)) {
            
             // Set the boolean flag to true which will used in finding out whether the user has triplets,sequence or pairs  
            users[userIterator].doesPairExists = true;

             // Already contains the winingUser, then compare their values
            if (winingUser) {

                if (winingUser.cards[1].value == users[userIterator].cards[1].value) {
                    
                    // New card drawn for wining user 
                    let newCardForWiningUser = deck1.deal();
                    let newCardForCurrentUser = deck1.deal();

                    // Draw until the values are not same
                    while (newCardForCurrentUser.value == newCardForWiningUser.value) {
                        newCardForWiningUser = deck1.deal();
                        newCardForCurrentUser = deck1.deal();
                    }

                    // Declare the user as winner depending on the newly drawn card value
                    winingUser = newCardForWiningUser.value > newCardForCurrentUser.value ? winingUser : users[userIterator]
                } else {

                    // Declare the user as winner who has the highest value
                    winingUser = winingUser.cards[1].value < users[userIterator].cards[1].value ? users[userIterator] : winingUser;
                }
            } else {

                // If no user has pair until now, then save the user fo future comparision
                winingUser = users[userIterator];
            }
        }
    }
    return winingUser;

}

/**
 * Returns the user who has won.
 * @return {User}.
 */
function declareTheWinner() {

    // According to the preference given in the problem statement, triplet has higher precedence
    let returnedUser = findAllTheTriplets();
    
    // If no user exsits, continue for the other preference to declare the winner i,e. sequence 
    if (returnedUser) {
        return returnedUser;
    }

    // Find whether sequence exists or not
    returnedUser = findSequence();

    // If no user exsits, look for pair to declare the winning user
    if (returnedUser) {
        return returnedUser;
    }

    // Find the pairs
    returnedUser = findAllThePairs();
     // If no user exsits, look for highest individual card value to declare the winning user
    if (returnedUser) {
        return returnedUser;
    }
    // Assign one user for the comparision
    winingUser = users[0];
    for (let userIterator = 1; userIterator < numberOfPlayers; userIterator++) {
        // Compare only the first card as th crds are sorted
        if (winingUser.cards[0].value == users[userIterator].cards[0].value) {
            
            // New card drawn for wining user and current user who has the same value
            let newCardForWiningUser = deck1.deal();
            let newCardForCurrentUser = deck1.deal();

            // Draw until the values are not same
            while (newCardForCurrentUser.value == newCardForWiningUser.value) {
                newCardForWiningUser = deck1.deal();
                newCardForCurrentUser = deck1.deal();
            }

            // Declare the user as winner depending on the newly drawn card value
            winingUser = newCardForWiningUser.value > newCardForCurrentUser.value ? winingUser : users[userIterator]
        } else {

            // Declare the user as winner who has the highest value
            winingUser = winingUser.cards[2].value < users[userIterator].cards[2].value ? users[userIterator] : winingUser;
        }
    }
    return winingUser;

}

/**
 * Removes the previous cards from the HTML.
 * @return {void} 
 */
function removeThePreviousCardsForAllUsers() {

    // HTML reference to remove the child nodes
    let playerHTMLElement;

    // For each user remove the previous card
    for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
        playerHTMLElement = document.getElementById('player-' + userIterator);
        
        // For each child inside the each player
        while (playerHTMLElement.firstChild) {
            playerHTMLElement.firstChild.remove();
        }
    }
}

// Create a new deck and shuffles it 
let deck1 = new Deck();

// Create four users 
for (let userIterator = 0; userIterator < numberOfPlayers; userIterator++) {
    users.push(new User('Player-'+(userIterator+1)));
}


