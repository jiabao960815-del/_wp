let orders = [];
let nextId = 1;

export function addOrder(order) {
  const newOrder = { ...order, id: nextId++, createdAt: new Date().toISOString() };
  orders.unshift(newOrder);
  return newOrder;
}

export function getOrders() {
  return [...orders];
}
