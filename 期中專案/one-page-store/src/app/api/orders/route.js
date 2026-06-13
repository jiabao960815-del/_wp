import { addOrder, getOrders } from '@/data/store';

export async function GET() {
  return Response.json(getOrders());
}

export async function POST(request) {
  const body = await request.json();
  const order = addOrder(body);
  return Response.json(order, { status: 201 });
}
