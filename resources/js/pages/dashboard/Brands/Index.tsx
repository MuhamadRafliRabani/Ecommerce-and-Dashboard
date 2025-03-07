import { ContentLayout } from '@/layouts/content-layout';
import { columnsBrands } from '@/lib/columns';
import { analiticsProsp, Brand, chartDataProsp, PaginatedResponse } from '@/types';
import { usePage } from '@inertiajs/react';
import { Layers, ShoppingBag } from 'lucide-react';

type BrandProps = { brands: PaginatedResponse<Brand>; totalbrands: number };

const Index = () => {
    const { brands, totalbrands } = usePage<BrandProps>().props;

    const chartData: chartDataProsp[] = brands.data.map(({ name, product }) => ({
        key: name,
        value: product.length,
    }));

    const analitics: analiticsProsp[] = [
        {
            labels: 'Current products',
            value: brands.data.reduce((sum, { product }) => sum + product.length, 0),
            icon: ShoppingBag,
            color: 'bg-primary',
        },
        {
            labels: 'Current brand',
            value: totalbrands,
            icon: Layers,
            color: 'bg-gray-300',
        },
    ];

    return (
        <ContentLayout
            columns={columnsBrands}
            chartData={chartData}
            data={brands}
            title="Brands"
            description="all datas in brands."
            chartDescription="How many products in each brand"
            analitics={analitics}
            path="brands.create"
            field="name"
        />
    );
};

export default Index;
