import CreateFieldLayout from '@/layouts/create-field-layout';
import { Brand } from '@/types';
import { usePage } from '@inertiajs/react';

const EditBrand = () => {
    const { brand } = usePage<{ brand: Brand }>().props;
    console.log('🚀 ~ EditBrand ~ brand:', brand);

    const fields = [
        { name: 'name', label: 'Brand Name', type: 'text', placeholder: brand.name, defaultValue: brand.name },
        { name: 'website', label: 'website', type: 'text', placeholder: brand.website, defaultValue: brand.website },
        { name: 'image', label: 'Image', type: 'file', defaultValue: brand.image },
    ];

    return <CreateFieldLayout fields={fields} pathRoute="brands.update" title="Edit brand" id={brand.id.toString()} create={false} />;
};

export default EditBrand;
