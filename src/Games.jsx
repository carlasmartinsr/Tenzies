import React from "react";

export default function Games(props) {
  const sortedGames =
    props.games.sort((a, b) => a.countRoll - b.countRoll) || props.games[0];
  const gamesFiltered =
    sortedGames.length <= 2
      ? sortedGames
      : sortedGames.filter((_, index) => index <= 1);

  const games = gamesFiltered.map((game) => (
    <div key={game.id} className="record-result">
      <p>Rolls:</p>
      <p>{game.countRoll === 0 ? "0" : game.countRoll}</p>
      <p>Timer:</p>
      <p>
        {game.timer.seconds === 0
          ? "0"
          : `${
              game.timer.minutes < 10
                ? "0" + game.timer.minutes
                : game.timer.minutes
            }:${
              game.timer.seconds < 10
                ? "0" + game.timer.seconds
                : game.timer.seconds
            }`}
      </p>
    </div>
  ));

  function displayGames() {
    if (games.length == 0) return <p>No records available</p>;
    else {
      return (
        <div>
          <p className="record-title">Min Rolls Last 2</p>
          <div className="record-content">{games}</div>
        </div>
      );
    }
  }
  return <div className="record-container">{displayGames()}</div>;
}
