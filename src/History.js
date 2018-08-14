import React from "react";

class History extends React.Component {
  handleOnClick = () => {
    this.props.rewindHistory(this.props.history, this.props.index);
  };
  render() {
    return (
      <button className="history" onClick={this.handleOnClick}>
        Turn {this.props.index}
      </button>
    );
  }
}

export default History;
