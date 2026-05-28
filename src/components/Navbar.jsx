import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import { useTheme } from '../context/ThemeContext';
import { 
  IoSearch, IoCartOutline, IoHeartOutline, IoLogOutOutline, 
  IoMoonOutline, IoSunnyOutline, IoMenuOutline, IoCloseOutline,
  IoLocationOutline, IoPersonOutline, IoChevronDown
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { searchQuery, setSearchQuery, products, setSelectedCategory } = useProducts();
  const { darkMode, toggleTheme } = useTheme();
  
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const suggestionRef = useRef(null);

  // Synchronize local search input with global search query context
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Autocomplete suggestions handler
  useEffect(() => {
    if (localSearch.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = products.filter(p => 
      p.title.toLowerCase().includes(localSearch.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
    setSuggestions(filtered);
  }, [localSearch, products]);

  // Close suggestions dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setShowSuggestions(false);
    setSelectedCategory('All'); // Reset category when searching
    navigate('/products');
  };

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setLocalSearch('');
    setSelectedCategory('All');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-slate-100 shadow-md">
      {/* Upper Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4 h-16">
        
        {/* Brand Logo & Hamburger */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-2xl hover:text-amber-400 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <IoMenuOutline />
          </button>
          
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-1 group">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              AmaZone
            </span>
            <span className="h-2 w-2 rounded-full bg-amber-400 group-hover:scale-150 transition-transform duration-300"></span>
          </Link>
        </div>

        {/* Location selector - desktop only */}
        <div className="hidden lg:flex items-center gap-1 hover:border hover:border-slate-700 p-1.5 rounded transition-all duration-150 cursor-pointer">
          <IoLocationOutline className="text-xl text-slate-400 mt-1" />
          <div className="text-xs">
            <p className="text-slate-400 text-[10px] leading-tight">Deliver to</p>
            <p className="font-bold leading-tight">New York 10001</p>
          </div>
        </div>

        {/* Live Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex-grow max-w-2xl relative hidden md:flex items-stretch h-10 rounded-lg overflow-hidden bg-white text-slate-800 focus-within:ring-2 focus-within:ring-amber-400"
          ref={suggestionRef}
        >
          <input
            type="text"
            placeholder="Search premium products..."
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full px-4 outline-none text-sm dark:bg-white dark:text-slate-900"
          />
          
          <button 
            type="submit" 
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-5 flex items-center justify-center transition-colors cursor-pointer"
          >
            <IoSearch className="text-xl" />
          </button>

          {/* Autocomplete Suggestions Box */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-11 left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden z-50 text-slate-800 dark:text-slate-100"
              >
                {suggestions.map((p) => (
                  <li 
                    key={p.id}
                    onClick={() => handleSuggestionClick(p.id)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                  >
                    <img src={p.image} alt={p.title} className="w-8 h-8 object-cover rounded-md" />
                    <div className="flex-grow">
                      <p className="text-xs font-semibold truncate">{p.title}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{p.category} • ${p.price.toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </form>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1 md:gap-4">
          
          {/* Dark / Light Toggle */}
          <button 
            onClick={toggleTheme}
            className="text-xl hover:text-amber-400 p-2 rounded-full hover:bg-slate-800/80 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <IoSunnyOutline className="text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <IoMoonOutline className="text-slate-300 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Login/Signup Dropdown Link */}
          {user ? (
            <div className="relative group hidden sm:block">
              <div className="hover:border hover:border-slate-700 p-1.5 rounded cursor-pointer flex items-center gap-1">
                <div className="text-xs">
                  <p className="text-slate-400 text-[10px] leading-tight">Hello, {user.username}</p>
                  <p className="font-bold leading-tight flex items-center gap-0.5">Account & Lists <IoChevronDown className="text-[10px]" /></p>
                </div>
              </div>
              {/* Dropdown menu */}
              <div className="absolute top-12 right-0 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg shadow-xl py-2 w-48 border border-slate-200 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <p className="font-semibold text-slate-900 dark:text-white">Active Session</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-rose-500 font-semibold cursor-pointer"
                >
                  <IoLogOutOutline className="text-sm" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="hover:border hover:border-slate-700 p-1.5 rounded cursor-pointer hidden sm:block">
              <div className="text-xs">
                <p className="text-slate-400 text-[10px] leading-tight">Hello, sign in</p>
                <p className="font-bold leading-tight">Account & Lists</p>
              </div>
            </Link>
          )}

          {/* Wishlist */}
          <Link 
            to="/wishlist" 
            className="relative hover:border hover:border-slate-700 p-1.5 rounded cursor-pointer flex items-center gap-1"
          >
            <IoHeartOutline className="text-2xl text-slate-300 hover:text-rose-500 transition-colors" />
            <span className="hidden lg:block text-xs font-bold mt-1">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 lg:right-12 bg-rose-500 text-white rounded-full text-[9px] font-bold h-4 w-4 flex items-center justify-center border border-slate-900">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="relative hover:border hover:border-slate-700 p-1.5 rounded cursor-pointer flex items-center gap-1"
          >
            <div className="relative">
              <IoCartOutline className="text-2.5xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 rounded-full text-[9px] font-extrabold h-4.5 w-4.5 flex items-center justify-center border border-slate-900">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden lg:block text-xs font-bold mt-2">Cart</span>
          </Link>

        </div>
      </div>

      {/* Mobile Search Bar - displayed only under h-16 in mobile view */}
      <div className="md:hidden px-4 pb-3 flex">
        <form onSubmit={handleSearchSubmit} className="flex w-full h-9 rounded-lg overflow-hidden bg-white text-slate-800">
          <input
            type="text"
            placeholder="Search premium products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full px-3 outline-none text-xs dark:bg-white dark:text-slate-900"
          />
          <button type="submit" className="bg-amber-400 px-4 flex items-center justify-center cursor-pointer">
            <IoSearch className="text-lg text-slate-900" />
          </button>
        </form>
      </div>

      {/* Slide-out Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden cursor-pointer"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-slate-900 text-slate-100 z-50 p-6 flex flex-col gap-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">AmaZone Options</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl hover:text-amber-400 p-1 cursor-pointer"
                >
                  <IoCloseOutline />
                </button>
              </div>

              {/* Mobile Account Details */}
              <div className="border-b border-slate-800 pb-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                      <IoPersonOutline className="text-xl text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Welcome,</p>
                      <p className="font-bold text-sm">{user.username}</p>
                    </div>
                  </div>
                ) : (
                  <Link 
                    to="/auth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 hover:text-amber-400 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                      <IoPersonOutline className="text-xl text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Sign in to your</p>
                      <p className="font-bold text-sm">AmaZone Account</p>
                    </div>
                  </Link>
                )}
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col gap-4 text-sm font-semibold">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition-colors">Home</Link>
                <Link to="/products" onClick={() => { setIsMobileMenuOpen(false); setSelectedCategory('All'); setSearchQuery(''); }} className="hover:text-amber-400 transition-colors">All Products</Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  My Wishlist {wishlist.length > 0 && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{wishlist.length}</span>}
                </Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  My Shopping Cart {cartCount > 0 && <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full">{cartCount}</span>}
                </Link>
              </nav>

              {/* Mobile Logout Button */}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-auto flex items-center gap-2 text-rose-400 hover:text-rose-500 font-bold border border-rose-500/25 bg-rose-500/5 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <IoLogOutOutline className="text-lg" /> Sign Out
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
