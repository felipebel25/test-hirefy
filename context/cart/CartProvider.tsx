import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie'

import { CartContext, cartReducer } from './index';
import { ICartProduct } from '@/interfaces/cart';
import { getAddressFromCookies } from 'utils/cookies';
import { isEmptyObject } from 'utils/globalFunctions';
import { IOrder, ShippingAddress } from '@/interfaces/order';
import { tesloApi } from 'services';

export interface CartState {
    isLoaded: boolean,
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;
}


export const Cart_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [] as ICartProduct[],
    numberOfItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined,
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

    // get Shipping Address
    useEffect(() => {
        if (Cookie.get('firstName')) {
            try {
                const cookieAddress: ShippingAddress = getAddressFromCookies()
                dispatch({ type: '[Cart] - LoadAddress from cookies', payload: !isEmptyObject(cookieAddress) ? cookieAddress : undefined });
            } catch (error) {
                dispatch({ type: '[Cart] - LoadAddress from cookies', payload: undefined });
            }
        }
    }, [])


    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subtotal = state.cart.reduce((prev, current) => (prev + (current.price * current.quantity)), 0)

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subtotal,
            tax: subtotal * taxRate,
            total: subtotal * ( taxRate + 1 )
        }

        dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary })
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

    const updateCartQuantity = (product: ICartProduct) => dispatch({ type: '[Cart] - Change Cart Quantity', payload: product })
    const removeCartProduct = (product: ICartProduct) => dispatch({ type: '[Cart] - Remove Product in Car', payload: product })

    const updateAddress = (address: ShippingAddress) => {
        Cookie.set('firstName', (address.firstName))
        Cookie.set('lastName', (address.lastName))
        Cookie.set('phone', (address.phone))
        Cookie.set('country', (address.country))
        Cookie.set('city', (address.city))
        Cookie.set('address', (address.address))
        Cookie.set('address2', (address.address2 || ''))
        Cookie.set('zip', (address.zip))

        dispatch({ type: '[Cart] - Update Address', payload: address })
    }
    const onCreateOrder = async (): Promise<{ hasError: boolean; message: string; }> => {
        if (!state.shippingAddress) {
            throw new Error('No Hay direccion')
        }

        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!,
                image: p.images!
            })),
            shippingAddress: state.shippingAddress,

            numberOfItems: state.numberOfItems,
            subtotal: state.subtotal,
            tax: state.tax,
            total: state.total,

            isPaid: false

        }
        try {
            const { data } = await tesloApi.post<IOrder>('/orders', body)
            dispatch({type:"[Cart] - Order Complete"})
            return {
                hasError: false,
                message: data._id!
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'Error no controlado'
            }
        }
    }

    return (
        <CartContext.Provider
            value={{
                ...state,
                //methods
                addProductToCart,
                updateCartQuantity,
                removeCartProduct,
                updateAddress,
                //orders    
                createOrder: onCreateOrder
            }}
        >
            {children}
        </CartContext.Provider>
    )
}