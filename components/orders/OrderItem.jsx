import Image from 'next/image'
import React from 'react'

function OrderItem({ order }) {
  return (
    <article className='p-3 lg:p-5 mb-5 bg-white border-blue-600 rounded-md'>
        <header className='lg:flex justify-between mb-4'>
            <div className='mb-4 lg:mb-0'>
                <p className="font-semibold">
                    <span>Order Id: {order?._id} </span>
                </p>
                <p className="font-semibold">
                Status:
                {order.orderStatus == 'Processing' 
                ? ( <span className='text-red-500'> {order?.orderStatus?.toUppercase()}</span> ) 
                :  <span className='text-green-500'> {order?.orderStatus?.toUppercase()}</span> }
                </p>
                <p className="text-gray-500">{order.createdAt?.substring(0, 10)}</p>
            </div>
        </header>

        <div className="grid md:grid-cols-3 gap-2">
            <div>
                <p className="text-gray-400 mb-1">Person</p>
                    <ul className="text-gray-600">
                        <li>{order?.user?.name}</li>
                        <li>Phone Number: {order?.shippingInfo?.phoneNumber}</li>
                        <li>Email: {order?.user?.email} </li>
                    </ul>
            </div>

            <div>
                <p className="text-gray-400 mb-1">Delivery Address</p>
                <ul className="text-gray-600">
                    <li>{order?.shipppingInfo?.street}</li>
                    <li>{order?.shipppingInfo?.city}</li>
                    <li>{order?.shipppingInfo?.state}</li>
                    <li>{order?.shipppingInfo?.zipCode}</li>
                    <li>{order?.shipppingInfo?.country}</li>
                </ul>
            </div>
            
            <div>
                <p className="text-gray-400 mb-1">Payment</p>
                <ul className="text-gray-600">
                    <li>Status: {order?.paymentInfo?.status?.toUppercase()}</li>
                    <li>Tax Paid: ${order?.paymentInfo?.taxPaid}</li>
                    <li>Total Paid: ${order?.shipppingInfo?.amountPaid}</li>
                </ul>
            </div>

        </div>

        <hr className='my-4' />

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-2">
            {
                order?.orderItems?.map((orderItem, index) => (
                    <figure key={index} className="flex flex-row mb-4">
                        <div>
                            <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                                <Image src={orderItem?.image} height={60} width={60} alt={orderItem?.name} />
                            </div>
                        </div>
                        <figurecaption className="ml-3">
                            <p>{orderItem?.name?.substring(0, 35)}</p>
                            <p className="mt-1 font-semibold">{orderItem?.quantity}x = ${orderItem?.price * orderItem?.quantity}</p>
                        </figurecaption>
                    </figure>

                ))
            }
        </div>

    </article>
  )
}

export default OrderItem