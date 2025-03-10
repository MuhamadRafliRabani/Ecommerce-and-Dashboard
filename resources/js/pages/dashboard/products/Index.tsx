import { ContentLayout } from '@/layouts/content-layout';
import { columnsProduct } from '@/lib/columns';
import { analiticsProsp, chartDataProsp, InfoDetail, Order, Product } from '@/types';
import { usePage } from '@inertiajs/react';
import { Layers, ShoppingBag } from 'lucide-react';
import { useMemo } from 'react';
import { Category } from '../Categories/Index';

type ProductsProps = {
    products: Product[];
    orders: Order[];
    category: Category[];
};

const Index = () => {
    const { products, category, brands } = usePage<ProductsProps>().props;
    console.log('🚀 ~ Index ~ category:', products);

    const { amount, currentProduct } = useMemo(() => {
        // your logic here
        const amount = products.reduce((acc, product) => acc + product.price, 0).toFixed(2);
        const currentProduct = products.reduce((acc, product) => acc + product.Quantity, 0);

        return {
            amount,
            currentProduct,
        };
    }, [products]);

    const stats: InfoDetail[] = [
        {
            title: 'Current Products',
            value: '+' + currentProduct,
            icon: ShoppingBag,
        },
        {
            title: 'Products Amount',
            value: '$' + amount,
            icon: ShoppingBag,
        },
        {
            title: 'Current Category',
            value: '+' + category,
            icon: ShoppingBag,
        },
        {
            title: 'Current Brands',
            value: '+' + Number(brands),
            icon: ShoppingBag,
        },
    ];

    const chartData: chartDataProsp[] = products.map(({ category }) => ({
        key: category?.name,
        value: products.filter((item) => item.category?.name == category?.name).length,
    }));

    const analytics: analiticsProsp[] = [
        {
            labels: 'Current Brand',
            value: products.length,
            icon: Layers,
            color: 'bg-gray-300',
        },
        {
            labels: 'Total Products',
            value: currentProduct,
            icon: ShoppingBag,
            color: 'bg-primary',
        },
    ];

    return (
        <ContentLayout
            columns={columnsProduct}
            stats={stats}
            data={products}
            title="Products"
            description="Manage your website's product categories and products."
            path="products.create"
            field="name"
            analytics={analytics}
            chartData={chartData}
        />
    );
};

export default Index;
