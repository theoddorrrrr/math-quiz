import "./style.scss";

import "./js/app";
import "./js/leaderboards";
import "./js/login";

if (window.location.pathname === "/") {
  setTimeout(() => {
    document.querySelector(".loading").classList.add("hide");
  }, 1000);
} else if (window.location.pathname === "/index.html") {
  setTimeout(() => {
    document.querySelector(".loading").classList.add("hide");
  }, 500);
}
