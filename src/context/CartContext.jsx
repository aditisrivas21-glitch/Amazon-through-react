import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('amazon_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedForLater, setSavedForLater] = useState(() => {
    const saved = localStorage.getItem('amazon_saved_for_later');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('amazon_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amazon_saved_for_later', JSON.stringify(savedForLater));
  }, [savedForLater]);

  const addToCart = (product, quantity = 1) => {
    if (product.stock === 0) {
      addToast(`${product.title} is currently out of stock`, 'warning');
      return;
    }
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let newCart;
      
      if (existingItem) {
        const targetQty = existingItem.quantity + quantity;
        const availableQty = Math.min(targetQty, product.stock);
        if (targetQty > product.stock) {
          addToast(`Adjusted quantity to ${product.stock} (max in stock)`, 'info');
        } else {
          addToast(`Updated ${product.title} quantity in cart!`, 'success');
        }
        newCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: availableQty } : item
        );
      } else {
        addToast(`Added ${product.title} to cart!`, 'success');
        newCart = [...prevCart, { ...product, quantity: Math.min(quantity, product.stock) }];
      }
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (item) {
      addToast(`Removed ${item.title} from cart`, 'info');
    }
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const clampedQty = Math.min(qty, item.stock);
          if (qty > item.stock) {
            addToast(`Only ${item.stock} units available in stock`, 'warning');
          }
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    addToast("Cart cleared", "info");
  };

  // Move item to Save for Later shelf
  const saveItemForLater = (productId) => {
    const itemToSave = cart.find((item) => item.id === productId);
    if (!itemToSave) return;

    // Remove from cart
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    // Add to saved
    setSavedForLater((prevSaved) => {
      const exists = prevSaved.some((item) => item.id === productId);
      if (exists) return prevSaved;
      return [...prevSaved, itemToSave];
    });
    addToast(`Saved ${itemToSave.title} for later`, 'info');
  };

  // Move item from Saved For Later back to Cart
  const moveToCart = (productId) => {
    const itemToMove = savedForLater.find((item) => item.id === productId);
    if (!itemToMove) return;

    // Remove from saved
    setSavedForLater((prevSaved) => prevSaved.filter((item) => item.id !== productId));
    // Add back to cart
    addToCart(itemToMove, itemToMove.quantity || 1);
  };

  // Remove item completely from Saved For Later shelf
  const removeFromSaved = (productId) => {
    const item = savedForLater.find(i => i.id === productId);
    setSavedForLater((prevSaved) => prevSaved.filter((item) => item.id !== productId));
    if (item) {
      addToast(`Removed ${item.title} from saved list`, 'info');
    }
  };

  // Derived financial computations
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartOriginalSubtotal = cart.reduce((total, item) => total + (item.originalPrice || item.price) * item.quantity, 0);
  const cartSavings = cartOriginalSubtotal - cartSubtotal;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Shipping: Free if subtotal > $35, otherwise $5.99
  const shippingCost = cartSubtotal > 35 || cartSubtotal === 0 ? 0 : 5.99;
  
  // Tax: Estimate at 8%
  const taxCost = cartSubtotal * 0.08;
  
  const cartTotal = cartSubtotal + shippingCost + taxCost;

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        saveItemForLater,
        moveToCart,
        removeFromSaved,
        cartSubtotal,
        cartOriginalSubtotal,
        cartSavings,
        cartCount,
        shippingCost,
        taxCost,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
