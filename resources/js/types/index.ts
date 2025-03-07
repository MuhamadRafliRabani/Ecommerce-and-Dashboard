import { Category } from '@/pages/dashboard/Categories/Index';
import { LucideIcon } from 'lucide-react';
import { ElementType } from 'react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export type subItem = {
    title: string;
    url: string;
    icon?: LucideIcon | null;
};

export interface NavItem {
    title: string;
    listAccordion: subItem[];
    path: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    product: Product[];
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface InfoDetail {
    title: string;
    icon: LucideIcon | ElementType;
    value: string | number;
}

// Generic table props that can be reused
export interface GenericTableProps<T> {
    headers: string[];
    bodies: T[];
}

// Your specific table body type for invoices
export type InvoiceTableBody = {
    Invoice: string;
    Status: string;
    method: string;
    Amount: string;
};

// Example of another type you might create for a different table
export type UserTableBody = {
    ID: string;
    Name: string;
    Email: string;
    Role: string;
    JoinDate: string;
};

export interface Product {
    id: string;
    name: string;
    price: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: string | any;
    slug: string;
    description: string;
    category_id: number;
    brand_id: number;
    stock: number;
    Quantity: number;
    order: Order[];
    category?: Category;
    brand: Brand;
    user: User;
    created_at: string;
}

export interface Brand {
    id: string;
    name: string;
    slug: string;
    image: string;
    website: string;
    product: Product[];
    color: string;
}

export interface Order {
    id: string;
    order_number: string;
    payment_method: string;
    product_id: number;
    product: Product;
    shipped_at: string;
    shipping_address: string;
    status: string;
    total_price: number;
    user_id: number;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface PaginationLinkProsp {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLinkProsp[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface chartDataProsp {
    key: string;
    value: number;
}

export interface analiticsProsp {
    labels: string;
    value: string | number;
    change?: string | number;
    color: string;
    icon?: LucideIcon | ElementType | undefined;
}

export interface StatCardPops {
    Item: analiticsProsp;
    change: number;
}
