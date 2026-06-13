'use client';

import { useState } from 'react';

export default function CartDrawer({
  cart,
  onRemove,
  isOpen,
  onClose,
  onSubmit,
  orderStatus,
  onResetOrder,
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    });
  }

  function handleClose() {
    if (orderStatus === 'success') {
      onResetOrder();
    }
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">
            {orderStatus === 'success' ? '訂單成立' : `購物車 (${cartCount})`}
          </h2>
          <button
            onClick={handleClose}
            className="text-zinc-300 hover:text-zinc-500 text-2xl leading-none transition-colors"
          >
            &times;
          </button>
        </div>

        {orderStatus === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-7xl mb-5">🎉</div>
            <h3 className="text-xl font-bold text-zinc-900">訂單成功送出！</h3>
            <p className="text-zinc-400 mt-2 text-sm">
              我們會盡快處理您的訂單，謝謝！
            </p>
            <button
              onClick={handleClose}
              className="mt-8 bg-zinc-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
            >
              繼續購物
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-7xl mb-5">🛒</div>
            <p className="text-zinc-400">購物車是空的</p>
            <button
              onClick={handleClose}
              className="mt-6 text-sm text-zinc-500 underline hover:text-zinc-700"
            >
              去逛逛
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-zinc-50 rounded-xl p-3"
                >
                  <span className="text-3xl shrink-0">{item.product.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-zinc-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      NT${item.product.price} &times; {item.quantity}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-sm text-zinc-900">
                      NT${item.product.price * item.quantity}
                    </p>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-xs text-red-400 hover:text-red-600 mt-0.5 transition-colors"
                    >
                      移除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 p-5 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-zinc-500">合計</span>
                <span className="text-xl font-bold text-zinc-900">
                  NT${total}
                </span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="收件姓名"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-900 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-900 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="連絡電話"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-zinc-900 transition-colors"
                />
                <button
                  type="submit"
                  disabled={orderStatus === 'submitting'}
                  className="w-full bg-zinc-900 text-white py-3 rounded-xl font-medium hover:bg-zinc-700 disabled:opacity-50 active:scale-[0.98] transition-all duration-150"
                >
                  {orderStatus === 'submitting' ? '送出中...' : '送出訂單'}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
