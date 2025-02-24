import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

// for localstorage 
useEffect(()=>{
    let existingCartItem = localStorage.getItem("cart")
    if(existingCartItem) setCart(JSON.parse(existingCartItem))
}, [])


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useSearch must be used within a cartprovider");
    }
    return context;
};

export { useCart, CartProvider };

// import indexjs ma