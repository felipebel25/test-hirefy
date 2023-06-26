import { IProduct } from '@/interfaces'
import { db } from 'database'
import { Product } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    { message: string }
    | IProduct[]
    | IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProduct(req, res)
        default:
            return res.status(400).json({
                message: "Bad request"
            })
    }
}
const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug } = req.query;
    await db.connect();

    const product = await Product.findOne({ slug }).lean()

    if (!product) {
        await db.disconnect();
        return res.status(400).json({ message: "No existe este product " + slug })
    }
    await db.disconnect();
    product.images = product.images.map((image) => image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`)

    return res.status(200).json(product)



}