import { InfoDetail } from '@/types';

interface ItemProps {
    item: InfoDetail;
}

const Info = ({ item }: ItemProps) => {
    return (
        <div className="h-28 w-full space-y-2 rounded-lg border p-4 pt-3 shadow md:w-64">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                <item.icon className="size-4 stroke-black" strokeWidth={0.5} />
            </div>
            <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-gray-950">{item.value}</h1>
                <p className="text-xs text-black/50">{item.value} analytics for last week</p>
            </div>
        </div>
    );
};

export default Info;
