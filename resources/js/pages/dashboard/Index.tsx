import { Chart } from '@/components/dashboard/chart.ui';
import Info from '@/components/dashboard/info';
import { DataTable } from '@/components/dashboard/table';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { columnsDashboard } from '@/lib/columns';
import { analiticsProsp, BreadcrumbItem, chartDataProsp, InfoDetail, Order, PaginatedResponse } from '@/types';
import { Head } from '@inertiajs/react';
import { Box, Clock, DollarSign, Layers, ShoppingBag } from 'lucide-react';
import { useMemo } from 'react';
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
    const { totalAmount, totalPrice, totalCanceled } = useMemo(() => {
        return {
            totalAmount: orders.data.reduce((prev, order) => (order.status === 'delivered' ? prev + order.total_price : prev), 0),
            totalPrice: orders.data.reduce((prev, order) => prev + order.total_price, 0),
            totalCanceled: orders.data.filter((order) => order.status === 'canceled').length,
        };
    }, [orders]);

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

    const dashboardStats: InfoDetail[] = [
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
                <InfoCards stats={dashboardStats} />

                <div className="flex w-full flex-col items-center justify-center gap-4 overflow-hidden px-0 md:flex-row">
                    <ChartSection analytics={analytics} chartData={chartData} />
                    <TransactionTable orders={orders} />
                </div>
            </section>
        </AppLayout>
    );
}

const InfoCards = ({ stats }: { stats: InfoDetail[] }) => (
    <div className="grid w-full auto-rows-min justify-items-center gap-2 md:grid-cols-4">
        {stats.map((item, i) => (
            <Info index={i} item={item} />
        ))}
    </div>
);

const ChartSection = ({ analytics, chartData }: { analytics: analiticsProsp[]; chartData: chartDataProsp[] }) => (
    <div className="appers-top w-full">
        <Chart analitics={analytics} chartData={chartData} chartDescription="Show all current products" />
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
        <DataTable columns={columnsDashboard} data={orders.data} links={orders.links} field="amount" title="orders" />
    </Card>
);
