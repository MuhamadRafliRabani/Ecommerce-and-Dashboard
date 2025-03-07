import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {/* Regular menu item (non-collapsible) */}
                <SidebarMenuItem className="appers-top">
                    <SidebarMenuButton asChild isActive={'/dashboard' === url}>
                        <Link href="/dashboard" prefetch>
                            <LayoutGrid />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Accordion-based collapsible items */}
                <Accordion type="single" collapsible className="py-0">
                    {items.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`} style={{ animationDelay: `${i * 100}ms` }} className="appers-top border-0">
                            <SidebarMenuItem className="my-0">
                                <AccordionTrigger className="[&[data-state=open]>button]:bg-muted hover:no-underline">
                                    <SidebarMenuButton>
                                        {item.icon && <item.icon size={16} />}
                                        <span>{item.title}</span>
                                        <ChevronDown className="ml-auto size-4 transition-transform duration-200" />
                                    </SidebarMenuButton>
                                </AccordionTrigger>

                                <AccordionContent className="pb-0">
                                    <SidebarMenuSub>
                                        {item.listAccordion.map((subItem, j) => (
                                            <SidebarMenuSubItem key={j}>
                                                <Link
                                                    href={route(subItem.url)}
                                                    prefetch
                                                    className="ms-4 list-item list-disc rounded-md py-1 ps-1 hover:bg-gray-100/50 dark:hover:bg-gray-200/10 dark:hover:text-white"
                                                >
                                                    {subItem.title}
                                                </Link>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </AccordionContent>
                            </SidebarMenuItem>
                        </AccordionItem>
                    ))}
                </Accordion>
            </SidebarMenu>
        </SidebarGroup>
    );
}
