import React from "react";
import Square from "./Square";

class Board extends React.Component {
  createSquare = index => {
    return (
      <Square
        key={index}
        index={index}
        changeSituation={this.props.changeSituation}
        mark_in_square={this.props.current_situation[index]}
      />
    );
  };
  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.createSquare(0)}
          {this.createSquare(1)}
          {this.createSquare(2)}
        </div>
        <div className="board-row">
          {this.createSquare(3)}
          {this.createSquare(4)}
          {this.createSquare(5)}
        </div>
        <div className="board-row">
          {this.createSquare(6)}
          {this.createSquare(7)}
          {this.createSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
