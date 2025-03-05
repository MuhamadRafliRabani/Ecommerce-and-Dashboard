'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { analiticsProsp, chartDataProsp } from '@/types';
import { ShoppingBag } from 'lucide-react';
import React from 'react';
import StatCard from './statCard';

type chart = {
    chartData: chartDataProsp[];
    chartDescription: string;
    analitics: analiticsProsp[];
};

export function Chart({ chartData, chartDescription = 'January - June 2024', analitics }: chart) {
    const chartConfig = {
        value: {
            label: 'products',
            color: 'hsl(var(--chart-1))',
            icon: ShoppingBag,
        },
    } satisfies ChartConfig;

    return (
        <Card className="h-full w-auto min-w-auto px-0">
            <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                <CardDescription>{chartDescription}</CardDescription>
            </CardHeader>
            <ChartContainer config={chartConfig} className="-ms-5 block max-h-72 w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="key"
                        tickLine={false}
                        className="min-w-fit bg-yellow-300"
                        tickMargin={5}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 4)}
                    />
                    <YAxis dataKey="value" />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="value" className="fill-primary dark:fill-[--color-value]" radius={4} />
                </BarChart>
            </ChartContainer>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <h1 className="text-lg font-semibold">Analicts Bar Chart</h1>
                <div className="flex items-center gap-4">
                    {analitics?.map((item, i) => (
                        <React.Fragment key={i}>
                            <StatCard Item={item} change={0.56} />
                        </React.Fragment>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
