import CreateFieldLayout from '@/layouts/create-field-layout';
import { usePage } from '@inertiajs/react';
import { Category } from './Index';

const EditCategory = () => {
    const { category } = usePage<{ category: Category }>().props;

    const fields = [
        { name: 'name', label: 'Category Name', type: 'text', placeholder: category.name, defaultValue: category.name },
        { name: 'description', label: 'Description', type: 'text', placeholder: category.description, defaultValue: category.description },
    ];

    return <CreateFieldLayout fields={fields} pathRoute="categories.update" title="Category" id={category.id.toString()} create={false} />;
};

export default EditCategory;
