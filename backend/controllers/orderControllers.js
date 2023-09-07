import Stripe from 'stripe';
import Order from '../models/orderSchema';
import APIFilters from '../utils/APIFilters';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);


export const myOrders = async (req, res) => {
    const userId = req.user?._id;
    const resPerPage = 2;

    try {

        const ordersCount = await Order.countDocuments();
        const apiFilters = new APIFilters(Order.find(), req.query).pagination(resPerPage);

        const orders = await apiFilters.query.find({ user: userId }).populate("shippingInfo user");

        return res.status(200).json({ ordersCount, resPerPage, orders });

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}

export const getOrders = async (req, res) => {
    const userId = req.user?._id;
    const resPerPage = 2;

    try {

        const ordersCount = await Order.countDocuments();
        const apiFilters = new APIFilters(Order.find(), req.query).pagination(resPerPage);

        const orders = await apiFilters.query.find({ user: userId }).populate("shippingInfo user");

        return res.status(200).json({ ordersCount, resPerPage, orders });

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}

export const getOrder = async (req, res) => {
    const { productId } = req.query;

    try {

        const order = await Order.findById(productId).populate("shippingInfo user");

        if(!order) {
            return res.status(404).json({ message: "No order found wit this ID" })
        }

        return res.status(200).json({success: true, order });

    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}

export const updateOrder = async (req, res) => {
    const { productId } = req.query;

    const { orderStatus } = req.body;

    try {

        const order = await Order.findById(productId);

        if(!order) {
            return res.status(404).json({ message: "No order found wit this ID" })
        }

        const updatedOrder = await Order.findByIdAndUpdate(productId, {
            $set: {
                orderStatus
            }
        });

        return res.status(200).json({ success: true, order: updatedOrder });

    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}

export const deleteOrder = async (req, res) => {
    const { productId } = req.query;

    try {

        const order = await Order.findById(productId);

        if(!order) {
            return res.status(404).json({ message: "No order found wit this ID" })
        }

        const deletedOrder = await Order.findByIdAndDelete(productId);

        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}

export const canReview = async (req, res) => {
    const { productId } = req.query;
    const userId = req.user?.id;

    try {

        const orders = await Order.find({
            user: userId,
            "orderItems.product": productId,
        });

        let canUserReview = orders?.length >= 1 ? true : false;

        return res.status(200).json({ success: true, canUserReview });

    } catch (error) {
        return res.status(500).json({ error: error?.message });
    }
}


export const checkoutSession = async (req, res) => {

    const { shippingInfo, items } = req.body;

    const lineItems = items?.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item?.name,
                    images: [item?.image],
                    metadata: {productId: item?.product}
                },
                unit_amount: item.price * 100,
            },
            quantity: item?.quantity,
            tax_rates: ['ddkdkdkdkdkdkdkdkdk']
        }
    })

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            success_url: `${process.env.API_URL}/me/orders?order=success=true`,
            cancel_url: `${process.env.API_URL}`,
            customer_email: req.user?.email,
            client_reference_id: req.user?._id,
            mode: 'payment',
            metadata: {
                shippingInfo
            },
            shipping_options: [
                {
                    shipping_rate: ""
                }
            ],
            lineItems
        });

        return res.json({ url: session.url })

    } catch (error) {
        
    }
}


async function getCartItems(lineItems) {
    return new Promise((resolve, reject) => {
        let cartItems = [];
        lineItems?.data?.forEach(async (item) => {
            const product = await stripe.products.retrieve(item?.price?.product);
            const productId = product.metadata.productId;
            cartItems.push({
                product: productId,
                name: product?.name,
                price: item.price.unit_amount_decimal / 100,
                quantity: item.quantity,
                image: product.images[0],
            })

        if(cartItems.length === lineItems?.data.length) {
            resolve(cartItems)
        }

        });
    })
}


export const webhook = async (req, res) => {
    try {
        // NOTE: npm install raw__boby --save
        const rawBody = await getRawBody(req);
        const signature = req.headers['stripe-signature'];
        const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        const event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);

        if(event.type === 'checkout.session.completed'){
            const session  = event?.data?.object;
            const lineItemsId = event?.data?.object?.id;
            const lineItems = await stripe.checkout.sessions.listLineItems(lineItemsId);
            const orderItems = await getCartItems(lineItems);
            const userId = session.client_reference_id;
            const amountPaid = session.amount_total / 100;
            
            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status,
                amountPaid,
                taxPaid: session.total_details.amount_tax / 100,

            }

            const orderData = {
                user: userId,
                shippingInfo: session.metadata.shippingInfo,
                paymentInfo,
                orderItems
            }

            const order = await Order.create(orderData);
            return res.status(201).json({ success: true });
        }
        
    } catch (error) {
        
    }
}