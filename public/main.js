import {Model} from './model.js'
import * as View from '/views.js'

window.addEventListener("modelUpdated",function(e){
    binding();
});

function binding() {
    //shuff button
    let shuffButton = document.getElementById("shuff");
    shuffButton.onclick = shuffButtonHandler;

    //draw button
    let drawButton = document.getElementById("draw");
    drawButton.onclick = drawButtonHandler;
};

function shuffButtonHandler(event) {
    Model.shuff();
    View.shuffView();
};

function drawButtonHandler(event) {
    let card = Model.drawCard();
    if (card) {
        View.cardView("target",card);
    } else {
        View.emptyView();
    }
};

window.addEventListener("cardIsDrawn", function(e){
    
});

window.onload = function() {
    Model.updateDeck();
    
};