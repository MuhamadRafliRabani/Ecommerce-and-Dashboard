import { ContentLayout } from '@/layouts/content-layout';
import { columnsOrders } from '@/lib/columns';
import { analiticsProsp, chartDataProsp, Order, PaginatedResponse } from '@/types';
import { usePage } from '@inertiajs/react';
import { Layers, ShoppingBag } from 'lucide-react';

type OrderProps = {
    orders: PaginatedResponse<Order>;
};

const Index = () => {
    const { orders } = usePage<OrderProps>().props;
    console.log('🚀 ~ Index ~ orders:', orders);

    const chartData: chartDataProsp[] = orders?.data.map(({ product }) => ({
        key: product.name,
        value: orders?.data.length,
    }));

    const analitics: analiticsProsp[] = [
        {
            labels: 'Selled products',
            value: orders?.data.length,
            icon: ShoppingBag,
            color: 'bg-primary',
        },
        {
            labels: 'Total Orders',
            value: orders?.data.length,
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
            chartDescription="How many products in each brand"
            analitics={analitics}
            path="products.create"
        />
    );
};

export default Index;
