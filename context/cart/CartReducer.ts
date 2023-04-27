import { ICartProduct } from '@/interfaces/cart';
import { CartState } from './CartProvider';
import { ShippingAddress } from '@/interfaces/order';

type CartType =
    | { type: '[Cart] - LoadCart from cookies', payload: ICartProduct[] }
    | { type: '[Cart] - Update Products in cart', payload: ICartProduct[] }
    | { type: '[Cart] - Change Cart Quantity', payload: ICartProduct }
    | { type: '[Cart] - Remove Product in Car', payload: ICartProduct }
    | { type: '[Cart] - LoadAddress from cookies', payload: ShippingAddress | undefined }
    | { type: '[Cart] - Update Address', payload: ShippingAddress }
    | {
        type: '[Cart] - Update Order Summary',
        payload: {
            numberOfItems: number,
            subtotal: number,
            tax: number,
            total: number
        }
    }
    | { type: '[Cart] - Order Complete' }




export const cartReducer = (state: CartState, action: CartType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]

            }
        case '[Cart] - Update Address':
        case '[Cart] - LoadAddress from cookies':
            return {
                ...state,
                shippingAddress: action.payload

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
        case '[Cart] - Order Complete':
            return{
                ...state,
                cart:[],
                numberOfItems:0,
                subtotal:0,
                tax:0,
                total: 0
            }
        
        default:
            return state;
    }
}