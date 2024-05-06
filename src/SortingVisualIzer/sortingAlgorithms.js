export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, midIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, midIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, midIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  midIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = midIdx + 1;

  while (i <= midIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= midIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function quickSort(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const copyArray = [...array];
  quickSortHelper(copyArray, 0, copyArray.length - 1, animations);
  return animations;
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

  // Build max heap
  buildMaxHeap(array, animations);

  // Extract elements from heap
  for (let end = array.length - 1; end > 0; end--) {
    // Swap root (largest element) with end of the heap
    animations.push([0, end]);
    swap(array, 0, end);

    // Heapify root element
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

  // Compare with left child
  if (left <= maxIdx && array[left] > array[largest]) {
    largest = left;
  }

  // Compare with right child
  if (right <= maxIdx && array[right] > array[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== idx) {
    animations.push([idx, largest]);
    swap(array, idx, largest);

    // Recursively heapify the affected subtree
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
    n--;
  } while (swapped);

  return swaps;
}
