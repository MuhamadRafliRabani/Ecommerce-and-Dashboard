import ActionOption from '@/components/action-option';
import ConfirmationsDialog from '@/components/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/pages/dashboard/Categories/Index';
import { Brand, Order, Product } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

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

export const columnsProduct: ColumnDef<Product>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
                onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value: boolean) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Name <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="width-animated flex w-[150px] space-x-2 truncate whitespace-nowrap md:w-[195px]">
                <img src="https://placehold.co/400x400" className="size-8 rounded" alt={row.original.name} />
                <div className="-space-y-0.5">
                    <Link href={route('products.show', row.original.id)} className="block text-sm font-medium tracking-tight">
                        {row.original.name}
                    </Link>
                    <span className="text-primary/80 text-xs tracking-tighter md:tracking-wide">{row.original.category?.name}</span>
                </div>
            </div>
        ),
    },

    {
        accessorKey: 'price',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Price <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return <p>${row.original.price.toFixed(2)}</p>;
        },
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
        cell: ({ row }) => {
            return (
                <Link
                    href={route('categories.show', row.original.category_id)}
                    className={`border-slide width-animated [--colorBorder: w-[100px] ${colors[row.original.category?.color || '']}] rounded p-1.5 text-sm [--origin:right] ${colors[row.original.category?.color || '']}`}
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
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Quantity <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => <p className="">{row.original.Quantity} items</p>,
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <ActionOption
                    row={row}
                    path="products.edit"
                    ref="Product"
                    deleteItem={
                        <ConfirmationsDialog
                            title="are you sure want to delete this Product"
                            triger="Delete Product"
                            description="Once this Product is deleted, all of its resources and data will also be permanently deleted."
                            path="products.destroy"
                            params={{ product: row.original.id }}
                        />
                    }
                />
            );
        },
    },
];

export const columnsCategory: ColumnDef<Category>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Name <ArrowUpDown className="size-4" />
            </Button>
        ),
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
        accessorKey: 'products',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Product <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return <p>{row.original.product.length} items</p>;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <ActionOption
                    row={row}
                    path="categories.edit"
                    pathDetail="categories.show"
                    ref="Category"
                    deleteItem={
                        <ConfirmationsDialog
                            title="are you sure want to delete this category"
                            triger="Delete Category"
                            description="Once this category is deleted, all of its resources and data will also be permanently deleted."
                            path="categories.destroy"
                            params={{ category: row.original.id }}
                        />
                    }
                />
            );
        },
    },
];

export const columnsBrands: ColumnDef<Brand>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Name <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => <Link href={route('brands.show', row.original.id)}>{row.original.name}</Link>,
    },
    {
        header: 'Image',
        cell: ({ row }) => {
            return <img src={'storage/' + row.original.image} alt={row.original.name} className="size-10 rounded-md object-cover md:size-14" />;
        },
    },
    {
        accessorKey: 'product.length',

        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Products <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return <p>{row.original.product.length} items</p>;
        },
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
            return (
                <ActionOption
                    row={row}
                    path="brands.edit"
                    ref="brand"
                    pathDetail="brands.show"
                    deleteItem={
                        <ConfirmationsDialog
                            title="are you sure want to delete this Brands"
                            triger="Delete Brands"
                            description="Once this Brands is deleted, all of its resources and data will also be permanently deleted."
                            path="brands.destroy"
                            params={{ brand: row.original.id }}
                        />
                    }
                />
            );
        },
    },
];

export const columnsOrders: ColumnDef<Order>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <p className="width-animated block truncate whitespace-nowrap">{row.index + 1}</p>,
    },
    {
        accessorKey: 'product.name',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Name <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="width-animated flex w-[150px] space-x-2 truncate whitespace-nowrap">
                <img src="https://placehold.co/400x400" className="size-8 rounded" alt={row.original.product.name} />
                <div className="-space-y-0.5">
                    <Link href={route('products.show', row.original.product_id)} className="block text-sm font-medium tracking-tight">
                        {row.original.product.name}
                    </Link>
                    <span className="text-primary/80 text-xs tracking-tighter md:tracking-wide">#{row.original.invoice}</span>
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'Price',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Price <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => `$${Number(row.original.total_price).toFixed(2)}`,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Status <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span
                className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${
                    row.original.status === 'pending'
                        ? 'bg-blue-200 text-blue-700'
                        : row.original.status === 'processing'
                          ? 'bg-yellow-200 text-yellow-700'
                          : row.original.status === 'delivered'
                            ? 'bg-green-200 text-green-700'
                            : 'bg-red-200 text-red-600'
                }`}
            >
                {row.original.status}
            </span>
        ),
    },
    {
        accessorKey: 'payment method',
        header: 'Payment',
        cell: ({ row }) => <span className="w-[100] truncate whitespace-nowrap">{row.original.payment_method}</span>,
    },
    {
        accessorKey: 'Customer',
        header: 'Customer',
        cell: ({ row }) => <span className="w-[100px] overflow-hidden whitespace-nowrap">{row.original.user.name}</span>,
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <ActionOption
                    row={row}
                    path="orders.edit"
                    ref="Order"
                    deleteItem={
                        <ConfirmationsDialog
                            title="are you sure want to delete this order"
                            triger="Delete orders"
                            description="Once this order is deleted, all of its resources and data will also be permanently deleted."
                            path="orders.destroy"
                            params={{ order: row.original.id }}
                        />
                    }
                />
            );
        },
    },
];

export const columnsDashboard: ColumnDef<Order>[] = [
    {
        accessorKey: 'invoice',
        header: 'Invoice',
        cell: ({ row }) => row.original.invoice,
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'payment',
        header: 'Payment ',
        cell: ({ row }) => <span className="w-[100] truncate whitespace-nowrap">{row.original.payment_method}</span>,
    },
    {
        accessorKey: 'total_price',
        header: ({ column }) => (
            <Button
                className="text-primary/70 bg-transparent p-0 font-medium hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Amount <ArrowUpDown className="size-4" />
            </Button>
        ),
        cell: ({ row }) => `$${Number(row.original.total_price).toFixed(2)}`,
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <ActionOption
                    row={row}
                    path="orders.edit"
                    ref="order"
                    deleteItem={
                        <ConfirmationsDialog
                            title="are you sure want to delete this category"
                            triger="Delete Category"
                            description="Once this category is deleted, all of its resources and data will also be permanently deleted."
                            path="categories.destroy"
                            params={{ category: row.original.id }}
                        />
                    }
                />
            );
        },
    },
];
