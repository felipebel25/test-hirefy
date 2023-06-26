import { db } from 'database'
import { User } from 'models'
import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getUsers(req, res)
        case 'PUT':
            return updateUser(req, res)
        default:
            return res.status(400).json({ message: "Bad Request" })
    }


}

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect()
    const users = await User.find().select('-password').lean()
    await db.disconnect()
    return res.status(200).json(users)
}

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId = '', role = '' } = req.body
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "No existe usuario por ese id" })
    }
    const allRoles = ['admin', 'client']

    if (!allRoles.includes(role)) {
        return res.status(400).json({ message: "Ese Role es invalido" })
    }
    await db.connect()
    const user = await User.findById(userId)
    if (!user) {
        await db.disconnect()
        return res.status(400).json({ message: "Usuario no encontrado" })
    }

    user.role = role;
    await user.save()

    await db.disconnect()

    return res.status(200).json({ message: "User updated successfully"})

}