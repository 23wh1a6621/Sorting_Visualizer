let array = [];
let delay = 300;

const container = document.getElementById("arrayContainer");
const celebration = document.getElementById("celebration");
const algoName = document.getElementById("algoName");


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function renderArray(color = "#90cdf4") {
    container.innerHTML = "";
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value * 3 + "px";
        bar.style.background = color;
        bar.textContent = value;
        container.appendChild(bar);
    });
}

function generateRandom() {
    celebration.style.display = "none";
    algoName.textContent = "Algorithm: None";
    array = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    renderArray();
}

function useCustomArray() {
    celebration.style.display = "none";
    algoName.textContent = "Algorithm: None";

    let input = document.getElementById("arrayInput").value.trim();

    if (input === "") {
        alert("Please enter array elements!");
        return;
    }

    array = input.split(",").map(Number).filter(n => !isNaN(n));

    if (array.length === 0) {
        alert("Enter valid numeric values separated by commas!");
        return;
    }

    renderArray();
}

function finishSort() {
    document.querySelectorAll(".bar").forEach(bar => {
        bar.style.background = "#48bb78"; 
    });
    celebration.style.display = "block";
}

async function bubbleSort() {
    if (array.length === 0) return alert("Generate or enter array first!");
    algoName.textContent = "Algorithm: Bubble Sort";

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray("#f6ad55");
                await sleep(delay);
            }
        }
    }
    finishSort();
}

async function selectionSort() {
    if (array.length === 0) return alert("Generate or enter array first!");
    algoName.textContent = "Algorithm: Selection Sort";

    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) min = j;
        }
        [array[i], array[min]] = [array[min], array[i]];
        renderArray("#9f7aea");
        await sleep(delay);
    }
    finishSort();
}

async function insertionSort() {
    if (array.length === 0) return alert("Generate or enter array first!");
    algoName.textContent = "Algorithm: Insertion Sort";

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            renderArray("#38a169");
            await sleep(delay);
        }
        array[j + 1] = key;
    }
    finishSort();
}

async function mergeSortStart() {
    if (array.length === 0) return alert("Generate or enter array first!");
    algoName.textContent = "Algorithm: Merge Sort";
    await mergeSort(0, array.length - 1);
    finishSort();
}

async function mergeSort(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
}

async function merge(l, m, r) {
    let left = array.slice(l, m + 1);
    let right = array.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
        array[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        renderArray("#d53f8c");
        await sleep(delay);
    }

    while (i < left.length) array[k++] = left[i++];
    while (j < right.length) array[k++] = right[j++];
}


async function quickSortStart() {
    if (array.length === 0) return alert("Generate or enter array first!");
    algoName.textContent = "Algorithm: Quick Sort";
    await quickSort(0, array.length - 1);
    finishSort();
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            renderArray("#dd6b20");
            await sleep(delay);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
}
