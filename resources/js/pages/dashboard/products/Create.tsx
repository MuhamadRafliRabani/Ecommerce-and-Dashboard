import ProductForm from '@/components/dashboard/productForm';
import { Brand } from '@/types';
import { usePage } from '@inertiajs/react';
import { Category } from '../Categories/Index';

const Create = () => {
    const { brands, categories } = usePage<{ brands: Brand[]; categories: Category[] }>().props;

    return <ProductForm brands={brands} categories={categories} submitRoute="products.store" create />;
};

export default Create;
