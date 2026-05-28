import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, categories } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(250); // max price in mock data is 249.99
  const [selectedRating, setSelectedRating] = useState(0); // 0 means any rating
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(false);

  // Trigger loading skeleton animation when categories or filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 500ms mock delay for realistic loading skeleton feel
    return () => clearTimeout(timer);
  }, [selectedCategory, sortBy, priceRange, selectedRating]);

  // Derived filtered products list
  const filteredProducts = products.filter((product) => {
    // 1. Search Query filter (matches title, category, description)
    const matchesSearch = searchQuery.trim() === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category filter
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    // 3. Price filter
    const matchesPrice = product.price <= priceRange;

    // 4. Rating filter
    const matchesRating = product.rating >= selectedRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  }).sort((a, b) => {
    // 5. Sorting
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'best-seller') {
      return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
    }
    // 'featured' sorting (default)
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        selectedRating,
        setSelectedRating,
        sortBy,
        setSortBy,
        loading,
        filteredProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
