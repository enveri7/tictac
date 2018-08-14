import React from "react";
import Board from "./Board";

class Game extends React.Component {
  state = {
    situation_in_game: [null, null, null, null, null, null, null, null, null],
    IsItXTurn: true
  };

  changeSituation = index => {
    let situation = this.state.situation_in_game.slice();
    situation[index] = this.state.IsItXTurn ? "X" : "O";
    this.setState({ situation_in_game: situation });
    this.setState({ IsItXTurn: !this.state.IsItXTurn });
  };

  render() {
    return (
      <div className="game">
        <h1>Whose turn?: {this.state.IsItXTurn ? "X" : "O"}</h1>
        <Board
          changeSituation={this.changeSituation}
          current_situation={this.state.situation_in_game}
        />
      </div>
    );
  }
}

export default Game;
