import React from "react";
import "./App.css";
import Die from "./Die";
import Games from "./Games";
import Scoreboard from "./Scoreboard";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { onSnapshot, addDoc } from "firebase/firestore";
import { gamesCollection } from "./firebase.js";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [countRoll, setCountRoll] = React.useState(0);
  const [timer, setTimer] = React.useState({
    minutes: 0,
    seconds: 0,
  });
  const [active, setActive] = React.useState(true);
  const [games, setGames] = React.useState([]);

  async function addNewGame() {
    const newGame = {
      timer: timer,
      countRoll: countRoll,
      createdAt: Date.now(),
    };
    const newGameRef = await addDoc(gamesCollection, newGame);
  }

  React.useEffect(() => {
    const unsubscribe = onSnapshot(gamesCollection, function (snapshot) {
      console.log("hello..");
      const gamesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGames(gamesArr);
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (active) {
        const elapsed = (Date.now() - start) / 1000;
        const minutes = Math.floor(elapsed / 60);
        const seconds = Math.floor(elapsed % 60);
        setTimer({ minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [active]);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      addNewGame();
      setActive(false);
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setCountRoll((prevCountRoll) => prevCountRoll + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setCountRoll(0);
      setActive(true);
      setTimer({ minutes: 0, seconds: 0 });
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      dots={`dice-${die.value}`}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="content-box">
      {tenzies && <Confetti />}
      <header>
        {<Games games={games} />}
        <Scoreboard
          countRoll={countRoll}
          minutes={timer.minutes}
          seconds={timer.seconds}
        />
      </header>
      <main>
        <h1 className="title">Tenzies🎈</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}
