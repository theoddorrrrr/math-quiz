import { leaderboardsItem } from "./helpers";

if (window.location.pathname === "/leaderboards.html") {
  const leaderboards = JSON.parse(localStorage.getItem("leaderboards")) || [];
  const gamemodePractice = document.querySelector("#practice");
  const gamemodeTimeAttack = document.querySelector("#time-attack");
  let gamemodeCurrect = "time-attack";
  const list = document.querySelector(".leaderboards__list");
  const title = document.querySelector(".leaderboards__title");
  const info = document.querySelector(".leaderboards__info");
  list.innerHTML = "";

  const hideInfo = () => {
    title.style.display = "none";
    info.style.display = "none";
  };

  const showInfo = () => {
    title.style.display = "block";
    info.style.display = "flex";
  };

  const showResult = (e) => {
    gamemodeCurrect = e?.target?.value || "time-attack";
    if (leaderboards.length === 0) {
      list.innerHTML = `
        <div class="leaderboards__empty">The Leaderboards are empty</div>
      `;
      hideInfo();
    } else {
      showInfo();
      if (gamemodeCurrect === "time-attack") {
        list.innerHTML = "";
        const users = leaderboards.filter(
          (item) => item.gamemode === gamemodeCurrect
        );
        users.map((item) => {
          list.insertAdjacentHTML("beforeend", leaderboardsItem(item));
        });
      }

      if (gamemodeCurrect === "practice") {
        list.innerHTML = "";
        const users = leaderboards.filter(
          (item) => item.gamemode === gamemodeCurrect
        );
        users.map((item) => {
          list.insertAdjacentHTML("beforeend", leaderboardsItem(item));
        });
      }
    }
  };
  gamemodePractice.addEventListener("click", showResult);
  gamemodeTimeAttack.addEventListener("click", showResult);
  showResult();
}

// ShowResult on change
