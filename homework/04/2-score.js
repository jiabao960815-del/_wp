for (let i = 1; i <= 3; i++) { // 為節省版面，僅示範到 3
    let row = "";
    for (let j = 1; j <= 9; j++) {
        row += `${i}*${j}=${i * j}\t`;
    }
    console.log(row);
}