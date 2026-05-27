import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import "./App.css";

const productsData = [
  {
    id: 1,
    title: "Apple MacBook Pro 14-inch",
    price: 1999.99,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    badge: "Best Seller",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 349.99,
    rating: 4.7,
    reviews: 5892,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    badge: "Amazon's Choice",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Kindle Paperwhite — 6.8\" Display",
    price: 139.99,
    rating: 4.9,
    reviews: 12540,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    badge: "Best Seller",
    category: "Electronics",
  },
  {
    id: 4,
    title: "Nike Air Zoom Pegasus 40 Running Shoes",
    price: 129.95,
    rating: 4.5,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    badge: "Limited Deal",
    category: "Fashion",
  },
  {
    id: 5,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 89.99,
    rating: 4.7,
    reviews: 98320,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80",
    badge: "Amazon's Choice",
    category: "Kitchen",
  },
  {
    id: 6,
    title: "LEGO Technic Lamborghini Huracán",
    price: 449.99,
    rating: 4.9,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80",
    badge: "New Arrival",
    category: "Toys",
  },
  {
    id: 7,
    title: "Samsung 65\" QLED 4K Smart TV",
    price: 1297.99,
    rating: 4.6,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
    badge: "Deal of the Day",
    category: "Electronics",
  },
  {
    id: 8,
    title: 'Yoga Mat — 6mm Thick, Non-Slip',
    price: 29.99,
    rating: 4.4,
    reviews: 8820,
    image: "https://images.unsplash.com/photo-1601925228608-0c5f7f9a3b7d?w=400&q=80",
    badge: null,
    category: "Sports",
  },
];

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [notification, setNotification] = useState(null);

  const categories = ["All", "Electronics", "Fashion", "Kitchen", "Toys", "Sports"];

  const filteredProducts = productsData.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    setCartItems((prev) => [...prev, product]);
    setNotification(`"${product.title.slice(0, 30)}..." added to cart!`);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <p className="hero-sub">Up to 60% off</p>
          <h1 className="hero-title">Today's Big Deals</h1>
          <p className="hero-desc">Limited time offers across all categories</p>
          <button className="hero-btn">Shop Now</button>
        </div>
        <div className="hero-overlay" />
      </div>

      {/* Category Filter */}
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <main className="main-content">
        <div className="section-header">
          <h2 className="section-title">
            {activeCategory === "All" ? "Featured Products" : activeCategory}
          </h2>
          <span className="product-count">{filteredProducts.length} results</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>No products found for "<strong>{searchQuery}</strong>"</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {notification && (
        <div className="toast-notification">
          <span className="toast-icon">🛒</span>
          {notification}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-col">
            <h4>Get to Know Us</h4>
            <a href="#">About Amazon</a>
            <a href="#">Careers</a>
            <a href="#">Press Releases</a>
            <a href="#">Amazon Science</a>
          </div>
          <div className="footer-col">
            <h4>Make Money with Us</h4>
            <a href="#">Sell products on Amazon</a>
            <a href="#">Become an Affiliate</a>
            <a href="#">Advertise Your Products</a>
          </div>
          <div className="footer-col">
            <h4>Payment Products</h4>
            <a href="#">Amazon Business Card</a>
            <a href="#">Shop with Points</a>
            <a href="#">Reload Your Balance</a>
          </div>
          <div className="footer-col">
            <h4>Let Us Help You</h4>
            <a href="#">Your Account</a>
            <a href="#">Returns & Replacements</a>
            <a href="#">Manage Your Content</a>
            <a href="#">Help</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-logo">amazon</span>
          <p>© 2024 Amazon Clone. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
