import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Category } from '@/pages/dashboard/Categories/Index';
import { Brand, Order, Product } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

// Definisi kolom sesuai dengan data yang diberikan
export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'product.length',
        header: 'Products',
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this category?')) {
                    router.delete(route('categories.destroy', row.original.id));
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('categories.show', row.original.id)} className="flex items-center">
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('categories.edit', row.original.id)} className="flex items-center">
                                Edit Category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                            Delete Category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const columnsProduct: ColumnDef<Product>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        header: 'Image',
        cell: ({ row }) => {
            return <img src={'storage/' + row.original.image} alt={row.original.name} className="size-10 rounded-md object-cover md:size-14" />;
        },
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
    },
    {
        accessorKey: 'brand.name',
        header: 'Brand',
    },
    {
        accessorKey: 'Quantity',
        header: 'Quantity',
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this category?')) {
                    router.delete(route('products.destroy', row.original.id));
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('products.show', row.original.id)} className="flex items-center">
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('products.edit', row.original.id)} className="flex items-center">
                                Edit Category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                            Delete Category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const columnsBrands: ColumnDef<Brand>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
    },
    {
        header: 'Image',
        cell: ({ row }) => {
            return <img src={'storage/' + row.original.image} alt={row.original.name} className="size-10 rounded-md object-cover md:size-14" />;
        },
    },
    {
        accessorKey: 'product.length',
        header: 'Products',
    },
    {
        accessorKey: 'website',
        header: 'Website',
        cell: ({ row }) => {
            return (
                <Link href={row.original.website} target="_blank" className="hover:underline" rel="noopener noreferrer">
                    {row.original.name}
                </Link>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this category?')) {
                    router.delete(route('brands.destroy', row.original.id));
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('brands.show', row.original.id)} className="flex items-center">
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('brands.edit', row.original.id)} className="flex items-center">
                                Edit Category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                            Delete Category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const columnsOrders: ColumnDef<Order>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'user.name',
        header: 'Username',
    },
    {
        accessorKey: 'product.name',
        header: 'Product',
    },
    {
        accessorKey: 'order_number',
        header: 'Order Number',
    },
    {
        accessorKey: 'total_price',
        header: 'Total Price',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'payment_method',
        header: 'Payment',
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this category?')) {
                    router.delete(route('brands.destroy', row.original.id));
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('brands.show', row.original.id)} className="flex items-center">
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('brands.edit', row.original.id)} className="flex items-center">
                                Edit Category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                            Delete Category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const columnsDashboard: ColumnDef<Order>[] = [
    {
        accessorKey: 'order_number',
        header: 'Invoice',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'payment_method',
        header: 'Method',
    },
    {
        accessorKey: 'total_price',
        header: 'Amount',
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this category?')) {
                    router.delete(route('brands.destroy', row.original.id));
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('brands.show', row.original.id)} className="flex items-center">
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('brands.edit', row.original.id)} className="flex items-center">
                                Edit Category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                            Delete Category
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
