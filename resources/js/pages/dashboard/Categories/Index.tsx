import { ContentLayout } from '@/layouts/content-layout';
import { columnsCategory } from '@/lib/columns';
import { analiticsProsp, chartDataProsp, InfoDetail, Product } from '@/types';
import { usePage } from '@inertiajs/react';
import { Layers, ShoppingBag } from 'lucide-react';
import { useMemo } from 'react';

export type Category = {
    id: string;
    name: string;
    slug: string;
    product: Product[];
    color: string;
    description?: string;
};

const Index = () => {
    const { categories } = usePage<{ categories: Category[] }>().props;

    const { currentProduct } = useMemo(() => {
        // your logic here
        const currentProduct = categories.reduce((acc, item) => acc + item.product.length, 0);

        return {
            currentProduct,
        };
    }, [categories]);

    const stats: InfoDetail[] = [
        {
            title: 'Current categories',
            value: '+' + categories.length,
            icon: ShoppingBag,
        },
        {
            title: 'Current Products',
            value: '+' + currentProduct,
            icon: ShoppingBag,
        },
        {
            title: 'Current Website',
            value: '+' + 8,
            icon: ShoppingBag,
        },
        {
            title: 'Most Products In ',
            value: '#' + 'Music & Instruments',
            icon: ShoppingBag,
        },
    ];

    const chartData: chartDataProsp[] = categories.map(({ name, product }) => ({
        key: name,
        value: product.length,
    }));

    const analytics: analiticsProsp[] = [
        {
            labels: 'Current Brand',
            value: categories.length,
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
            columns={columnsCategory}
            data={categories}
            title="Categories"
            description="Manage your website's product categories and products."
            path="categories.create"
            field="name"
            stats={stats}
            analytics={analytics}
            chartData={chartData}
        />
    );
};

export default Index;
