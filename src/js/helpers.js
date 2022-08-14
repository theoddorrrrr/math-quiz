export const inputValidate = (input, err) => {
    if (input.value.trim() === "") {
      err.classList.add("_visible");
      return false;
    } else {
      err.classList.remove("_visible");
      return true;
    }
  };

export const leaderboardsItem = (user) => {
  return (`
    <li>
      <div class="leaderboards__item">
        <p class="leaderboards__name">${user.username}</p>
        <p class="leaderboards__score">${user.score}</p>
      </div>
    </li>
  `)
}

//Game Actions
export const animationPlus = (scoreBody) => {
  const incrementNumber = document.createElement("div");
  incrementNumber.innerText = "+1";
  incrementNumber.className = "numbers-anim-plus";
  scoreBody.append(incrementNumber);
  incrementNumber.addEventListener("animationend", () => {
    incrementNumber.remove();
  });
};

export const animationMinus = (scoreBody) => {
  const incrementNumber = document.createElement("div");
  incrementNumber.innerText = "-1";
  incrementNumber.className = "numbers-anim-minus";
  scoreBody.append(incrementNumber);
  incrementNumber.addEventListener("animationend", () => {
    incrementNumber.remove();
  });
};

export const randomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export const isDivisible = (num1, num2) => {
  if (num1 % num2 == 0) {
    return true;
  } else {
    return false;
  }
};



