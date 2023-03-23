import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { db } from 'database';
import { User } from 'models';
import { signToken } from 'utils';
import { isValidToken } from 'utils/jwt';

type Data =
    | { message: string }
    | {
        token: string;
        user: {
            email: string;
            name: string;
            role: string;
        }

    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return checkJWT(req, res)

            break;

        default:
            res.status(400).json({
                message: "Not methods or bad request"
            })
            break;
    }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token = '' } = req.cookies;

    let user_id = ''

    try {
        user_id = await isValidToken(token)

    } catch (error) {
        return res.status(401).json({
            message: "Token de autorizaacion no es valido"
        })
    }
    await db.connect();
    const user = await User.findById(user_id).lean()
    await db.disconnect();

    if (!user) return res.status(400).json({ message: "No existe usuario con ese id" })

    const { _id, email, role, name } = user

    return res.status(200).json({
        token: signToken(_id, email),
        user: {
            email,
            role,
            name
        }
    })


}