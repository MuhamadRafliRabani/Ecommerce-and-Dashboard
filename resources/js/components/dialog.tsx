import { useForm } from '@inertiajs/react';
import { useState } from 'react'; // Add useState
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './ui/dialog';

type ConfirmProps = {
    triger?: string;
    title: string;
    description: string;
    path: string;
    params?: { [key: string]: string | number };
};

const ConfirmationsDialog = ({ triger = 'delete', title, description, path, params = {} }: ConfirmProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { delete: destroy, processing, reset, clearErrors, errors } = useForm(params);
    // console.log('🚀 ~ ConfirmationsDialog ~ errors:', errors);

    const closeModal = () => {
        setIsOpen(false);
        clearErrors();
        reset();
    };

    // console.log('🚀 ~ destroy ~ path, params:', { path, params });
    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route(path, params), {
            preserveScroll: true,
            onSuccess: () => {
                // Trigger success action here
                closeModal();
                toast.success('Deleted Item Successfully');
            },
            onError: () => {
                console.log('Error:', errors);
                toast.success('' + errors);
                setIsOpen(true);
            },
            onFinish: () => reset(),
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="bg-transparent px-2 py-0 text-sm font-light text-red-400 hover:bg-transparent">
                    {triger}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    {/* Remove asChild from this Button */}
                    <Button variant="destructive" disabled={processing} onClick={handleDelete}>
                        {triger}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationsDialog;
