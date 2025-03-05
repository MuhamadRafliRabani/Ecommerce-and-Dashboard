import AppSelect from '@/components/dashboard/app-select';
import InputError from '@/components/dashboard/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { useForm, usePage } from '@inertiajs/react';
import { CloudUpload } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { breadcrumbs } from '../Index';

const items = [
    { key: 'Nike', value: 1 },
    { key: 'Adidas', value: 2 },
    { key: 'Puma', value: 3 },
    { key: 'Under Armour', value: 4 },
    { key: 'H&M', value: 5 },
    { key: 'Zara', value: 6 },
    { key: 'Uniqlo', value: 7 },
    { key: 'Gucci', value: 8 },
    { key: 'Louis Vuitton', value: 9 },
    { key: 'Burberry', value: 10 },
];
const categories = [
    { key: 'Electronics', value: 1 },
    { key: 'Fashion', value: 2 },
    { key: 'Home & Garden', value: 3 },
    { key: 'Health & Beauty', value: 4 },
    { key: 'Toys & Hobbies', value: 5 },
    { key: 'Sports & Outdoors', value: 6 },
    { key: 'Automotive', value: 7 },
    { key: 'Books', value: 8 },
    { key: 'Music', value: 9 },
];

const Create = () => {
    const { auth } = usePage<{ auth: { user: { id: number } } }>().props;
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, errors, processing } = useForm({
        name: '',
        price: '',
        category_id: 1,
        brand_id: 1,
        user_id: auth.user.id,
        description: '',
        image: null as File | null,
        slug: 't-shirt',
        quantity: 1,
    });

    const handleImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setData('image', file);
                setImagePreview(URL.createObjectURL(file));
            }
        },
        [setData],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            post(route('products.store'));
        },
        [post],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={handleSubmit} className="h-full w-full gap-4 md:flex md:p-4">
                <Card className="md:w-1/2">
                    <CardHeader className="pb-2">
                        <CardTitle>Create Product</CardTitle>
                        <CardDescription>Create a new product</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <InputGroup
                            label="Title"
                            required
                            name="name"
                            placeholder="Enter product title"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                        />

                        <InputGroup
                            label="Price"
                            required
                            name="price"
                            placeholder="Enter price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            error={errors.price}
                        />

                        <div className="flex flex-row gap-4">
                            <SelectGroup
                                label="Brand"
                                required
                                name="brand_id"
                                items={items}
                                selectedValue={data.brand_id}
                                onChange={setData}
                                error={errors.brand_id}
                            />
                            <SelectGroup
                                label="Category"
                                required
                                name="category_id"
                                items={categories}
                                selectedValue={data.category_id}
                                onChange={setData}
                                error={errors.category_id}
                            />
                        </div>

                        <InputGroup
                            label="Quantity"
                            required
                            name="quantity"
                            placeholder="Enter quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', Number(e.target.value))}
                            error={errors.quantity}
                        />

                        <div>
                            <Label htmlFor="description">Description (Optional)</Label>
                            <textarea
                                placeholder="Product description"
                                className="h-40 w-full rounded-md border p-4"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            {errors.description && <InputError message={errors.description} />}
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:w-1/2">
                    <CardHeader className="pb-2">
                        <CardTitle>Product Images</CardTitle>
                        <CardDescription>Add product images</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="image" className="cursor-pointer">
                                {imagePreview ? (
                                    <div className="group relative">
                                        <img src={imagePreview} alt="Product preview" className="h-56 w-full rounded-md object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                            <CloudUpload className="h-12 w-12 text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-56 w-full flex-col items-center justify-center rounded-md border-2 border-dashed">
                                        <CloudUpload className="mb-2 h-12 w-12 text-gray-400" />
                                        <p className="text-center text-gray-500">Click to upload or drag and drop</p>
                                    </div>
                                )}
                            </Label>
                            <input type="file" id="image" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            {errors.image && <InputError message={errors.image} />}
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Processing...' : 'Create Product'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AppLayout>
    );
};

const InputGroup = ({ label, required, error, ...props }) => (
    <div>
        <Label htmlFor={props.name}>
            {label} {required && <span className="text-red-400">*</span>}
        </Label>
        <Input {...props} />
        {error && <InputError message={error} />}
    </div>
);

const SelectGroup = ({ label, required, items, selectedValue, onChange, name, error }) => (
    <div className="flex-1">
        <Label htmlFor={name}>
            {label} {required && <span className="text-red-400">*</span>}
        </Label>
        <AppSelect title={name} items={items} selectedValue={selectedValue} onChange={onChange} />
        {error && <InputError message={error} />}
    </div>
);

export default Create;
