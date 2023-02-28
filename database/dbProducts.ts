import { IProduct } from "@/interfaces";
import { db } from "database"
import { Product } from "models";

export const getProductBySlug = async (slug: string | string[]): Promise<IProduct | null> => {
    await db.connect();
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect();

    if (!product) {
        return null;
    }
    return JSON.parse(JSON.stringify(product))
}

export interface ProductSlug {
    slug: string;

}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean()
    await db.disconnect();


    return slugs
}

export const getProductsByTerm = async (term: string) => {
    if (term.length === 0) return [];
    term = term.toString().toLowerCase()

    await db.connect()
    // forma de buscar por nombre o en este caso por term
    const products = await Product.find({ $text: { $search: term } }).select('title images price inStock slug -_id').lean()

    await db.disconnect()

    return products
}

export const  getAllProducts = async (): Promise<IProduct[]> => {
    await db.connect()
    // forma de buscar por nombre o en este caso por term
    const products = await Product.find().lean()

    await db.disconnect()

    return JSON.parse(JSON.stringify(products))


} 