import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailSkeleton } from '../components/Skeletons';
import { 
  IoHeart, IoHeartOutline, IoStar, IoStarHalf, IoStarOutline, 
  IoCartOutline, IoShieldCheckmarkOutline, IoArrowUndoOutline, IoGiftOutline
} from 'react-icons/io5';
import { motion } from 'framer-motion';

export const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Zoom-on-hover states
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    setLoading(true);
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct);
    if (foundProduct) {
      setActiveImage(foundProduct.images?.[0] || foundProduct.image);
    }
    setQty(1);

    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id, products]);

  if (loading || !product) {
    return <ProductDetailSkeleton />;
  }

  const inWishlist = isInWishlist(product.id);

  // Math for discount
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Star ratings helper
  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<IoStar key={i} className="text-amber-450 w-4.5 h-4.5" />);
      } else if (i === floor + 1 && hasHalf) {
        stars.push(<IoStarHalf key={i} className="text-amber-450 w-4.5 h-4.5" />);
      } else {
        stars.push(<IoStarOutline key={i} className="text-amber-450 w-4.5 h-4.5" />);
      }
    }
    return stars;
  };

  // Image Zoom handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8 text-left">
      {/* Back link */}
      <Link 
        to="/products"
        className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-amber-500 mb-6 transition-colors"
      >
        <IoArrowUndoOutline /> Back to search listings
      </Link>

      {/* Main Detail Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        
        {/* Left Column: Image Galleries */}
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Thumbnails list */}
          <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto no-scrollbar md:overflow-x-visible">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer bg-slate-50 dark:bg-slate-900 transition-all ${
                  activeImage === img ? 'border-amber-400 shadow-md' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Active Image Zoom-Lens Box */}
          <div 
            className="flex-grow aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 relative order-1 md:order-2 cursor-zoom-in"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={activeImage}
              alt={product.title}
              style={{
                transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                transform: isZooming ? 'scale(1.8)' : 'scale(1)',
              }}
              className="w-full h-full object-cover transition-transform duration-100 ease-out"
            />

            {/* Out of Stock banner */}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-slate-800 text-white font-extrabold text-sm px-4 py-2 rounded-xl border border-slate-700 shadow-xl">
                  OUT OF STOCK
                </span>
              </div>
            )}

            {/* Float Discount badge */}
            {discount > 0 && product.stock > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
                {discount}% OFF
              </span>
            )}
          </div>

        </div>

        {/* Right Column: Descriptions & Actions */}
        <div className="flex flex-col">
          {/* Category */}
          <span className="text-xs font-black uppercase text-amber-500 tracking-wider mb-2">
            {product.category}
          </span>
          
          {/* Title and Wishlist Toggle */}
          <div className="flex justify-between items-start gap-4 mb-3">
            <h1 className="text-xl md:text-3xl font-black font-heading text-slate-900 dark:text-white leading-tight m-0">
              {product.title}
            </h1>
            <button
              onClick={() => toggleWishlist(product)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/15 text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-all cursor-pointer"
            >
              {inWishlist ? (
                <IoHeart className="w-5 h-5 text-rose-500" />
              ) : (
                <IoHeartOutline className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Ratings Details */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs font-bold text-amber-500 dark:text-amber-400 hover:underline cursor-pointer">
              {product.reviewCount} customer reviews
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-800/80 mb-6" />

          {/* Pricing breakdowns */}
          <div className="flex flex-col gap-1 mb-6">
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                <span>List Price:</span>
                <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="text-sm font-extrabold text-rose-600">
                  Save ${(product.originalPrice - product.price).toFixed(2)} ({discount}%)
                </span>
              )}
            </div>
            {/* Shipping note */}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-1">
              FREE delivery for orders over $35. Or shipping at $5.99.
            </p>
          </div>

          {/* Availability Status */}
          <div className="mb-6">
            {product.stock === 0 ? (
              <span className="bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs px-3 py-1 rounded-full font-bold">
                Currently Unavailable
              </span>
            ) : product.stock <= 5 ? (
              <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs px-3 py-1 rounded-full font-bold">
                Only {product.stock} left in stock - order soon!
              </span>
            ) : (
              <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs px-3 py-1 rounded-full font-bold">
                In Stock & Ready to Ship
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed mb-6 font-medium">
            {product.description}
          </p>

          {/* Add-to-cart configurations box */}
          {product.stock > 0 && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 mb-8 flex flex-col md:flex-row items-center gap-4">
              {/* Quantity selectors */}
              <div className="flex items-center border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950">
                <button
                  onClick={() => setQty(prev => Math.max(1, prev - 1))}
                  className="px-3.5 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-sm font-extrabold cursor-pointer transition-colors"
                >
                  -
                </button>
                <span className="px-5 font-black text-sm text-slate-900 dark:text-white">{qty}</span>
                <button
                  onClick={() => setQty(prev => Math.min(product.stock, prev + 1))}
                  className="px-3.5 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-sm font-extrabold cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={() => addToCart(product, qty)}
                className="w-full md:flex-grow btn-primary flex items-center justify-center gap-2 py-3 cursor-pointer shadow-amber-400/10"
              >
                <IoCartOutline className="text-lg" /> Add to Shopping Cart
              </button>
            </div>
          )}

          {/* Trust assurances info grid */}
          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-200 dark:border-slate-800/80 text-center mb-8 text-[11px] font-bold text-slate-400">
            <div className="flex flex-col items-center gap-1.5 p-2">
              <IoShieldCheckmarkOutline className="text-xl text-amber-500" />
              <span>Secure transaction</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <IoArrowUndoOutline className="text-xl text-amber-500" />
              <span>15-day return policy</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2">
              <IoGiftOutline className="text-xl text-amber-500" />
              <span>Gift-wrap available</span>
            </div>
          </div>

          {/* Specifications Accordion Table */}
          <div className="flex flex-col text-left">
            <h3 className="text-xs font-black uppercase text-slate-450 tracking-wider mb-3">Product Specifications</h3>
            <div className="border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 text-xs">
              {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                <div 
                  key={key} 
                  className={`grid grid-cols-3 p-3 border-b border-slate-200 dark:border-slate-850/60 last:border-b-0 ${
                    idx % 2 === 0 ? 'bg-slate-100/30 dark:bg-slate-900/30' : ''
                  }`}
                >
                  <span className="font-extrabold text-slate-400">{key}</span>
                  <span className="col-span-2 font-bold text-slate-700 dark:text-slate-200">{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Related Products horizontal grid */}
      {relatedProducts.length > 0 && (
        <section className="flex flex-col gap-6 text-left border-t border-slate-200 dark:border-slate-800/80 pt-12">
          <div>
            <h2 className="text-lg md:text-xl font-black font-heading text-slate-900 dark:text-white m-0">
              Related Products
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">Customers who viewed this item also looked at</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
