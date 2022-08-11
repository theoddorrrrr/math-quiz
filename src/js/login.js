import { inputValidate } from "./helpers";

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  const input = document.querySelector(".login__input");
  const btn = document.querySelector(".btn-play");
  const error = document.querySelector(".login small");
  const gamemodePractice = document.querySelector("#practice");
  const gamemodeTimeAttack = document.querySelector("#time-attack");
  let gamemodeCurrect = "time-attack";
  const body = document.querySelector("main");
  const { username } = JSON.parse(localStorage.getItem("user")) || "";
  if (username) input.value = username;

  const inputHandler = (e) => {
    input.value = e.target.value;
  };

  const btnHandler = (e) => {
    let isOkayValidated;
    if (e.code === "Enter" || e.code === undefined) {
      input.addEventListener("input", () => {
        inputValidate(input, error);
      });
      isOkayValidated = inputValidate(input, error);
    }

    if (isOkayValidated) {
      body.classList.add("exit");
      body.addEventListener("animationend", () => {
        input.value = "";
        window.location.assign("app.html");
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ username: input.value, gamemode: gamemodeCurrect })
      );

      if (!localStorage.getItem("leaderboards"))
        localStorage.setItem("leaderboards", JSON.stringify([]));
    }
  };

  const changeMode = (e) => {
    gamemodeCurrect = e?.target?.value || "time-attack";
  }

  input.addEventListener("input", inputHandler);
  document.addEventListener("keypress", btnHandler);
  btn.addEventListener("click", btnHandler);
  gamemodeTimeAttack.addEventListener("click", changeMode);
  gamemodePractice.addEventListener("click", changeMode);
}
