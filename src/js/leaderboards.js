if (window.location.pathname === "/leaderboards.html") {
  console.log("Leaderboards");

  const leaderboards = JSON.parse(localStorage.getItem("leaderboards")) || []
  console.log(leaderboards);
}
