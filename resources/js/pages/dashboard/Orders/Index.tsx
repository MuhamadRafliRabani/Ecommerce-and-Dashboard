import { ContentLayout } from '@/layouts/content-layout';
import { columnsOrders } from '@/lib/columns';
import { analiticsProsp, chartDataProsp, InfoDetail, Order } from '@/types';
import { usePage } from '@inertiajs/react';
import { Box, DollarSign, Layers, ShoppingBag } from 'lucide-react';
import { useMemo } from 'react';

const Index = () => {
    const { orders } = usePage<{ orders: Order[] }>().props;
    console.log('🚀 ~ Index ~ orders:', orders);

    const { totalAmount, totalPrice, totalCanceled } = useMemo(() => {
        return {
            totalAmount: orders.reduce((prev, order) => (order.status == 'delivered' ? prev + Number(order.total_price) : prev), 0),
            totalPrice: orders.reduce((prev, order) => prev + Number(order.total_price) - (order.status === 'cancelled' ? order.total_price : 0), 0),
            totalCanceled: orders.filter((order) => order.status === 'cancelled').length,
        };
    }, [orders]);

    const stats: InfoDetail[] = [
        {
            title: 'Total Orders',
            icon: ShoppingBag,
            value: `+${orders.length}`,
        },
        {
            title: 'Total Amount',
            icon: DollarSign,
            value: `$${totalPrice.toFixed(2)}`,
        },
        {
            title: 'Delivered Orders Amount',
            icon: DollarSign,
            value: `$${totalAmount.toFixed(2)}`,
        },
        {
            title: 'Canceled Orders',
            icon: Box,
            value: `+${totalCanceled}`,
        },
    ];

    const chartData: chartDataProsp[] = orders.map(({ product }) => ({
        key: product.name,
        value: orders.filter((item) => item.product.name === product.name).length,
    }));

    const analitics: analiticsProsp[] = [
        {
            labels: 'Selled products',
            value: orders?.length,
            icon: ShoppingBag,
            color: 'bg-primary',
        },
        {
            labels: 'Total Orders',
            value: orders?.length,
            icon: Layers,
            color: 'bg-gray-300',
        },
    ];

    return (
        <ContentLayout
            columns={columnsOrders}
            chartData={chartData}
            data={orders}
            title="Orders"
            description="all datas in Orders."
            analytics={analitics}
            path="products.create"
            field="name"
            stats={stats}
        />
    );
};

export default Index;
