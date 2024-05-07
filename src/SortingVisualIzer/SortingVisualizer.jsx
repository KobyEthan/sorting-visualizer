import React from "react";
import {
  mergeSort,
  quickSort,
  heapSort,
  bubbleSort,
} from "./sortingAlgorithms";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 20;
const NUMBER_OF_ARRAY_COLS = 100;
export default class SortingVisualizer extends React.Component {
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
    for (let i = 0; i < NUMBER_OF_ARRAY_COLS; i++) {
      array.push(randomInt(5, 550));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = mergeSort(this.state.array);
    this.animateMerge(animations);
  }

  animateMerge(animations) {
    for (let i = 0; i < animations.length; i++) {
      const columns = document.getElementsByClassName("column");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [col1Idx, col2Idx] = animations[i];

        const col1Style = columns[col1Idx].style;
        const col2Style = columns[col2Idx].style;
        const color = i % 3 === 0 ? "blue" : "rgb(219, 134, 44)";
        setTimeout(() => {
          col1Style.backgroundColor = color;
          col2Style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [col1Idx, newHeight] = animations[i];
          const col1Style = columns[col1Idx].style;
          col1Style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const [animations, sortedArray] = quickSort(this.state.array);
    this.animateQuick(animations, () => {
      this.setState({ array: sortedArray });
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
          col1Style.backgroundColor = "blue";
          col2Style.backgroundColor = "blue";
        }, i * ANIMATION_SPEED_MS);
      } else if (type === "swap") {
        setTimeout(() => {
          const tempHeight = col1Style.height;
          col1Style.height = col2Style.height;
          col2Style.height = tempHeight;
        }, i * ANIMATION_SPEED_MS);
      }

      setTimeout(() => {
        col1Style.backgroundColor = "";
        col2Style.backgroundColor = "";
      }, (i + 1) * ANIMATION_SPEED_MS);
      if (i === animations.length - 1) {
        setTimeout(callback, (i + 1) * ANIMATION_SPEED_MS);
      }
    });
  }

  heapSort() {
    const copyArray = [...this.state.array];
    const animations = heapSort(copyArray);
    this.animateHeap(animations);
  }

  animateHeap(animations) {
    const columns = document.getElementsByClassName("column");

    for (let i = 0; i < animations.length; i++) {
      const [col1Idx, col2Idx] = animations[i];
      const col1Style = columns[col1Idx].style;
      const col2Style = columns[col2Idx].style;

      setTimeout(() => {
        col1Style.backgroundColor = "blue";
        col2Style.backgroundColor = "blue";
      }, i * ANIMATION_SPEED_MS);

      setTimeout(() => {
        const tempHeight = col1Style.height;
        col1Style.height = col2Style.height;
        col2Style.height = tempHeight;

        col1Style.backgroundColor = "";
        col2Style.backgroundColor = "";
      }, (i + 1) * ANIMATION_SPEED_MS);
    }
  }

  bubbleSort() {
    const copy = [...this.state.array];
    const swaps = bubbleSort(copy);
    this.animateBubble(swaps);
  }

  animateBubble(swaps) {
    if (swaps.length === 0) return;

    const animations = [...swaps];
    const columns = document.getElementsByClassName("column");

    for (let i = 0; i < animations.length; i++) {
      const [col1Idx, col2Idx, col1Height, col2Height] = animations[i];

      setTimeout(() => {
        columns[col1Idx].style.backgroundColor = "blue";
      }, i * ANIMATION_SPEED_MS);

      setTimeout(() => {
        columns[col1Idx].style.backgroundColor = "";
        columns[col2Idx].style.backgroundColor = "";
      }, (i + 1) * ANIMATION_SPEED_MS);

      setTimeout(() => {
        columns[col1Idx].style.height = `${col2Height}px`;
        columns[col2Idx].style.height = `${col1Height}px`;

        const newArray = [...this.state.array];
        [newArray[col1Idx], newArray[col2Idx]] = [
          newArray[col2Idx],
          newArray[col1Idx],
        ];
        this.setState({ array: newArray });
      }, (i + 1) * ANIMATION_SPEED_MS);
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
    const { array } = this.state;

    return (
      <>
        <div className="control-bar">
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
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
        <h1 className="heading">Reload Page to Initialize Array</h1>
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
