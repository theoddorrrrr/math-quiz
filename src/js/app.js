import {
  animationPlus,
  animationMinus,
  randomNumbers,
  isDivisible,
} from "./helpers";

if (window.location.pathname === "/app.html") {
  const loaderSeconds = document.querySelector(".game-start span");
  const { username, gamemode } = JSON.parse(localStorage.getItem("user"));
  const menu = document.querySelector(".icon-menu");
  const continueBtn = document.querySelector(".btn-continue");
  const endBtn = document.querySelector(".btn-end");
  const scoreBody = document.querySelector(".score");
  const gameNumbers = document.querySelector(".game__numbers");

  let isPaused = false,
    isEnd = false;
  let time = gamemode === "time-attack" ? 60 : 0;
  let difficult = "Noob";

  let strike = 0;
  let result = 0;
  let score = 0,
    correct = 0,
    uncorrect = 0;

  let gameName = document.querySelector(".game__username");
  let gameTime = document.querySelector(".game__time");
  let gameDifficult = document.querySelector(".game__difficult");
  let gameScore = document.querySelector(".game__score");

  const numOne = document.querySelector(".game__num_one");
  const numTwo = document.querySelector(".game__num_two");
  const operand = document.querySelector(".game__operator");
  const gameInput = document.querySelector(".game__input");

  gameName.innerText = username;
  gameTime.innerText = time;
  gameDifficult.innerText = difficult;

  const gameStart = () => {
    document.querySelector(".game-start").classList.add("hide");
    gameNumbers.classList.add("show-num");
    gameInput.focus();
    menu.addEventListener("click", menuOpen);
    document.addEventListener("keyup", btnHandler);
    continueBtn.addEventListener("click", menuClose);
    endBtn.addEventListener("click", endGame);
  };

  const menuOpen = () => {
    isPaused = true;
    document.querySelector(".game-menu").classList.add("_show");
  };

  const menuClose = () => {
    isPaused = false;
    gameInput.focus();
    document.querySelector(".game-menu").classList.remove("_show");
  };

  const endGame = () => {
    isEnd = true;
    isPaused = true;
    document.querySelector(".game-menu").classList.remove("_show");
    document.querySelector(".game-end").classList.add("_show");

    document
      .querySelector(".game-end__again")
      .addEventListener("click", () => window.location.reload());

    const users = JSON.parse(localStorage.getItem("leaderboards"));
    const selectedUser = users.find(
      (item) => item.username === username && item.gamemode === gamemode
    );
    if (!selectedUser) {
      users.push({
        username: username,
        gamemode: gamemode,
        score: score,
        correct: correct,
        uncorrect: uncorrect,
      });
    }
    if (selectedUser) {
      if (selectedUser.score < score) {
        selectedUser.score = score;
        selectedUser.correct = correct;
        selectedUser.uncorrect = uncorrect;
      }
    }
    localStorage.setItem("leaderboards", JSON.stringify(users));
  };

  //Game Actions
  let operator, num1, num2;

  const getNum = () => {
    let min, max;
    if (difficult === "Noob") (min = 1), (max = 10);
    if (difficult === "Intermediate") (min = 1), (max = 20);
    if (difficult === "Advanced") (min = 1), (max = 50);

    let currNum1 = randomNumbers(min, max);
    let currNum2 = randomNumbers(min, max);

    if (currNum1 > currNum2) {
      num1 = currNum1;
      num2 = currNum2;
    } else {
      num1 = currNum2;
      num2 = currNum1;
    }
  };

  const primeNum = () => {
    const isDivisibleNumbers = isDivisible(num1, num2);

    if (isDivisibleNumbers) return;
    if (num2 === 0) {
      const nums = getNum();;
      console.log(nums);
    }

    num2 = num2 - 1;
    primeNum();
  };

  const getOperator = () => {
    const numbers = randomNumbers(1, 4);

    switch (numbers) {
      case 1: {
        operator = "+";
        break;
      }
      case 2: {
        operator = "-";
        break;
      }
      case 3: {
        operator = "*";
        break;
      }
      case 4: {
        operator = "/";
        primeNum();
        break;
      }
    }
  };

  const getResult = () => {
    switch (operator) {
      case "+": {
        result = num1 + num2;
        break;
      }
      case "-": {
        result = num1 - num2;
        break;
      }
      case "*": {
        result = num1 * num2;
        break;
      }
      case "/": {
        result = num1 / num2;
        break;
      }
    }
  };

  const setDifficult = () => {
    if (strike >= 5 && difficult === "Noob") {
      difficult = "Intermediate";
      strike = 0;
      gameDifficult.classList.add("pop");
      gameDifficult.addEventListener("animationend", () => {
        gameDifficult.classList.remove("pop");
      });
    } else if (strike >= 5 && difficult === "Intermediate") {
      difficult = "Advanced";
      strike = 0;
      gameDifficult.classList.add("pop");
      gameDifficult.addEventListener("animationend", () => {
        gameDifficult.classList.remove("pop");
      });
    } else if (difficult === "Advanced") {
      strike = 0;
    }
    gameDifficult.innerText = difficult;
  };

  const changeOutputNumbers = () => {
    document.querySelector(".game-end__score p").innerText = score;
    document.querySelector(".game-end__correct p").innerText = correct;
    document.querySelector(".game-end__incorrect p").innerText = uncorrect;
  };

  const btnHandler = (e) => {
    if (
      isPaused === false &&
      gameInput.value.trim() !== "" &&
      e.keyCode === 13
    ) {
      e.preventDefault()
      gameNumbers.classList.remove("show-num");
      if (+gameInput.value === result) {
        score = score + 1;
        correct = correct + 1;
        strike = strike + 1;
        animationPlus(scoreBody);
      } else {
        score = score - 1;
        strike = 0;
        uncorrect = uncorrect + 1;
        if (score < 0) score = 0;
        else animationMinus(scoreBody);
      }
      gameInput.value = "";
      setDifficult();
      gameCycle();
      setTimeout(() => gameNumbers.classList.add("show-num"), 0);
    }
  };

  const textOutput = () => {
    numOne.innerText = num1;
    numTwo.innerText = num2;
    operand.innerText = operator;
    gameScore.innerText = score;
    gameDifficult.innerText = difficult;
  };

  const gameCycle = () => {
    getNum();
    getOperator();
    getResult();
    textOutput();
  };

  //Timer before game starts
  let counter = 2;
  let intervalId = setInterval(() => {
    if (counter === 0) clearInterval(intervalId);
    loaderSeconds.innerText = counter;
    counter--;
  }, 1000);

  //Start of the game after timer
  setTimeout(() => {
    gameStart();

    if (gamemode === "time-attack") {
      const count = () => {
        gameTime.innerText = time;
        time--;
      };

      const checks = () => {
        if (isPaused == false) {
          count();
          if (time >= 0) changeOutputNumbers();
          else if (time < 0) endGame();
        }
      };

      setInterval(checks, 1000);
      gameCycle();
    }

    if (gamemode === "practice") {
      const count = () => {
        gameTime.innerText = time;
        time++;
      };

      const checks = () => {
        if (isPaused == false) {
          count();
          if (time >= 0) changeOutputNumbers();
        }
      };

      setInterval(checks, 1000);
      gameCycle();
    }
  }, 3000);
}
