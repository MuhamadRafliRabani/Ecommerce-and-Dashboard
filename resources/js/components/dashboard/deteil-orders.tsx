import { Separator } from '@/components/ui/separator';
import { useDate } from '@/hooks/useDate';
import { Order } from '@/types';
import { CheckCircle, Circle } from 'lucide-react';
import Detail from './detail';

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

    return (
        <div className="mx-auto w-full max-w-xl">
            <div>
                <div className="">
                    <h1 className="text-primary ms-10 -mb-4 font-medium">#{data.order_number}</h1>
                    <div className="flex items-end justify-between">
                        <div className="flex items-end gap-2">
                            <img src="https://placehold.co/400x400" alt="Product Image" className="size-8 rounded" />
                            <p className="text-primary/90 text-xs font-medium">{data.product?.category?.name || data.product?.name}</p>
                        </div>
                        <p className="font-medium">${data.total_price.toFixed(2)}</p>
                    </div>
                </div>

                <Separator className="mt-1.5 mb-3" />

                <div className="text-primary/90 -mt-1 space-y-2.5 text-sm font-medium">
                    <Detail title="Created at" item={useDate(data.created_at)} />
                    <Detail title="Delivery" item="Express" />
                    <Detail title="Payment" item="Express" />
                    <Detail title="Payment Method" item={data.payment_method} />
                    <Detail title="Status" item={data.status} />
                </div>

                <Separator className="my-3" />

                <div className="text-primary/90 -mt-1 space-y-1 text-sm font-medium">
                    <Detail title="Customer" item={data.user.name} />
                    <Detail title="Email" item={data.user.email} />
                    <Detail title="Address" item={data.shipping_address.slice(0, 21)} />
                    <Detail title="Phone" item={data.user.id} />
                </div>

                <Separator className="mt-1.5 mb-3" />

                <div className="space-y-2.5">
                    <h2 className="text-primary/90 -mt-1 text-sm font-medium">Timeline</h2>
                    {order.timeline.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            {data.status === 'delivered' || (data.status === 'pending' && i <= 1) || data.status === item.status ? (
                                <CheckCircle className="size-5 text-green-500" />
                            ) : (
                                <Circle className="size-5 text-gray-400" />
                            )}
                            <div>
                                <p className="text-sm font-medium">{item.title}</p>
                                <p className="text-primary/70 text-xs">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Separator className="mt-2 mb-3" />

                <div className="space-y-1.5 text-sm">
                    <h2 className="text-primary/90 -mt-1 text-sm font-medium">Payment</h2>
                    <Detail title="Subtotal" item={`$${order.payment.subtotal.toFixed(2)}`} />
                    <Detail title="Shipping" item={`$${order.payment.shipping.toFixed(2)}`} />
                    <Detail title="Total" item={`$${order.payment.total.toFixed(2)}`} />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
