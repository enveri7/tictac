import React from "react";

class Square extends React.Component {
  handleOnClick = e => {
    this.props.changeSituation(this.props.index);
  };
  render() {
    return (
      <button className="square" onClick={this.handleOnClick}>
        {this.props.mark_in_square}
      </button>
    );
  }
}

export default Square;
