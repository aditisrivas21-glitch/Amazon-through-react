import React, { useState } from 'react';
import './Product.css';

function Product({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const { title, price, rating, reviews, image, badge, badgeClass, category } = product;

  const originalPrice = Math.round(price * 1.3);
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const inr = n => '₹' + Math.round(n * 83).toLocaleString('en-IN');

  const handleAdd = () => {
    if (!added) {
      setAdded(true);
      onAddToCart(product);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const renderStars = (r) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += r >= i ? '★' : r >= i - 0.5 ? '★' : '☆';
    }
    return stars;
  };

  return (
    <div className="product-card">

      {badge && (
        <div className={'product-badge ' + badgeClass}>{badge}</div>
      )}

      <button
        className={'wishlist-btn' + (wishlisted ? ' active' : '')}
        onClick={() => setWishlisted(!wishlisted)}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      <div className="product-image-wrapper">
        <img
          src={image}
          alt={title}
          className="product-image"
          onError={e => { e.target.src = 'https://placehold.co/300x300/f3f3f3/999?text=No+Image'; }}
        />
      </div>

      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{title}</h3>

        <div className="product-rating">
          <span className="stars">{renderStars(rating)}</span>
          <span className="rating-num">{rating}</span>
          <span className="rating-count">({reviews.toLocaleString()})</span>
        </div>

        <div className="product-price">
          <span className="price-current">{inr(price)}</span>
          <span className="price-original">{inr(originalPrice)}</span>
          <span className="price-discount">({discount}% off)</span>
        </div>

        <p className="product-delivery">
          <strong>FREE delivery</strong> by Tomorrow
        </p>

        <button
          className={'add-to-cart' + (added ? ' added' : '')}
          onClick={handleAdd}
        >
          {added ? '✓ Added to Cart' : '🛒 Add to Cart'}
        </button>

        <button className="buy-now">Buy Now</button>
      </div>
    </div>
  );
}

export default Product;
