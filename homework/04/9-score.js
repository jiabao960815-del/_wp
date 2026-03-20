let items = ["Apple", "Banana", "Target", "Grape"];
let i = 0;
let foundIndex = -1;

while (i < items.length) {
    if (items[i] === "Target") {
        foundIndex = i;
        break;
    }
    i++;
}
console.log(`找到目標在索引：${foundIndex}`);