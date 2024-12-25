import React, { createContext, useState } from 'react';
import cartData from './cartData';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(cartData);

    return <CartContext.Provider value={{ cartItems, setCartItems }}>{children}</CartContext.Provider>;
};
