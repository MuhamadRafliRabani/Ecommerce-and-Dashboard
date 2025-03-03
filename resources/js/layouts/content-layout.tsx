import { Chart } from '@/components/dashboard/chart.ui';
import { DataTable } from '@/components/dashboard/table';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { breadcrumbs } from '@/pages/dashboard/Index';
import { analiticsProsp, chartDataProsp, PaginatedResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import AppLayout from './app-layout';

interface ContentLayoutProps<T> {
    title: string;
    description?: string;
    data: PaginatedResponse<T>;
    columns: ColumnDef<T>[];
    chartData: chartDataProsp[];
    chartDescription: string;
    analitics: analiticsProsp[];
    path: string;
}

export function ContentLayout<T>({ title, description, data, columns, chartData, chartDescription, analitics, path }: ContentLayoutProps<T>) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-4">
                <CardHeader className="px-2 pb-3">
                    <CardTitle className="border-slide block w-fit [--origin:left]">{title}</CardTitle>
                    <CardDescription className="flex max-w-[320px] items-end justify-between space-x-4 text-pretty overflow-ellipsis md:max-w-full md:items-center">
                        {description?.substring(0, 22)}
                        <Link href={route(path)} className="border-slide flex items-center gap-2 border-black whitespace-nowrap hover:text-black">
                            <Plus className="size-4" /> Add {title}
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-4 md:px-4">
                    <DataTable tableDefault={false} columns={columns} data={data.data} links={data.links} />
                </CardContent>

                <CardFooter className="overflow-hidden px-0 md:px-4">
                    <Chart chartData={chartData} chartDescription={chartDescription} analitics={analitics} />
                </CardFooter>
            </div>
        </AppLayout>
    );
}
