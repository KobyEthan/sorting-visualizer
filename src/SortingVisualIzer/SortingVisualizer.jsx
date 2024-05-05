import React from "react";
import { getMergeSortAnimations } from "./sortingAlgorithms";
import "./SortingVisualizer.css";

const ANIMATIONS_SPEED_MS = 100;
const NUMBER_OF_ARRAY_BARS = 100;

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
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomInt(10, 600));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const columns = document.getElementsByClassName("column");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [bar1Idx, bar2Idx] = animations[i];
        const bar1Style = columns[bar1Idx].style;
        const bar2Style = columns[bar2Idx].style;
        const color = i % 3 === 0 ? "blue" : "orange";
        setTimeout(() => {
          bar1Style.backgroundColor = color;
          bar2Style.backgroundColor = color;
        }, i * ANIMATIONS_SPEED_MS);
      } else {
        setTimeout(() => {
          const [bar1Idx, newHeight] = animations[i];
          const bar1Style = columns[bar1Idx].style;
          bar1Style.height = `${newHeight}px`;
        }, i * ANIMATIONS_SPEED_MS);
      }
    }
  }

  quickSort() {}

  heapSort() {}

  bubbleSort() {}

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomInt(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomInt(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(areArraysEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="control-bar">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.testSortingAlgorithms()}>
            Test Algorithm
          </button>
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

function areArraysEqual(array1, array2) {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}
