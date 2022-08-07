import "./style.scss";

import "./js/app";
import "./js/leaderboards";

console.log(window.location.pathname);
if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
    setTimeout(() => {
      document.querySelector(".loading").classList.add("hide")
    }, 2000)
}
