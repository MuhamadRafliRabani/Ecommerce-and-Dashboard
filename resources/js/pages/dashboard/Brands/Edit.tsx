import CreateFieldLayout from '@/layouts/create-field-layout';
import { Brand } from '@/types';
import { usePage } from '@inertiajs/react';

const EditBrand = () => {
    const { brand } = usePage<{ brand: Brand }>().props;
    console.log('🚀 ~ EditBrand ~ brand:', brand);

    const getBrand = brand[0];

    const fields = [
        { name: 'name', label: 'Brand Name', type: 'text', placeholder: getBrand.name, defaultValue: getBrand.name },
        { name: 'website', label: 'website', type: 'text', placeholder: getBrand.website, defaultValue: getBrand.website },
        { name: 'image', label: 'Image', type: 'file', defaultValue: getBrand.image },
    ];

    return <CreateFieldLayout fields={fields} pathRoute="brands.update" title="Edit brand" id={getBrand.id.toString()} create={false} />;
};

export default EditBrand;
