let cart = [
    { name: "咖啡", price: 120 },
    { name: "蛋糕", price: 80 }
];

let total = 0;
for (let item of cart) {
    total += item.price;
}
console.log(`總金額: $${total}`);