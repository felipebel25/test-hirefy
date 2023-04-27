import { createContext } from 'react';
import { ICartProduct } from '@/interfaces/cart';
import { ShippingAddress } from '@/interfaces/order';


export interface CartContextProps {
     cart: ICartProduct[];
     numberOfItems: number;
     subtotal: number;
     tax: number;
     total: number;
     isLoaded: boolean;
     shippingAddress?: ShippingAddress;

     //methods
     addProductToCart: (product: ICartProduct) => void;
     updateCartQuantity: (product: ICartProduct) => void;
     removeCartProduct: (product: ICartProduct) => void;
     updateAddress: (address: ShippingAddress) => void;

     //Orders
     createOrder: () => Promise<{ hasError: boolean; message: string; }>;


}
export const CartContext = createContext({} as CartContextProps)