'use client'
import { useState, useEffect } from 'react'
import { createContext } from 'react';
import { useRouter } from 'next/navigation';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const router = useRouter();

    const totalCartItems = () => cart?.cartItems?.length ?? 0;

    const setCartToState = () => {
        const cartsItemInLocalStorage = JSON.parse(localStorage.getItem('cart')) ?? [];
        setCart(cartsItemInLocalStorage);
    }

    const addItemToCart = ({ name, product, quantity = 1, price, image, stock, seller, }) => {
        
        const newProduct = { name, product, quantity, price, image, stock, seller };

        let tempCartItems = [...(cart?.cartItems || [])];

        const isItemExist = tempCartItems?.find(cart => cart?.product === newProduct?.product);
        
        if(isItemExist) {
            tempCartItems = tempCartItems?.map((cartItem) => cartItem?.product === isItemExist?.product ? newProduct : cartItem );

        } else {
            tempCartItems = [newProduct];
        }

        localStorage.setItem('cart', JSON.stringify({ cartItems: tempCartItems }));

        setCartToState();
    }

    const deleteItemFromCart = (productId) => {

        let tempCartItems = [...(cart?.cartItems || [])];

        let itemIndex = tempCartItems?.findIndex((item) => item?.product === productId);

        if(itemIndex >= 0) {

            const deletedItem = tempCartItems?.splice(itemIndex, 1);

            if(!deletedItem) {
                localStorage.setItem('cart', JSON.stringify({ cartItems: cart?.cartItems }));
            }

        }

        localStorage.setItem('cart', JSON.stringify({ cartItems: tempCartItems }))

        setCartToState();

    }

    const saveOnCheckout = ({ amount, tax, totalAmount}) => {
        const checkoutInfo = { amount, tax, totalAmount, };
        const newCart = { ...cart, checkoutInfo };
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCartToState();
        router.push('/shipping');
    }

    const clearCart  = () => {
        localStorage.removeItem('cart');
        setCartToState();
    }

    useEffect(() => {
        setCartToState();
    }, []);


    return <CartContext.Provider value={{ 
        cart,
        addItemToCart,
        deleteItemFromCart,
        totalCartItems,
        saveOnCheckout,
        clearCart
        }}>
        { children }
    </CartContext.Provider>
}

export default CartContext