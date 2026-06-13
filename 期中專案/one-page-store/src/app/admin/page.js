'use client';

import { useState, useEffect, useCallback } from 'react';

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-5 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900">📋 訂單管理</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="text-sm text-zinc-500 hover:text-zinc-700 disabled:opacity-50 transition-colors"
            >
              {loading ? '載入中...' : '重新整理'}
            </button>
            <a
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
            >
              ← 回商店
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-8">
        {loading ? (
          <div className="text-center text-zinc-400 py-20">載入中...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-zinc-400">目前尚無訂單</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-zinc-400">
              共 {orders.length} 筆訂單
            </p>
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-zinc-900">
                    訂單 #{order.id}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {new Date(order.createdAt).toLocaleString('zh-TW')}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-zinc-400 text-xs">姓名</span>
                    <p className="text-zinc-900">{order.name}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-xs">Email</span>
                    <p className="text-zinc-900">{order.email}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-xs">電話</span>
                    <p className="text-zinc-900">{order.phone}</p>
                  </div>
                </div>
                <div className="border-t border-zinc-100 pt-3 space-y-1">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm text-zinc-600"
                    >
                      <span>
                        {item.name} &times; {item.quantity}
                      </span>
                      <span className="text-zinc-900 font-medium">
                        NT${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
