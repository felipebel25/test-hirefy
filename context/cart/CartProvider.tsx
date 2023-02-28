import { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from './index';
import { ICartProduct } from '@/interfaces/cart';
export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;

}
export const Cart_INITIAL_STATE: CartState = {
    cart: [] as ICartProduct[],
    numberOfItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
}
export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE);

    // get cookie cart
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cookies', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies', payload: [] });
        }
    }, [])



    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subtotal = state.cart.reduce((prev, current) => (prev + (current.price * current.quantity)), 0)

        const tax = subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subtotal,
            tax,
            total: subtotal + tax
        }

        dispatch({type:'[Cart] - Update Order Summary' , payload: orderSummary})
    }, [state.cart])



    // todo: analizar esto mejor
    const addProductToCart = (product: ICartProduct) => {
        // si el id  de los carts no es el mismo id del nuevo product agregelo por que es diferente
        const productInCart = state.cart.some((p) => p._id === product._id)
        if (!productInCart) return dispatch({ type: '[Cart] - Update Products in cart', payload: [...state.cart, product] })

        // si el id  de los carts no es el mismo id del nuevo product y ademas el size no es igual al nuevo agregelo
        const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size)
        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update Products in cart', payload: [...state.cart, product] })

        // si el id es igual al nuevo product y es el mismo size actualiza el product y suma la cantidad
        const updatedProducts = state.cart.map(p => {
            if (p._id !== product._id) return p
            if (p.size !== product.size) return p

            //actualizar cantidad

            p.quantity += product.quantity
            return p
        })
        dispatch({ type: '[Cart] - Update Products in cart', payload: updatedProducts })
    }
    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change Cart Quantity', payload: product })
    }
    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove Product in Car', payload: product })

    }


    return (
        <CartContext.Provider
            value={{
                ...state,
                //methods
                addProductToCart,
                updateCartQuantity,
                removeCartProduct
            }}
        >
            {children}
        </CartContext.Provider>
    )
}