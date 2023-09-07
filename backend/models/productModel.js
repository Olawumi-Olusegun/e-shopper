import mongoose from 'mongoose'
// import { models, Schema, SchemaTypes } from  'mongoose'

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
}, { timestamps: true })

const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type:String, trim: true, required: [true, 'Please enter product name'] },
    description: { type:String, required: [true, 'Please enter product description'] },
    price: { type: Number, required: [true, 'Please enter product price'] },
    images: [
        {
            public_id: { type: String },
            url: { type: String },
        }
    ],
    category: { 
        type: String,
        required: [true, 'Please enter product category'],
        enum: {
            values: ['Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Sports' ],
            message: 'Please select correct category'
        }
     },

     seller: { type: String, trim: true, required: [true, 'Please enter product seller']},
     stock: { type: Number, trim: true, required: [true, 'Please enter product stock']},
     ratings: { type: Number, default: 0 },
     reviews: [reviewSchema],
}, { timestamps: true })


productSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

// productSchema.JSON

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product