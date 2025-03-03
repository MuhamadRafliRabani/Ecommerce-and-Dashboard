import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type ItemType = {
    title: string;
    items: { key: string; value: number }[];
    onChange: ((title: string, value: number) => void) | undefined;
    placeholder?: string;
    selectedValue?: number;
};

const AppSelect = ({ title, items, onChange, placeholder = 'Select...', selectedValue }: ItemType) => {
    const handleValueChange = (value: string) => {
        const numericValue = Number(value);
        if (onChange) {
            onChange(title, numericValue);
        }
    };

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="focus:border focus:ring-0">
                <SelectValue placeholder={placeholder}>{items.find((item) => item.value === selectedValue)?.key || placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-64">
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                        {item.key}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default AppSelect;
