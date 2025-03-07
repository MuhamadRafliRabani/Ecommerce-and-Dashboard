import Detail from '@/components/dashboard/detail';
import { Separator } from '@/components/ui/separator';
import { useDate } from '@/hooks/useDate';
import { Product } from '@/types';

const ProductDetail = ({ data }: { data: Product }) => {
    return (
        <div className="mx-auto w-full max-w-lg">
            <div className="">
                <h1 className="text-primary ms-12 -mb-6 font-medium">{data.name}</h1>
                <div className="flex items-end justify-between">
                    <div className="flex items-end gap-2">
                        <img src="https://placehold.co/400x400" alt="Product Image" className="size-10 rounded" />
                        <p className="text-primary/90 text-xs font-medium">{data.category?.name}</p>
                    </div>
                    <p className="font-medium">${data.price}</p>
                </div>
            </div>

            <Separator className="my-3" />

            <div className="text-primary/90 -mt-1 space-y-1.5 text-sm font-medium">
                <Detail title="Name" item={data.name} />
                <Detail title="Desc" item={data.description} />
                <Detail title="Quantity" item={'+' + data.Quantity} />
                <Detail title="Price" item={'$' + data.price.toFixed(2)} />
            </div>

            <Separator className="my-3" />

            <div className="text-primary/90 -mt-1 space-y-1.5 text-sm font-medium">
                <Detail title="Created at" item={useDate(data.created_at)} />
                <Detail title="Category" item={data.category?.name} />
                <Detail title="Brand" item={data.brand.name} />
                <Detail title="Website" item={data.brand.website} />
            </div>

            <Separator className="my-3" />
        </div>
    );
};

export default ProductDetail;
