import { DataTable } from '@/components/dashboard/table';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { breadcrumbs } from '@/pages/dashboard/Index';
import { ColumnDef } from '@tanstack/react-table';
import AppLayout from './app-layout';

interface ShowLayout<T> {
    data: T[];
    columns: ColumnDef<T>[];
    detail: string;
}

const ShowLayout = ({ data, columns, detail }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CardHeader>
                <CardTitle>
                    Found <span className="text-gray-500">{data.length}</span> Products in <span className="text-gray-500">{detail}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} field="name" title="product" />
            </CardContent>
        </AppLayout>
    );
};

export default ShowLayout;
