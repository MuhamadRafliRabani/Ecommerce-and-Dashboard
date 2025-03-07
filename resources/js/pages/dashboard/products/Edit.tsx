import ProductForm from '@/components/dashboard/productForm';
import { Brand, Product } from '@/types';
import { usePage } from '@inertiajs/react';
import { Category } from '../Categories/Index';

const Create = () => {
    const { product, brand, category } = usePage<{ product: Product; brand: Brand[]; category: Category[] }>().props;

    return <ProductForm defaultProduct={product[0]} brands={brand} categories={category} submitRoute="products.update" create={false} />;
};
export default Create;
