import { Label } from '../ui/label';
import AppSelect from './app-select';
import InputError from './input-error';

type SelectGroupProps<T> = {
    label: string;
    required?: boolean;
    items: T[];
    selectedValue?: number | string;
    onChange: (title: string, value: number | string) => void;
    name: string;
    error?: string;
};

const SelectGroup = <T extends { id: number | string; name: string }>({
    label,
    required,
    items,
    selectedValue,
    onChange,
    name,
    error,
}: SelectGroupProps<T>) => (
    <div className="flex-1">
        <Label htmlFor={name}>
            {label} {required && <span className="text-red-400">*</span>}
        </Label>
        <AppSelect<T> title={name} items={items} selectedValue={selectedValue} onChange={onChange} />
        {error && <InputError message={error} />}
    </div>
);

export default SelectGroup;
