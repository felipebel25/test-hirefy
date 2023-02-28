import { ICartProduct } from '@/interfaces/cart';
import { CartState } from './CartProvider';

type CartType =
    | { type: '[Cart] - LoadCart from cookies', payload: ICartProduct[] }
    | { type: '[Cart] - Update Products in cart', payload: ICartProduct[] }
    | { type: '[Cart] - Change Cart Quantity', payload: ICartProduct }
    | { type: '[Cart] - Remove Product in Car', payload: ICartProduct }
    | {
        type: '[Cart] - Update Order Summary',
        payload: {
            numberOfItems: number,
            subtotal: number,
            tax: number,
            total: number
        }
    }



export const cartReducer = (state: CartState, action: CartType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies':
            return {
                ...state,
                cart: [...action.payload]

            }
        case '[Cart] - Update Products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }
        case "[Cart] - Change Cart Quantity":
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;
                    return action.payload;
                })
            }
        case '[Cart] - Remove Product in Car':
            return {
                ...state,
                cart: state.cart.filter(product => product._id === action.payload._id && product.size === action.payload.size ? false : product)
                // cart: state.cart.filter(product => {
                //     if (product._id !== action.payload._id) return product;
                //     if (product.size !== action.payload.size) return product;
                //     return product !== action.payload
                // })
            }
        case '[Cart] - Update Order Summary':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}