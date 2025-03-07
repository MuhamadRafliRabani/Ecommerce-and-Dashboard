import { Search } from 'lucide-react';
import { Input } from '../ui/input';

const InputFilterTable = ({ table, field = 'name', placeholder = 'Filter product name...' }) => {
    return (
        <div className="relative w-1/2 max-w-100 text-sm">
            <Input
                placeholder={placeholder}
                value={(table.getColumn(field)?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn(field)?.setFilterValue(event.target.value)}
                className="ps-9 placeholder:text-sm focus:border-0 focus:ring-0"
            />

            <Search className="stroke-primary/80 absolute top-1/3 left-0 size-5 translate-x-1/2 md:top-1/4" />
        </div>
    );
};

export default InputFilterTable;
