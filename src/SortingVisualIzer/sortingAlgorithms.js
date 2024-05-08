function isSorted(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }
  return true;
}

export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const copyArray = array.slice();
  if (isSorted(copyArray)) return animations;
  mergeSortHelper(array, 0, array.length - 1, copyArray, animations);

  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, copyArray, animations) {
  if (startIdx === endIdx) return;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(copyArray, startIdx, midIdx, mainArray, animations);
  mergeSortHelper(copyArray, midIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, midIdx, endIdx, copyArray, animations);
}

function merge(mainArray, startIdx, midIdx, endIdx, copyArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = midIdx + 1;

  while (i <= midIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (copyArray[i] <= copyArray[j]) {
      animations.push([k, copyArray[i]]);
      mainArray[k++] = copyArray[i++];
    } else {
      animations.push([k, copyArray[j]]);
      mainArray[k++] = copyArray[j++];
    }
  }

  while (i <= midIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, copyArray[i]]);
    mainArray[k++] = copyArray[i++];
  }

  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, copyArray[j]]);
    mainArray[k++] = copyArray[j++];
  }
}

export function quickSort(array) {
  const animations = [];
  const copyArray = array.slice();
  if (isSorted(copyArray)) return [animations, copyArray];
  quickSortHelper(copyArray, 0, copyArray.length - 1, animations);
  return [animations, copyArray];
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIdx = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push([j, high, "compare"]);
    if (array[j] <= pivot) {
      i++;
      animations.push([i, j, "swap"]);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  animations.push([i + 1, high, "swap"]);
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}

export function heapSort(array) {
  const animations = [];
  if (isSorted(array)) return animations;
  buildMaxHeap(array, animations);
  for (let end = array.length - 1; end > 0; end--) {
    animations.push([0, end]);
    swap(array, 0, end);
    heapify(array, 0, end - 1, animations);
  }

  return animations;
}

function buildMaxHeap(array, animations) {
  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, i, n - 1, animations);
  }
}

function heapify(array, idx, maxIdx, animations) {
  let largest = idx;
  const left = 2 * idx + 1;
  const right = 2 * idx + 2;

  if (left <= maxIdx && array[left] > array[largest]) {
    largest = left;
  }
  if (right <= maxIdx && array[right] > array[largest]) {
    largest = right;
  }
  if (largest !== idx) {
    animations.push([idx, largest]);
    swap(array, idx, largest);
    heapify(array, largest, maxIdx, animations);
  }
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function bubbleSort(array) {
  const swaps = [];
  let n = array.length;
  do {
    var swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (array[i] > array[i + 1]) {
        swaps.push([i, i + 1, array[i], array[i + 1]]);
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
  } while (swapped);

  if (!swaps) return array;

  return swaps;
}
