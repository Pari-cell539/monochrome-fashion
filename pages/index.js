import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { ShoppingBag, Menu, Store, X, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- THE STORE ---
const useStore = create((set) => ({
  cart: [],
  view: 'home',
  selectedProduct: null,
  setView: (view) => set({ view }),
  setProduct: (product) => set({ selectedProduct: product, view: 'product' }),
  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, { ...item, cartId: Math.random() }] 
  })),
  removeFromCart: (cartId) => set((state) => ({
    cart: state.cart.filter((i) => i.cartId !== cartId)
  })),
}));

// --- MOCK DATA ---
const PRODUCTS = [
  { id: 1, name: 'Architect Overcoat', price: 1450, img: 'https://images.unsplash.com/photo-1539533330585-643c7da60c75?q=80&w=800' },
  { id: 2, name: 'Raw Wool Jumper', price: 495, img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800' },
  { id: 3, name: 'Sculptural Trouser', price: 275, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800' }
];

export default function MonochromeApp() {
  const { view, setView, cart, selectedProduct, setProduct, addToCart, removeFromCart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true) }, []);
  if (!mounted) return null;

  return (
    <div className="bg-[#f9f9f7] min-h-screen text-black font-sans">
      <nav className="sticky top-0 z-50 bg-[#f9f9f7]/80 backdrop-blur-md border-b border-black/5 px-6 h-16 flex justify-between items-center">
        <Menu size={20} />
        <h1 className="font-serif text-2xl tracking-widest cursor-pointer" onClick={() => setView('home')}>MONOCHROME</h1>
        <div className="relative cursor-pointer" onClick={() => setView('bag')}>
          <ShoppingBag size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>
          )}
        </div>
      </nav>

      <main className="pb-32">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.section key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="relative h-[60vh] bg-neutral-200">
                <img src={PRODUCTS[0].img} className="w-full h-full object-cover grayscale brightness-75" alt="hero" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h2 className="text-5xl mb-6">The Art of Stillness</h2>
                </div>
              </div>
              <div className="p-8 grid grid-cols-2 gap-4">
                {PRODUCTS.map(p => (
                  <div key={p.id} className="cursor-pointer" onClick={() => setProduct(p)}>
                    <div className="aspect-[3/4] bg-neutral-200 overflow-hidden mb-3">
                      <img src={p.img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={p.name} />
                    </div>
                    <p className="text-[10px] uppercase">{p.name}</p>
                    <p className="text-sm text-neutral-500">${p.price}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {view === 'product' && selectedProduct && (
            <motion.section key="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
              <img src={selectedProduct.img} className="w-full aspect-[3/4] object-cover grayscale mb-8" alt={selectedProduct.name} />
              <h2 className="text-4xl mb-4">{selectedProduct.name}</h2>
              <p className="text-xl mb-8">${selectedProduct.price}.00</p>
              <button onClick={() => { addToCart(selectedProduct); setView('bag'); }} className="w-full bg-black text-white py-4">ADD TO BAG</button>
            </motion.section>
          )}

          {view === 'bag' && (
            <motion.section key="bag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
              <h2 className="text-3xl mb-8">Your Selection</h2>
              {cart.map((item) => (
                <div key={item.cartId} className="flex gap-6 border-b pb-6 mb-6">
                  <img src={item.img} className="w-20 h-24 object-cover grayscale" alt={item.name} />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3>{item.name}</h3>
                      <X size={16} onClick={() => removeFromCart(item.cartId)} />
                    </div>
                    <p className="text-sm">${item.price}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-2xl mt-8">
                <span>Total</span>
                <span>${cart.reduce((sum, item) => sum + item.price, 0)}.00</span>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t h-20 flex justify-around items-center">
        <Store size={20} onClick={() => setView('home')} />
        <Search size={20} />
        <ShoppingBag size={20} onClick={() => setView('bag')} />
        <User size={20} />
      </nav>
    </div>
  );
}
