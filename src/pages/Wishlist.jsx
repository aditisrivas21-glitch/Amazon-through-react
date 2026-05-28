import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { IoHeartOutline, IoTrashOutline, IoCartOutline, IoChevronBack } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8 text-left">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-8">
        <h1 className="text-xl md:text-3xl font-black font-heading text-slate-900 dark:text-white m-0">
          My Wishlist
        </h1>
        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-bold text-rose-500 hover:text-rose-600 hover:underline cursor-pointer"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel py-16 px-8 rounded-3xl flex flex-col items-center justify-center text-center max-w-lg mx-auto"
        >
          <IoHeartOutline className="text-6xl text-slate-355 dark:text-slate-655 mb-4 animate-pulse text-rose-500/80" />
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-2">Your Wishlist is empty</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6 font-semibold">
            Save items you like to monitor discounts and easily add them to your cart later. Simply click the heart icon on any product card!
          </p>
          <Link to="/products" className="btn-primary flex items-center gap-1.5 text-xs">
            <IoChevronBack /> Browse Products
          </Link>
        </motion.div>
      ) : (
        /* Active Wishlist Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence initial={false}>
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: -50 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 flex flex-col sm:flex-row gap-5 items-stretch justify-between"
              >
                {/* Product Detail Thumbnail */}
                <div className="flex gap-4 items-center">
                  <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex-shrink-0 border border-slate-100 dark:border-slate-800">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </Link>
                  <div className="text-left flex flex-col justify-between h-full py-1">
                    <div>
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{item.category}</span>
                      <Link to={`/product/${item.id}`} className="hover:text-amber-500 transition-colors">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight mt-0.5 pr-2">
                          {item.title}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm font-black text-slate-900 dark:text-white">${item.price.toFixed(2)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-[10px] text-slate-400 line-through">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Operations column */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/50 pt-4 sm:pt-0">
                  {item.stock === 0 ? (
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                      Out of Stock
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer w-full justify-center shadow-sm"
                    >
                      <IoCartOutline className="text-base" /> Move to Cart
                    </button>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-rose-500 px-2.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    <IoTrashOutline /> Remove item
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
