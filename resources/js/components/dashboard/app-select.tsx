import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type ItemType<T extends { id: number | string; name: string }> = {
    title: string;
    items: T[];
    onChange: (title: string, value: number | string) => void;
    placeholder?: string;
    selectedValue?: number | string;
};

const AppSelect = <T extends { id: number | string; name: string }>({
    title,
    items,
    onChange,
    placeholder = 'Select...',
    selectedValue,
}: ItemType<T>) => {
    const handleValueChange = (value: string) => {
        onChange(title, value);
    };

    return (
        <Select onValueChange={handleValueChange} value={selectedValue?.toString()}>
            <SelectTrigger className="focus:border focus:ring-0">
                <SelectValue placeholder={placeholder}>
                    {items.find((item) => item.id.toString() === selectedValue?.toString())?.name || placeholder}
                </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-64">
                {items.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default AppSelect;
