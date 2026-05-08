import React from 'react';
import { useStore } from '../store/useStore';
import { ShoppingBag, Menu, Search, Heart, User, Store, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const PRODUCTS = [
  { id: 1, name: 'Architect Overcoat', price: 1450, category: 'Outerwear', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNx9E7YYyyc3TExQtEXUM9sSHjGysRXM8tf6qGoUyies0Rf6dKPOWmcY9dajxn8m9SkH7uA1Kb-XRPbOmQLP1pq-t3e6yEH8flcDp0PWmgxcLGgZvf3_-XqScY7dzk_GKjlUdyiewZa7L1ZkWfTtdWveIs-hYTEvv77GuMonlKF9mDoq9cqMNIY85myaXzlxfGLLM6tRc7bBEUyc8vMTT1Raqd9xnL7WdBbT3H5wE1nPjWdqWG7Ko7QqfrvehxRt7wbZZ1nXXO3BVx' },
  { id: 2, name: 'Raw Wool Jumper', price: 495, category: 'Knitwear', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOO8l5l-Z2or029SMkMK4u-XObd1p8g9ywqNVARnvJEt7tBnc96r2lQgNRIzT5Ze5bYzM_R0Pi8OhKYt_AcQI-LsjbiS-wkhkl19vaPTwC0MNWClysT3NmmzBu1dew0Pd_Pzqx9Ic2rSwJ3tg-O_3JSpgW_Zoo0l5GGZvpnxo35dnygQKGzIQ1vlX421bxuAcQ2b1fwT8Hc3SnVOGnTfw_MDuGWuvLeR_2md_3xrCdqxSfkmn2836gjQUZwUvb3hNhfcr3sx1lUDeE' },
  { id: 3, name: 'Sculptural Trouser', price: 275, category: 'Pants', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIdzSQ7o0YLD2NWfqj295edwEO3HT1b4HVCo94ZvYQLV8OmMg72_V5h-CyKMmFvFXC9EZ9mjVORJN1ajdwNpvEDYw7fL_50H6KkMpXNFBaHC6dCsG8E55LfsGJXv6MwdyUD3KS4R_o72fj6dGAaZ0ju5SmTuozlFrmzQZyH5MgGZzz9XIUv6ZeQHBtKyH-awg_5l0F3f_LsIsrnSS3ZGr7vygvyzfcfxBvLjy--TRjCfwvhEk2B76NBbO2334XIBVaGA-Ab0puB92x' }
];

export default function MonochromeApp() {
  const { view, setView, cart, selectedProduct, setProduct, addToCart, removeFromCart } = useStore();

  return (
    <div className="bg-[#f9f9f7] min-h-screen text-black font-sans selection:bg-black selection:text-white">
      {/* HEADER */}
      <nav className="sticky top-0 z-50 bg-[#f9f9f7]/80 backdrop-blur-md border-b border-black/5 px-6 h-16 flex justify-between items-center">
        <Menu size={20} className="cursor-pointer" />
        <h1 className="font-serif text-2xl tracking-[0.2em] cursor-pointer" onClick={() => setView('home')}>MONOCHROME</h1>
        <div className="relative cursor-pointer" onClick={() => setView('bag')}>
          <ShoppingBag size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </nav>

      <main className="pb-24">
        <AnimatePresence mode="wait">
          {/* HOME VIEW */}
          {view === 'home' && (
            <motion.section key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="relative h-[70vh] overflow-hidden">
                <img src={PRODUCTS[0].img} className="w-full h-full object-cover grayscale brightness-75" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <span className="uppercase text-xs tracking-widest mb-2">Winter 2024</span>
                  <h2 className="font-serif text-5xl mb-6">The Art of Stillness</h2>
                  <button onClick={() => setView('shop')} className="bg-white text-black w-fit px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition">Explore Collection</button>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl mb-8">New Arrivals</h3>
                <div className="grid grid-cols-2 gap-4">
                  {PRODUCTS.map(p => (
                    <div key={p.id} className="group cursor-pointer" onClick={() => setProduct(p)}>
                      <div className="aspect-[3/4] bg-neutral-200 overflow-hidden mb-3">
                        <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                      </div>
                      <p className="text-xs uppercase tracking-tighter mb-1">{p.name}</p>
                      <p className="text-sm text-neutral-500">${p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* PRODUCT DETAIL VIEW */}
          {view === 'product' && selectedProduct && (
            <motion.section key="product" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-6 lg:flex lg:gap-12 lg:max-w-6xl lg:mx-auto">
              <img src={selectedProduct.img} className="w-full lg:w-1/2 aspect-[3/4] object-cover grayscale mb-8" />
              <div className="lg:py-12">
                <p className="text-xs text-neutral-400 uppercase mb-2">{selectedProduct.category}</p>
                <h2 className="font-serif text-4xl mb-4">{selectedProduct.name}</h2>
                <p className="text-xl mb-8">${selectedProduct.price}.00</p>
                <div className="space-y-4">
                  <button 
                    onClick={() => { addToCart(selectedProduct); setView('bag'); }}
                    className="w-full bg-black text-white py-4 text-sm tracking-[0.2em] hover:opacity-90 transition active:scale-95"
                  >
                    ADD TO BAG
                  </button>
                  <p className="text-sm text-neutral-500 leading-relaxed italic">
                    Crafted from premium fibers, this piece embodies our philosophy of "quiet luxury."
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* SHOPPING BAG VIEW */}
          {view === 'bag' && (
            <motion.section key="bag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl mb-8 text-center">Your Selection</h2>
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-neutral-400 mb-8">Your bag is empty.</p>
                  <button onClick={() => setView('home')} className="underline underline-offset-4 uppercase text-xs">Back to Store</button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex gap-6 border-b border-black/5 pb-6">
                      <img src={item.img} className="w-20 h-24 object-cover grayscale" />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg">{item.name}</h3>
                          <X size={16} onClick={() => removeFromCart(item.cartId)} className="cursor-pointer text-neutral-400" />
                        </div>
                        <p className="text-sm text-neutral-500">${item.price}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <div className="flex justify-between font-serif text-2xl mb-8">
                      <span>Total</span>
                      <span>${cart.reduce((sum, item) => sum + item.price, 0)}.00</span>
                    </div>
                    <button className="w-full bg-black text-white py-4 text-sm tracking-widest">CHECKOUT</button>
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-black/5 h-20 flex justify-around items-center px-4">
        <NavItem icon={<Store size={20} />} label="SHOP" active={view === 'home' || view === 'shop'} onClick={() => setView('home')} />
        <NavItem icon={<Search size={20} />} label="SEARCH" />
        <NavItem icon={<Heart size={20} />} label="WISH" />
        <NavItem icon={<ShoppingBag size={20} />} label="BAG" active={view === 'bag'} onClick={() => setView('bag')} />
        <NavItem icon={<User size={20} />} label="PROFILE" active={view === 'profile'} onClick={() => setView('profile')} />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div onClick={onClick} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${active ? 'text-black' : 'text-neutral-400'}`}>
      {icon}
      <span className="text-[9px] font-bold tracking-widest uppercase">{label}</span>
      {active && <motion.div layoutId="navline" className="w-4 h-[2px] bg-black" />}
    </div>
  );
}
