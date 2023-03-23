import { IPalondromo } from '@/interfaces/palondromo';
import mongoose, { Schema, model, Model } from 'mongoose';


const palondromoSchema = new Schema({
    name: { type: String, required: true },
    isPalondromo: { type: Boolean, required: true }
}, {
    timestamps: true
})

palondromoSchema.index({ title: 'text', tags: 'text' })

const Palondromo: Model<IPalondromo> = mongoose.models.Palondromo || model('Palondromo', palondromoSchema);


export default Palondromo;
