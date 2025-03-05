import { InfoDetail } from '@/types';

interface ItemProps {
    item: InfoDetail;
    key: number;
}

const Info = ({ item, key }: ItemProps) => {
    return (
        <div key={key} className="h-28 w-full space-y-2 rounded-lg border p-4 pt-3 text-gray-950 shadow dark:text-white">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                <item.icon className="size-4 stroke-black" strokeWidth={0.5} />
            </div>
            <div className="space-y-1">
                <h1 className="text-2xl font-extrabold">{item.value}</h1>
                <p className="text-xs">{item.value} analytics for last week</p>
            </div>
        </div>
    );
};

export default Info;
