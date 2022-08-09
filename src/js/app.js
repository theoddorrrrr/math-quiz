if (window.location.pathname === "/app.html") {
  const loaderSeconds = document.querySelector(".game-start span");
  const { username, gamemode } = JSON.parse(localStorage.getItem("user"));

  let isPaused = false;
  let time = 5;

  let gameName = document.querySelector(".game__username");
  let gameTime = document.querySelector(".game__time");
  let gameDifficult = document.querySelector(".game__difficult");
  let gameScore = document.querySelector(".game__score");

  gameName.innerText = username;
  gameTime.innerText = time

  let counter = 2;
  let intervalId = setInterval(() => {
    if (counter === 0) clearInterval(intervalId);
    loaderSeconds.innerText = counter;
    counter--;
  }, 1000);

  setTimeout(() => {
    document.querySelector(".game-start").classList.add("hide");

    if (gamemode === "time-attack") {
      const count = () => {
        gameTime.innerText = time;
        console.log(time);
        time--;
      };

      const checks = () => {
        if (isPaused == false) {
          count();
          if (time < 0) {
            isPaused = true;

            document.querySelector(".game-end").classList.add("_show")
            console.log("end");
          }
        }
      };
      setInterval(checks, 1000);
    }
  }, 3000);
}
