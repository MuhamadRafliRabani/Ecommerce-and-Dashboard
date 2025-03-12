import CardsInfo from '@/components/dashboard/card-info';
import { Chart } from '@/components/dashboard/chart.ui';
import { DataTable } from '@/components/dashboard/table';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useColorProgres } from '@/hooks/use-color-progres';
import AppLayout from '@/layouts/app-layout';
import { columnsDashboard } from '@/lib/columns';
import { analiticsProsp, BreadcrumbItem, chartDataProsp, InfoDetail, Order, PaginatedResponse } from '@/types';
import { Head } from '@inertiajs/react';
import { Box, Clock, DollarSign, Layers, ShoppingBag } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Category } from './Categories/Index';

export const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
    { title: 'Category', href: '/categories' },
    { title: 'Brands', href: '/brands' },
    { title: 'Orders', href: '/orders' },
];

type DashboardsProps = {
    categories: Category[];
    orders: PaginatedResponse<Order>;
};

export default function Dashboard({ categories, orders }: DashboardsProps) {
    const { setColor } = useColorProgres();
    const chartData: chartDataProsp[] = categories.map(({ name, product }) => ({
        key: name,
        value: product.length,
    }));

    const analytics: analiticsProsp[] = [
        {
            labels: 'Total products',
            value: categories.reduce((sum, { product }) => sum + product.length, 0),
            icon: ShoppingBag,
            color: 'bg-primary',
        },
        {
            labels: 'Current category',
            value: categories.length,
            icon: Layers,
            color: 'bg-gray-300',
        },
    ];

    useEffect(() => {
        setColor('#000000');
    }, [setColor]);

    const { totalAmount, totalPrice, totalCanceled } = useMemo(() => {
        return {
            totalAmount: orders.data.reduce((prev, order) => (order.status == 'delivered' ? prev + Number(order.total_price) : prev), 0),
            totalPrice: orders.data.reduce(
                (prev, order) => prev + Number(order.total_price) - (order.status === 'cancelled' ? order.total_price : 0),
                0,
            ),
            totalCanceled: orders.data.filter((order) => order.status === 'cancelled').length,
        };
    }, [orders]);

    const stats: InfoDetail[] = [
        {
            title: 'Total Orders',
            icon: ShoppingBag,
            value: `+${orders.data.length}`,
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <section className="flex h-full flex-col gap-4 overflow-hidden rounded-xl p-2.5 py-2">
                <CardsInfo stats={stats} />

                <div className="flex w-full flex-col justify-center gap-4 overflow-hidden px-0 md:flex-row">
                    <ChartSection analytics={analytics} chartData={chartData} />
                    <TransactionTable orders={orders} />
                </div>
            </section>
        </AppLayout>
    );
}

const ChartSection = ({ analytics, chartData }: { analytics: analiticsProsp[]; chartData: chartDataProsp[] }) => (
    <div className="appers-top max-h-fit w-full">
        <Chart analitics={analytics} chartData={chartData} />
    </div>
);

const TransactionTable = ({ orders }: { orders: PaginatedResponse<Order> }) => (
    <Card className="appers-top h-full w-full pt-2 shadow md:min-w-2/5">
        <CardHeader className="-space-y-0.5 py-2">
            <CardTitle className="flex items-center justify-between">
                <span>Recent Transactions</span>
                <Clock className="size-8 stroke-black/50" strokeWidth={1} />
            </CardTitle>
            <CardDescription>Transactions in a month</CardDescription>
        </CardHeader>
        <DataTable columns={columnsDashboard} data={orders.data} field="amount" title="orders" />
    </Card>
);
