import { DataTable } from '@/components/dashboard/table';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { breadcrumbs } from '@/pages/dashboard/Index';
import { PaginationLinkProsp } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import AppLayout from './app-layout';

interface ShowLayout<T> {
    data: T[];
    columns: ColumnDef<T>[];
    detail: string;
    links: PaginationLinkProsp[];
}

const ShowLayout = ({ data, columns, links, detail }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CardHeader>
                <CardTitle>
                    Found <span className="text-gray-500">{data.length}</span> Products in <span className="text-gray-500">{detail}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} links={links} />
            </CardContent>
        </AppLayout>
    );
};

export default ShowLayout;
