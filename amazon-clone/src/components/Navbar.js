import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ cartCount, searchQuery, setSearchQuery }) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All", "Electronics", "Books", "Fashion", "Kitchen", "Toys", "Sports", "Beauty",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value); // live search
  };

  return (
    <header className="navbar">
      {/* Top Row */}
      <div className="navbar-top">
        {/* Logo */}
        <a href="#" className="navbar-logo">
          <span className="logo-text">amazon</span>
          <span className="logo-dot">.in</span>
        </a>

        {/* Deliver To */}
        <div className="navbar-deliver">
          <span className="deliver-icon">📍</span>
          <div>
            <span className="deliver-label">Deliver to</span>
            <span className="deliver-location">India</span>
          </div>
        </div>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <select
            className="search-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            className="search-input"
            placeholder="Search Amazon.in"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Language */}
          <div className="nav-action">
            <span className="flag">🇮🇳</span>
            <span className="action-label">EN</span>
          </div>

          {/* Account */}
          <div className="nav-action account-action">
            <span className="action-label small">Hello, Sign in</span>
            <span className="action-bold">
              Account & Lists
              <svg className="chevron" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </span>
          </div>

          {/* Returns */}
          <div className="nav-action">
            <span className="action-label small">Returns</span>
            <span className="action-bold">& Orders</span>
          </div>

          {/* Cart */}
          <div className="nav-action cart-action">
            <div className="cart-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="1.5" fill="none"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="1.5"/>
                <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="1.5" fill="none"/>
              </svg>
              {cartCount > 0 && (
                <span className="cart-count">{cartCount > 99 ? "99+" : cartCount}</span>
              )}
            </div>
            <span className="action-bold cart-label">Cart</span>
          </div>
        </div>
      </div>

      {/* Bottom Nav Strip */}
      <nav className="navbar-bottom">
        <a href="#" className="nav-link menu-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          All
        </a>
        {[
          "Today's Deals",
          "Customer Service",
          "Registry",
          "Gift Cards",
          "Sell",
          "Prime",
          "New Releases",
          "Electronics",
          "Books",
        ].map((item) => (
          <a href="#" key={item} className="nav-link">
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
