function mathTool(num1, num2, action) {
  return action(num1, num2);
}

const result1 = mathTool(10, 5, function (a, b) {
  return a + b;
});
const result2 = mathTool(10, 5, function (a, b) {
  return a - b;
});

console.log(result1, result2);
