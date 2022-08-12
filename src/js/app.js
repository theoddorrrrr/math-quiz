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
      });
    }
    if (selectedUser) {
      if (selectedUser.score < score) selectedUser.score = score;
    }
    localStorage.setItem("leaderboards", JSON.stringify(users));
  };

  continueBtn.addEventListener("click", menuClose);
  endBtn.addEventListener("click", endGame);

  let counter = 2;
  let intervalId = setInterval(() => {
    if (counter === 0) clearInterval(intervalId);
    loaderSeconds.innerText = counter;
    counter--;
  }, 1000);

  setTimeout(() => {
    document.querySelector(".game-start").classList.add("hide");
    gameNumbers.classList.add("show-num")
    gameInput.focus();
    menu.addEventListener("click", menuOpen);

    if (gamemode === "time-attack") {
      const count = () => {
        gameTime.innerText = time;
        time--;
      };

      const checks = () => {
        if (isPaused == false) {
          count();
          if (time >= 0) {
            document.querySelector(".game-end__score p").innerText = score;
            document.querySelector(".game-end__correct p").innerText = correct;
            document.querySelector(".game-end__incorrect p").innerText =
              uncorrect;
          }
          if (time < 0) endGame();
        }
      };
      setInterval(checks, 1000);

      const gameCycle = () => {
        let operator, num1, num2;

        const randomNumbers = (min, max) => {
          return Math.floor(Math.random() * (max + 1 - min) + min);
        };

        const getNum = () => {
          let currNum1 = randomNumbers(1, 10);
          let currNum2 = randomNumbers(1, 10);

          if (currNum1 > currNum2) {
            num1 = currNum1;
            num2 = currNum2;
          } else {
            num1 = currNum2;
            num2 = currNum1;
          }
        };

        const isDivisible = (num1, num2) => {
          if (num1 % num2 == 0) {
            return true;
          } else {
            return false;
          }
        };

        const primeNum = () => {
          const isDivisibleNumbers = isDivisible(num1, num2);

          if (isDivisibleNumbers) return;
          if (num2 === 0) getNum();

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

        const animationPlus = () => {
          const incrementNumber = document.createElement("div");
          incrementNumber.innerText = "+1";
          incrementNumber.className = "numbers-anim-plus";
          scoreBody.append(incrementNumber);
          incrementNumber.addEventListener("animationend", () => {
            incrementNumber.remove();
          });
        };

        const animationMinus = () => {
          const incrementNumber = document.createElement("div");
          incrementNumber.innerText = "-1";
          incrementNumber.className = "numbers-anim-minus";
          scoreBody.append(incrementNumber);
          incrementNumber.addEventListener("animationend", () => {
            incrementNumber.remove();
          });
        };

        const btnHandler = (e) => {
          if (
            isPaused === false &&
            e.code === "Enter" &&
            gameInput.value.trim() !== ""
          ) {
            gameNumbers.classList.remove("show-num")
            document.removeEventListener("keypress", btnHandler);
            if (+gameInput.value === result) {
              score = score + 1;
              correct = correct + 1;
              animationPlus();
            } else {
              score = score - 1;
              if (score < 0) score = 0;
              else animationMinus();
              uncorrect = uncorrect + 1;
            }
            gameInput.value = "";
            gameCycle();
            setTimeout(() => gameNumbers.classList.add("show-num"), 0)
          }
        };

        const textOutput = () => {
          numOne.innerText = num1;
          numTwo.innerText = num2;
          operand.innerText = operator;
          gameScore.innerText = score;
        };

        document.addEventListener("keypress", btnHandler);
        getNum();
        getOperator();
        getResult();
        textOutput();
      };

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
          if (time >= 0) {
            document.querySelector(".game-end__score p").innerText = score;
            document.querySelector(".game-end__correct p").innerText = correct;
            document.querySelector(".game-end__incorrect p").innerText =
              uncorrect;
          }
        }
      };
      setInterval(checks, 1000);

      const gameCycle = () => {
        let operator, num1, num2;

        const randomNumbers = (min, max) => {
          return Math.floor(Math.random() * (max + 1 - min) + min);
        };

        const getNum = () => {
          let currNum1 = randomNumbers(1, 10);
          let currNum2 = randomNumbers(1, 10);

          if (currNum1 > currNum2) {
            num1 = currNum1;
            num2 = currNum2;
          } else {
            num1 = currNum2;
            num2 = currNum1;
          }
        };

        const isDivisible = (num1, num2) => {
          if (num1 % num2 == 0) {
            return true;
          } else {
            return false;
          }
        };

        const primeNum = () => {
          const isDivisibleNumbers = isDivisible(num1, num2);

          if (isDivisibleNumbers) return;
          if (num2 === 0) getNum();

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

        const animationPlus = () => {
          const incrementNumber = document.createElement("div");
          incrementNumber.innerText = "+1";
          incrementNumber.className = "numbers-anim-plus";
          scoreBody.append(incrementNumber);
          incrementNumber.addEventListener("animationend", () => {
            incrementNumber.remove();
          });
        };

        const animationMinus = () => {
          const incrementNumber = document.createElement("div");
          incrementNumber.innerText = "-1";
          incrementNumber.className = "numbers-anim-minus";
          scoreBody.append(incrementNumber);
          incrementNumber.addEventListener("animationend", () => {
            incrementNumber.remove();
          });
        };

        const btnHandler = (e) => {
          if (
            isPaused === false &&
            e.code === "Enter" &&
            gameInput.value.trim() !== ""
          ) {
            gameNumbers.classList.remove("show-num")
            document.removeEventListener("keypress", btnHandler);
            if (+gameInput.value === result) {
              score = score + 1;
              correct = correct + 1;
              animationPlus();
            } else {
              score = score - 1;
              if (score < 0) score = 0;
              else animationMinus();
              uncorrect = uncorrect + 1;
            }
            gameInput.value = "";
            gameCycle();
            setTimeout(() => gameNumbers.classList.add("show-num"), 0)
          }
        };

        const textOutput = () => {
          numOne.innerText = num1;
          numTwo.innerText = num2;
          operand.innerText = operator;
          gameScore.innerText = score;
        };

        document.addEventListener("keypress", btnHandler);
        getNum();
        getOperator();
        getResult();
        textOutput();
      };

      gameCycle();
    }
  }, 3000);
}
