import { ICartProduct } from '@/interfaces/cart';
import { createContext } from 'react';


export interface CartContextProps {
     cart: ICartProduct[];
     numberOfItems: number;
     subtotal: number;
     tax: number;
     total: number;
     
     //methods
     addProductToCart: (product: ICartProduct) => void;
     updateCartQuantity: (product: ICartProduct) => void;
     removeCartProduct: (product: ICartProduct) => void;



}
export const CartContext = createContext({} as CartContextProps)