'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore0 = 0;
let currentScore1 = 0;
let totalScore0 = 0;
let totalScore1 = 0;
let playing = true;

const unhideDice = () => {
  diceEl.classList.remove('hidden');
};

const changeDice = dicePNG => {
  diceEl.src = dicePNG;
};

const changeToPlayer = playerID => {
  if (playerID === 0) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  } else if (playerID === 1) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  }
};

const isWinner = () => {
  if (totalScore0 >= 50) {
    player0.classList.remove('player--active');
    player0.classList.add('player--winner');
    changeToPlayer(0);
    playing = false;
  } else if (totalScore1 >= 50) {
    player1.classList.remove('player--active');
    player1.classList.add('player--winner');
    changeToPlayer(1);
    playing = false;
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    unhideDice();
    changeDice(`/images/dice-${randomNumber}.png`);

    if (player0.classList.contains('player--active')) {
      if (randomNumber !== 1) {
        currentScore0 += randomNumber;
        current0El.textContent = currentScore0;
      } else {
        changeToPlayer(1);
        current0El.textContent = 0;
        currentScore0 = 0;
      }
    } else if (player1.classList.contains('player--active')) {
      if (randomNumber !== 1) {
        currentScore1 += randomNumber;
        current1El.textContent = currentScore1;
      } else {
        changeToPlayer(0);
        current1El.textContent = 0;
        currentScore1 = 0;
      }
    }
  }
});

// Figure out how to make winner immediate when total score hits 10
btnHold.addEventListener('click', function () {
  if (playing) {
    if (player0.classList.contains('player--active')) {
      if (totalScore0 < 50) {
        totalScore0 += currentScore0;
        score0El.textContent = totalScore0;
        current0El.textContent = 0;
        changeToPlayer(1);
        currentScore0 = 0;
        diceEl.classList.add('hidden');
        isWinner();
      }
    } else if (player1.classList.contains('player--active')) {
      if (totalScore1 < 50) {
        totalScore1 += currentScore1;
        score1El.textContent = totalScore1;
        current1El.textContent = 0;
        changeToPlayer(0);
        currentScore1 = 0;
        diceEl.classList.add('hidden');
        isWinner();
      }
    }
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore0 = 0;
  currentScore1 = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  changeToPlayer(0);
  diceEl.classList.add('hidden');
  playing = true;
});
