## 習題4

AI 問答 --https://gemini.google.com/share/866ce13a4a79

## 我的測試結果


 ```sh

PS C:\jia\_wp\homework\04> node 10-score.js
正數
負數
這是零

PS C:\jia\_wp\homework\04> node 2-score.js
1*1=1   1*2=2   1*3=3   1*4=4   1*5=5   1*6=6   1*7=7   1*8=8   1*9=9
2*1=2   2*2=4   2*3=6   2*4=8   2*5=10  2*6=12  2*7=14  2*8=16  2*9=18
3*1=3   3*2=6   3*3=9   3*4=12  3*5=15  3*6=18  3*7=21  3*8=24  3*9=27

PS C:\jia\_wp\homework\04> node 3-score.js
倒數：3
倒數：2
倒數：1
倒數：0

PS C:\jia\_wp\homework\04> node 4-score.js
{ sum: 150, average: 30 }

PS C:\jia\_wp\homework\04> node 5-score.js
{ name: 'Gemini', email: 'new@google.com' }

PS C:\jia\_wp\homework\04> node 6-score.js
總金額: $200


PS C:\jia\_wp\homework\04> node 7-score.js
JSON 字串: {"title":"JS 指南","year":2024}
還原物件: JS 指南


PS C:\jia\_wp\homework\04> node 8-score.js
[ 2, 4, 6 ]


PS C:\jia\_wp\homework\04> node 9-score.js
找到目標在索引：2


PS C:\jia\_wp\homework\04> node 10-score.js
小華 平均為 50.0，結果：不及格
```

## 摘要 

沒問題！這裡為你整理了這 10 個練習題的範例程式碼以及執行後的輸出結果。

---

## 1. 基礎數字判斷器
```javascript
function checkNumber(num) {
    if (num > 0) return "正數";
    if (num < 0) return "負數";
    return "這是零";
}

console.log(checkNumber(10));
console.log(checkNumber(-5));
console.log(checkNumber(0));
```
**測試結果：**
> 正數  
> 負數  
> 這是零

---

## 2. 九九乘法表產生器
```javascript
for (let i = 1; i <= 3; i++) { // 為節省版面，僅示範到 3
    let row = "";
    for (let j = 1; j <= 9; j++) {
        row += `${i}*${j}=${i * j}\t`;
    }
    console.log(row);
}
```
**測試結果：**
> 1*1=1   1*2=2   1*3=3 ... 1*9=9  
> 2*1=2   2*2=4   2*3=6 ... 2*9=18  
> 3*1=3   3*2=6   3*3=9 ... 3*9=27

---

## 3. 倒數計時器
```javascript
let count = 3;
while (count >= 0) {
    console.log(`倒數：${count}`);
    count--;
}
```
**測試結果：**
> 倒數：3  
> 倒數：2  
> 倒數：1  
> 倒數：0

---

## 4. 陣列總和與平均計算
```javascript
function calculateStats(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return { sum: sum, average: sum / arr.length };
}

console.log(calculateStats([10, 20, 30, 40, 50]));
```
**測試結果：**
> { sum: 150, average: 30 }

---

## 5. 聯絡人物件管理
```javascript
let user = { name: "Gemini", email: "old@example.com" };

function updateEmail(person, newEmail) {
    person.email = newEmail;
    return person;
}

console.log(updateEmail(user, "new@google.com"));
```
**測試結果：**
> { name: "Gemini", email: "new@google.com" }

---

## 6. 購物車金額加總
```javascript
let cart = [
    { name: "咖啡", price: 120 },
    { name: "蛋糕", price: 80 }
];

let total = 0;
for (let item of cart) {
    total += item.price;
}
console.log(`總金額: $${total}`);
```
**測試結果：**
> 總金額: $200

---

## 7. JSON 資料格式轉換器
```javascript
let book = { title: "JS 指南", year: 2024 };

let jsonStr = JSON.stringify(book);
console.log("JSON 字串:", jsonStr);

let parsedObj = JSON.parse(jsonStr);
console.log("還原物件:", parsedObj.title);
```
**測試結果：**
> JSON 字串: {"title":"JS 指南","year":2024}  
> 還原物件: JS 指南

---

## 8. 數字過濾器
```javascript
function filterEvenNumbers(arr) {
    let evens = [];
    for (let num of arr) {
        if (num % 2 === 0) {
            evens.push(num);
        }
    }
    return evens;
}

console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6]));
```
**測試結果：**
> [2, 4, 6]

---

## 9. 尋找目標物
```javascript
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
```
**測試結果：**
> 找到目標在索引：2

---

## 10. 學生清單搜尋系統 (綜合應用)
```javascript
let studentsData = '[{"name": "小明", "scores": [80, 90, 70]}, {"name": "小華", "scores": [50, 40, 60]}]';
let students = JSON.parse(studentsData);

function checkStudentStatus(searchName) {
    for (let student of students) {
        if (student.name === searchName) {
            let sum = 0;
            for (let s of student.scores) sum += s;
            let avg = sum / student.scores.length;
            let status = avg >= 60 ? "及格" : "不及格";
            return `${student.name} 平均為 ${avg.toFixed(1)}，結果：${status}`;
        }
    }
    return "找不到該學生";
}

console.log(checkStudentStatus("小華"));
```
**測試結果：**
> 小華 平均為 50.0，結果：不及格

---

這些範例幫你把邏輯串接起來了。**需要我解釋其中哪一段程式碼的具體運作原理嗎？**