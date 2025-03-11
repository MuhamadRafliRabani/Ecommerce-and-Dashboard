import CreateFieldLayout from '@/layouts/create-field-layout';

const Create = () => {
    const fields = [
        { name: 'name', label: 'Brand Name', type: 'text', placeholder: 'Enter brand name' },
        { name: 'website', label: 'Website URL', type: 'text', placeholder: 'Enter website URL' },
    ];

    return <CreateFieldLayout fields={fields} title="Brand" pathRoute="brands.store" create />;
};

export default Create;
