'use client';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div
        className="h-48 flex items-center justify-center text-6xl relative overflow-hidden"
        style={{ backgroundColor: product.color + '15' }}
      >
        <span className="transition-transform duration-300 group-hover:scale-110">
          {product.emoji}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-zinc-900">{product.name}</h3>
        <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-5">
          <span className="text-xl font-bold text-zinc-900">
            NT${product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-700 active:scale-95 transition-all duration-150"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}
