import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward, IoArrowForwardOutline, IoSparklesSharp } from 'react-icons/io5';

const HERO_BANNERS = [
  {
    id: 1,
    title: "Uncompromising Sound. Unlimited Freedom.",
    subtitle: "Premium Active Noise Cancelling Headphones",
    cta: "Shop Electronics",
    category: "Electronics",
    bgGradient: "from-indigo-900 via-purple-900 to-slate-900",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    overlayColor: "bg-indigo-950/40"
  },
  {
    id: 2,
    title: "Define Your Outer Shell",
    subtitle: "Explore Handcrafted Designer Apparel & Outdoors Gear",
    cta: "View Collection",
    category: "Fashion",
    bgGradient: "from-rose-950 via-slate-900 to-slate-950",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    overlayColor: "bg-rose-950/40"
  },
  {
    id: 3,
    title: "Elevate Your Morning Routine",
    subtitle: "Sleek Digital Drip Coffee Makers & Home Wellness Purifiers",
    cta: "Explore Home Decor",
    category: "Home & Kitchen",
    bgGradient: "from-emerald-950 via-slate-900 to-cyan-950",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80",
    overlayColor: "bg-emerald-950/40"
  }
];

export const Home = () => {
  const { products, categories, setSelectedCategory, setSearchQuery } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Autoplay hero slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  const handleCtaClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    navigate('/products');
  };

  const featuredProducts = products.filter(p => p.featured);
  const bestSellers = products.filter(p => p.bestSeller);

  // Category card images mapping
  const categoryImages = {
    "Electronics": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80",
    "Fashion": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80",
    "Home & Kitchen": "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&auto=format&fit=crop&q=80",
    "Fitness & Outdoors": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&auto=format&fit=crop&q=80",
    "All": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80"
  };

  return (
    <div className="flex-grow pb-16">
      {/* Hero Carousel Banner */}
      <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden bg-slate-950 select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-r ${HERO_BANNERS[currentSlide].bgGradient} flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 md:py-0`}
          >
            {/* Slide Background Image overlay */}
            <div className={`absolute inset-0 md:relative md:w-1/2 h-full opacity-35 md:opacity-100 ${HERO_BANNERS[currentSlide].overlayColor} md:bg-transparent z-0`}>
              <img 
                src={HERO_BANNERS[currentSlide].image} 
                alt="Banner Graphic" 
                className="w-full h-full object-cover object-center"
              />
              <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent" />
            </div>

            {/* Slide Texts */}
            <div className="w-full md:w-1/2 flex flex-col items-start gap-3 md:gap-5 text-left z-10 text-white select-none">
              <span className="bg-amber-400/20 text-amber-400 font-extrabold text-[10px] md:text-xs px-3 py-1 rounded-full uppercase tracking-widest border border-amber-400/20 flex items-center gap-1.5">
                <IoSparklesSharp /> HOT SALE SELECTION
              </span>
              <h1 className="text-2xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight m-0">
                {HERO_BANNERS[currentSlide].title}
              </h1>
              <p className="text-xs md:text-lg text-slate-300 max-w-md font-medium leading-relaxed">
                {HERO_BANNERS[currentSlide].subtitle}
              </p>
              <button
                onClick={() => handleCtaClick(HERO_BANNERS[currentSlide].category)}
                className="btn-primary mt-2 md:mt-4 text-xs md:text-sm py-2.5 md:py-3 px-6 md:px-8 tracking-wider uppercase font-bold flex items-center gap-2 group cursor-pointer"
              >
                {HERO_BANNERS[currentSlide].cta}
                <IoArrowForwardOutline className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Sliders Navigation Arrows */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/60 text-white rounded-full p-2.5 backdrop-blur-sm transition-all focus:outline-none z-20 cursor-pointer"
        >
          <IoChevronBack className="text-xl" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/35 hover:bg-black/60 text-white rounded-full p-2.5 backdrop-blur-sm transition-all focus:outline-none z-20 cursor-pointer"
        >
          <IoChevronForward className="text-xl" />
        </button>

        {/* Indicators Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? 'w-6 bg-amber-400' : 'w-1.5 bg-slate-400/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Main Home Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 md:-mt-12 relative z-25 flex flex-col gap-12 md:gap-16">
        
        {/* Categories Grid Card Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.filter(c => c !== "All").map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => handleCtaClick(cat)}
              className="group glass-panel rounded-2xl p-4 md:p-6 text-left cursor-pointer hover:border-amber-400/50 hover:shadow-xl transition-all duration-300 flex flex-col h-60 md:h-72"
            >
              <h3 className="text-sm md:text-base font-extrabold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-amber-500 transition-colors">
                {cat}
              </h3>
              <p className="text-[10px] md:text-xs text-slate-400 mb-4 font-semibold">Premium products & discounts</p>
              
              <div className="flex-grow overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950 relative">
                <img 
                  src={categoryImages[cat]} 
                  alt={cat} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <span className="text-[11px] font-bold text-amber-500 dark:text-amber-400 group-hover:underline mt-4 flex items-center gap-1">
                Shop Now <IoArrowForwardOutline className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </motion.div>
          ))}
        </section>

        {/* Featured Products Sliding Row */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-black font-heading text-slate-900 dark:text-white m-0">
                Featured Deals
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Handpicked top quality items from our inventory</p>
            </div>
            <button 
              onClick={() => handleCtaClick('All')}
              className="text-xs font-bold text-amber-500 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Explore all <IoArrowForwardOutline />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Banner callout */}
        <section className="rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 p-8 md:p-12 text-slate-950 text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-orange-500/10">
          <div className="max-w-xl">
            <span className="bg-slate-950 text-white font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest">
              EXCLUSIVE PRIME CLUB
            </span>
            <h2 className="text-2xl md:text-4xl font-black font-heading text-slate-950 mt-3 mb-2 leading-tight">
              Get Free Shipping on all orders above $35
            </h2>
            <p className="text-sm text-slate-900/80 font-medium leading-relaxed">
              No subscription fee required. Add items to your cart, and once the cart value crosses $35, shipping charges are instantly removed during checkout.
            </p>
          </div>
          <button 
            onClick={() => handleCtaClick('All')}
            className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
          >
            Start Shopping <IoArrowForwardOutline />
          </button>
        </section>

        {/* Best Sellers Section */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-black font-heading text-slate-900 dark:text-white m-0">
                Best Sellers
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Customers' absolute favorite products</p>
            </div>
            <button 
              onClick={() => handleCtaClick('All')}
              className="text-xs font-bold text-amber-500 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Explore all <IoArrowForwardOutline />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
