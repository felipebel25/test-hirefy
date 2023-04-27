import { ISize, IType } from "@/interfaces";

export interface ICartProduct {
    _id: string;
    images: string;
    image: string;

    inStock: number;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex',
    quantity: number;

}

