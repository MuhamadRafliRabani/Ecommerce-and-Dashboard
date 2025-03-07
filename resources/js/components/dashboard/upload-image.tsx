import { CloudUpload } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Label } from '../ui/label';
import InputError from './input-error';

const UploadImage = ({ data, setData, errors }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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

    return (
        <div>
            <Label htmlFor="image" className="w-full cursor-pointer">
                {imagePreview ? (
                    <div className="group relative">
                        <img
                            src={typeof data.image === 'string' ? data.image : imagePreview}
                            alt="Product preview"
                            className="h-56 w-full rounded-md object-cover"
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                            style={{ pointerEvents: 'none' }}
                        >
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
    );
};

export default UploadImage;
