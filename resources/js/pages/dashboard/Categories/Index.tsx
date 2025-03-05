import { ContentLayout } from '@/layouts/content-layout';
import { columns } from '@/lib/columns';
import { analiticsProsp, chartDataProsp, PaginatedResponse, Product } from '@/types';
import { usePage } from '@inertiajs/react';
import { Layers, ShoppingBag } from 'lucide-react';

export type Category = {
    id: string;
    name: string;
    slug: string;
    product: Product[];
    color: string;
};

type categoryProps = { categories: PaginatedResponse<Category>; totalCategories: number };

const Index = () => {
    const { categories, totalCategories } = usePage<categoryProps>().props;
    console.log('🚀 ~ Index ~ totalCategories:', totalCategories);

    const chartData: chartDataProsp[] = categories.data?.map(({ name, product }) => ({
        key: name,
        value: product.length,
    }));

    const analitics: analiticsProsp[] = [
        {
            labels: 'Total products',
            value: categories.data.reduce((sum, { product }) => sum + product.length, 0),
            icon: ShoppingBag,
            color: 'bg-primary',
        },
        {
            labels: 'Current category',
            value: totalCategories,
            icon: Layers,
            color: 'bg-gray-300',
        },
    ];

    return (
        <ContentLayout
            columns={columns}
            chartData={chartData}
            data={categories}
            title="Categories"
            description="Manage your website's product categories and products."
            chartDescription="How many products in each category"
            analitics={analitics}
            path="categories.create"
        />
    );
};

export default Index;
