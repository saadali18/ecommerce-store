import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === productToAdd.id
    )

    if(existingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === productToRemove.id
    )

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }
    return cartItems.map((cartItem) => 
            cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
        )
}
const clearCartItem = (cartItems, productToclear) => {
    return cartItems.filter(cartItem => cartItem.id !== productToclear.id)
}

export const CART_ACTION_TYPES = {
    TOGGLE_CART: 'TOGGLE_CART',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}


export const CartContext =  createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart : () => {},
    removeItemToCart : () => {},
    cartCount: 0,
    clearItemToCart : () => {},
    cartTotal: 0
})

const cartReducer = (state, action) => {
    const {type, payload} = action

    switch(type)
    {
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.TOGGLE_CART:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:  
            throw new Error(`unhandled type ${type} in cartReducer`)
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartProvider = ({children}) => {
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setIsCartOpen = (toggleCart) => {
        dispatch({type: CART_ACTION_TYPES.TOGGLE_CART, payload: toggleCart})
    }

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        )
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        )
 
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}})

    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems)
    }
    const removeItemToCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems)
    }
    const clearItemToCart = (productToclear) => {
        const newCartItems = clearCartItem(cartItems, productToclear)
        updateCartItemsReducer(newCartItems)
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemToCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}