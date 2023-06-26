import { IProduct } from '@/interfaces';
import { db } from 'database';
import { Product } from 'models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL || '');
type Data =
    | { message: string }
    | IProduct[]
    | IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        case 'PUT':
            return updateProducts(req, res)
        case 'POST':
            return createProduct(req, res)

        default:
            res.status(400).json({ message: 'Bad Request' })
            break;
    }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {

    await db.connect()
    const products = await Product.find()
        .sort({ title: 'asc' })
        .lean()
    await db.disconnect()
    // TODO:
    // tendremos que actualizar las imagenes
    const updatedProducts = products.map(product => {

        product.images = product.images.map((image) => image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`)
        return product
    })


    res.status(200).json(updatedProducts)
}

const updateProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    const { _id = '', images = [] } = req.body as IProduct;


    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: "El ide del Producto no es valido." })
    }

    if (images.length < 2) {
        return res.status(400).json({ message: "Es necesario al menos 2 imagenes." })
    }

    //TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg
    try {
        await db.connect()

        const product = await Product.findById(_id);

        if (!product) {
            return res.status(400).json({ message: "No existe un producto con ese ID" })
        }
        //TODO: eliminar fotos en cloudinary
        product.images.forEach(async (image) => {
            // borrar de cloudinary
            if (!images.includes(image)) {
                const [ fileId, extension ] = image.substring(image.lastIndexOf('/') + 1).split('.')
                console.log({ image, fileId, extension });
                await cloudinary.uploader.destroy(fileId)

            }
        })
        await product.update(req.body)

        await db.disconnect()
        return res.status(200).json(product)

    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: "Error: check the console" })
    }

}

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { images = [], slug } = req.body as IProduct;

    if (images.length < 2) {
        return res.status(400).json({ message: "Es necesario al menos 2 imagenes." })
    }

    try {
        await db.connect()
        const productInDb = await Product.findOne({ slug: slug })
        if (productInDb) {
            return res.status(400).json({ message: "este slug ya existe" })

        }
        const product = new Product(req.body)
        await product.save()

        await db.disconnect()
        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: "Error: check the console" })
    }

    //TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg

}