import InputError from '@/components/dashboard/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/pages/dashboard/Categories/Index';
import { breadcrumbs } from '@/pages/dashboard/Index';
import { Brand, Product } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { useCallback } from 'react';
import InputGroup from './input-group';
import SelectGroup from './select-group';
import UploadImage from './upload-image';

type ProductFormProps = {
    defaultProduct?: Product;
    brands: Brand[];
    categories: Category[];
    submitRoute: string;
    create: boolean;
};

const ProductForm = ({ defaultProduct, brands, categories, submitRoute, create = true }: ProductFormProps) => {
    const { auth } = usePage<{ auth: { user: { id: number } } }>().props;

    const initialData = {
        name: defaultProduct?.name || '',
        price: defaultProduct?.price || '',
        category_id: defaultProduct?.category_id || (categories[0] ? categories[0].id : 1),
        brand_id: defaultProduct?.brand_id || (brands[0] ? brands[0].id : 1),
        user_id: auth.user.id,
        description: defaultProduct?.description || '',
        image: defaultProduct?.image || '',
        slug: defaultProduct?.slug || '',
        quantity: defaultProduct?.Quantity || 1,
    };

    const { data, setData, put, post, errors, processing } = useForm(initialData);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (create) {
                post(route(submitRoute));
            } else {
                put(route(submitRoute, defaultProduct?.id));
            }
        },
        [post, put, submitRoute, defaultProduct, create],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form method="GET" onSubmit={handleSubmit} className="h-full w-full gap-4 md:flex md:p-4">
                <Card className="md:w-1/2">
                    <CardHeader className="pb-2">
                        <CardTitle>{defaultProduct ? 'Edit Product' : 'Create Product'}</CardTitle>
                        <CardDescription>{defaultProduct ? 'Edit existing product' : 'Create a new product'}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <InputGroup
                            label="Title"
                            required
                            name="name"
                            placeholder={defaultProduct?.name || 'Enter product title'}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                        />

                        <InputGroup
                            label="Price"
                            required
                            name="price"
                            placeholder={defaultProduct?.price.toLocaleString() || 'Enter price'}
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
                                items={brands}
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
                            placeholder={defaultProduct?.Quantity ? defaultProduct.Quantity.toString() : 'Enter quantity'}
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', Number(e.target.value))}
                            error={errors.quantity}
                        />

                        <div>
                            <Label htmlFor="description">Description (Optional)</Label>
                            <textarea
                                placeholder={defaultProduct?.description || 'Product description'}
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
                        <UploadImage data={data} setData={setData} errors={errors} />

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Processing...' : defaultProduct ? 'Update Product' : 'Create Product'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AppLayout>
    );
};

export default ProductForm;
