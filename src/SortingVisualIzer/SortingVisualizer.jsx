import React from "react";
import {
  mergeSort,
  quickSort,
  heapSort,
  bubbleSort,
} from "./sortingAlgorithms";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 20;
const NUMBER_OF_ARRAY_BARS = 100;
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isSorting: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomInt(10, 600));
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
        const [bar1Idx, bar2Idx] = animations[i];

        const bar1Style = columns[bar1Idx].style;
        const bar2Style = columns[bar2Idx].style;
        const color = i % 3 === 0 ? "blue" : "rgb(219, 134, 44)";
        setTimeout(() => {
          bar1Style.backgroundColor = color;
          bar2Style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [bar1Idx, newHeight] = animations[i];
          const bar1Style = columns[bar1Idx].style;
          bar1Style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = quickSort(this.state.array);
    this.animateQuick(animations);
  }

  animateQuick(animations) {
    const columns = document.getElementsByClassName("column");

    animations.forEach((animation, i) => {
      const [idx1, idx2, type] = animation;
      const bar1Style = columns[idx1].style;
      const bar2Style = columns[idx2].style;
      if (type === "compare") {
        setTimeout(() => {
          bar1Style.backgroundColor = "blue";
          bar2Style.backgroundColor = "blue";
        }, i * ANIMATION_SPEED_MS);
      } else if (type === "swap") {
        setTimeout(() => {
          const tempHeight = bar1Style.height;
          bar1Style.height = bar2Style.height;
          bar2Style.height = tempHeight;
        }, i * ANIMATION_SPEED_MS);
      }

      setTimeout(() => {
        bar1Style.backgroundColor = "";
        bar2Style.backgroundColor = "";
      }, (i + 1) * ANIMATION_SPEED_MS);
    });
  }

  heapSort() {
    this.setState({ isSorting: true });
    const copyArray = [...this.state.array];
    const animations = heapSort(copyArray);
    this.animateHeap(animations);
    this.setState({ isSorting: false });
  }

  animateHeap(animations) {
    const arrayBars = document.getElementsByClassName("column");

    for (let i = 0; i < animations.length; i++) {
      const [bar1Idx, bar2Idx] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;

      setTimeout(() => {
        bar1Style.backgroundColor = "blue";
        bar2Style.backgroundColor = "blue";
      }, i * ANIMATION_SPEED_MS);

      setTimeout(() => {
        const tempHeight = bar1Style.height;
        bar1Style.height = bar2Style.height;
        bar2Style.height = tempHeight;

        bar1Style.backgroundColor = "";
        bar2Style.backgroundColor = "";
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

    const finalPositions = new Array(columns.length).fill(false);

    for (let i = 0; i < animations.length; i++) {
      const [bar1Idx, bar2Idx, bar1Height, bar2Height] = animations[i];

      setTimeout(() => {
        columns[bar1Idx].style.backgroundColor = "blue";
      }, i * ANIMATION_SPEED_MS);

      setTimeout(() => {
        columns[bar1Idx].style.backgroundColor = "";
        columns[bar2Idx].style.backgroundColor = "";

        if (finalPositions[bar1Idx]) {
          columns[bar1Idx].style.backgroundColor = "red";
        }
        if (finalPositions[bar2Idx]) {
          columns[bar2Idx].style.backgroundColor = "red";
        }
      }, (i + 1) * ANIMATION_SPEED_MS);

      setTimeout(() => {
        columns[bar1Idx].style.height = `${bar2Height}px`;
        columns[bar2Idx].style.height = `${bar1Height}px`;

        const newArray = [...this.state.array];
        [newArray[bar1Idx], newArray[bar2Idx]] = [
          newArray[bar2Idx],
          newArray[bar1Idx],
        ];
        this.setState({ array: newArray });

        if (i === animations.length - 1) {
          finalPositions[bar1Idx] = true;
          finalPositions[bar2Idx] = true;
        }
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
