import CreateFieldLayout from '@/layouts/create-field-layout';

const Create = () => {
    const fields = [
        { name: 'name', label: 'Category Name', type: 'text', placeholder: 'Enter brand name' },
        { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter your description' },
    ];

    return <CreateFieldLayout fields={fields} title="Category" pathRoute="categories.store" />;
};

export default Create;
