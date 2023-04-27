import { IOrder } from '@/interfaces';
import { db } from 'database';
import { Product } from 'models';
import Order from 'models/Order';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
type Data =
    | { message: string }
    | IOrder;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            createOrder(req, res)
            break;

        default:
            res.status(400).json({ message: 'bad request' })
            break;
    }

}


const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {

    const { orderItems, total, } = req.body as IOrder;
    // verfied user
    const session: any = await getServerSession(req, res, authOptions);
    console.log(req.body);


    if (!session) {
        return res.status(401).json({ message: session })
    }
    // crear arreglo con los productos
    const productsIds = orderItems.map((product) => product._id)

    await db.connect()
    // * busca los productos en bases de datos con los ids que obtuvimos de las Ordenes
    const dbProducts = await Product.find({ _id: { $in: productsIds } })

    try {
        // validando que deverdad sean de base de datos

        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price;
            if (!currentPrice) {
                throw new Error('Verifique el carrito de nuevo, producto no existe');
            }

            return (currentPrice * current.quantity) + prev
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

        const backendTotal = subTotal * (taxRate + 1);
        


        if (total !== backendTotal) {
            throw new Error('Total must be equal to backendTotal')
        }
        // hasta aqui vamos bien
        const userId = session.user._id;
        const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
        newOrder.total = Math.round(newOrder.total * 100) / 100

        await newOrder.save()
        await db.disconnect()

        return res.status(201).json(newOrder)

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({ message: error.message || 'revise logs del server' });

    }








    res.status(201).json(req.body)

}