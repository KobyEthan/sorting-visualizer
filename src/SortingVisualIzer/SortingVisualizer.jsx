import React from "react";
import {
  mergeSort,
  quickSort,
  heapSort,
  bubbleSort,
} from "./sortingAlgorithms";
import "./SortingVisualizer.css";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      numCols: 100,
      animationSpeed: 15,
      isSorting: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numCols; i++) {
      array.push(randomInt(5, 600));
    }
    this.setState({ array });
  }

  handleSliderChange = (event) => {
    if (this.state.isSorting) return;
    const numCols = event.target.value;
    const animationSpeed = 1500 / numCols;
    this.setState({ numCols, animationSpeed }, this.resetArray);
  };

  disableButtons() {
    this.setState({ isSorting: true });
  }

  enableButtons() {
    this.setState({ isSorting: false });
  }

  mergeSort() {
    this.disableButtons();
    const copyArray = [...this.state.array];
    const animations = mergeSort(copyArray);

    this.animateMerge(animations, () => {
      this.setState({ array: copyArray });
      this.enableButtons();
    });
  }

  animateMerge(animations, callback) {
    const columns = document.getElementsByClassName("column");

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [col1Idx, col2Idx] = animations[i];

        const col1Style = columns[col1Idx].style;
        const col2Style = columns[col2Idx].style;
        const color = i % 3 === 0 ? "red" : "rgb(14, 175, 255)";
        setTimeout(() => {
          col1Style.backgroundColor = color;
          col2Style.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          const [col1Idx, newHeight] = animations[i];
          const col1Style = columns[col1Idx].style;
          col1Style.height = `${newHeight}px`;
          if (i === animations.length - 1 && callback) {
            setTimeout(callback, this.state.animationSpeed);
          }
        }, (i + 1) * this.state.animationSpeed);
      }
    }
  }

  quickSort() {
    this.disableButtons();
    const [animations, sortedArray] = quickSort(this.state.array);
    this.animateQuick(animations, () => {
      this.setState({ array: sortedArray });
      this.enableButtons();
    });
  }

  animateQuick(animations, callback) {
    const columns = document.getElementsByClassName("column");

    animations.forEach((animation, i) => {
      const [idx1, idx2, type] = animation;
      const col1Style = columns[idx1].style;
      const col2Style = columns[idx2].style;
      if (type === "compare") {
        setTimeout(() => {
          col1Style.backgroundColor = "red";
          col2Style.backgroundColor = "red";
        }, i * this.state.animationSpeed);
      } else if (type === "swap") {
        setTimeout(() => {
          const tempHeight = col1Style.height;
          col1Style.height = col2Style.height;
          col2Style.height = tempHeight;
        }, i * this.state.animationSpeed);
      }

      setTimeout(() => {
        col1Style.backgroundColor = "";
        col2Style.backgroundColor = "";
      }, (i + 1) * this.state.animationSpeed);
      if (i === animations.length - 1) {
        setTimeout(callback, (i + 1) * this.state.animationSpeed);
      }
    });
  }

  heapSort() {
    this.disableButtons();
    const copyArray = [...this.state.array];
    const animations = heapSort(copyArray);

    this.animateHeap(animations, () => {
      this.setState({ array: copyArray });
      this.enableButtons();
    });
  }

  animateHeap(animations, callback) {
    const columns = document.getElementsByClassName("column");

    for (let i = 0; i < animations.length; i++) {
      const [col1Idx, col2Idx] = animations[i];
      const col1Style = columns[col1Idx].style;
      const col2Style = columns[col2Idx].style;

      setTimeout(() => {
        col1Style.backgroundColor = "red";
        col2Style.backgroundColor = "red";
      }, i * this.state.animationSpeed);

      setTimeout(() => {
        const tempHeight = col1Style.height;
        col1Style.height = col2Style.height;
        col2Style.height = tempHeight;

        col1Style.backgroundColor = "";
        col2Style.backgroundColor = "";

        if (i === animations.length - 1 && callback) {
          setTimeout(callback, this.state.animationSpeed);
        }
      }, (i + 1) * this.state.animationSpeed);
    }
  }

  bubbleSort() {
    this.disableButtons();
    const copy = [...this.state.array];
    const swaps = bubbleSort(copy);
    this.animateBubble(swaps, this.enableButtons.bind(this));
  }

  animateBubble(swaps, callback) {
    if (swaps.length === 0) {
      callback();
      return;
    }

    const animations = [...swaps];
    const columns = document.getElementsByClassName("column");

    for (let i = 0; i < animations.length; i++) {
      const [col1Idx, col2Idx, col1Height, col2Height] = animations[i];

      setTimeout(() => {
        columns[col1Idx].style.backgroundColor = "red";
      }, i * this.state.animationSpeed);

      setTimeout(() => {
        columns[col1Idx].style.backgroundColor = "";
        columns[col2Idx].style.backgroundColor = "";
      }, (i + 1) * this.state.animationSpeed);

      setTimeout(() => {
        columns[col1Idx].style.height = `${col2Height}px`;
        columns[col2Idx].style.height = `${col1Height}px`;

        const newArray = [...this.state.array];
        [newArray[col1Idx], newArray[col2Idx]] = [
          newArray[col2Idx],
          newArray[col1Idx],
        ];
        this.setState({ array: newArray });
        if (i === animations.length - 1) callback();
      }, (i + 1) * this.state.animationSpeed);
    }
  }

  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomInt(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomInt(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     // Change to test diffrent sorting algorithms
  //     const mergeSortedArray = bubbleSort(array.slice());
  //     console.log(areArraysEqual(javaScriptSortedArray, mergeSortedArray));
  //   }
  // }

  render() {
    const { array, numCols, animationSpeed, isSorting } = this.state;

    return (
      <>
        <div className="control-bar">
          <span
            id="heading"
            onClick={() => !isSorting && this.resetArray()}
            style={{ pointerEvents: isSorting ? "none" : "auto" }}
          >
            Initialize Array
          </span>
          <div id="slider">
            <label>Change Array Size & Sorting Speed</label>
            <input
              type="range"
              min="10"
              max="100"
              value={numCols}
              onChange={this.handleSliderChange}
              disabled={isSorting}
            />
            <p id="details">
              {numCols} columns, {Math.floor(animationSpeed)} ms speed
            </p>
          </div>
          <div className="algo-button-container">
            <p
              onClick={() => !isSorting && this.mergeSort()}
              style={{ pointerEvents: isSorting ? "none" : "auto" }}
            >
              Merge Sort
            </p>
            <p
              onClick={() => !isSorting && this.quickSort()}
              style={{ pointerEvents: isSorting ? "none" : "auto" }}
            >
              Quick Sort
            </p>
            <p
              onClick={() => !isSorting && this.heapSort()}
              style={{ pointerEvents: isSorting ? "none" : "auto" }}
            >
              Heap Sort
            </p>
            <p
              onClick={() => !isSorting && this.bubbleSort()}
              style={{ pointerEvents: isSorting ? "none" : "auto" }}
            >
              Bubble Sort
            </p>
          </div>
          {/* <button onClick={() => this.testSortingAlgorithms()}>
            Test Algorithm
          </button> */}
        </div>
        <div className="column-container">
          {array.map((value, idx) => (
            <div
              className="column"
              key={idx}
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

// function areArraysEqual(array1, array2) {
//   if (array1.length !== array2.length) return false;
//   for (let i = 0; i < array1.length; i++) {
//     if (array1[i] !== array2[i]) return false;
//   }
//   return true;
// }
