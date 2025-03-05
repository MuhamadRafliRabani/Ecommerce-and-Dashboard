import { StatCardPops } from '@/types';

const StatCard = ({ Item }: StatCardPops) => {
    return (
        <div key={Item.labels} className="space-y-1">
            <div className="text-muted-foreground flex max-w-24 items-center gap-2 text-sm whitespace-nowrap">
                <span className={`size-2 rounded-full ${Item.color} dark:text-white`}></span>
                {Item.labels}
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-lg font-bold md:text-2xl">
                    {Item.icon && <Item.icon className="size-4" />}

                    {Item.value}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
