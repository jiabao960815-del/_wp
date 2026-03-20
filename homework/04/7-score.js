let book = { title: "JS 指南", year: 2024 };

let jsonStr = JSON.stringify(book);
console.log("JSON 字串:", jsonStr);

let parsedObj = JSON.parse(jsonStr);
console.log("還原物件:", parsedObj.title);