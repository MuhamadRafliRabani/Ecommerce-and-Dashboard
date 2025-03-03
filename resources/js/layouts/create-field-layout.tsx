import Heading from '@/components/dashboard/heading';
import InputError from '@/components/dashboard/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { breadcrumbs } from '@/pages/dashboard/Index';
import { useForm } from '@inertiajs/react';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react';

interface Field {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    defaultValue?: any;
}

interface CreateLayoutProps {
    fields: Field[];
    title: string;
    pathRoute: string;
}

const CreateFieldLayout = ({ fields, title, pathRoute }: CreateLayoutProps) => {
    const initialData = Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? '']));
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, errors, processing } = useForm(initialData);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('image', file);

            setImagePreview(URL.createObjectURL(file));
        }
    };

    console.log(errors);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route(pathRoute));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form method="POST" onSubmit={handleSubmit} className="h-full w-full gap-4 md:p-4">
                <Heading title={title} description={'Add a new ' + title.toLowerCase()} />

                {fields.map(({ name, label, placeholder, type }, i) => (
                    <div key={i} className={`mb-4 flex justify-between ${label == 'Image' ? 'hidden' : ''}`}>
                        <Label htmlFor={name} className="min-w-52">
                            {label} <span className="text-base text-red-400">*</span>
                        </Label>
                        <Input
                            id={name}
                            placeholder={placeholder || ''}
                            className="w-full rounded-md border p-4"
                            type={type || 'text'}
                            name={name}
                            value={typeof data[name] === 'boolean' ? data[name].toString() : data[name]}
                            onChange={(e) => setData(name, e.target.value)}
                        />
                        {errors[name] && <InputError message={errors[name]} />}
                    </div>
                ))}

                {title == 'Brand' && (
                    <div className="flex justify-between">
                        <h3 className="min-w-52">
                            Image <span className="text-base text-red-400">*</span>
                        </h3>
                        <Label htmlFor="Images" className="w-full cursor-pointer">
                            <input type="file" id="Images" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            {imagePreview ? (
                                <div className="group relative">
                                    <img src={imagePreview} alt="Product preview" className="h-56 w-full rounded-md object-cover" />
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <CloudUpload className="h-12 w-12 text-white" />
                                </div>
                            )}
                            {errors.image ? <InputError message={errors.image} /> : null}
                        </Label>
                    </div>
                )}
                <Button className="ms-52 mt-4 block" disabled={processing}>
                    submit
                </Button>
            </form>
        </AppLayout>
    );
};

export default CreateFieldLayout;
