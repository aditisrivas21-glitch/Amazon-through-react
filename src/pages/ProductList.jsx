import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeletons';
import { IoFunnelOutline, IoStar, IoStarOutline, IoCloseCircle, IoGridOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductList = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating,
    sortBy,
    setSortBy,
    loading,
    filteredProducts,
    searchQuery,
    setSearchQuery
  } = useProducts();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setPriceRange(250);
    setSelectedRating(0);
    setSortBy('featured');
    setSearchQuery('');
  };

  const renderRatingStarsFilter = (minRating) => {
    return (
      <button
        onClick={() => setSelectedRating(minRating)}
        className={`flex items-center gap-1 text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer w-full text-left ${
          selectedRating === minRating 
            ? 'bg-amber-400/10 text-amber-500 font-bold' 
            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
        }`}
      >
        <span className="flex mr-1">
          {[1, 2, 3, 4, 5].map((s) => (
            s <= minRating ? (
              <IoStar key={s} className="text-amber-400 w-3 h-3" />
            ) : (
              <IoStarOutline key={s} className="text-amber-400 w-3 h-3" />
            )
          ))}
        </span>
        & Up
      </button>
    );
  };

  const isAnyFilterActive = 
    selectedCategory !== 'All' || 
    priceRange < 250 || 
    selectedRating > 0 || 
    searchQuery !== '';

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Search Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-left">
        <div>
          <h1 className="text-xl md:text-3xl font-black font-heading text-slate-900 dark:text-white m-0">
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : selectedCategory === 'All' 
                ? 'All Products' 
                : `${selectedCategory}`}
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-semibold">
            Showing {filteredProducts.length} premium matches
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
          >
            <IoFunnelOutline className="text-base" /> Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="best-seller">Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filter - Desktop version */}
        <aside className="hidden lg:flex flex-col gap-6 text-left border-r border-slate-200/50 dark:border-slate-800/50 pr-6">
          
          {/* Header filter indicator */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <IoFunnelOutline /> Filters
            </h3>
            {isAnyFilterActive && (
              <button 
                onClick={handleClearFilters}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-0.5 cursor-pointer"
              >
                <IoCloseCircle className="text-sm" /> Clear All
              </button>
            )}
          </div>

          {/* Category Filter list */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-1">Categories</h4>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs py-1.5 px-2 rounded-lg transition-all text-left cursor-pointer font-medium ${
                  selectedCategory === cat 
                    ? 'bg-amber-400 text-slate-950 font-bold shadow' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <hr className="border-slate-200/50 dark:border-slate-800/50" />

          {/* Price Range Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Price Range</h4>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">Up to ${priceRange}</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="250" 
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>$20</span>
              <span>$125</span>
              <span>$250</span>
            </div>
          </div>

          <hr className="border-slate-200/50 dark:border-slate-800/50" />

          {/* Average Rating Stars Filter */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-1">Customer Reviews</h4>
            {renderRatingStarsFilter(4)}
            {renderRatingStarsFilter(3)}
            {renderRatingStarsFilter(2)}
          </div>

        </aside>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              {/* Backdrop overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
                className="fixed inset-0 bg-black z-40 lg:hidden cursor-pointer"
              />
              {/* Filter Panel Drawer */}
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-3xl p-6 z-50 overflow-y-auto lg:hidden text-left shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <IoFunnelOutline /> Filters
                  </h3>
                  <div className="flex gap-4">
                    {isAnyFilterActive && (
                      <button 
                        onClick={() => { handleClearFilters(); setShowMobileFilters(false); }}
                        className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-0.5 cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                    <button 
                      onClick={() => setShowMobileFilters(false)}
                      className="text-xs font-bold text-amber-500 cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Category */}
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-2.5">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-xs py-1.5 px-3 rounded-full border cursor-pointer transition-colors ${
                            selectedCategory === cat
                              ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                      <span>PRICE: UP TO ${priceRange}</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="250" 
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-amber-400 h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Customer Reviews</h4>
                    <div className="flex flex-col gap-1.5">
                      {renderRatingStarsFilter(4)}
                      {renderRatingStarsFilter(3)}
                      {renderRatingStarsFilter(2)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Products Grid Content - Right Column */}
        <main className="lg:col-span-3 flex flex-col gap-6">
          {loading ? (
            <ProductGridSkeleton count={filteredProducts.length || 8} />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* No Results State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel py-16 px-8 rounded-3xl flex flex-col items-center justify-center text-center max-w-lg mx-auto"
            >
              <IoCloseCircle className="text-5xl text-rose-500 mb-4" />
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">No matching products found</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-semibold">
                We couldn't find anything matching your exact filter parameters or search terms. Try clearing some filters or searching for another keyword.
              </p>
              <button 
                onClick={handleClearFilters}
                className="btn-primary flex items-center gap-1 text-xs"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </main>

      </div>
    </div>
  );
};
