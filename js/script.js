/*
Julia Spehlmann, UMass Lowell Computer Science, julia_spehlmann@student.uml.edu
COMP 4610 GUI Programming I
Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop
Copyright (c) 2018 by Julia Spehlmann. All rights reserved.
Updated by JS on December 13, 2018 at 7:24 PM
File: script.js
Description: This file is the functionality behind my scrabble game. The user gets dealt
a random hand of 7 tiles to begin. The user can choose to play individual tiles by dragging
them to the board. The current hand score will update as the user plays. Tiles cannot be
removed from the board and they must be placed consecutively. The user may also opt to get a
new hand which will remove all current tiles from play and generate 7 new random tiles. The
user may play a word by selecting the play word button whcih will update the user's total score.
}
*/


//global associative array version of data structure containing 100 tiles through its distribution value
//also contains number in alphabet, letter, (points) value, and number remaining
var ScrabbleTiles = [] ;
ScrabbleTiles[0] = { "num": 0, "letter": "A", "value" : 1,  "distribution" : 9,  "number_remaining" : 9  } ;
ScrabbleTiles[1] = { "num": 1, "letter": "B", "value" : 3,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[2] = { "num": 2, "letter": "C", "value" : 3,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[3] = { "num": 3, "letter": "D", "value" : 2,  "distribution" : 4,  "number_remaining" : 4  } ;
ScrabbleTiles[4] = { "num": 4, "letter": "E", "value" : 1,  "distribution" : 12, "number_remaining" : 12 } ;
ScrabbleTiles[5] = { "num": 5, "letter": "F", "value" : 4,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[6] = { "num": 6, "letter": "G", "value" : 2,  "distribution" : 3,  "number_remaining" : 3  } ;
ScrabbleTiles[7] = { "num": 7, "letter": "H", "value" : 4,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[8] = { "num": 8, "letter": "I", "value" : 1,  "distribution" : 9,  "number_remaining" : 9  } ;
ScrabbleTiles[9] = { "num": 9, "letter": "J", "value" : 8,  "distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles[10] = { "num": 10, "letter": "K", "value" : 5,  "distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles[11] = { "num": 11, "letter": "L", "value" : 1,  "distribution" : 4,  "number_remaining" : 4  } ;
ScrabbleTiles[12] = { "num": 12, "letter": "M", "value" : 3,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[13] = { "num": 13, "letter": "N", "value" : 1,  "distribution" : 6,  "number_remaining" : 6  } ;
ScrabbleTiles[14] = { "num": 14, "letter": "O", "value" : 1,  "distribution" : 8,  "number_remaining" : 8  } ;
ScrabbleTiles[15] = { "num": 15, "letter": "P", "value" : 3,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[16] = { "num": 16, "letter": "Q", "value" : 10, "distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles[17] = { "num": 17, "letter": "R", "value" : 1,  "distribution" : 6,  "number_remaining" : 6  } ;
ScrabbleTiles[18] = { "num": 18, "letter": "S", "value" : 1,  "distribution" : 4,  "number_remaining" : 4  } ;
ScrabbleTiles[19] = { "num": 19, "letter": "T", "value" : 1,  "distribution" : 6,  "number_remaining" : 6  } ;
ScrabbleTiles[20] = { "num": 20, "letter": "U", "value" : 1,  "distribution" : 4,  "number_remaining" : 4  } ;
ScrabbleTiles[21] = { "num": 21, "letter": "V", "value" : 4,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[22] = { "num": 22, "letter": "W", "value" : 4,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[23] = { "num": 23, "letter": "X", "value" : 8,  "distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles[24] = { "num": 24, "letter": "Y", "value" : 4,  "distribution" : 2,  "number_remaining" : 2  } ;
ScrabbleTiles[25] = {"num": 25, "letter": "Z", "value" : 10, "distribution" : 1,  "number_remaining" : 1  } ;
ScrabbleTiles[26] = { "num": 26, "letter": "_", "value" : 0,  "distribution" : 2,  "number_remaining" : 2  } ;

//create an array of tile images
var tiles = ["tile_a.jpg", "tile_b.jpg", "tile_c.jpg", "tile_d.jpg", "tile_e.jpg", "tile_f.jpg", "tile_g.jpg", "tile_h.jpg", "tile_i.jpg", "tile_j.jpg", "tile_k.jpg", "tile_l.jpg", "tile_m.jpg", "tile_n.jpg", "tile_o.jpg", "tile_p.jpg", "tile_q.jpg", "tile_r.jpg", "tile_s.jpg", "tile_t.jpg", "tile_u.jpg", "tile_v.jpg", "tile_w.jpg", "tile_x.jpg", "tile_y.jpg", "tile_z.jpg", "tile_blank.jpg", ]

//will change if a tile is placed on DW space
var is_double_word = false;

//display images from random selection of 7 tiles
function displayTiles() {

  //get 7 random tiles
  var my_hand = getRandomTiles();
  var holder = document.getElementById("tile-list");

  //for each tile, create a list item element and add to list
  for(var i =0; i<7; i++) {
    var listItem = document.createElement('li');
    var node = document.createElement('img');
    node.setAttribute("src", "./img/tiles/" + tiles[my_hand[i].num] );
    node.setAttribute("alt", "tile-" + (i+1));
    node.setAttribute("letter", my_hand[i].letter);
    node.setAttribute("class", "tile");
    node.setAttribute("value", my_hand[i].value);
    listItem.appendChild(node);
    holder.appendChild(listItem);
  }
}

//get initial 7 random tiles from distribution
function getRandomTiles() {
  var hand = [];

  //logic to generate random tiles
  for(var i = 0; i < 7; i++) {
    var randTile = Math.floor((Math.random() * 100) + 1);
    var distribution_sum = 0;
    for(var j=0; j<ScrabbleTiles.length; j++){
      distribution_sum+=ScrabbleTiles[j].distribution;
      if(randTile <= distribution_sum) {
        if(ScrabbleTiles[j].number_remaining){
          ScrabbleTiles[j].number_remaining--;
          hand[i] = ScrabbleTiles[j];
        } else {
          i--;
        }
        break;
      }
    }
  }
  //for debugging purposes
  console.log(hand);
  return hand;
}

//gets 7 new tiles and redistributes old tiles
//removes all 7 tiles currently in play
function dealNewHand() {

  //put new tiles back in distribution
  console.log(document.getElementsByClassName('tile')[0]);
  for(var i = 0; i < 7; i++) {
    var letter = document.getElementsByClassName('tile')[i].attributes.letter;
    console.log(letter);
    for(var j=0; j<ScrabbleTiles.length; j++){
      if(ScrabbleTiles[j].letter == letter) {
          ScrabbleTiles[j].number_remaining++;
        }
    }
  }

  //remove old tiles
  var oldTiles = document.getElementById('tile-list');
  console.log(oldTiles.children);
  for(var k = 6; k >= 0; k--){
    oldTiles.children[k].remove();
  }

  //get new tiles
  displayTiles();

  //update score
  updateScore(0, false, true);

  //make new tiles draggable
  $(document).ready(function() {
    $(".tile").draggable(
      {
          revert: function() { //taken from https://stackoverflow.com/questions/3088485/how-to-revert-position-of-a-jquery-ui-draggable-based-on-condition
            if ($(this).hasClass('drag-revert')) { //avoids user placing tile in invalid location
            $(this).removeClass('drag-revert');
            return true;
          } else { return false; }
        }
      }
    );
  });

//remove tile-dropped class from all spaces elements
//so that spaces are unoccupied again
  $(document).ready(function() {
    $(".spaces").removeClass('tile-dropped');
  });
}

//take a points argument and is double word argument to update Score
//takes a reset argument which sets score to 0 if true
//will multiply score by 2 if double word is true
function updateScore(points, isDW, reset) {
  //divide by 2 when we doubled score
  var divBy2 = false;

  if(is_double_word) {
    divBy2 = true;
  }

  //check if tile was placed on double word space
  if(isDW) is_double_word = true;

  console.log("is DW: ", is_double_word);

  //get current score and update
  var scoreEl = document.getElementById("score");
  var score = Number(scoreEl.innerHTML);

  //divide by 2 if we already doubled score
  if(divBy2){
    score = score / 2;
  }

  //score is old score + new points
  score = score + Number(points);

  //multiply score by 2 when there is a double word space
  if (is_double_word) {
    score = score*2;
  }

  console.log("score 2 ", score);
  //reset score when we were dealt a new hand
  reset ? scoreEl.innerHTML = 0 : scoreEl.innerHTML = score;

  console.log("score", score);
}

//play word will update total score and deal a new hand
function playWord(){
  updateTotalScore();
  dealNewHand();
}

//will add hand score to total scores
function updateTotalScore() {
  //get hand score and add to total
  var scoreEl = document.getElementById("score");
  var score = Number(scoreEl.innerHTML);


  var totalScoreEl = document.getElementById("total-score");
  var tscore = Number(totalScoreEl.innerHTML);

  tscore = tscore + score;
  totalScoreEl.innerHTML = tscore;
}




/*********     game logic begins here   *********/

//display tiles
$(document).ready(displayTiles);

//make tiles draggable
$(document).ready(function() {
  //makes all items with class tile draggable
  $(".tile").draggable(
    {
        revert: function() {
          if ($(this).hasClass('drag-revert')) {
          $(this).removeClass('drag-revert');
          return true;
        } else { return false; }
      }
    }
  );

  //makes board spaces droppable
  $(".blank-space").droppable(
    {
      accept:".tile",
      tolerance:"intersect",
      drop: function(ev, ui) {
        var droppedItem = $(ui.draggable);

        //gets occupied spaces
        var spaces = $(".board").children(".tile-dropped");
        console.log("Spaces: ", spaces);

        //if it is first tile dropped, do not need to check validity
        //just drop the tile
        if (spaces.length == 0) {

          //give space new class to tell it tile has been dropped
          $(this).addClass("tile-dropped");

          //sets droppable tile-score attribute to value of tile dropped
          $(this).attr('tile-score', droppedItem.attr('value'));

          //update score
          updateScore(droppedItem.attr('value'), false, false);

          //disable draggable functionality of tile
          droppedItem.draggable('disable');
      }
      else {
        //check to see that tile is adjancet to another tile
        var valid = false;
        for(var i = 0; i<spaces.length; i++) {

          if($(this).attr('value') == parseInt(spaces[i].attributes[1].nodeValue, 10) - 1 || $(this).attr('value') == parseInt(spaces[i].attributes[1].nodeValue, 10) + 1) {
            console.log("this val: ", $(this).attr('value'));
            console.log("other val: ", spaces[i].attributes[1].nodeValue);
            //space is adjacent to already occupied space
            valid = true;

            //make sure space is not the same as another occupied spaces
            for(var j = 0; j<spaces.length; j++) {
              if($(this).attr('value') == parseInt(spaces[j].attributes[1].nodeValue, 10)) {
                valid = false;
                console.log("got invalid from being equal to another val");
              }
            }
          }
        }
        //if invalid move, revert tile
        console.log("are we valid?: ", valid);
        if(!valid) {
          console.log("in not valid");
            droppedItem.addClass("drag-revert");
            console.log("will revert");
          } else {
            console.log("should drop");
            //give space new class to tell it tile has been dropped
            $(this).addClass("tile-dropped");

            //sets droppable tile-score attribute to value of tile dropped
            $(this).attr('tile-score', droppedItem.attr('value'));

            //update score
            updateScore(droppedItem.attr('value'), false, false);

            //disable draggable functionality of tile
            droppedItem.draggable('disable');
          }
        }
      },
    }
  );
  //makes board spaces droppable
  $(".double-word").droppable(
    {
      accept:".tile",
      tolerance:"intersect",
      drop: function(ev, ui) {
        var droppedItem = $(ui.draggable);

        //gets occupied spaces
        var spaces = $(".board").children(".tile-dropped");
        console.log("Spaces: ", spaces);

        //if it is first tile dropped, do not need to check validity
        //just drop the tile
        if (spaces.length == 0) {

          //give space new class to tell it tile has been dropped
          $(this).addClass("tile-dropped");

          //sets droppable tile-score attribute to value of tile dropped
          $(this).attr('tile-score', droppedItem.attr('value'));

          //update score
          updateScore(droppedItem.attr('value'), true, false);

          //disable draggable functionality of tile
          droppedItem.draggable('disable');
      }
      else {
        //check to see that tile is adjancet to another tile
        var valid = false;
        for(var i = 0; i<spaces.length; i++) {
          if($(this).attr('value') == parseInt(spaces[i].attributes[1].nodeValue, 10) - 1 || $(this).attr('value') == parseInt(spaces[i].attributes[1].nodeValue, 10) + 1) {

            console.log("this val: ", $(this).attr('value'));
            console.log("other val: ", spaces[i].attributes[1].nodeValue);
            //space is adjacent to already occupied space
            valid = true;

            //make sure space is not the same as another occupied spaces
            for(var j = 0; j<spaces.length; j++) {
              if($(this).attr('value') == parseInt(spaces[j].attributes[1].nodeValue, 10)) {
                valid = false;
                console.log("got invalid from being equal to another val");
              }
            }
          }
        }
        //if invalid move, revert tile
        console.log("are we valid?: ", valid);
        if(!valid) {
          console.log("in not valid");
          console.log("will revert");
          droppedItem.addClass("drag-revert");
          } else {
            console.log("should drop");
            //give space new class to tell it tile has been dropped
            $(this).addClass("tile-dropped");

            //sets droppable tile-score attribute to value of tile dropped
            $(this).attr('tile-score', droppedItem.attr('value'));

            //update score
            updateScore(droppedItem.attr('value'), true, false);

            //disable draggable functionality of tile
            droppedItem.draggable('disable');
          }
        }
      },
    }
  );
  //makes board spaces droppable
  $(".double-letter").droppable(
    {
      accept:".tile",
      tolerance:"intersect",
      drop: function(ev, ui) {
        var droppedItem = $(ui.draggable);

        //gets occupied spaces
        var spaces = $(".board").children(".tile-dropped");
        console.log("Spaces: ", spaces);

        //if it is first tile dropped, do not need to check validity
        //just drop the tile
        if (spaces.length == 0) {

          //give space new class to tell it tile has been dropped
          $(this).addClass("tile-dropped");

          //sets droppable tile-score attribute to value of tile dropped
          $(this).attr('tile-score', droppedItem.attr('value'));

          //update score
          updateScore(droppedItem.attr('value')*2, false, false);

          //disable draggable functionality of tile
          droppedItem.draggable('disable');
      }
      else {
        //check to see that tile is adjancet to another tile
        var valid = false;
        for(var i = 0; i<spaces.length; i++) {
          if($(this).attr('value') == parseInt(spaces[i].attributes[1].nodeValue, 10) - 1 || $(this).attr('value') == parseInt(spaces[i].attributes[1].nodeValue, 10) + 1) {

            console.log("this val: ", $(this).attr('value'));
            console.log("other val: ", spaces[i].attributes[1].nodeValue);
            //space is adjacent to already occupied space
            valid = true;

            //make sure space is not the same as another occupied spaces
            for(var j = 0; j<spaces.length; j++) {
              if($(this).attr('value') == parseInt(spaces[j].attributes[1].nodeValue, 10)) {
                valid = false;
                console.log("got invalid from being equal to another val");
              }
            }
          }
        }
        //if invalid move, revert tile
        console.log("are we valid?: ", valid);
        if(!valid) {
          console.log("in not valid");
          console.log("will revert");
          droppedItem.addClass("drag-revert");
          } else {
            console.log("should drop");
            //give space new class to tell it tile has been dropped
            $(this).addClass("tile-dropped");

            //sets droppable tile-score attribute to value of tile dropped
            $(this).attr('tile-score', droppedItem.attr('value'));

            //update score
            updateScore(droppedItem.attr('value')*2, false, false);

            //disable draggable functionality of tile
            droppedItem.draggable('disable');
          }
        }
      },
    }
  );
});
