import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import { db } from 'database';
import { User } from 'models';
import { isValidEmail, signToken } from 'utils';

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
        case "POST":
            return registerUser(req, res)

            break;

        default:
            res.status(400).json({
                message: "Not methods or bad request"
            })
            break;
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', name = '' } = req.body as { email: string; password: string; name: string; };

    await db.connect()
    const user = await User.findOne({ email });

    if (password.length < 6) {
        return res.status(400).json({
            message: 'contrasena debe ser de mas 6 caracteres'
        })
    }
    if (name.length < 2) {
        return res.status(400).json({
            message: 'name debe de ser de 2 caracteres'
        })
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({
            message: 'email format is not correct'
        })
    }

    if (user) {
        await db.disconnect()
        return res.status(400).json({
            message: "Ese correo ya esta registrado"
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name: name
    })

    try {
        await newUser.save({ validateBeforeSave: true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "revisar logs"
        })
    }

    const { _id, role } = newUser;

    const token = signToken(_id, email);

    return res.status(200).json({
        token, //jwt
        user: {
            email,
            role,
            name
        }
    })

}