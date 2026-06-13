'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState('idle');

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  async function submitOrder(customerData) {
    setOrderStatus('submitting');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      if (res.ok) {
        setOrderStatus('success');
        setCart([]);
      }
    } catch {
      setOrderStatus('idle');
    }
  }

  function resetOrder() {
    setOrderStatus('idle');
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-zinc-200 z-40">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
              🖥️ 程式人商店
            </h1>
            <p className="text-[11px] text-zinc-400 -mt-0.5">
              程式設計師的一站式購物
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              管理
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-zinc-100 rounded-xl transition-colors"
            >
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900">所有商品</h2>
          <p className="text-zinc-400 text-sm mt-1">
            {products.length} 項商品，為程式設計師量身打造
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-200 py-8 text-center text-zinc-400 text-sm">
        <p>&copy; 2026 程式人商店 &middot; 網頁設計期中專案</p>
      </footer>

      <CartDrawer
        cart={cart}
        onRemove={removeFromCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onSubmit={submitOrder}
        orderStatus={orderStatus}
        onResetOrder={resetOrder}
      />
    </div>
  );
}
