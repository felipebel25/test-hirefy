import { IPalondromo } from '@/interfaces/palondromo'
import { db } from 'database'
import Palondromo from 'models/palindromo'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}
    | IPalondromo
    | IPalondromo[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getPalondromos(req, res)
        case 'POST':
            return createPalondromo(req, res)
        default:
            return res.status(400).json({
                message: "Bad request"
            })
    }
}


const getPalondromos = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const palondromos = await Palondromo.find().select('_id createdAt name isPalondromo')
    await db.disconnect()

    return res.status(200).json(palondromos)

}

const createPalondromo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { name: nameNewPalodromo = '', isPalondromo: newIsPalondromo = false } = req.body as { name: string; isPalondromo: boolean };

    const newPalondromo = new Palondromo({
        name: nameNewPalodromo,
        isPalondromo: newIsPalondromo
    })


    try {
        await newPalondromo.save({ validateBeforeSave: true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "revisar logs"
        })
    }
    const { name, isPalondromo  , _id} = newPalondromo

    return res.status(201).json({
        _id,
        name,
        isPalondromo
    })

}
