import CardsInfo from '@/components/dashboard/card-info';
import { Chart } from '@/components/dashboard/chart.ui';
import { DataTable } from '@/components/dashboard/table';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { breadcrumbs } from '@/pages/dashboard/Index';
import { analiticsProsp, chartDataProsp, InfoDetail } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import AppLayout from './app-layout';

interface ContentLayoutProps<T> {
    title: string;
    description?: string;
    data: T[];
    columns: ColumnDef<T>[];
    stats: InfoDetail[];
    path: string;
    field: string;
    analytics: analiticsProsp[];
    chartData: chartDataProsp[];
}

export function ContentLayout<T>({ title, description, data, columns, stats, path, field, analytics, chartData }: ContentLayoutProps<T>) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div>
                <CardHeader className="space-y-2 px-3 md:px-4">
                    <CardTitle className="appers-right border-slide block w-fit [--origin:left]">{title}</CardTitle>
                    <CardDescription
                        className={`appers-right flex max-w-[320px] items-end justify-between text-pretty overflow-ellipsis md:max-w-full md:items-center md:space-x-4 ${stats ? 'md:mb-4' : 'md:-mb-4'}`}
                    >
                        {description?.length ? description.substring(0, 22) + '...' : ''}
                        <Link
                            href={route(path)}
                            className="border-slide appers-left [--origin: left] flex items-center gap-2 border-black whitespace-nowrap hover:text-black"
                        >
                            <Plus className="size-4" /> Add {title}
                        </Link>
                    </CardDescription>
                    {stats && <CardsInfo stats={stats} />}
                </CardHeader>

                <CardContent className="w-full px-0 md:px-4">
                    <div style={{ animationDuration: '0.5s' }}>
                        <DataTable columns={columns} data={data} field={field} title={title} />
                    </div>
                    {analytics && <Chart analitics={analytics} chartData={chartData} />}
                </CardContent>
            </div>
        </AppLayout>
    );
}
