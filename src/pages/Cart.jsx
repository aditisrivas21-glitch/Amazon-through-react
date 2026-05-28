import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { 
  IoCartOutline, IoTrashOutline, IoBookmarkOutline, IoArrowForwardOutline, 
  IoChevronBack, IoShieldCheckmark, IoTicketOutline
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart = () => {
  const {
    cart,
    savedForLater,
    removeFromCart,
    updateQuantity,
    saveItemForLater,
    moveToCart,
    removeFromSaved,
    clearCart,
    cartSubtotal,
    cartOriginalSubtotal,
    cartSavings,
    shippingCost,
    taxCost,
    cartTotal
  } = useCart();

  const { addToast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleCheckout = () => {
    addToast("Order placed successfully! This is a frontend demo checkout.", "success");
    clearCart();
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AMAZONE20') {
      setPromoDiscount(10); // $10 flat discount
      addToast("Promo code applied! Saved $10.00 extra", "success");
    } else {
      addToast("Invalid promo code. Try 'AMAZONE20'", "warning");
    }
  };

  const finalTotal = Math.max(0, cartTotal - promoDiscount);

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8 text-left">
      <h1 className="text-xl md:text-3xl font-black font-heading text-slate-900 dark:text-white mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel py-16 px-8 rounded-3xl flex flex-col items-center justify-center text-center max-w-lg mx-auto"
        >
          <IoCartOutline className="text-6xl text-slate-350 dark:text-slate-600 mb-4 animate-bounce" />
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-2">Your Shopping Cart is empty</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6 font-semibold">
            Fill it with high-quality tech, premium garments, coffee machines, or fitness gear. Your savings are waiting for you!
          </p>
          <Link to="/products" className="btn-primary flex items-center gap-1.5 text-xs">
            <IoChevronBack /> Continue Shopping
          </Link>
        </motion.div>
      ) : (
        /* Active Cart Page Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Cart items checklist */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <div className="glass-panel rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/60 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase">Items Checklist</span>
                <button 
                  onClick={clearCart}
                  className="text-xs font-bold text-rose-500 hover:text-rose-600 hover:underline cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              <div className="flex flex-col gap-6 divide-y divide-slate-100 dark:divide-slate-800/60">
                <AnimatePresence initial={false}>
                  {cart.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex flex-col sm:flex-row gap-4 sm:items-center justify-between ${idx > 0 ? 'pt-6' : ''}`}
                    >
                      {/* Product Thumbnail Info */}
                      <div className="flex items-center gap-4 flex-grow">
                        <Link to={`/product/${item.id}`} className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex-shrink-0 border border-slate-100 dark:border-slate-800">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </Link>
                        <div>
                          <Link to={`/product/${item.id}`} className="hover:text-amber-500 transition-colors">
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 pr-4 leading-tight">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-[10px] text-slate-450 dark:text-slate-400 font-bold mt-1 uppercase tracking-widest">{item.category}</p>
                          <p className="text-xs font-black mt-2 text-slate-900 dark:text-white sm:hidden">${item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Quantity Selector, Save, Delete Row */}
                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        {/* Qty +/- */}
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-extrabold text-slate-900 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price Desktop only */}
                        <span className="hidden sm:block text-sm font-extrabold text-slate-900 dark:text-white w-20 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        {/* Quick action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => saveItemForLater(item.id)}
                            className="p-2 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                            title="Save for Later"
                          >
                            <IoBookmarkOutline />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850/80 transition-all cursor-pointer"
                            title="Remove item"
                          >
                            <IoTrashOutline />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Save for later Shelf */}
            {savedForLater.length > 0 && (
              <div className="flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white m-0">
                  Saved for Later ({savedForLater.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedForLater.map((p) => (
                    <div 
                      key={p.id}
                      className="glass-panel p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="w-12 h-12 object-cover rounded-lg bg-slate-50 dark:bg-slate-950 flex-shrink-0" />
                        <div className="text-left">
                          <h4 className="text-xs font-bold line-clamp-1 pr-1 text-slate-800 dark:text-slate-150">{p.title}</h4>
                          <span className="text-xs font-extrabold text-slate-950 dark:text-white">${p.price.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1 items-end">
                        <button
                          onClick={() => moveToCart(p.id)}
                          className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors shadow-sm"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => removeFromSaved(p.id)}
                          className="text-[10px] font-bold text-slate-400 hover:text-rose-500 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: billing summary card */}
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/60 flex flex-col gap-5">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-3">
                Order Summary
              </h3>

              {/* Subtotal, savings, shipping, tax lists */}
              <div className="flex flex-col gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>List Subtotal</span>
                  <span className="text-slate-700 dark:text-slate-200">${cartOriginalSubtotal.toFixed(2)}</span>
                </div>
                {cartSavings > 0 && (
                  <div className="flex justify-between text-rose-600 dark:text-rose-400">
                    <span>Retail Savings</span>
                    <span>-${cartSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Cost</span>
                  <span className="text-slate-700 dark:text-slate-200">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-slate-700 dark:text-slate-200">${taxCost.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Promo Coupon</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <hr className="border-slate-250 dark:border-slate-800" />

              {/* Grand Total */}
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">Order Total</span>
                <span className="text-2xl font-black text-slate-950 dark:text-white">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Promo input code */}
              <form onSubmit={handleApplyPromo} className="flex h-9 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden mt-2 text-xs">
                <input 
                  type="text" 
                  placeholder="Coupon: AMAZONE20" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="px-3 bg-slate-50 dark:bg-slate-950 w-full outline-none text-slate-800 dark:text-white font-bold"
                />
                <button 
                  type="submit"
                  className="bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 font-bold cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Proceed to checkout CTA */}
              <button 
                onClick={handleCheckout}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                Proceed to Checkout <IoArrowForwardOutline />
              </button>

              {/* Assurances note */}
              <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-400 font-bold mt-1">
                <IoShieldCheckmark className="text-emerald-500 text-sm" /> Safe & Secure checkout details.
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
