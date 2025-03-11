import InputError from '@/components/dashboard/input-error';
import UploadImage from '@/components/dashboard/upload-image';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { breadcrumbs } from '@/pages/dashboard/Index';
import { useForm } from '@inertiajs/react';
import React from 'react';

interface Field {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValue?: any;
}

interface CreateLayoutProps {
    fields: Field[];
    title: string;
    pathRoute: string;
    id?: string | undefined;
    create: boolean;
}

const CreateFieldLayout = ({ fields, title, pathRoute, id, create = true }: CreateLayoutProps) => {
    const initialData = Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? '']));

    const { data, setData, post, put, errors, processing } = useForm(initialData);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (create) {
            post(route(pathRoute));
        } else {
            put(route(pathRoute, id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form method="POST" onSubmit={handleSubmit} className="h-full w-full gap-4 space-y-4 p-4">
                <CardHeader className="space-y-1 p-0">
                    <CardTitle>
                        {create ? 'Create' : 'Edit'} {title}
                    </CardTitle>
                    <CardDescription>
                        {create ? 'Create a new' : 'Edit an existing'} {title.toLowerCase()}
                    </CardDescription>
                </CardHeader>

                {fields.map(({ name, label, placeholder, type }, i) => (
                    <div key={i} className={`mb-4 flex flex-col justify-between space-y-2 md:flex-row ${label == 'Image' ? 'hidden' : ''}`}>
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

                {title == 'Brand' ? (
                    <div className="flex w-full flex-col space-y-2 md:flex-row">
                        <Label className="h-fit min-w-52">
                            Image <span className="text-base text-red-400">*</span>
                        </Label>
                        <UploadImage data={data} setData={setData} errors={errors} />
                    </div>
                ) : null}
                <Button className="ms-auto mt-4 block md:ms-52" disabled={processing}>
                    submit
                </Button>
            </form>
        </AppLayout>
    );
};

export default CreateFieldLayout;
