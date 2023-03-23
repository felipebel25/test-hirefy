import jwt from 'jsonwebtoken'


export const signToken = (_id: string, email: string) => {
    const sign = process.env.JWT_SECRET_SEED
    if (!sign) throw new Error('Ther isnt seed of JWT in .env')

    return jwt.sign(
        //payload
        {
            _id,
            email
        },
        //seed
        sign,
        //options
        {
            expiresIn: "30d"
        }
    )

}
export const isValidToken = (token: string): Promise<string> => {
    const sign = process.env.JWT_SECRET_SEED
    if (!sign) throw new Error('Ther isnt seed of JWT in .env')

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, sign || '', (err, payload) => {
                if (err) return reject('JWT no es valido')
                const { _id } = payload as { _id: string };
                resolve(_id)
            })

        } catch (error) {
            reject('JWT no es valido')
        }
    })

}