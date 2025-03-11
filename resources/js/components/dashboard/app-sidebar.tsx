import { NavMain } from '@/components/dashboard/nav-main';
import { NavUser } from '@/components/dashboard/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { subItem, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Blocks, BookImage, BookOpen, Folders, Layers, ShoppingCart } from 'lucide-react';
import AppLogo from './app-logo';
import { NavFooter } from './nav-footer';

const mainNavItems: NavItem[] = [
    {
        title: 'Products',
        icon: ShoppingCart,
        path: 'products.index',
        listAccordion: [
            {
                title: 'products',
                url: 'products.index',
            },
            {
                title: 'Add Products',
                url: 'products.create',
            },
        ],
    },
    {
        title: 'Category',
        icon: Layers,
        path: 'categories.index',
        listAccordion: [
            {
                title: 'Category',
                url: 'categories.index',
            },
            {
                title: 'New Category',
                url: 'categories.create',
            },
        ],
    },
    {
        title: 'Brands',
        icon: Blocks,
        path: 'brands.index',
        listAccordion: [
            {
                title: 'Brands',
                url: 'brands.index',
            },
            {
                title: 'New Brand',
                url: 'brands.create',
            },
        ],
    },
    {
        title: 'Orders',
        icon: Folders,
        path: 'orders.index',
        listAccordion: [
            {
                title: 'Orders',
                url: 'orders.index',
            },
            {
                title: 'Order Tracking',
                url: 'orders.create',
            },
        ],
    },
];

const footerNavItems: subItem[] = [
    {
        title: 'Eccomerce',
        url: '/#',
        icon: BookImage,
    },
    {
        title: 'Documentation',
        url: 'laravel.com',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
