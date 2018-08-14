import React from "react";
import Board from "./Board";
import History from "./History";

class Game extends React.Component {
  state = {
    situation_in_game: [null, null, null, null, null, null, null, null, null],
    IsItXTurn: true,
    winner: null,
    turns_played: 0,
    history: {}
  };

  calculateWinner = situation => {
    const winning_lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const Xindexes = [],
      Oindexes = [];

    for (let i = 0; i < situation.length; i++) {
      if (situation[i] === "X") {
        Xindexes.push(i);
      }
      if (situation[i] === "O") {
        Oindexes.push(i);
      }
    }

    winning_lines.forEach(line => {
      if (
        Xindexes.includes(line[0]) &&
        Xindexes.includes(line[1]) &&
        Xindexes.includes(line[2])
      ) {
        this.setState({ winner: "X" });
      }

      if (
        Oindexes.includes(line[0]) &&
        Oindexes.includes(line[1]) &&
        Oindexes.includes(line[2])
      ) {
        this.setState({ winner: "O" });
      }
    });
  };

  changeSituation = index => {
    const situation = this.state.situation_in_game.slice();

    if (situation[index] === null && this.state.winner === null) {
      Object.keys(this.state.history).forEach(key => {
        if (key > this.state.turns_played) {
          delete this.state.history[key];
        }
      });

      const { history, turns_played, IsItXTurn } = { ...this.state };
      history[turns_played + 1] = {
        situation: situation,
        IsItXTurn: IsItXTurn
      };

      situation[index] = this.state.IsItXTurn ? "X" : "O";
      this.setState({
        situation_in_game: situation,
        IsItXTurn: !this.state.IsItXTurn,
        turns_played: this.state.turns_played + 1,
        history: history
      });
      this.calculateWinner(situation);
    }
  };

  playAgain = () => {
    this.setState({
      situation_in_game: [null, null, null, null, null, null, null, null, null],
      IsItXTurn: true,
      winner: null,
      turns_played: 0,
      history: []
    });
  };

  rewindHistory = (history, turns) => {
    this.setState(
      {
        situation_in_game: history.situation,
        IsItXTurn: !history.IsItXTurn,
        turns_played: parseInt(turns, 10),
        winner: null
      },
      () => {
        this.calculateWinner(this.state.situation_in_game);
      }
    );
  };

  render() {
    let header = `It is ${this.state.IsItXTurn ? "X" : "O"}'s turn.`;
    let playagain = <div />;

    playagain = (
      <button className="play_again" onClick={this.playAgain}>
        Clear board
      </button>
    );

    if (this.state.turns_played === 9) {
      header = "Tie!";
    }
    if (this.state.winner !== null) {
      header = `The winner is ${this.state.winner}!`;
    }
    return (
      <div className="game">
        <h1>{header}</h1>
        <div className="container">
          <div className="row-3">
            <h2>Go back to:</h2>
            {Object.keys(this.state.history).map(key => (
              <History
                key={key}
                index={key}
                history={this.state.history[key]}
                rewindHistory={this.rewindHistory}
              />
            ))}
          </div>
          <div className="row-3">
            <Board
              changeSituation={this.changeSituation}
              current_situation={this.state.situation_in_game}
            />
          </div>
          <div className="row-3">{playagain}</div>
        </div>
      </div>
    );
  }
}

export default Game;
