let listA = [1, 2];
let listB = [3, 4];

function process(a, b) {
  a.push(99);
  b = [100];
}
process(listA, listB);

console.log("listA:", listA);
console.log("listB:", listB);

// 解答：
// listA = [1, 2, 99] 因為 a 指向 listA 的參考，push 修改了原陣列
// listB = [3, 4]     因為 b = [100] 將參數重新賦值為新陣列，不影響外部的 listB
