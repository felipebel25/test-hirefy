import { IUser } from '@/interfaces/users';
import mongoose, { Schema, model, Model } from 'mongoose';


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['admin', 'client'],
            message: 'No es un rol valido'
        },
        required: true
    }

}, {
    timestamps: true
})

//todo: crear indice de mongo
userSchema.index({ title: 'text', tags: 'text' })
const User: Model<IUser> = mongoose.models.User || model('User', userSchema);


export default User;
