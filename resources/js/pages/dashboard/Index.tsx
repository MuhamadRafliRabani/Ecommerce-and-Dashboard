import { Chart } from '@/components/dashboard/chart.ui';
import Info from '@/components/dashboard/info';
import { DataTable } from '@/components/dashboard/table';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { columnsDashboard } from '@/lib/columns';
import { analiticsProsp, BreadcrumbItem, chartDataProsp, InfoDetail, Order, PaginatedResponse } from '@/types';
import { Head } from '@inertiajs/react';
import { Box, Clock, DollarSign, Layers, ShoppingBag } from 'lucide-react';
import React from 'react';
import { Category } from './Categories/Index';

export const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    },
    {
        title: 'Category',
        href: '/categories',
    },
    {
        title: 'Brands',
        href: '/brands',
    },
    {
        title: 'Orders',
        href: '/orders',
    },
];

type Dashboards = {
    categories: Category[];
    orders: PaginatedResponse<Order>;
};

export default function Dashboard({ categories, orders }: Dashboards) {
    const TotalAmount = orders.data.reduce((prev, current) => {
        return current.status == 'delivered' ? prev + current.total_price : prev;
    }, 0);

    const TotalPrice = orders.data.reduce((prev, current) => {
        return prev + current.total_price;
    }, 0);

    const TotalCencled = orders.data.reduce((prev, current) => {
        return current.status == 'canceled' ? prev + 1 : prev;
    }, 0);

    const chartData: chartDataProsp[] = categories.map(({ name, product }) => ({
        key: name,
        value: product.length,
    }));

    const analitics: analiticsProsp[] = [
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
            value: '+' + orders.data.length,
        },
        {
            title: 'Total Amount',
            icon: DollarSign,
            value: '$' + TotalPrice.toFixed(2),
        },
        {
            title: 'Delivered Orders Amount',
            icon: DollarSign,
            value: '$' + TotalAmount.toFixed(2),
        },
        {
            title: 'Canceled Orders',
            icon: Box,
            value: '+' + TotalCencled,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <section className="flex h-full flex-col gap-4 overflow-hidden rounded-xl p-4 py-2">
                <div className="grid w-full auto-rows-min justify-items-center gap-2 md:grid-cols-4">
                    {dashboardStats.map((item: InfoDetail, i) => (
                        <React.Fragment key={i}>
                            <Info item={item} />
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-4 overflow-hidden px-0 md:flex-row">
                    <Chart analitics={analitics} chartData={chartData} chartDescription="show all current products" />
                    <Card className="h-full min-w-2/5 pt-2 shadow">
                        <CardHeader className="-space-y-0.5 py-2">
                            <CardTitle className="flex items-center justify-between">
                                <span>Recenly Transtraction</span>
                                <Clock className="size-8 stroke-black/50" strokeWidth={1} />
                            </CardTitle>
                            <CardDescription>Transtraction in a month</CardDescription>
                        </CardHeader>
                        <DataTable columns={columnsDashboard} data={orders.data} links={orders.links} tableDefault={false} />
                    </Card>
                </div>
            </section>
        </AppLayout>
    );
}
