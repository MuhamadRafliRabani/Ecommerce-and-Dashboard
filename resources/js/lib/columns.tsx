import OrderDetails from '@/components/dashboard/deteil-orders';
import ConfirmationsDialog from '@/components/dialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Category } from '@/pages/dashboard/Categories/Index';
import { Brand, Order, Product } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

const colors = {
    red: 'bg-red-100 text-red-500',
    blue: 'bg-blue-100 text-blue-500',
    orange: 'bg-orange-100 text-orange-500',
    green: 'bg-green-100 text-green-500',
    yellow: 'bg-yellow-100 text-yellow-500',
    emerald: 'bg-emerald-100 text-emerald-500',
    teal: 'bg-teal-100 text-teal-500',
    cyan: 'bg-cyan-100 text-cyan-500',
    violet: 'bg-violet-100 text-violet-500',
    purple: 'bg-purple-100 text-purple-500',
    fuchsia: 'bg-fuchsia-100 text-fuchsia-500',
    pink: 'bg-pink-100 text-pink-500',
    rose: 'bg-rose-100 text-rose-500',
    slate: 'bg-slate-100 text-slate-500',
    gray: 'bg-gray-100 text-gray-500',
    gold: 'bg-yellow-100 text-yellow-500',
    navy: 'bg-blue-100 text-blue-500',
    black: 'bg-gray-900 text-gray-100',
    white: 'bg-white text-gray-500',
    brown: 'bg-amber-100 text-amber-500',
};

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <Link href={route('categories.show', row.original.id)} className="width-animated block w-[100px] truncate whitespace-nowrap">
                {row.original.name}
            </Link>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <p className="width-animated block w-[200px] truncate whitespace-nowrap">{row.original.description}</p>,
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
            const handleCopy = () => {
                navigator.clipboard.writeText(row.original.id);
                toast.success('copied successfully');
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
                        <DropdownMenuItem onClick={handleCopy}>Copy ID</DropdownMenuItem>
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
                        <ConfirmationsDialog
                            title="are you sure want to delete this category"
                            triger="Delete Category"
                            description="Once this category is deleted, all of its resources and data will also be permanently deleted."
                            path="categories.destroy"
                            params={{ category: row.original.id }}
                        />
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
        header: 'Name',
        cell: ({ row }) => {
            return (
                <Link href={route('products.show', row.original.id)} className="width-animated block w-[100px] truncate whitespace-nowrap">
                    {row.original.name}
                </Link>
            );
        },
    },
    {
        header: 'Descriptions',
        cell: ({ row }) => {
            return <p className="width-animated block w-[200px] truncate whitespace-nowrap hover:max-w-[350px]">{row.original.description}</p>;
        },
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            return `$${row.original.price.toFixed(2)}`;
        },
    },
    {
        header: 'Image',
        cell: ({ row }) => {
            // return <img src={'storage/' + row.original.image} alt={row.original.name} className="size-10 rounded-md object-cover md:size-14" />;
            return <img src={'https://placehold.co/400x400/png'} alt={row.original.name} className="size-10 rounded-md object-cover md:size-14" />;
        },
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
        cell: ({ row }) => {
            return (
                <Link
                    href={route('categories.show', row.original.category_id)}
                    className={`border-slide [--colorBorder: ${colors[row.original.category?.color || '']}] rounded p-1.5 text-sm [--origin:right] ${colors[row.original.category?.color || '']}`}
                >
                    {row.original.category?.name.slice(0, 12)}
                </Link>
            );
        },
    },
    {
        accessorKey: 'brand.name',
        header: 'Brand',
        cell: ({ row }) => {
            return (
                <Link
                    href={route('brands.show', row.original.brand_id)}
                    className={`border-slide [--colorBorder: bg-blend-color ${colors[row.original.brand?.color || '']}] rounded p-1.5 text-sm [--origin:right] ${colors[row.original.brand?.color]}`}
                >
                    {row.original.brand?.name}
                </Link>
            );
        },
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
            const handleCopy = () => {
                navigator.clipboard.writeText(row.original.id);
                toast.success('copied successfully');
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
                        <DropdownMenuItem onClick={handleCopy}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('products.show', row.original.id)} className="flex items-center">
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('products.edit', row.original.id)} className="flex items-center">
                                Edit Products
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmationsDialog
                            title="are you sure want to delete this Product"
                            triger="Delete Product"
                            description="Once this Product is deleted, all of its resources and data will also be permanently deleted."
                            path="products.destroy"
                            params={{ product: row.original.id }}
                        />
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
        cell: ({ row }) => <Link href={route('brands.show', row.original.id)}>{row.original.name}</Link>,
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
                <Link href={row.original.website} target="_blank" className="border-slide [--origin:right]" rel="noopener noreferrer">
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
            const handleCopy = () => {
                navigator.clipboard.writeText(row.original.id);
                toast.success('copied successfully');
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
                        <DropdownMenuItem onClick={handleCopy}>Copy ID</DropdownMenuItem>
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
                        <ConfirmationsDialog
                            title="are you sure want to delete this Brands"
                            triger="Delete Brands"
                            description="Once this Brands is deleted, all of its resources and data will also be permanently deleted."
                            path="brands.destroy"
                            params={{ brand: row.original.id }}
                        />
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
        cell: ({ row }) => '#' + row.original.order_number,
    },
    {
        accessorKey: 'total_price',
        header: 'Total Price',
        cell: ({ row }) => `$${row.original.total_price.toFixed(2)}`,
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
            const handleCopy = () => {
                navigator.clipboard.writeText(row.original.id);
                toast.success('copied successfully');
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
                        <DropdownMenuItem onClick={handleCopy}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Sheet>
                                <SheetTrigger className="flex items-center p-1.5 text-sm">View Details</SheetTrigger>

                                <SheetContent>
                                    <OrderDetails data={row.original} />
                                </SheetContent>
                            </Sheet>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('orders.edit', row.original.id)} className="flex items-center">
                                Edit Category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmationsDialog
                            title="are you sure want to delete this order"
                            triger="Delete orders"
                            description="Once this order is deleted, all of its resources and data will also be permanently deleted."
                            path="orders.destroy"
                            params={{ order: row.original.id }}
                        />
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
        cell: ({ row }) => row.original.order_number,
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
        cell: ({ row }) => `$${row.original.total_price.toFixed(2)}`,
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const handleCopy = () => {
                navigator.clipboard.writeText(row.original.id);
                toast.success('copied successfully');
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
                        <DropdownMenuItem onClick={handleCopy}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Sheet>
                                <SheetTrigger className="flex items-center p-1.5 text-sm">View Details</SheetTrigger>

                                <SheetContent>
                                    <OrderDetails data={row.original} />
                                </SheetContent>
                            </Sheet>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('brands.edit', row.original.id)} className="flex items-center">
                                Edit Category
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmationsDialog
                            title="are you sure want to delete this category"
                            triger="Delete Category"
                            description="Once this category is deleted, all of its resources and data will also be permanently deleted."
                            path="categories.destroy"
                            params={{ category: row.original.id }}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
