import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    shippingInfo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Address' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
            name: { type: String, required: true },
            quantity: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: String, required: true },
        }
    ],
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
        taxPaid: { type: Number, required: true },
        amountPaid: { type: Number, required: true },
    },
    orderStatus: { type: String, required: true, default: "Processing" },
    
}, { timestamps: true });


const Order = mongoose.model("Order", orderSchema);

export default models.Order || Order;