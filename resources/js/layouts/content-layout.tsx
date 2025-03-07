import { Chart } from '@/components/dashboard/chart.ui';
import { DataTable } from '@/components/dashboard/table';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { breadcrumbs } from '@/pages/dashboard/Index';
import { analiticsProsp, chartDataProsp, PaginatedResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import classNames from 'classnames';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';
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
    field: string;
}

export function ContentLayout<T>({ title, description, data, columns, chartData, chartDescription, analitics, path, field }: ContentLayoutProps<T>) {
    const isCategories = title === 'Categories';

    const contentClass = useMemo(
        () =>
            classNames('flex w-full gap-2 px-0 pb-4   md:px-4 appers-top', {
                'flex-col md:flex-row': isCategories,
                'flex-col-reverse': !isCategories,
            }),
        [isCategories],
    );

    const sectionClass = useMemo(() => classNames('w-full', { 'md:max-w-1/2': isCategories }), [isCategories]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="px-2">
                <CardHeader className="px-3 pt-0 pb-3 md:px-6 md:py-4">
                    <CardTitle className="appers-right border-slide block w-fit [--origin:left]">{title}</CardTitle>
                    <CardDescription className="appers-right flex max-w-[320px] items-end justify-between space-x-4 text-pretty overflow-ellipsis md:max-w-full md:items-center">
                        {description?.length ? description.substring(0, 22) + '...' : ''}
                        <Link
                            href={route(path)}
                            className="border-slide appers-left flex items-center gap-2 border-black whitespace-nowrap hover:text-black"
                        >
                            <Plus className="size-4" /> Add {title}
                        </Link>
                    </CardDescription>
                </CardHeader>

                <CardContent className={contentClass}>
                    <div className={sectionClass}>
                        <Chart chartData={chartData} chartDescription={chartDescription} analitics={analitics} />
                    </div>
                    <div style={{ animationDuration: '0.5s' }} className={sectionClass}>
                        <DataTable columns={columns} data={data.data} links={data.links} field={field} title={title} />
                    </div>
                </CardContent>
            </div>
        </AppLayout>
    );
}
