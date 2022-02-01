let deckId;
const cardsContainer = document.getElementById("cards");
const scoreDisplay = document.getElementById("scoreText");
const remaining = document.getElementById("remaining");
const drawBtn = document.getElementById("draw-cards");
const newDeckBtn = document.getElementById("new-deck");
const computerScoreDisplay = document.getElementById("computer");
const playerScoreDisplay = document.getElementById("player");

let computerScore = 0;
let playerScore = 0;

async function newDeck() {
  const response = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await response.json();
  remaining.textContent = `Remaining cards: ${data.remaining}`;
  deckId = data.deck_id;
  drawBtn.disabled = false;
}

newDeckBtn.addEventListener("click", newDeck);

drawBtn.addEventListener("click", async () => {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  remaining.textContent = `Remaining cards: ${data.remaining}`;
  cardsContainer.children[0].innerHTML = `<img src=${data.cards[0].image} class="card" />`;
  cardsContainer.children[1].innerHTML = `<img src=${data.cards[1].image} class="card" />`;
  scoreDisplay.innerText = determineWinner(data.cards[0], data.cards[1]);

  if (data.remaining === 0) {
    drawBtn.disabled = true;
    if (computerScore > playerScore) {
      scoreDisplay.innerText = "You Lost the War!";
    } else if (computerScore < playerScore) {
      scoreDisplay.innerText = "Congratulations, You Won the War!";
    } else {
      scoreDisplay.innerText = "The battle ends in a tie!";
    }
  }
});

function determineWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreDisplay.innerText = computerScore;
    return "You Lose!";
  } else if (card1ValueIndex < card2ValueIndex) {
    playerScore++;
    playerScoreDisplay.innerText = playerScore;
    return "You Win!";
  } else {
    return "Tie, WAR!!!";
  }
}
