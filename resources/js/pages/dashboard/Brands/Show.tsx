import ShowLayout from '@/layouts/show-layout';
import { columnsProduct } from '@/lib/columns';
import { PaginatedResponse, Product } from '@/types';
import { usePage } from '@inertiajs/react';

type PageShow = {
    products: PaginatedResponse<Product>;
    name: string;
};

const Show = () => {
    const { products, name } = usePage<PageShow>().props;
    const datas = products.data;

    return <ShowLayout columns={columnsProduct} data={datas} links={products.links} detail={name} />;
};

export default Show;
