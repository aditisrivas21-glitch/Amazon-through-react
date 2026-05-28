import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { IoChevronUp, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoMailOutline } from 'react-icons/io5';

export const Footer = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast("Please enter a valid email address", "warning");
      return;
    }
    addToast("Successfully subscribed to our newsletter!", "success");
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
      >
        <IoChevronUp /> Back to top
      </button>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Information */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-1 group w-max">
            <span className="text-xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              AmaZone
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            A premium frontend-only clone of Amazon designed to showcase modern UI patterns, seamless state management, and high-fidelity micro-interactions.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="p-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded-lg transition-all"><IoLogoGithub /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded-lg transition-all"><IoLogoLinkedin /></a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded-lg transition-all"><IoLogoTwitter /></a>
          </div>
        </div>

        {/* Categories Link Columns */}
        <div>
          <h4 className="text-sm font-bold text-slate-100 mb-4">Get to Know Us</h4>
          <ul className="flex flex-col gap-2 text-xs text-slate-400">
            <li><a href="#" className="hover:text-amber-400 hover:underline">Careers</a></li>
            <li><a href="#" className="hover:text-amber-400 hover:underline">Blog</a></li>
            <li><a href="#" className="hover:text-amber-400 hover:underline">About AmaZone</a></li>
            <li><a href="#" className="hover:text-amber-400 hover:underline">Investor Relations</a></li>
            <li><a href="#" className="hover:text-amber-400 hover:underline">AmaZone Devices</a></li>
          </ul>
        </div>

        {/* Help Column */}
        <div>
          <h4 className="text-sm font-bold text-slate-100 mb-4">Let Us Help You</h4>
          <ul className="flex flex-col gap-2 text-xs text-slate-400">
            <li><Link to="/auth" className="hover:text-amber-400 hover:underline">Your Account</Link></li>
            <li><Link to="/cart" className="hover:text-amber-400 hover:underline">Your Orders</Link></li>
            <li><a href="#" className="hover:text-amber-400 hover:underline">Shipping Rates & Policies</a></li>
            <li><Link to="/wishlist" className="hover:text-amber-400 hover:underline">Wishlist Help</Link></li>
            <li><a href="#" className="hover:text-amber-400 hover:underline">Customer Service</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold text-slate-100">Newsletter</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to get notifications about exclusive deals, new products, and flash sales.
          </p>
          <form onSubmit={handleSubscribe} className="flex h-10 rounded-lg overflow-hidden border border-slate-700">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 text-xs px-3 py-2 w-full outline-none focus:bg-slate-700 text-white"
            />
            <button 
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-3 text-xs flex items-center justify-center cursor-pointer"
            >
              <IoMailOutline className="text-base" />
            </button>
          </form>
        </div>

      </div>

      {/* Lower Copyright Row */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AmaZone. Developed for Portfolio showcase. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Conditions of Use</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Consumer Health Data Privacy Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
