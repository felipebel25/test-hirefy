import { createContext } from 'react';
import { ICartProduct } from '@/interfaces/cart';


export interface CartContextProps {
     cart: ICartProduct[];
     numberOfItems: number;
     subtotal: number;
     tax: number;
     total: number;
     isLoaded: boolean;

     //methods
     addProductToCart: (product: ICartProduct) => void;
     updateCartQuantity: (product: ICartProduct) => void;
     removeCartProduct: (product: ICartProduct) => void;



}
export const CartContext = createContext({} as CartContextProps)