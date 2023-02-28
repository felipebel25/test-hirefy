import { IProduct } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';


const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String, enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',],
            message: "This {VALUE} is not allows"
        },
        required: true
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
        type: String, enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats',],
            message: "This {VALUE} is not allows"
        },
        required: true
    },
    gender: {
        type: String, enum: {
            values: ['men', 'women', 'kid', 'unisex'],
            message: "This {VALUE} is not allow"
        },
        required: true
    }
}, {
    timestamps: true
})

//todo: crear indice de mongo
productSchema.index({ title: 'text', tags: 'text' })

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);


export default Product;
