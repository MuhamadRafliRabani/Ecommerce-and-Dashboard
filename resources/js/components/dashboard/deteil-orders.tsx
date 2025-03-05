import { Separator } from '@/components/ui/separator';
import { Order } from '@/types';
import { CheckCircle, Circle } from 'lucide-react';

type OrderDetailsProps<T> = {
    data: T;
};

const OrderDetails = ({ data }: OrderDetailsProps<Order>) => {
    console.log('🚀 ~ OrderDetails ~ data:', data);
    const order = {
        timeline: [
            { title: 'Order Placed', description: 'Order has been placed', completed: true, status: 'processing' },
            { title: 'Payment Confirmed', description: 'Payment has been verified', completed: true, status: 'shipped' },
            { title: 'Order Processed', description: 'Products are being packed', completed: true, status: 'delivered' },
        ],
        payment: {
            subtotal: 120.99,
            shipping: 5.75,
            total: 126.74,
        },
    };

    const date = new Date(data.created_at).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="mx-auto w-full max-w-xl">
            <div>
                <div className="flex items-end justify-between">
                    <div className="-mt-1.5 flex items-center gap-2">
                        <img src="https://placehold.co/400x400" alt="https://placehold.co/400x400" className="size-8 rounded" />
                        <div className="">
                            <h1 className="text-primary text-lg font-medium">#{data.order_number}</h1>
                            <p className="text-primary/90 text-[0.9rem] font-medium">{data.product?.category?.name || data.product?.name}</p>
                        </div>
                    </div>
                    <p className="pt-1 text-lg font-medium">${data.total_price.toFixed(2)}</p>
                </div>

                <Separator className="mt-1.5 mb-3" />

                <div className="space-y-2 text-sm">
                    <div className="flex w-full items-center">
                        <p className="min-w-1/2">Created at:</p>
                        <p>{date}</p>
                    </div>
                    <div className="flex w-full items-center">
                        <p className="min-w-1/2">Delivery:</p>
                        <p className="">Express</p>
                    </div>
                    <div className="flex w-full items-center">
                        <p className="min-w-1/2">Payment:</p>
                        <p className="">{data.payment_method}</p>
                    </div>
                    <div className="flex w-full items-center">
                        <p className="min-w-1/2">Status:</p>
                        <p className="">{data.status}</p>
                    </div>
                </div>

                <Separator className="my-3" />

                <div className="space-y-1 text-sm">
                    <div className="flex w-full items-center">
                        <p className="min-w-1/2">Customer:</p>
                        <p className="">{data.user.name}</p>
                    </div>
                    <div className="flex w-full items-center">
                        <p className="min-w-1/2">Email:</p>
                        <p className="truncate">{data.user.email}</p>
                    </div>
                    <div className="flex w-full items-center">
                        <p className="min-w-1/2 truncate">Address:</p>
                        <p className="">{data.shipping_address.slice(0, 21)}</p>
                    </div>
                    <div className="flex w-full items-center">
                        <p className="min-w-1/2">Phone:</p>
                        <p className="">{data.user.id}</p>
                    </div>
                </div>

                <Separator className="mt-1.5 mb-3" />

                <div className="space-y-2">
                    <h2 className="text-primary/90 -mt-1 text-sm font-medium">Timeline</h2>
                    {order.timeline.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            {data.status == 'delivered' || (data.status == 'pending' && i <= 1) || data.status == item.status ? (
                                <CheckCircle className="size-5 text-green-500" />
                            ) : (
                                <Circle className="size-5 text-gray-400" />
                            )}
                            <div className="">
                                <p className="text-sm font-medium">{item.title}</p>
                                <p className="text-primary/70 text-xs">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Separator className="mt-2 mb-3" />

                <div className="space-y-1.5 text-sm">
                    <h2 className="text-primary/90 -mt-1 text-sm font-medium">Payment</h2>
                    <p>Subtotal: ${order.payment.subtotal.toFixed(2)}</p>
                    <p>Shipping: ${order.payment.shipping.toFixed(2)}</p>
                    <p className="font-semibold">Total: ${order.payment.total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
