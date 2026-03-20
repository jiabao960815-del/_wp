function calculateStats(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return { sum: sum, average: sum / arr.length };
}

console.log(calculateStats([10, 20, 30, 40, 50]));