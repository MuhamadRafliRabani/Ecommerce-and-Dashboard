import { ContentLayout } from '@/layouts/content-layout';
import { columnsBrands } from '@/lib/columns';
import { analiticsProsp, Brand, chartDataProsp, InfoDetail } from '@/types';
import { usePage } from '@inertiajs/react';
import { Layers, ShoppingBag } from 'lucide-react';
import { useMemo } from 'react';

const Index = () => {
    const { brands } = usePage<{ brands: Brand[] }>().props;
    console.log('🚀 ~ Index ~ brands:', brands);

    const { currentWebsite, currentProduct } = useMemo(() => {
        // your logic here
        const currentProduct = brands.reduce((acc, item) => acc + item.product.length, 0);
        const currentWebsite = brands.filter((item) => item.website).length;

        return {
            currentWebsite,
            currentProduct,
        };
    }, [brands]);

    const stats: InfoDetail[] = [
        {
            title: 'Current Brands',
            value: '+' + brands.length,
            icon: ShoppingBag,
        },
        {
            title: 'Current Products',
            value: '+' + currentProduct,
            icon: ShoppingBag,
        },
        {
            title: 'Current Website',
            value: '+' + currentWebsite,
            icon: ShoppingBag,
        },
        {
            title: 'Most Products In ',
            value: '#' + 'Adidas',
            icon: ShoppingBag,
        },
    ];

    const chartData: chartDataProsp[] = brands.map(({ name, product }) => ({
        key: name,
        value: product.length,
    }));

    const analytics: analiticsProsp[] = [
        {
            labels: 'Current Brand',
            value: brands.length,
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
        <>
            <ContentLayout
                columns={columnsBrands}
                data={brands}
                title="Brands"
                description="all datas in brands."
                path="brands.create"
                stats={stats}
                field="name"
                analytics={analytics}
                chartData={chartData}
            />
        </>
    );
};

export default Index;
