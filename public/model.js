export {Model};
import * as Util from './util.js'

const Model = {

  deckURL: '/decks',
  
  data: {
    deck: []
  },

  updateDeck: function() {
    fetch(this.deckURL)
    .then (
        function(response){
            //turn response into json and return it
            return response.json();
        }
    )
    .then (
        (data) => {
            //put updated post data from the database
            // into local post array
            this.data.deck = data
            //create a model update event
            console.log(data)
            let event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event)
        }
    )

  },

  updateCount: function(cardId, countNum) {
    fetch(this.deckURL+'/'+cardId,{
        method: 'PUT',
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
          count: Number(countNum)
        })
      })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.updateDeck();
      let event = new CustomEvent("countUpdated");
      window.dispatchEvent(event)
    })
  },

  // reset the deck
  shuff: function() {
    this.updateCount(1,6);
    this.updateCount(2,12);
    this.updateCount(3,12);
    this.updateCount(4,12);
    this.updateCount(5,12);
  },

  //is the card still in the deck?
  haveCard: function(cardId) {
    let haveTheCard = true;
    let card = this.data.deck[cardId-1];
    if(card.count === 0){
      haveTheCard = false;
    }
    return haveTheCard;
  },

  // //this check if the deck have cards or not
  // deckFull: function() {
  //   let full = false;
  //   for(let i=0; i<this.data.deck.length; i++){
  //     if (this.data.deck[i].count !== 0){
  //       full = true;
  //     }
  //   }
  //   return full;
  // },

  //decriment card count
  removeCard: function(cardId) {
    if(this.haveCard(cardId)){
      let countNum = this.data.deck[cardId-1].count;
      console.log("before count --",countNum)
      countNum --;
      console.log("after count --",countNum);
      this.updateCount(cardId,countNum);
    }
  },

  getCard: function(cardId) {
    console.log("card is: ", this.data.deck[cardId-1]);
    return this.data.deck[cardId-1];
  },

  //draw a card
  drawCard: function() {
    //pick a card 1 to 5
    let card = Util.getRndInteger(1,6);
    
    //check if card is still in deck
    let flag = true;
    let full = false;
    for(let i=0; i<this.data.deck.length; i++){
      if (this.data.deck[i].count !== 0){
        full = true;
      }
    }
    if(full){
      while (flag){
        console.log("card id is: ", card);
        if(!this.haveCard(card)){
          card = Util.getRndInteger(1,6);
        } else {
          flag = false;
        }
      }

      this.removeCard(card);

      let event = new CustomEvent("cardIsDrawn");
      window.dispatchEvent(event)
      return this.getCard(card);
    } else {
      return null;
    } 
  }

}