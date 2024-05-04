import React from "react";
import "./SortingVisualizer.css";

export default class Sortingvisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randomInt(10, 650));
    }
    this.setState({ array });
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="control-bar">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
        </div>
        <div className="column-container">
          {array.map((value, index) => (
            <div
              className="column"
              key={index}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </>
    );
  }
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
