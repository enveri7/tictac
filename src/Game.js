import React from "react";
import Board from "./Board";

class Game extends React.Component {
  state = {
    situation_in_game: [null, null, null, null, null, null, null, null, null],
    IsItXTurn: true,
    winner: null
  };

  calculateWinner = situation => {
    const winning_lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 5],
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
    let situation = this.state.situation_in_game.slice();
    if (situation[index] === null && this.state.winner === null) {
      situation[index] = this.state.IsItXTurn ? "X" : "O";
      this.calculateWinner(situation);
      this.setState({ situation_in_game: situation });
      this.setState({ IsItXTurn: !this.state.IsItXTurn });
    }
  };

  render() {
    return (
      <div className="game">
        <h1>
          {this.state.winner === null
            ? `Whose turn?: ${this.state.IsItXTurn ? "X" : "O"}`
            : `Winner: ${this.state.winner}`}
        </h1>
        <Board
          changeSituation={this.changeSituation}
          current_situation={this.state.situation_in_game}
        />
      </div>
    );
  }
}

export default Game;
