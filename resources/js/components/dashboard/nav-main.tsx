import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={'/dashboard' === page.url}>
                        <Link href="/dashboard" prefetch>
                            <LayoutGrid />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                {items.map((item, i) => (
                    <Accordion type="single" key={i} collapsible>
                        <AccordionItem value={'item-' + i}>
                            <AccordionTrigger className={`${'/' + item.title === page.url ? 'bg-gray-200/50' : ''} p-2`}>
                                <div className="flex items-center gap-2">
                                    {item.icon && <item.icon size={16} />}
                                    <span>{item.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="ms-3 border-s bg-gray-50 pb-0">
                                {item.listAccordion.map((subItem, j) => (
                                    <Link key={j} href={route(subItem.url)} prefetch className="ms-6 list-item list-disc py-2">
                                        {subItem.title}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
