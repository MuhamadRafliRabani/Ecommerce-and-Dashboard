import { InfoDetail } from '@/types';
import React from 'react';
import Info from './info';

const CardsInfo = ({ stats }: { stats: InfoDetail[] }) => {
    // const { stats } = useStats(orders);
    return (
        <div className="grid w-full auto-rows-min justify-items-center gap-2 md:grid-cols-4">
            {stats.map((item, i) => (
                <React.Fragment key={i}>
                    <Info index={i} item={item} />
                </React.Fragment>
            ))}
        </div>
    );
};

export default CardsInfo;
