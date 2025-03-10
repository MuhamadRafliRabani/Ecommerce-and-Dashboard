import { InfoDetail } from '@/types';

interface ItemProps {
    item: InfoDetail;
    index: number;
}

const Info = ({ item, index }: ItemProps) => {
    return (
        <div
            key={index}
            style={{ animationDelay: `${index * 150}ms` }}
            className="appers-left h-28 w-full space-y-2 rounded-lg border p-4 pt-3 text-gray-950 shadow dark:text-white"
        >
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                <item.icon className="size-4 stroke-gray-950" strokeWidth={0.5} />
            </div>
            <div className="space-y-1">
                <h1 className="text-2xl font-extrabold">
                    {typeof item.value === 'string' && item.value.length >= 8 ? item.value.slice(0, 10) + '...' : item.value}
                </h1>
                <p className="text-xs">{item.value} analytics for last week</p>
            </div>
        </div>
    );
};

export default Info;
