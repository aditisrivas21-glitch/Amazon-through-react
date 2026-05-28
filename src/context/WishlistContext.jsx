import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('amazon_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('amazon_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prevList) => {
      const exists = prevList.some((item) => item.id === product.id);
      if (exists) return prevList;
      addToast(`Added ${product.title} to your Wishlist!`, 'success');
      return [...prevList, product];
    });
  };

  const removeFromWishlist = (productId) => {
    const item = wishlist.find(i => i.id === productId);
    setWishlist((prevList) => prevList.filter((item) => item.id !== productId));
    if (item) {
      addToast(`Removed ${item.title} from Wishlist`, 'info');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    addToast("Wishlist cleared", "info");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
