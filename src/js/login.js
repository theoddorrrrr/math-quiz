import { inputValidate } from "./helpers";

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {

  const input = document.querySelector(".login__input");
  const btn = document.querySelector(".btn-play");
  const error = document.querySelector(".login small");
  const gamemode = document.querySelector(
    'input[name="gamemode"]:checked'
  ).value;
  const body = document.querySelector("main");

  const inputHandler = (e) => {
    input.value = e.target.value;
  };

  const btnHandler = (e) => {
    let isOkayValidated;
    if (e.code === "Enter" || e.code === undefined) {
      input.addEventListener("input", () => {
        inputValidate(input, error)
      });
      isOkayValidated = inputValidate(input, error);
    }

    if (isOkayValidated) {
      body.classList.add("exit");
      body.addEventListener("animationend", () => {
        input.value = "";
        window.location.replace("app.html");
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ username: input.value, gamemode: gamemode })
      );

      if(!localStorage.getItem("leaderboards")) localStorage.setItem("leaderboards", JSON.stringify([]))
    }
  };

  input.addEventListener("input", inputHandler);
  document.addEventListener("keypress", btnHandler);
  btn.addEventListener("click", btnHandler);
}
