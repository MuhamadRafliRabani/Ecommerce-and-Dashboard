import AppSelect from '@/components/dashboard/app-select';
import InputError from '@/components/dashboard/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { useForm, usePage } from '@inertiajs/react';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react';
import { breadcrumbs } from '../dashboard/Index';

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

    // console.log({ category: data.category_id, brands: data.brand_id });

    console.log(data);

    console.log(errors);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <img src="{{ asset('images/1740900241_screenshot-2025-03-02-141348png' ) }}" alt="" />
            <form onSubmit={handleSubmit} className="h-full w-full gap-4 md:flex md:p-4">
                {/* Left Column */}
                <Card className="md:w-1/2">
                    <CardHeader className="pb-2">
                        <CardTitle>Create Product</CardTitle>
                        <CardDescription>Create a new product</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        {/* Product Name */}
                        <div>
                            <Label htmlFor="name">Title</Label>
                            <Input
                                placeholder="Enter product title"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name ? <InputError message={errors.name} /> : null}
                        </div>

                        {/* Price */}
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                placeholder="Enter price"
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            {errors.price ? <InputError message={errors.price} /> : null}
                        </div>

                        {/* Brand and Category Selection */}
                        <div className="flex flex-row gap-4">
                            <div className="flex-1">
                                <Label htmlFor="brand_id">Brand</Label>
                                <AppSelect
                                    title="brand_id"
                                    items={items} // Isi dengan data brands
                                    onChange={setData}
                                    placeholder="Nike"
                                    selectedValue={data.brand_id}
                                />
                                {errors.brand_id ? <InputError message={errors.brand_id} /> : null}
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="category_id">Category</Label>
                                <AppSelect
                                    title="category_id"
                                    items={categories} // Isi dengan data categories
                                    onChange={setData}
                                    placeholder="Electronics"
                                    selectedValue={data.category_id}
                                />
                                {errors.category_id ? <InputError message={errors.category_id} /> : null}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="Quantity">Quantity</Label>
                            <Input
                                placeholder="Enter Quantity"
                                type="number"
                                name="Quantity"
                                onChange={(e) => setData('quantity', Number(e.target.value))}
                            />
                            {errors.quantity ? <InputError message={errors.quantity} /> : null}
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                placeholder="Product description"
                                className="h-40 w-full rounded-md border p-4"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            {errors.description ? <InputError message={errors.description} /> : null}
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column */}
                <Card className="md:w-1/2">
                    <CardHeader className="pb-2">
                        <CardTitle>Product Images</CardTitle>
                        <CardDescription>Add product images</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Image Upload */}
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
                            {errors.image ? <InputError message={errors.image} /> : null}
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Processing...' : 'Create Product'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AppLayout>
    );
};

export default Create;
