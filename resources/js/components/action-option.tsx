import ProductDetail from '@/pages/dashboard/products/Show';
import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import OrderDetails from './dashboard/deteil-orders';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

type ActionOptionProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any;
    deleteItem: React.ReactNode;
    ref: string;
    path: string;
    pathDetail?: string;
};

const ActionOption = ({ row, deleteItem, ref, path, pathDetail }: ActionOptionProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(row.original.id);
        toast.success('copied successfully');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleCopy}>Copy ID</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    {pathDetail ? (
                        <Link href={route(pathDetail, row.original.id)} className="flex items-center">
                            View Details
                        </Link>
                    ) : (
                        <Sheet>
                            <SheetTrigger className="flex items-center p-1.5 text-sm">View Details</SheetTrigger>

                            <SheetContent>
                                {ref == 'Product' ? <ProductDetail data={row.original} /> : <OrderDetails data={row.original} />}
                            </SheetContent>
                        </Sheet>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={route(path, row.original.id)} className="flex items-center">
                        Edit {ref}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {deleteItem}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionOption;
