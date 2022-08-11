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