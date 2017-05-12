$(document).ready(function() {
  /*
  PROGRAM Where's Waldo Memory Game
    User should click on start button to start the game

    On click of start button, a picture of Waldo will be given to the user
    Flip all cards(approx 30-50 cards) so that user can see the pic side
    User will have 2 seconds to observe
    After time is up, flip back the cards.
    User should find Waldo within 3 guesses
      #1. If the user clicks on wrong card, it would flip for a sec and flip back, and hint the user by giving hot or cold clues

      #2. If the user doesn't get the answer after 3 guesses the cards will shuffle and flip to the pic side, and another 2 seconds will be given to the user
      and repeat #1

      #3. If the user finds Waldo, alert "You win" and give the user two options (continue / end)

      #4-1. if user wants to continue, move on to next stage.
        New character will be given to the user
        Shuffle the cards and flip cards for 3seconds and user repeats #1,2,3 and 4

      #4-2. if user wants to end, end the game.
  END
  */

  // variables
  let $startBtn = $("#startBtn");
  let $endBtn = $("#endBtn");
  let $continueBtn = $("#continueBtn");
  let $goBtn = $("#goBtn");
  let $infoBtn = $("#infoBtn");
  let $goBackBtn = $("#goBackBtn");
  let $exit = $("#exit");

  console.log($startBtn);

  let findMe;
  let clickedCard;
  let guesses = 3;

  let $card = $(".card");
  let cardArr = [];

  let randomCard;

  let $thisIsMe;

  let $thisIsMeIndex;

  let currentIndexNum;

  let showMe;

  // Creating an array of cards
  for (let i = 0; i < $card.length; i++) {
    cardArr.push($card[i]);
  }

  // Function for shuffling cards
  // Couldn't figure out how to shuffle an array so got some help from stackoverflow
  // (http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
  let shuffleCards = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // for (let i = 0; i < cardArr.length; i++) {
  //   // if (cardArr[i])
  //   console.log(cardArr[i]);
  // }

  $startBtn.on("click", function() {
    console.log('click');
    $(".modal-intro-wrapper").fadeOut(500);
    $(".modal-instruction-wrapper").fadeIn(500);
  });

  let pickRandomCard = function(arr) {
    let i = Math.floor(Math.random() * arr.length);
     return arr[i];
  }

  findMe = pickRandomCard(cardArr);
  $thisIsMe = $(findMe);
  showMe = findMe;

  let popupGame = function() {
    pickRandomCard(cardArr);
    $(".modal-popup-wrapper").fadeIn(500);

    $(".card-box").append(showMe);
    // console.log(pickRandomCard(cardArr));
  }

  // game function
  let playGame = function() {
    $(".card").remove();
    shuffleCards(cardArr);
    console.log(cardArr);
    console.log(cardArr[0]);
    for(let i = 0; i < cardArr.length; i++) {
      $(".container").append(cardArr[i]);
      if (cardArr[i] === $thisIsMe[0]) {
        $thisIsMeIndex = i;
      }
    }

    window.setTimeout(function() {
      $(".front").css({
        "display": "none"
      });
      $(".back").css({
        "display": "block"
      });
    }, 500);
    window.setTimeout(function() {
      $(".back").css({
        "display": "none"
      });
      $(".front").css({
        "display": "block"
      });
    }, 2500);

    // $thisIsMe.on("click", function() {
    //   alert("You found me!");
    // });
    console.log($thisIsMe[0]);

    $card.on("click", function() {
      console.log($(this)[0]);
      // let $that = $(this)[0];
      console.log($(this).children());
      // $(this).eq(index#);
      clickedCard = $(this)[0];
      console.log(clickedCard);

      if ($(this)[0] !== $thisIsMe[0]) {
        for (let i = 0; i < cardArr.length; i++) {
          if (cardArr[i] === $(this)[0]) {
            currentIndexNum = i;
          }
        }

        let calculate = Math.abs($thisIsMeIndex - currentIndexNum);

        // if there are remaining guesses DO THIS
        if (guesses > 0) {
          guesses -= 1;
          $("#guesses").text(guesses);
          // hot or cold
          if (calculate <= 1) {
            alert("hot");
          } else if (calculate <= 6) {
            alert("cold");
          } // hot or cold
        // if there are no remaining guesses DO THIS
        } else {
          $(this).off();
          guesses = 3;
          $("#guesses").text(guesses);
          replayGame();
        }
      } else if ($(this)[0] === $thisIsMe[0] && guesses > 0) {
        $($(this).children().eq(0)).css({
          "display": "none"
        });
        $($(this).children().eq(1)).css({
          "display": "block"
        });
        alert("You found me!");
        $(this).off();
        guesses = 3;
        $("#guesses").text(guesses);
        replayGame();
      }
    }); // End of current card click function
  } // End of playGame function

  // end game function
  let endGame = function() {
    $("#modal-end").fadeIn(500);
  }

  // replay function
  let replayGame = function() {
    $(".modal-replay-wrapper").fadeIn(500);
    // when the user clicks replay
    $("#replayBtn").on("click", function() {
      $(".modal-replay-wrapper").fadeOut(500);
      pickRandomCard(cardArr);
      findMe = pickRandomCard(cardArr);
      $thisIsMe = $(findMe);
      showMe = findMe;
      $(".modal-popup-wrapper").fadeIn(500);
      $(".card-box").append(showMe);
    });
    // when user clicks end
    $("#endGameBtn").on("click", function() {
      endGame();
    });
  }


  $continueBtn.on("click", function() {
    console.log('click');
    $(".modal-instruction-wrapper").fadeOut(500);
    popupGame();
  });

  $goBtn.on("click", function() {
    $(".modal-popup-wrapper").fadeOut(500);
    playGame();
  }); // End of goBtn click function

  $infoBtn.on("click", function() {
    $("#modal-instruction-copy").fadeIn(500);
  });

  $goBackBtn.on("click", function() {
    $("#modal-instruction-copy").fadeOut(500);
  });

  $exit.on("click", function() {
    $(".modal-wrapper-2").fadeOut(500);
  });

  let $test = $("#test");




});
