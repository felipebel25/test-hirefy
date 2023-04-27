import { db } from "database"
import { User } from "models"
import bcrypt from 'bcryptjs'

export const checkUserEmailPassword = async (email: string, password: string) => {
    await db.connect()
    const user = await User.findOne({ email });
    await db.disconnect()
    // si el emal es incorrect
    if (!user) return null;
    // verfy the password
    if (!bcrypt.compareSync(password, user.password!)) return null;


    const { _id, role, name } = user

    return {
        _id,
        name,
        email: email.toLocaleLowerCase(),
        role
    }

}
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect()
    const user = await User.findOne({ email: oAuthEmail })
    
    if (user) {
        await db.disconnect()
        const { role, name, email, _id, } = user
        return { _id, name, email, role }
    }

    const newUser = new User({ email: oAuthEmail, name: oAuthName, password: "@", role: 'client' })
    await newUser.save()
    await db.disconnect()


    const { role, name, email, _id, } = newUser
    return { role, name, email, _id }

}