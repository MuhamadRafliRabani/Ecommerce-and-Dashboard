import { ContentLayout } from '@/layouts/content-layout';
import { columnsProduct } from '@/lib/columns';
import { analiticsProsp, chartDataProsp, PaginatedResponse, Product } from '@/types';
import { usePage } from '@inertiajs/react';
import { File, Layers, ShoppingBag } from 'lucide-react';

type ProductsProps = {
    products: PaginatedResponse<Product>;
    orders: number;
};

const Index = () => {
    const { products, totalOrders } = usePage<ProductsProps>().props;

    const chartData: chartDataProsp[] = [
        {
            key: 'All Products',
            value: products.data.length,
        },
        {
            key: 'Salled Products',
            value: Number(totalOrders),
        },
        {
            key: 'remaind Products',
            value: products.data.length - Number(totalOrders),
        },
    ];

    const analitics: analiticsProsp[] = [
        {
            labels: 'All Products',
            value: products.data.length,
            icon: ShoppingBag,
            color: 'bg-primary',
        },
        {
            labels: 'saled Product',
            value: Number(totalOrders),
            icon: File,
            color: 'bg-gray-300',
        },
        {
            labels: 'remain Product',
            value: products.data.length - Number(totalOrders),
            icon: Layers,
            color: 'bg-gray-400',
        },
    ];

    return (
        <ContentLayout
            columns={columnsProduct}
            chartData={chartData}
            data={products}
            title="Products"
            description="Manage your website's product categories and products."
            chartDescription="How many products in each category"
            analitics={analitics}
            path="products.create"
            field="name"
        />
    );
};

export default Index;
