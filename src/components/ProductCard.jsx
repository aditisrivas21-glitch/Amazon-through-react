import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { IoHeart, IoHeartOutline, IoStar, IoStarHalf, IoStarOutline, IoCartOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  
  // Calculate discount percentage
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<IoStar key={i} className="text-amber-400 w-3.5 h-3.5" />);
      } else if (i === floor + 1 && hasHalf) {
        stars.push(<IoStarHalf key={i} className="text-amber-400 w-3.5 h-3.5" />);
      } else {
        stars.push(<IoStarOutline key={i} className="text-amber-400 w-3.5 h-3.5" />);
      }
    }
    return stars;
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const outOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-amber-400/30 transition-all duration-300 h-full"
    >
      {/* Product Image and Overlay Badges */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {discount > 0 && !outOfStock && (
          <span className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-md z-10">
            {discount}% OFF
          </span>
        )}

        {/* Best Seller Badge */}
        {product.bestSeller && !outOfStock && (
          <span className={`absolute ${discount > 0 ? 'top-10' : 'top-3'} left-3 bg-amber-400 text-slate-950 font-extrabold text-[9px] px-2 py-0.5 rounded-full shadow-md z-10 tracking-wider`}>
            BEST SELLER
          </span>
        )}

        {/* Out of Stock Badge */}
        {outOfStock && (
          <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center backdrop-blur-[2px] z-10">
            <span className="bg-slate-800 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl border border-slate-700 shadow-lg">
              OUT OF STOCK
            </span>
          </div>
        )}

        {/* Wishlist Heart Overlay */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
        >
          {inWishlist ? (
            <IoHeart className="w-4 h-4 text-rose-500" />
          ) : (
            <IoHeartOutline className="w-4 h-4" />
          )}
        </button>
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-col flex-grow p-4">
        {/* Category tag */}
        <p className="text-[10px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest mb-1">
          {product.category}
        </p>

        {/* Title */}
        <Link to={`/product/${product.id}`} className="group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 min-h-10 leading-tight">
            {product.title}
          </h3>
        </Link>

        {/* Rating Stars */}
        <div className="flex items-center gap-1.5 my-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mt-auto mb-4">
          <span className="text-lg font-black text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions Button */}
        {outOfStock ? (
          <button
            disabled
            className="w-full bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 font-semibold text-xs py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 cursor-not-allowed"
          >
            Unavailable
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-1.5 group cursor-pointer"
          >
            <IoCartOutline className="text-base group-hover:scale-110 transition-transform" />
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
};
